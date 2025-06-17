import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const navHome = () => {
    navigate("/home");
  };
  const navAbout = () => {
    navigate("/about");
  };
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-6xl text-red-800">404: Page Not Found</h1>
      <hr />
      <h1 className="text-8xl text-gray-900 dark:text-gray-400">?</h1>
      <p className="text-2xl text-gray-600 dark:text-gray-400" >
        Sorry, the page you are looking for does not exist.
      </p>
      <Button onClick={navHome}>Home</Button>
      <p
        className="text-2xl text-indigo-600 dark:text-indigo-400"
        onClick={navAbout}
        style={{ cursor: "pointer" }}
      >
        About
      </p>
    </div>
  );
};

export default ErrorPage;
