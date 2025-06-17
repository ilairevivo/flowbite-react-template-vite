import { Button, FloatingLabel, Checkbox } from "flowbite-react";
import axios from "axios";
import { registerSchema } from "../validations/register.joi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useDispatch } from "react-redux";
import { userActions } from "../store/userSlice";
import { jwtDecode } from "jwt-decode";

interface RegisterFormData {
  name: {
    first: string;
    middle: string;
    last: string;
  };
  phone: string;
  email: string;
  password: string;
  copyPassword: string;
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
  isBusiness: boolean;
  isAdmin?: boolean;
}

const Register = () => {
  const dispatch = useDispatch();

  const initialFormData: RegisterFormData = {
    name: {
      first: "",
      middle: "",
      last: "",
    },
    phone: "",
    email: "",
    password: "",
    copyPassword: "",
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
      zip: 0,
    },
    isBusiness: false,
    
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialFormData,
    mode: "onChange",
    resolver: joiResolver(registerSchema),
  });

  const onSubmit = async (form: RegisterFormData) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { copyPassword, ...formDataForServer } = form;

      const token = await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users",
        formDataForServer,
      );

    
      localStorage.setItem("token", token.data);
      toast.success("Registration successful");
      const loginResponse = await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login", 
        {
          email: form.email,
          password: form.password
        },
      );
      localStorage.setItem("token", loginResponse.data);
      dispatch(userActions.login(loginResponse.data));


      const decodedToken = jwtDecode(token.data ) as { _id: string };
      axios.defaults.headers.common["x-auth-token"] = token.data;

      const userResponse = await axios.get(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/" +
          decodedToken._id,
      );

      dispatch(userActions.register(userResponse.data));
      
    } catch (error) {
      console.error("Registration failed", error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(
          `Registration failed: ${error.response.data.message || error.response.data}`,
        );
      } else {
        toast.error("Registration failed: " + (error as Error).message);
      }
    }
  };

  return (
    <>
      <main className="flex min-h-screen w-[100%] flex-col bg-gray-100 dark:bg-gray-900">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="m-auto mt-[40px] mb-[40px] w-[90%] max-w-4xl rounded-lg border-3 border-blue-800 bg-white p-4 shadow sm:p-6 md:p-8 dark:border-blue-100 dark:bg-gray-800"
        >
          <h1 className="mb-4 text-4xl font-bold text-blue-800 dark:text-white">
            Register
          </h1>
          <h5 className="mb-4 text-2xl font-bold text-gray-700 dark:text-white">
            Please fill in your details to create an account.
          </h5>
          <hr className="mb-6 border-gray-300" />

          <div className="mt-[50px] flex flex-col gap-6">
            <div className="mb-6">
              <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <FloatingLabel
                    {...register("name.first")}
                    label="First Name"
                    type="text"
                    variant="filled"
                    className="mb-4 dark:bg-gray-800"
                    color={errors.name?.first ? "error" : "success"}
                  />
                  {errors.name?.first && (
                    <p className="mt-[-17px] mb-4 text-sm text-red-600 dark:text-red-500">
                      {errors.name.first.message}
                    </p>
                  )}
                </div>

                <div>
                  <FloatingLabel
                    {...register("name.middle")}
                    label="Middle Name (Optional)"
                    type="text"
                    variant="filled"
                    className="mb-4 dark:bg-gray-800"
                    color={errors.name?.middle ? "error" : "success"}
                  />
                  {errors.name?.middle && (
                    <p className="mt-[-17px] mb-4 text-sm text-red-600 dark:text-red-500">
                      {errors.name.middle.message}
                    </p>
                  )}
                </div>

                <div>
                  <FloatingLabel
                    {...register("name.last")}
                    label="Last Name"
                    type="text"
                    variant="filled"
                    className="mb-4 dark:bg-gray-800"
                    color={errors.name?.last ? "error" : "success"}
                  />
                  {errors.name?.last && (
                    <p className="mt-[-17px] mb-4 text-sm text-red-600 dark:text-red-500">
                      {errors.name.last.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <FloatingLabel
                    {...register("email")}
                    label="Email Address"
                    type="email"
                    variant="filled"
                    className="mb-4 dark:bg-gray-800"
                    autoComplete="email"
                    color={errors.email ? "error" : "success"}
                  />
                  {errors.email && (
                    <p className="mt-[-17px] mb-4 text-sm text-red-600 dark:text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <FloatingLabel
                    {...register("phone")}
                    label="Phone Number"
                    type="tel"
                    variant="filled"
                    className="mb-4 dark:bg-gray-800"
                    color={errors.phone ? "error" : "success"}
                  />
                  {errors.phone && (
                    <p className="mt-[-17px] mb-4 text-sm text-red-600 dark:text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
                Security
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <FloatingLabel
                    {...register("password")}
                    label="Password"
                    type="password"
                    autoComplete="new-password"
                    variant="filled"
                    className="mb-4 dark:bg-gray-800"
                    color={errors.password ? "error" : "success"}
                  />
                  {errors.password && (
                    <p className="mt-[-17px] mb-4 text-sm text-red-600 dark:text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <FloatingLabel
                    {...register("copyPassword")}
                    label="Confirm Password"
                    type="password"
                    autoComplete="new-password"
                    variant="filled"
                    className="mb-4 dark:bg-gray-800"
                    color={errors.copyPassword ? "error" : "success"}
                  />
                  {errors.copyPassword && (
                    <p className="mt-[-17px] mb-4 text-sm text-red-600 dark:text-red-500">
                      {errors.copyPassword.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
                Address Information
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <FloatingLabel
                    {...register("address.country")}
                    label="Country"
                    type="text"
                    variant="filled"
                    className="mb-4 dark:bg-gray-800"
                    color={errors.address?.country ? "error" : "success"}
                  />
                  {errors.address?.country && (
                    <p className="mt-[-17px] mb-4 text-sm text-red-600 dark:text-red-500">
                      {errors.address.country.message}
                    </p>
                  )}
                </div>

                <div>
                  <FloatingLabel
                    {...register("address.state")}
                    label="State"
                    type="text"
                    variant="filled"
                    className="mb-4 dark:bg-gray-800"
                    color={errors.address?.state ? "error" : "success"}
                  />
                  {errors.address?.state && (
                    <p className="mt-[-17px] mb-4 text-sm text-red-600 dark:text-red-500">
                      {errors.address.state.message}
                    </p>
                  )}
                </div>

                <div>
                  <FloatingLabel
                    {...register("address.city")}
                    label="City"
                    type="text"
                    variant="filled"
                    className="mb-4 dark:bg-gray-800"
                    color={errors.address?.city ? "error" : "success"}
                  />
                  {errors.address?.city && (
                    <p className="mt-[-17px] mb-4 text-sm text-red-600 dark:text-red-500">
                      {errors.address.city.message}
                    </p>
                  )}
                </div>

                <div>
                  <FloatingLabel
                    {...register("address.street")}
                    label="Street"
                    type="text"
                    variant="filled"
                    className="mb-4 dark:bg-gray-800"
                    color={errors.address?.street ? "error" : "success"}
                  />
                  {errors.address?.street && (
                    <p className="mt-[-17px] mb-4 text-sm text-red-600 dark:text-red-500">
                      {errors.address.street.message}
                    </p>
                  )}
                </div>

                <div>
                  <FloatingLabel
                    {...register("address.houseNumber", {
                      valueAsNumber: true,
                    })}
                    label="House Number"
                    type="number"
                    variant="filled"
                    className="mb-4 dark:bg-gray-800"
                    color={errors.address?.houseNumber ? "error" : "success"}
                  />
                  {errors.address?.houseNumber && (
                    <p className="mt-[-17px] mb-4 text-sm text-red-600 dark:text-red-500">
                      {errors.address.houseNumber.message}
                    </p>
                  )}
                </div>

                <div>
                  <FloatingLabel
                    {...register("address.zip", { valueAsNumber: true })}
                    label="ZIP Code"
                    type="number"
                    variant="filled"
                    className="mb-4 dark:bg-gray-800"
                    color={errors.address?.zip ? "error" : "success"}
                  />
                  {errors.address?.zip && (
                    <p className="mt-[-17px] mb-4 text-sm text-red-600 dark:text-red-500">
                      {errors.address.zip.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
                Profile Image (Optional)
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <FloatingLabel
                    {...register("image.url")}
                    label="Image URL"
                    type="url"
                    variant="filled"
                    className="mb-4 dark:bg-gray-800"
                    color={errors.image?.url ? "error" : "success"}
                  />
                  {errors.image?.url && (
                    <p className="mt-[-17px] mb-4 text-sm text-red-600 dark:text-red-500">
                      {errors.image.url.message}
                    </p>
                  )}
                </div>

                <div>
                  <FloatingLabel
                    {...register("image.alt")}
                    label="Image Alt Text"
                    type="text"
                    variant="filled"
                    className="mb-4 dark:bg-gray-800"
                    color={errors.image?.alt ? "error" : "success"}
                  />
                  {errors.image?.alt && (
                    <p className="mt-[-17px] mb-4 text-sm text-red-600 dark:text-red-500">
                      {errors.image.alt.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2">
                <Checkbox
                  {...register("isBusiness")}
                  id="isBusiness"
                  className="text-blue-600"
                />
                <label
                  htmlFor="isBusiness"
                  className="text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Register as Business Account
                </label>
              </div>
              {errors.isBusiness && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {errors.isBusiness.message}
                </p>
              )}
            </div>

            <div className="flex flex-row items-center justify-center gap-4">
              <Button
                type="submit"
                disabled={!isValid}
                className="w-[300px] bg-gradient-to-br from-green-400 to-blue-600 text-white hover:bg-gradient-to-bl focus:ring-green-200 dark:focus:ring-green-800"
              >
                Register
              </Button>
            </div>
          </div>
        </form>
      </main>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Register;
