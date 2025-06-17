import { Button, FloatingLabel } from "flowbite-react";
import axios from "axios";
import { loginSchema } from "../validations/login.joi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useDispatch } from "react-redux";
import { userActions } from "../store/userSlice";
import { jwtDecode } from "jwt-decode";
import { TfiBolt } from "react-icons/tfi";
import { Link } from "react-router-dom";


const Login = () => {
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const initialFormData = {
    email: "",
    password: "",
  };

 
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    resolver: joiResolver(loginSchema),
  });
  
  const onSubmit = async (form: typeof initialFormData) => {
    try {
      const token = await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login",
        form,
      );
      localStorage.setItem("token", token.data);
      toast.success("Login successful");

      const rersedToken = jwtDecode(token.data) as { _id: string };

      axios.defaults.headers.common["x-auth-token"] = token.data;
      
      const res = await axios.get(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/" +
          rersedToken._id,
      );

      dispatch(userActions.login(res.data));
      localStorage.setItem("user", JSON.stringify(res.data));
      
      
    } catch (error: unknown) {
      console.error("Login failed", error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(
          `Login failed: ${error.response.data.message || error.response.data}`,
        );
      } else {
        toast.error("Login failed - server not responding");
      }
    }
  };
  
  return (
    <>
      <main className="flex h-screen w-[100%] flex-col bg-gray-100 dark:bg-gray-900">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="m-auto mt-[40px] mb-[40px] w-[60%] rounded-lg border-3 border-blue-800 bg-white p-4 shadow sm:p-6 md:p-8 dark:border-blue-100 dark:bg-gray-800"
        >
          <h1 className="mb-4 text-4xl font-bold text-blue-800 dark:text-white">
            Login
          </h1>
          <h5 className="mb-4 text-2xl font-bold text-gray-700 dark:text-white">
            Please enter your credentials to login.
          </h5>
          <hr className="mb-6 border-gray-300" />

          <div className="mt-[50px] flex flex-col flex-wrap gap-4">
            <div className="flex w-[100%] flex-row flex-wrap items-center justify-center gap-[50px]">
              <div className="w-[260px]">
                <FloatingLabel
                  {...register("email")}
                  label="Email address"
                  type="email"
                  variant="filled"
                  className="mb-4 dark:bg-gray-800"
                  autoComplete="email"
                  color={errors.email ? "error" : "success"}
                ></FloatingLabel>
                {errors.email && (
                  <p className="mt-[-17px] mb-4 text-sm text-red-600 dark:text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>{" "}
              <div className="w-[260px]">
                <FloatingLabel
                  {...register("password")}
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  variant="filled"
                  className="mb-4 dark:bg-gray-800"
                  color={errors.password ? "error" : "success"}
                ></FloatingLabel>
                {errors.password && (
                  <p className="mt-[-17px] mb-4 text-sm text-red-600 dark:text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 dark:text-blue-500">
                Sign up
              </Link>
              <TfiBolt />
            </p>
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button
              type="submit"
              disabled={!isValid}
              className="w-[300px] bg-gradient-to-br from-green-400 to-blue-600 text-white hover:bg-gradient-to-bl focus:ring-green-200 dark:focus:ring-green-800"
            >
              {isValid ? "Login" : "Please fill in all fields"}
              
            </Button>
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

export default Login;
