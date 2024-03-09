import MaxWidthWrapper from "./MaxWidthWrapper";
import { Icons } from "./Icons";
import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="bg-white flex-grow-0 ">
      <MaxWidthWrapper>
        <div className="border-t border-gray-200">
          <div className="pb-8 pt-16">
            <div className="flex justify-center">
              <Icons.logo />
            </div>
          </div>

          <div>
            <div className="relative flex items-center px-6 py-6 sm:py-8 lg:mt-0">
              <div className="absolute inset-0 overflow-hidden rounded-lg">
                <div
                  aria-hidden="true"
                  className="absolute bg-zinc-50 inset-0 bg-gradient-to-br bg-opacity-90"
                />
              </div>

              <div className="text-center relative mx-auto flex flex-col items-center gap-4 max-w-sm">
                <h3 className="font-semibold text-gray-900">
                  Хотите создать свой собственный плакат
                </h3>
                <div className="flex">
                  <NavLink to={"product/custom"}>
                    <Button>кликните сюда</Button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-10 md:flex md:items-center md:justify-between">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>

          <div className="mt-4 flex items-center justify-center md:mt-0">
            <div className="flex space-x-8">
              <NavLink
                to="/terms"
                className="text-sm text-muted-foreground hover:text-gray-600"
              >
                Terms
              </NavLink>
              <NavLink
                to="/privacy-policy"
                className="text-sm text-muted-foreground hover:text-gray-600"
              >
                Privacy Policy
              </NavLink>
              <NavLink
                to="/cookie-policy"
                className="text-sm text-muted-foreground hover:text-gray-600"
              >
                Cookie Policy
              </NavLink>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
