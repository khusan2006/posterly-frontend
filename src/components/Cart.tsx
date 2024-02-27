import { ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { formatPrice } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getTotalCartQuantity,
  getCart,
  getTotalCartPrice,
} from "@/slices/CartSlice";
import CartItem from "./CartItem";
import { CartData } from "@/lib/types";

const Cart = () => {
  const itemCount = useSelector(getTotalCartQuantity);
  const cartTotal = useSelector(getTotalCartPrice);
  const items = useSelector(getCart);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Sheet>
      <SheetTrigger className="group -m-2 flex items-center p-2">
        <ShoppingCart
          aria-hidden="true"
          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
        />
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          {isMounted ? itemCount : 0}
        </span>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Корзина ({itemCount})</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <div className="flex w-full flex-col pr-6">
              <ScrollArea className="h-[60vh]">
                {items
                  ? items.map((item: CartData, i: number) => {
                      return (
                        <CartItem
                          item={item}
                          key={`${item?.product._id}${i}`}
                        />
                      );
                    })
                  : null}
              </ScrollArea>
            </div>
            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 text-sm">
                <div className="flex">
                  <span className="flex-1">Общий</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
              </div>

              <SheetFooter>
                <SheetTrigger asChild>
                  <NavLink
                    to="/checkout"
                    className={buttonVariants({
                      className: "w-full",
                    })}
                  >
                    Продолжить оформление заказа
                  </NavLink>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div
              aria-hidden="true"
              className="relative mb-4 h-60 w-60 text-muted-foreground"
            >
              <img src="/empty-cart.jpg" alt="empty shopping cart hippo" />
            </div>
            <div className="text-xl font-semibold ">Ваше корзина пуста</div>
            <SheetTrigger asChild>
              <NavLink
                to="/products"
                className={buttonVariants({
                  variant: "link",
                  size: "sm",
                  className: "text-sm text-muted-foreground",
                })}
              >
                Добавляйте товары в свою корзину
              </NavLink>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
