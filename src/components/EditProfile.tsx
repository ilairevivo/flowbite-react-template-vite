"use client";

import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import { useRef, useState, useEffect } from "react";
import {
  User,
  Phone,
  MapPin,
  Globe,
  Image as ImageIcon,
  Home,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { userActions } from "../store/userSlice";
import useAuth from "../hooks/useAuth";
import useToken from "../hooks/useToken";
import { validateUpdateUser } from "../validations/updateUserSchema.joi";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { ToastContainer } from "react-toastify";


interface EditProfileProps {
  isOpen: boolean;
  onClose: () => void;
}
type TToken = { _id: string };


export function EditProfile({ isOpen, onClose }: EditProfileProps) {
  const nameInputRef = useRef(null);
  const dispatch = useDispatch();
  const user = useAuth();
  const token = useToken();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
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
    if (isOpen && user) {
      setFormData({
        firstName: user.name?.first || "",
        middleName: user.name?.middle || "",
        lastName: user.name?.last || "",
        phone: user.phone || "",
        imageUrl: user.image?.url || "",
        imageAlt: user.image?.alt || "",
        state: user.address?.state || "",
        country: user.address?.country || "",
        city: user.address?.city || "",
        street: user.address?.street || "",
        houseNumber: user.address?.houseNumber?.toString() || "",
        zip: user.address?.zip?.toString() || "",
      });
      setErrors({});
    }
  }, [isOpen, user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

      if (!token) {
        toast.error("Authentication token not found. Please login again.");
        return;
      }

      const decodedToken: TToken = jwtDecode(token);
      const userId = decodedToken._id;

      const dataToValidate = {
        name: {
          first: formData.firstName,
          middle: formData.middleName,
          last: formData.lastName,
        },
        phone: formData.phone,
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

      const { error } = validateUpdateUser(dataToValidate);

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

      const response = await axios.put(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userId}`,
        dataToValidate,
        {
          headers: {
            "x-auth-token": token,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200) {
        dispatch(userActions.updateUser(response.data));
        toast.success("Profile updated successfully!");
        onClose();
      }
    } catch (error) {
      console.error("Error updating profile:", error);

      if (error === 401) {
        toast.error("Authentication failed. Please login again.");
      } else if (error === 403) {
        toast.error("You don't have permission to update this profile.");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getFieldError = (fieldPath: string) => {
    return errors[fieldPath] || "";
  };

  return (
    <>
      <Modal
        show={isOpen}
        size="xl"
        popup
        onClose={onClose}
        initialFocus={nameInputRef}
      >
        <ModalHeader />
        <ModalBody>
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="flex items-center justify-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
                <User className="h-6 w-6 text-blue-600" />
                Edit Profile
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Update your personal information
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="firstName"
                    className="flex items-center gap-2"
                  >
                    <User className="h-4 w-4" />
                    First Name *
                  </Label>
                </div>
                <TextInput
                  id="firstName"
                  name="firstName"
                  ref={nameInputRef}
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  color={getFieldError("name.first") ? "failure" : undefined}
                  required
                />

                {getFieldError("name.first") && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {getFieldError("name.first")}
                  </p>
                )}
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="middleName">Middle Name</Label>
                </div>
                <TextInput
                  id="middleName"
                  name="middleName"
                  placeholder="Enter middle name"
                  value={formData.middleName}
                  onChange={handleInputChange}
                  color={getFieldError("name.middle") ? "failure" : undefined}
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="lastName">Last Name *</Label>
                </div>
                <TextInput
                  id="lastName"
                  name="lastName"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  color={getFieldError("name.last") ? "failure" : undefined}
                  required
                />

                {getFieldError("name.last") && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {getFieldError("name.last")}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number *
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
            </div>

            <div className="space-y-4">
              <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                <ImageIcon className="h-5 w-5" />
                Profile Image
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
                    placeholder="Profile picture"
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

            <div className="space-y-4">
              <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                <MapPin className="h-5 w-5" />
                Address
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
