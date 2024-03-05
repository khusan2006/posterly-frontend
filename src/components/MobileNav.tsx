import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom";

const MobileNav = () => {
  return (
    <div className="block md:hidden">
      <Sheet>
        <SheetTrigger className="group -m-2 flex items-center p-2">
          <Menu />
        </SheetTrigger>
        <SheetContent
          side={"left"}
          className="flex md:w-full w-3/5 flex-col pr-0 sm:max-w-lg"
        >
          <div className="space-y-6 border-t border-gray-200 px-4 py-6">
            <div className="flow-root">
              <SheetTrigger asChild>
                <NavLink
                  to="/products"
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  Перейти в каталог
                </NavLink>
              </SheetTrigger>
            </div>
            <div className="flow-root">
              <SheetTrigger asChild>
                <NavLink
                  to="/product/custom"
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  Кастомний постер
                </NavLink>
              </SheetTrigger>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
