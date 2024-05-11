import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import Cart from "./Cart";
import MobileNav from "./MobileNav";
import { Icons } from "./Icons";
import { NavLink, useLocation } from "react-router-dom";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";

import { useEffect, useRef, useState } from "react";
import useSearchResults from "@/hooks/useSearchResults";
import ProductListing from "./ProductListing";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import useClickOutside from "@/hooks/useClickOutside";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const data = useSearchResults(searchValue);
  const user = false;
  const location = useLocation();
  const searchResultRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = () => setSearchValue("");
  useClickOutside(searchResultRef, handleClickOutside);
  useEffect(() => {
    setSearchValue("");
  }, [location]);
  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center relative">
              <MobileNav />

              <div className="ml-4 flex lg:ml-0 mr-4">
                <NavLink to="/">
                  <Icons.logo />
                </NavLink>
              </div>
              <div className="w-1/2 mx-auto relative">
                <Input
                  className="w-full  border-b-[2px] border-t-0 border-x-0 rounded-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                  placeholder="Поиск постера"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <SearchIcon
                  className="absolute right-3 top-1/2 translate-y-[-50%] text-muted-foreground outline-none"
                  size={20}
                />
              </div>
              <div
                ref={searchResultRef}
                className={`w-full bg-white absolute top-full rounded-lg px-4 py-3 shadow-2xl ${
                  data?.length !== 0 ? "flex" : "hidden"
                }`}
              >
                <ScrollArea className="w-full h-[25rem]">
                  <div className="flex gap-6">
                    {data
                      ? data?.map((item, i) => {
                          return (
                            <div className="w-[16rem]">
                              <ProductListing product={item} index={i} />
                            </div>
                          );
                        })
                      : null}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
              <div className="ml-auto flex items-center">
                <div className="flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                 <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                 <NavLink
                      to="/bearbricks"
                      className={buttonVariants({
                        variant: "ghost",
                      })}
                    >
                      Беарбриcки
                    </NavLink>
                 {user ? null : (
                    <NavLink
                      to="/products"
                      className={buttonVariants({
                        variant: "ghost",
                      })}
                    >
                      Постеры
                    </NavLink>
                  )}

                  {user ? null : (
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  )}

                  <NavLink
                    to="/product/custom"
                    className={buttonVariants({
                      variant: "ghost",
                    })}
                  >
                    Кастомний постер
                  </NavLink>

                  {user ? (
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  ) : null}

                  {user ? null : (
                    <div className="flex lg:ml-6">
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                 </div>

                  <div className="ml-4 flow-root lg:ml-6">
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
