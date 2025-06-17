import {
  DarkThemeToggle,
  Navbar,
  NavbarCollapse,
  NavbarToggle,
} from "flowbite-react";
import { IoSearchSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../store/userSlice";
import { setSearchWord } from "../store/serachSlice";
import useAuth from "../hooks/useAuth";

function Heder() {
  const dispatch = useDispatch();
  const user = useAuth();

  const [pathname, setPathname] = useState<string>("/");
  const location = useLocation();

  useEffect(() => {
    setPathname(location.pathname);
  }, [location.pathname]);

  return (
    <Navbar
      fluid
      rounded
      className="sticky top-0 z-50 rounded-none shadow-md dark:shadow-gray-100"
    >
      <Link
        to="/home"
        className="self-center text-xl font-semibold whitespace-nowrap dark:text-white dark:shadow-gray-100"
        id="logo"
      >
        Bcard
      </Link>

      <NavbarToggle />

      <NavbarCollapse>
        <div className="relative mb-1">
          <input
            onChange={(e) => dispatch(setSearchWord(e.target.value))}
            type="search"
            className="h-8 w-64 rounded-md border border-gray-300 pr-10 pl-2 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white"
            placeholder="Search"
            aria-label="Search"
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <IoSearchSharp className="text-gray-400" />
          </div>
        </div>
        <DarkThemeToggle />
        <Link
          to="/home"
          className={`my-2 dark:text-white ${pathname === "/home" ? "text-blue-500" : "text-zinc-950"} `}
        >
          {" "}
          Home
        </Link>
        <Link
          to="/about"
          className={`my-2 dark:text-white ${pathname === "/about" ? "text-blue-500" : "text-zinc-950"} `}
        >
          {" "}
          About
        </Link>
        {user && user.isBusiness && (
          <Link
            to="/createCard"
            className={`my-2 dark:text-white ${pathname === "/createCard" ? "text-blue-500" : "text-zinc-950"} `}
          >
            {" "}
            Create Card
          </Link>
        )}
        {user && user.isBusiness && (
          <Link
            to="/myCards"
            className={`my-2 dark:text-white ${pathname === "/createBusinessCard" ? "text-blue-500" : "text-zinc-950"} `}
          >
            {" "}
            My Cards
          </Link>
        )}
        {user !== null && (
          <Link
            to=""
            onClick={() => {
              dispatch(userActions.logout());
            }}
            className="my-2 dark:text-white"
          >
            Sign Out
          </Link>
        )}

        {user !== null && (
          <Link
            to="/profile"
            className={`my-2 dark:text-white ${pathname === "/profile" ? "text-blue-500" : "text-zinc-950"} `}
          >
            {" "}
            Profile
          </Link>
        )}
        {user && (
          <Link
            to="/favourites"
            className={`my-2 dark:text-white ${pathname === "/favourites" ? "text-blue-500" : "text-zinc-950"} `}
          >
            {" "}
            Favourites
          </Link>
        )}
        {user === null && (
          <Link
            to="/login"
            className={`my-2 dark:text-white ${pathname === "/login" ? "text-blue-500" : "text-zinc-950"} `}
          >
            {" "}
            LOGIN
          </Link>
        )}

        {user === null && (
          <Link
            to="/signup"
            className={`my-2 dark:text-white ${pathname === "/signup" ? "text-blue-500" : "text-zinc-950"} `}
          >
            {" "}
            SIGNUP
          </Link>
        )}
      </NavbarCollapse>
    </Navbar>
  );
}

export default Heder;
