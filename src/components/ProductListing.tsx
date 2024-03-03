import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { cn, formatPrice, truncate } from "@/lib/utils";
import ImageSlider from "./ImageSlider";
import { NavLink } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { posterData } from "@/lib/types";
interface ProductListingProps {
  product: posterData | undefined;
  index: number;
}

const ProductListing = ({ product, index }: ProductListingProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    return () => clearTimeout(timer);
  }, [index]);
  if (!product || !isVisible) return <ProductPlaceholder />;

  if (isVisible && product) {
    return (
      <NavLink
        className={cn("invisible h-full w-full cursor-pointer group/main", {
          "visible animate-in fade-in-5": isVisible,
        })}
        to={`/product/${product._id}`}
      >
        <div className="flex flex-col w-full">
          <div className="h-[50vh]">
            <ImageSlider urls={product.images as string[]} />
          </div>
          <div className="flex md:flex-row flex-col justify-between gap-2 md:gap-0 md:items-center mt-4">
            <h3 className=" font-medium text-sm md:text-base text-gray-700 flex line-clamp-1">
              {truncate(product.name as string, 20)}
            </h3>

            <p className="font-medium text-sm md:text-base text-gray-900">
              {formatPrice(product.price ? product?.price[0] : "")}
            </p>
          </div>
          <div className="flex gap-2 mt-4">
            {product.categories?.slice(0, 3).map((category) => (
              <span className="bg-orange-100 text-orange-900 px-1.5 py-1 rounded-xl text-sm">
                {category}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-center mt-3">
            <h3 className=" font-medium text-base text-gray-700 flex">
              продано: {product.sold}
            </h3>

            <p className="font-medium text-base text-gray-900">
              <ShoppingCart
                aria-hidden="true"
                className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
              />
            </p>
          </div>
        </div>
      </NavLink>
    );
  }
};

export const ProductPlaceholder = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
        <Skeleton className="h-full w-full" />
      </div>
      <Skeleton className="mt-4 w-2/3 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-16 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-12 h-4 rounded-lg" />
    </div>
  );
};

export default ProductListing;
