import { MouseEvent, useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { cn, formatPrice, truncate } from "@/lib/utils";
import ImageSlider from "./ImageSlider";
import { useNavigate } from "react-router-dom";
import { Frame, Image, Minus, Plus, ShoppingCart } from "lucide-react";
import { posterData } from "@/lib/types";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  decreaseItemQuantity,
  getCurrentQuantityById,
  increaseItemQuantity,
} from "@/slices/CartSlice";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
interface ProductListingProps {
  product: posterData | undefined;
  index: number;
}

const ProductListing = ({ product, index }: ProductListingProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [format, setFormat] = useState("A4");
  const [frame, setFrame] = useState("без рамки");
  const [currentPrice, setCurrentPrice] = useState(0);
  const productQuantityinCart = useSelector(
    getCurrentQuantityById(product?._id as string)
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCartClick = (
    e: MouseEvent<HTMLButtonElement>,
    product: posterData
  ) => {
    e.stopPropagation();
    if (!product.price) return;
    const data = {
      quantity: 1,
      totalPrice: product.price[currentPrice],
      format: format,
      frame: frame,
      images: product.images,
      product: { ...product, price: product.price[currentPrice] },
    };
    dispatch(addItem(data));
    toast.success("плакат добавлен в корзину");
  };
  const handleNavigation = () => {
    navigate(`/product/${product?._id}`);
  };
  const handleItemQuantity = (
    e: MouseEvent<SVGSVGElement>,
    type: "increase" | "decrease"
  ) => {
    e.stopPropagation();
    const item = {
      quantity: 1,
      totalPrice: product?.price[currentPrice],
      format: format,
      frame: frame,
      product: product,
    };
    if (type === "decrease") {
      dispatch(decreaseItemQuantity(item));
    }
    if (type === "increase") {
      dispatch(increaseItemQuantity(item));
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [index]);

  useEffect(() => {
    if (format === "A4" && frame === "без рамки") {
      setCurrentPrice(3);
    } else if (format === "A4" && frame === "с рамкой") {
      setCurrentPrice(2);
    } else if (format === "A3" && frame === "с рамкой") {
      setCurrentPrice(0);
    } else if (format === "A3" && frame === "без рамки") {
      setCurrentPrice(1);
    }
  }, [format, frame]);

  if (!product || !isVisible) return <ProductPlaceholder />;

  if (isVisible && product) {
    return (
      <AnimatePresence>
        <motion.div
          key={product.name}
          layout
          className={cn("h-full w-full cursor-pointer group/main")}
          onClick={handleNavigation}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col w-full">
            <div className="h-[15rem] md:h-[50vh]">
              <ImageSlider urls={product.images as string[]} />
            </div>
            <div className="h-[8rem] flex flex-col justify-around">
              <div className="flex md:flex-row flex-col justify-between gap-2 md:gap-0 md:items-center mt-4">
                <h3 className=" font-medium text-sm md:text-base text-gray-700 flex line-clamp-1">
                  {truncate(product.name as string, 17)}
                </h3>

                <p className="font-medium text-sm md:text-base text-gray-900">
                  {formatPrice(
                    product.price ? product?.price[product.price.length > 3 ? currentPrice : 0] : ""
                  )}
                </p>
              </div>
              {/* <div className="flex gap-2 mt-4">
                {product.categories?.slice(0, 3).map((category) => (
                  <span className="bg-orange-100 text-orange-900 px-1.5 py-1 rounded-xl text-sm">
                    {category}
                  </span>
                ))}
              </div> */}
              {product.price.length > 3 ? (
                  <div className="flex mt-4 items-center justify-between">
                  <div className="flex gap-3 text-sm">
                    <button
                      type="button"
                      disabled={productQuantityinCart > 0}
                      className={`${
                        format === "A4"
                          ? "text-orange-500 border-b-[1.5px] border-orange-500"
                          : ""
                      } ${
                        productQuantityinCart > 0
                          ? "text-gray-500 border-none cursor-not-allowed"
                          : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormat("A4");
                      }}
                    >
                      A4
                    </button>
                    <button
                      type="button"
                      disabled={productQuantityinCart > 0}
                      className={`${
                        format === "A3"
                          ? "text-orange-500 border-b-[1.5px] border-orange-500"
                          : ""
                      } ${
                        productQuantityinCart > 0
                          ? "text-gray-500 border-none cursor-not-allowed"
                          : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormat("A3");
                      }}
                    >
                      A3
                    </button>
                  </div>
                  <div className="flex gap-4 text-sm">
                  <button
                      disabled={productQuantityinCart > 0}
                      onClick={(e) => {
                        e.stopPropagation();
                        setFrame("без рамки");
                      }}
                    >
                      <Image
                        className={`${
                          frame == "без рамки"
                            ? "bg-orange-100 text-orange-900 p-1 rounded-md "
                            : "text-gray-600 bg-gray-200 p-1 rounded-md"
                        } ${
                          productQuantityinCart > 0
                            ? "text-gray-600 bg-gray-200 p-1 rounded-md"
                            : ""
                        }`}
                        size={"23"}
                      />
                    </button>
                    <button
                      type="button"
                      disabled={productQuantityinCart > 0}
                      onClick={(e) => {
                        e.stopPropagation();
                        setFrame("с рамкой");
                      }}
                    >
                      <Frame
                        className={`${
                          frame == "с рамкой"
                            ? "bg-orange-100 text-orange-900 p-1 rounded-md "
                            : "text-gray-600 bg-gray-200 p-1 rounded-md"
                        } ${
                          productQuantityinCart > 0
                            ? "text-gray-600 bg-gray-200 p-1 rounded-md"
                            : ""
                        }`}
                        size={"23"}
                      />
                    </button>
                 
                  </div>
                </div>
              ) : null}
              <div className="flex justify-between items-center mt-3">
                <h3 className=" font-medium text-base text-gray-700 flex">
                  продано: {product.sold}
                </h3>

                {productQuantityinCart > 0 ? (
                  <div className="flex items-center gap-1">
                    <Minus
                      className="cursor-pointer"
                      size={16}
                      onClick={(e) => {
                        handleItemQuantity(e, "decrease");
                      }}
                    />
                    {productQuantityinCart}
                    <Plus
                      className="cursor-pointer"
                      size={16}
                      onClick={(e) => handleItemQuantity(e, "increase")}
                    />
                  </div>
                ) : (
                  <button
                    onClick={(e) => handleCartClick(e, product)}
                    className="font-medium text-base text-gray-900"
                  >
                    <ShoppingCart
                      aria-hidden="true"
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }
};

export const ProductPlaceholder = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="relative bg-zinc-100 h-[28vh] md:h-[50vh] w-full overflow-hidden rounded-xl">
        <Skeleton className=" h-full w-full" />
      </div>
      <div className="h-[8rem] flex flex-col justify-around">
        <Skeleton className=" mt-4 w-2/3 h-4 rounded-lg" />
        <Skeleton className=" mt-4 w-20 h-6 rounded-lg" />
        <Skeleton className=" mt-3 w-12 h-4 rounded-lg" />
      </div>
    </div>
  );
};

export default ProductListing;
