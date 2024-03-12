import { getPostersByCategory } from "@/api/posters";
import ProductListing, { ProductPlaceholder } from "./ProductListing";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";
import { useInView } from "react-intersection-observer";
import { posterData } from "@/lib/types";
interface ProductReelProps {
  title: string;
  subtitle?: string;
  href?: string;
}

const ProductReel = (props: ProductReelProps) => {
  const { title, subtitle, href } = props;
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "250px",
  });
  const { data } = useQuery({
    queryKey: ["posterByCategory", title],
    queryFn: () => getPostersByCategory(title === "brand new" ? "new" : title),
    enabled: inView,
  });

  const manipulatedData: posterData[] = data;

  if (!manipulatedData)
    return (
      <div ref={ref}>
        <ProductReelPlaceholder />
      </div>
    );
  return (
    <section className="py-12">
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          {title ? (
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {title}
            </h1>
          ) : null}
          {subtitle ? (
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>

        {href ? (
          <NavLink
            to={href}
            className="hidden text-sm font-medium text-orange-600 hover:text-orange-500 md:block"
          >
            Коллекция постеров
            <span aria-hidden="true">&rarr;</span>
          </NavLink>
        ) : null}
      </div>

      <div className="relative">
        <div className="mt-6 flex items-center w-full">
          <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
            {manipulatedData?.slice(0, 4).map((product, i) => (
              <ProductListing
                key={`product-${i}`}
                product={product}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductReel;

const ProductReelPlaceholder = () => {
  return (
    <div className="flex flex-col w-full py-12">
      <div className="flex justify-between items-center">
        <div className="px-4 md:px-0 md:w-[10vw] w-[8rem]">
          <Skeleton className="w-xl px-4 lg:w-3xl lg:px-0 h-10" />
        </div>
        <div className=" w-[10vw]">
          <Skeleton className="w-xl px-4 lg:w-3xl lg:px-0 h-5" />
        </div>
      </div>
      <div className=" mt-6 w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
        <ProductPlaceholder />
        <ProductPlaceholder />
        <ProductPlaceholder />
        <ProductPlaceholder />
      </div>
    </div>
  );
};
