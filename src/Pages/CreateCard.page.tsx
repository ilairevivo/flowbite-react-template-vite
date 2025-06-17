import { Button, Label, TextInput, Textarea, Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import {
  HiOutlinePhotograph,
  HiOutlineLocationMarker,
  HiOutlineMail,
} from "react-icons/hi";
import createCardSchema from "../validations/createCard.joi";

interface CardType {
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
    zip?: number;
  };
}

const CreateCard = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CardType>({
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      phone: "",
      email: "",
      web: "",
      image: {
        url: "",
        alt: "",
      },
      address: {
        state: "",
        country: "",
        city: "",
        street: "",
        houseNumber: 0,
        zip: undefined,
      },
    },
    mode: "onChange",
    resolver: joiResolver(createCardSchema),
  });

  const onSubmit = async (formData: CardType) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("create card failed");
        return;
      }

      axios.defaults.headers.common["x-auth-token"] = token;

      const apiData = {
        title: formData.title,
        subtitle: formData.subtitle,
        description: formData.description,
        phone: formData.phone,
        email: formData.email,
        ...(formData.web &&
          formData.web.trim() !== "" && { web: formData.web }),
        image: {
          url: formData.image.url ,
          alt: formData.image.alt,
        },
        address: {
          ...(formData.address.state &&
            formData.address.state.trim() !== "" && {
              state: formData.address.state,
            }),
          country: formData.address.country,
          city: formData.address.city,
          street: formData.address.street,
          houseNumber: formData.address.houseNumber,
          ...(formData.address.zip &&
            formData.address.zip > 0 && {
              zip: formData.address.zip,
            }),
        },
      };

      console.log("Sending data to API:", apiData);

      const response = await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
        apiData,
      );

      if (response.status === 201) {
        toast.success("Card created successfully!", {
          position: "top-right",
          autoClose: 3000,
        });

        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      console.error("Error creating card:", error);

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          toast.error("Session expired. Please log in again.");
          localStorage.removeItem("token");
          navigate("/login");
        } else if (error.response?.status === 400) {
          toast.error("Bad request. Please check your input data.");
          console.log("API Error Response:", error.response?.data);
        }
      }
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create a Business Card
          </h1>
        </div>
        <Card className="mx-auto max-w-4xl shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="border-b border-gray-200 pb-6 dark:border-gray-700">
              <h2 className="mb-4 flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
                <HiOutlineMail className="mr-2" />
                Personal Information
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="title">* name of business</Label>
                  <TextInput
                    {...register("title")}
                    id="title"
                    type="text"
                    placeholder="name of business"
                    color={errors.title ? "failure" : "gray"}
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                      {errors.title.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="subtitle">* sub title</Label>
                  <TextInput
                    {...register("subtitle")}
                    id="subtitle"
                    type="text"
                    placeholder="sub title"
                    color={errors.subtitle ? "failure" : "gray"}
                  />
                  {errors.subtitle && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                      {errors.subtitle.message}
                    </p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="description">* description of business</Label>
                  <Textarea
                    {...register("description")}
                    id="description"
                    rows={4}
                    placeholder="Describe your business..."
                    color={errors.description ? "failure" : "gray"}
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                      {errors.description.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="phone">* phone</Label>
                  <TextInput
                    {...register("phone")}
                    id="phone"
                    type="tel"
                    placeholder="050-1234567"
                    color={errors.phone ? "failure" : "gray"}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">* email address</Label>
                  <TextInput
                    {...register("email")}
                    id="email"
                    type="email"
                    placeholder="example@business.com"
                    color={errors.email ? "failure" : "gray"}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="web">* website</Label>
                  <TextInput
                    {...register("web")}
                    id="web"
                    type="url"
                    placeholder="https://www.business.com"
                    color={errors.web ? "failure" : "gray"}
                  />
                  {errors.web && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                      {errors.web.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="border-b border-gray-200 pb-6 dark:border-gray-700">
              <h2 className="mb-4 flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
                <HiOutlinePhotograph className="mr-2" />
                Business Card Image
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="image.url">* URL Image</Label>
                  <TextInput
                    {...register("image.url")}
                    id="image.url"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    color={errors.image?.url ? "failure" : "gray"}
                  />
                  {errors.image?.url && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                      {errors.image.url.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="image.alt">* Image alt text</Label>
                  <TextInput
                    {...register("image.alt")}
                    id="image.alt"
                    type="text"
                    placeholder=" Image alt text"
                    color={errors.image?.alt ? "failure" : "gray"}
                  />
                  {errors.image?.alt && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                      {errors.image.alt.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="border-b border-gray-200 pb-6 dark:border-gray-700">
              <h2 className="mb-4 flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
                <HiOutlineLocationMarker className="mr-2" />
                Business Address
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="address.country">* country</Label>
                  <TextInput
                    {...register("address.country")}
                    id="address.country"
                    type="text"
                    placeholder="ישראל"
                    color={errors.address?.country ? "failure" : "gray"}
                  />
                  {errors.address?.country && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                      {errors.address.country.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="address.state">* state </Label>
                  <TextInput
                    {...register("address.state")}
                    id="address.state"
                    type="text"
                    placeholder="מרכז"
                    color={errors.address?.state ? "failure" : "gray"}
                  />
                  {errors.address?.state && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                      {errors.address.state.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="address.city">* city </Label>
                  <TextInput
                    {...register("address.city")}
                    id="address.city"
                    type="text"
                    placeholder="תל אביב"
                    color={errors.address?.city ? "failure" : "gray"}
                  />
                  {errors.address?.city && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                      {errors.address.city.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="address.street">* street </Label>
                  <TextInput
                    {...register("address.street")}
                    id="address.street"
                    type="text"
                    placeholder="דיזנגוף"
                    color={errors.address?.street ? "failure" : "gray"}
                  />
                  {errors.address?.street && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                      {errors.address.street.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="address.houseNumber">* house number</Label>
                  <TextInput
                    {...register("address.houseNumber", {
                      valueAsNumber: true,
                    })}
                    id="address.houseNumber"
                    type="number"
                    placeholder="123"
                    min="1"
                    color={errors.address?.houseNumber ? "failure" : "gray"}
                  />
                  {errors.address?.houseNumber && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                      {errors.address.houseNumber.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="address.zip"> zip </Label>
                  <TextInput
                    {...register("address.zip", {
                      valueAsNumber: true,
                    })}
                    id="address.zip"
                    type="number"
                    placeholder="12345"
                    min="10000"
                    max="99999"
                    color={errors.address?.zip ? "failure" : "gray"}
                  />
                  {errors.address?.zip && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                      {errors.address?.zip.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-6">
              <Button
                type="button"
                color="gray"
                onClick={() => navigate("/home")}
                className="px-8"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!isValid}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 px-8 hover:from-blue-600 hover:to-indigo-700"
              >
                Create Card{" "}
              </Button>
            </div>
          </form>
        </Card>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default CreateCard;
