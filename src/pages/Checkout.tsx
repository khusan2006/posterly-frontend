import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PROMO_CODES } from "@/config";
import { cn, formatPrice } from "@/lib/utils";
import {
  decreaseItemQuantity,
  deleteItem,
  getCart,
  getTotalCartPrice,
  getTotalCartQuantity,
  increaseItemQuantity,
} from "@/slices/CartSlice";
import { Loader2, Minus, Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
const Checkout = () => {
  const items = useSelector(getCart);
  const cartTotal = useSelector(getTotalCartPrice);
  const totalItems = useSelector(getTotalCartQuantity);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [discount, setDiscount] = useState<string>("");
  const dispatch = useDispatch();
  const promoCodeRef = useRef<HTMLInputElement>(null);

  const handlePromoCode = () => {
    setDiscount(PROMO_CODES[promoCodeRef.current?.value as string]);
    if (promoCodeRef.current) {
      promoCodeRef.current.disabled = true;
    }
  };

  useEffect(() => {
    setIsMounted(true);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Корзина
        </h1>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <div
            className={cn("lg:col-span-7", {
              "rounded-lg border-2 border-dashed border-zinc-200 p-12":
                isMounted && items.length === 0,
            })}
          >
            <h2 className="sr-only">Items in your shopping cart</h2>

            {isMounted && items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center space-y-1">
                <div
                  aria-hidden="true"
                  className="relative mb-4 h-40 w-40 text-muted-foreground"
                >
                  <img
                    src="/empty-cart.webp"
                    loading="eager"
                    alt="empty shopping cart"
                  />
                </div>
                <h3 className="font-semibold text-2xl">Your cart is empty</h3>
                <p className="text-muted-foreground text-center">
                  Whoops! Nothing to show here yet.
                </p>
              </div>
            ) : null}

            <ul
              className={cn({
                "divide-y divide-gray-200 border-b border-t border-gray-200":
                  isMounted && items.length > 0,
              })}
            >
              <ScrollArea className="h-[60vh]">
                {isMounted &&
                  items.map((product) => {
                    return (
                      <li
                        key={product.product._id}
                        className="flex py-6 sm:py-8 h-[fit-content]"
                      >
                        <div className="flex-shrink-0">
                          <div className="relative h-[100%] w-32 overflow-hidden">
                            {product.product.images ? (
                              <img
                                src={product?.product?.images[0]}
                                alt="product image"
                                className="h-full w-full rounded-md object-cover object-center sm:h-48 sm:w-48"
                              />
                            ) : null}
                          </div>
                        </div>

                        {/* <div className="ml-4 flex flex-1 flex-col  sm:ml-6"> */}
                        <div className="ml-4   sm:ml-6 relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div className="flex flex-col">
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <NavLink
                                  to={`/product/${product.product._id}`}
                                  className="font-medium text-gray-700 hover:text-gray-800"
                                >
                                  {product.product.name}
                                </NavLink>
                              </h3>
                            </div>

                            <div className="flex text-sm mt-2">
                              <p className="text-muted-foreground flex gap-1">
                                <span>Category:</span>
                                <div className="flex gap-2">
                                  {product.product.categories
                                    ? product.product.categories.map(
                                        (category) => <span>{category}</span>
                                      )
                                    : null}
                                </div>
                              </p>
                            </div>

                            <p
                              className={`mt-3 text-sm font-medium text-gray-900`}
                            >
                              {formatPrice(
                                product.product.price
                                  ? product.product.price
                                  : ""
                              )}
                            </p>
                            <div className="flex items-center gap-1 mt-4">
                              <Minus
                                className="cursor-pointer"
                                size={16}
                                onClick={() =>
                                  dispatch(decreaseItemQuantity(product))
                                }
                              />
                              {product.quantity}
                              <Plus
                                className="cursor-pointer"
                                size={16}
                                onClick={() =>
                                  dispatch(increaseItemQuantity(product))
                                }
                              />
                            </div>
                          </div>

                          <div className="mt-4 sm:mt-0 sm:pr-9 w-20">
                            <div className="absolute right-0 top-0">
                              <Button
                                aria-label="remove product"
                                onClick={() => dispatch(deleteItem(product))}
                                variant="ghost"
                              >
                                <X className="h-5 w-5" aria-hidden="true" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        {/* </div> */}
                      </li>
                    );
                  })}
              </ScrollArea>
            </ul>
          </div>

          <section className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900">Итог заказа</h2>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Всего предметов</p>
                <p className="text-sm font-medium text-gray-900">
                  {isMounted ? (
                    <span> {totalItems}</span>
                  ) : (
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  )}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-600">Promo code</p>
                <div className="flex items-center">
                  <Input
                    ref={promoCodeRef}
                    className="bg-transparent w-1/2 p-0 border-0 border-b-2 rounded-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                    placeholder="enter promocode "
                  />
                  <Button
                    variant={"ghost"}
                    onClick={handlePromoCode}
                    className="pb-0 items-end"
                  >
                    Check
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="text-base font-medium text-gray-900">
                  Весь заказ
                </div>
                <div>
                  <div
                    className={`${
                      discount !== "" && discount ? "line-through" : ""
                    } text-base font-medium text-gray-900`}
                  >
                    {isMounted ? (
                      formatPrice(cartTotal)
                    ) : (
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    )}
                  </div>
                  {discount !== "" && discount ? (
                    <div className={`text-sm font-medium text-green-500`}>
                      {formatPrice(cartTotal - cartTotal * Number(discount))}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <NavLink to={"/order"}>
                <Button
                  disabled={items.length === 0}
                  className="w-full"
                  size="lg"
                >
                  Проверить
                </Button>
              </NavLink>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
