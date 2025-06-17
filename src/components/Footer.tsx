import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {
  Footer,
  FooterCopyright,
  FooterDivider,
  FooterLinkGroup,
} from "flowbite-react";

export function Foot() {
  const user = useAuth();
  if (user?.isBusiness) {
    return (
      <Footer container className="rounded-none">
        <div className="w-full text-center">
          <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
            <h1 className=" flex items-center justify-center text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl lg:text-3xl dark:text-white">
              Bcard
            </h1>

            <FooterLinkGroup className=" gap-5.5">
              <Link to="/home">
                Home{" "}
              </Link>
              <Link to="/profile">
                Profile{" "}
              </Link>
              <Link to="/about">
                About{" "}
              </Link>
              <Link to="/favourites">
              Favorites{" "}
              </Link>
              <Link to="/myCards">
                my cards{" "}
              </Link>
              <Link to="/createCard">
                create card{" "}
              </Link>
            </FooterLinkGroup>
          </div>
          <FooterDivider />
          <Link to="/home"><FooterCopyright by="Bcard™" year={2025} /></Link>
        </div>
      </Footer>
    );
  }

  if (user) {
    return (
      <Footer container className="rounded-none">
        <div className="w-full text-center">
          <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
            <h1 className=" font-bold tracking-tight text-gray-900 sm:text-2xl lg:text-3xl dark:text-white">Bcard</h1>
            <FooterLinkGroup className=" gap-5.5">
              <Link to="/home">
                Home{" "}
              </Link>
              <Link to="/about">
                <h1>About</h1>{" "}
              </Link>
              <Link to="/favourites">
                Favorites{" "}
              </Link>
              <Link to="/profile">
                Profile{" "}
              </Link>
            </FooterLinkGroup>
          </div>
          <FooterDivider />
          <Link to="/home"><FooterCopyright  by="Bcard™" year={2025} /></Link>
        </div>
      </Footer>
    );
  } else {
    return (
      <Footer container className="rounded-none">
        <div className="w-full text-center">
          <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
            <h1 className="font-bold tracking-tight text-gray-900 sm:text-2xl lg:text-3xl dark:text-white">
              Bcard
            </h1>

            <FooterLinkGroup className=" gap-5.5">
              <Link to="/about">
                About{" "}
              </Link>
              <Link to="/login">
              Login{" "}
              </Link>
              <Link to="/signup">
                Register{" "}
              </Link>
              <Link to="/home">
                Home{" "}
              </Link>
            </FooterLinkGroup>
          </div>
          <FooterDivider />
          <Link to="/home"><FooterCopyright  by="Bcard™" year={2025} /></Link>
        </div>
      </Footer>
    );
  }
}
