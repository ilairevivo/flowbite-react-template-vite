"use client";

import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
  Textarea,
} from "flowbite-react";
import { useRef, useState, useEffect } from "react";
import {
  CreditCard,
  Phone,
  MapPin,
  Globe,
  Image as ImageIcon,
  Home,
  Mail,
  FileText,
  Subtitles,
  AlignLeft,
} from "lucide-react";
import { validateUpdateCard } from "../validations/updataCard.joi";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import {  useNavigate } from "react-router-dom";

interface EditCardProps {
  isOpen: boolean;
  onClose: () => void;
  cardId: string;
}

interface CardData {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  phone: string;
  email: string;
  web: string;
  image: {
    url: string;
    alt: string;
  };
  address: {
    state: string;
    country: string;
    city: string;
    street: string;
    houseNumber: number;
    zip: number;
  };
  bizNumber: number;
  likes: string[];
  user_id: string;
}

export function EditCard({ isOpen, onClose, cardId }: EditCardProps) {
  const titleInputRef = useRef(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingCard, setLoadingCard] = useState(false);
  

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    phone: "",
    email: "",
    web: "",
    imageUrl: "",
    imageAlt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchCardData = async () => {
      if (!isOpen || !cardId) return;

      setLoadingCard(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Authentication token not found. Please login again.");
          navigate("/login");
          return;
        }

        axios.defaults.headers.common["x-auth-token"] = token;

        const response = await axios.get(
          `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
        );

        const card: CardData = response.data;

        setFormData({
          title: card.title || "",
          subtitle: card.subtitle || "",
          description: card.description || "",
          phone: card.phone || "",
          email: card.email || "",
          web: card.web || "",
          imageUrl: card.image?.url || "",
          imageAlt: card.image?.alt || "",
          state: card.address?.state || "",
          country: card.address?.country || "",
          city: card.address?.city || "",
          street: card.address?.street || "",
          houseNumber: card.address?.houseNumber?.toString() || "",
          zip: card.address?.zip?.toString() || "",
        });

        setErrors({});
      } catch (error) {
        console.error("Error fetching card data:", error);
        toast.error("Failed to load card data");
        onClose();
      } finally {
        setLoadingCard(false);
      }
    };

    fetchCardData();
  }, [isOpen, cardId, navigate, onClose]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication token not found. Please login again.");
        navigate("/login");
        return;
      }

      const dataToValidate = {
        title: formData.title,
        subtitle: formData.subtitle,
        description: formData.description,
        phone: formData.phone,
        email: formData.email,
        web: formData.web,
        image: {
          url: formData.imageUrl,
          alt: formData.imageAlt,
        },
        address: {
          state: formData.state,
          country: formData.country,
          city: formData.city,
          street: formData.street,
          houseNumber: parseInt(formData.houseNumber),
          zip: parseInt(formData.zip),
        },
      };

      const { error } = validateUpdateCard(dataToValidate);

      if (error) {
        const validationErrors: { [key: string]: string } = {};
        error.details.forEach((detail) => {
          const fieldPath = detail.path.join(".");
          validationErrors[fieldPath] = detail.message;
        });
        setErrors(validationErrors);
        toast.error("Please fix the validation errors");
        return;
      }

      axios.defaults.headers.common["x-auth-token"] = token;

      const response = await axios.put(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
        dataToValidate,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200) {
        toast.success("Card updated successfully!");
        onClose();
        if(location.pathname === "/editCard"){
          navigate("/myCards");
        }
        
      } else {
        toast.error("Failed to update card. Please try again.");
      }
    } catch (error) {
      console.error("Error updating card:", error);

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          toast.error("Authentication failed. Please login again.");
          localStorage.removeItem("token");
          navigate("/login");
        } else if (error.response?.status === 403) {
          toast.error("You don't have permission to update this card.");
        } else if (error.response?.status === 404) {
          toast.error("Card not found.");
        } else {
          toast.error("Failed to update card. Please try again.");
        }
      } else {
        toast.error("Failed to update card. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getFieldError = (fieldPath: string) => {
    return errors[fieldPath] || "";
  };

  if (loadingCard) {
    return (
      <Modal show={isOpen} size="xl" popup onClose={onClose}>
        <ModalHeader />
        <ModalBody>
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
              <p className="text-gray-500 dark:text-gray-400">
                Loading card data...
              </p>
            </div>
          </div>
        </ModalBody>
      </Modal>
    );
  }

  return (
    <>
      <Modal
        show={isOpen}
        size="4xl"
        popup
        onClose={onClose}
        initialFocus={titleInputRef}
      >
        <ModalHeader />
        <ModalBody>
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="flex items-center justify-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
                <CreditCard className="h-6 w-6 text-blue-600" />
                Edit Business Card
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Update your business card information
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                <FileText className="h-5 w-5" />
                Basic Information
              </h4>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="title" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Title *
                    </Label>
                  </div>
                  <TextInput
                    id="title"
                    name="title"
                    ref={titleInputRef}
                    placeholder="Enter business title"
                    value={formData.title}
                    onChange={handleInputChange}
                    color={getFieldError("title") ? "failure" : undefined}
                    required
                  />
                  {getFieldError("title") && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      {getFieldError("title")}
                    </p>
                  )}
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="subtitle"
                      className="flex items-center gap-2"
                    >
                      <Subtitles className="h-4 w-4" />
                      Subtitle *
                    </Label>
                  </div>
                  <TextInput
                    id="subtitle"
                    name="subtitle"
                    placeholder="Enter subtitle"
                    value={formData.subtitle}
                    onChange={handleInputChange}
                    color={getFieldError("subtitle") ? "failure" : undefined}
                    required
                  />
                  {getFieldError("subtitle") && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      {getFieldError("subtitle")}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="description"
                    className="flex items-center gap-2"
                  >
                    <AlignLeft className="h-4 w-4" />
                    Description *
                  </Label>
                </div>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter business description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className={
                    getFieldError("description") ? "border-red-500" : ""
                  }
                  required
                />
                {getFieldError("description") && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {getFieldError("description")}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                <Phone className="h-5 w-5" />
                Contact Information
              </h4>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone *
                    </Label>
                  </div>
                  <TextInput
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="05X-XXXXXXX"
                    value={formData.phone}
                    onChange={handleInputChange}
                    color={getFieldError("phone") ? "failure" : undefined}
                    required
                  />
                  {getFieldError("phone") && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      {getFieldError("phone")}
                    </p>
                  )}
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email *
                    </Label>
                  </div>
                  <TextInput
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    color={getFieldError("email") ? "failure" : undefined}
                    required
                  />
                  {getFieldError("email") && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      {getFieldError("email")}
                    </p>
                  )}
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="web" className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Website *
                    </Label>
                  </div>
                  <TextInput
                    id="web"
                    name="web"
                    type="url"
                    placeholder="https://example.com"
                    value={formData.web}
                    onChange={handleInputChange}
                    color={getFieldError("web") ? "failure" : undefined}
                    required
                  />
                  {getFieldError("web") && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      {getFieldError("web")}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Image Information */}
            <div className="space-y-4">
              <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                <ImageIcon className="h-5 w-5" />
                Card Image
              </h4>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="imageUrl">Image URL *</Label>
                  </div>
                  <TextInput
                    id="imageUrl"
                    name="imageUrl"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    color={getFieldError("image.url") ? "failure" : undefined}
                    required
                  />
                  {getFieldError("image.url") && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      {getFieldError("image.url")}
                    </p>
                  )}
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="imageAlt">Image Description *</Label>
                  </div>
                  <TextInput
                    id="imageAlt"
                    name="imageAlt"
                    placeholder="Business image description"
                    value={formData.imageAlt}
                    onChange={handleInputChange}
                    color={getFieldError("image.alt") ? "failure" : undefined}
                    required
                  />
                  {getFieldError("image.alt") && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      {getFieldError("image.alt")}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                <MapPin className="h-5 w-5" />
                Business Address
              </h4>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="country"
                      className="flex items-center gap-2"
                    >
                      <Globe className="h-4 w-4" />
                      Country *
                    </Label>
                  </div>
                  <TextInput
                    id="country"
                    name="country"
                    placeholder="Israel"
                    value={formData.country}
                    onChange={handleInputChange}
                    color={
                      getFieldError("address.country") ? "failure" : undefined
                    }
                    required
                  />
                  {getFieldError("address.country") && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      {getFieldError("address.country")}
                    </p>
                  )}
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="state">State</Label>
                  </div>
                  <TextInput
                    id="state"
                    name="state"
                    placeholder="Center District"
                    value={formData.state}
                    onChange={handleInputChange}
                    color={
                      getFieldError("address.state") ? "failure" : undefined
                    }
                  />
                  {getFieldError("address.state") && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      {getFieldError("address.state")}
                    </p>
                  )}
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="city">City *</Label>
                  </div>
                  <TextInput
                    id="city"
                    name="city"
                    placeholder="Tel Aviv"
                    value={formData.city}
                    onChange={handleInputChange}
                    color={
                      getFieldError("address.city") ? "failure" : undefined
                    }
                    required
                  />
                  {getFieldError("address.city") && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      {getFieldError("address.city")}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="street">Street *</Label>
                  </div>
                  <TextInput
                    id="street"
                    name="street"
                    placeholder="Herzl Street"
                    value={formData.street}
                    onChange={handleInputChange}
                    color={
                      getFieldError("address.street") ? "failure" : undefined
                    }
                    required
                  />
                  {getFieldError("address.street") && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      {getFieldError("address.street")}
                    </p>
                  )}
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="houseNumber"
                      className="flex items-center gap-2"
                    >
                      <Home className="h-4 w-4" />
                      House Number *
                    </Label>
                  </div>
                  <TextInput
                    id="houseNumber"
                    name="houseNumber"
                    type="number"
                    placeholder="123"
                    value={formData.houseNumber}
                    onChange={handleInputChange}
                    color={
                      getFieldError("address.houseNumber")
                        ? "failure"
                        : undefined
                    }
                    required
                  />
                  {getFieldError("address.houseNumber") && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      {getFieldError("address.houseNumber")}
                    </p>
                  )}
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="zip">ZIP Code *</Label>
                  </div>
                  <TextInput
                    id="zip"
                    name="zip"
                    type="number"
                    placeholder="12345"
                    value={formData.zip}
                    onChange={handleInputChange}
                    color={getFieldError("address.zip") ? "failure" : undefined}
                    required
                  />
                  {getFieldError("address.zip") && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      {getFieldError("address.zip")}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                className="flex-1"
                onClick={handleSave}
                disabled={isLoading}
                color={isLoading ? "gray" : "blue"}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                color="gray"
                className="flex-1"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default EditCard;