import { getPosters } from "@/api/posters";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { Button } from "@/components/ui/button";
import { posterData } from "@/lib/types";
import { useDispatch } from "react-redux";
import { addItem } from "@/slices/CartSlice";
import { formatPrice } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Shield } from "lucide-react";
import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Poster = () => {
  const { productId } = useParams();
  const { data } = useQuery({
    queryKey: ["posters"],
    queryFn: () => getPosters(),
  });
  const product = data?.filter(item => item._id === productId)[0]
  const [format, setFormat] = useState("A3");
  const [frame, setFrame] = useState("с рамкой");
  const [currentPrice, setCurrentPrice] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const BREADCRUMBS = [
    { id: 1, name: "Home", href: "/" },
    { id: 2, name: "Product", href: `/product/${productId}` },
  ];
  const dispatch = useDispatch();
  const handleClick = (product: posterData) => {
    if (!product.price) return;
    const editedProduct = { ...product, price: product.price[currentPrice] };
    const data = {
      quantity: 1,
      totalPrice: editedProduct.price,
      format: format,
      frame: frame,
      product: editedProduct,
    };
    dispatch(addItem(data));
    toast.success("плакат добавлен в корзину");
  };

  const [isVisible, setIsVisible] = useState<boolean>(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    window.scrollTo(0, 0);
    setFormat("A3");
    setFrame("с рамкой");
    return () => clearTimeout(timer);
  }, [productId]);
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
  if (!product || !isVisible) return <PosterPlaceholder />;
  return (
    <MaxWidthWrapper className="bg-white">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          {/* Product Details */}
          <div className="lg:max-w-lg ">
            <ol className="flex items-center space-x-2">
              {BREADCRUMBS.map((breadcrumb, i) => (
                <li key={breadcrumb.href}>
                  <div className="flex items-center text-sm">
                    <NavLink
                      to={breadcrumb.href}
                      className="font-medium text-sm text-muted-foreground hover:text-gray-900"
                    >
                      {breadcrumb.name}
                    </NavLink>
                    {i !== BREADCRUMBS.length - 1 ? (
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                      >
                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                      </svg>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-4">
              <h1 className="text-3xl font-bold tracking-wider text-gray-900 sm:text-[2rem]">
                {product.name}
              </h1>
            </div>

            <section className="mt-4">
              <div className="flex items-center">
                <p className="font-medium text-gray-900">
                  {formatPrice(product.price[currentPrice])}
                </p>

                <div className="ml-4 border-l flex gap-2 text-muted-foreground border-gray-300 pl-4">
                  {product.categories.map((category: string) => (
                    <span>{category}</span>
                  ))}
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <h3 className="text-base font-normal text-muted-foreground">
                  выбрать формат
                </h3>
                <div className="flex items-center gap-3">
                  <button
                    className={`px-4 py-2 border-2 border-orange-500 text-orange-500 rounded-lg font-medium cursor-pointer ${
                      format == "A3" ? "bg-orange-500 text-white" : ""
                    }`}
                    onClick={() => setFormat("A3")}
                  >
                    A3
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-2 border-2 font-medium border-orange-500  cursor-pointer w-[fit-content] rounded-lg ${
                      format == "A4" ? "bg-orange-500 text-white" : ""
                    }`}
                    onClick={() => setFormat("A4")}
                  >
                    A4
                  </button>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <h3 className="text-base font-normal text-muted-foreground">
                  выбрать рамку
                </h3>
                <div className="flex items-center gap-3">
                  <div
                    className={`px-4 py-2 border-2 border-orange-500 text-orange-500 rounded-lg font-medium cursor-pointer ${
                      frame == "с рамкой" ? "bg-orange-500 text-white" : ""
                    }`}
                    onClick={() => setFrame("с рамкой")}
                  >
                    с рамкой
                  </div>
                  <div
                    className={`px-4 py-2 border-2 border-orange-500 text-orange-500 rounded-lg font-medium cursor-pointer ${
                      frame == "без рамки" ? "bg-orange-500 text-white" : ""
                    }`}
                    onClick={() => setFrame("без рамки")}
                  >
                    без рамки
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Product images */}
          <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 flex gap-2">
            <div className="w-[85%]">
              <img
                className="h-[80%] w-full aspect-[2/3]"
                src={product.images[activeImage]}
                alt={product.name}
              />
            </div>
            <div className=" flex-1 flex flex-col gap-2">
              {product.images.map((image: string, i: number) => (
                <img
                  src={image}
                  alt="image"
                  className={`cursor-pointer h-28  ${
                    activeImage === i ? "border-2 border-orange-500" : ""
                  }`}
                  onClick={() => setActiveImage(i)}
                />
              ))}
            </div>
          </div>

          {/* add to cart part */}
          <div className="lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
            <div>
              <div>
                <Button className="w-full" onClick={() => handleClick(product)}>
                  добавить в корзину
                </Button>
              </div>
              <div className="mt-6 text-center">
                <div className="group inline-flex text-sm text-medium">
                  <Shield
                    aria-hidden="true"
                    className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400"
                  />
                  <span className="text-muted-foreground hover:text-gray-700">
                    30-дневная гарантия возврата
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductReel
        href="/products"
        title={product.categories[0]}
        subtitle={`Просматривайте аналогичные высококачественные товары, такие как '${product.name}'`}
      />
    </MaxWidthWrapper>
  );
};

export default Poster;

export const PosterPlaceholder = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="relative bg-gray-200 aspect-square w-full overflow-hidden rounded-xl animate-pulse">
        {/* Image placeholder */}
        <div className="h-full w-full"></div>
      </div>
      {/* Product name placeholder */}
      <div className="mt-4 bg-gray-200 h-4 rounded-lg animate-pulse"></div>
      {/* Price placeholder */}
      <div className="mt-2 bg-gray-200 h-4 rounded-lg animate-pulse"></div>
      {/* Categories placeholder */}
      <div className="mt-2 bg-gray-200 h-4 rounded-lg animate-pulse"></div>
      {/* Description placeholder */}
      <div className="mt-4 bg-gray-200 h-20 rounded-lg animate-pulse"></div>
      {/* Format selector placeholder */}
      <div className="mt-4 flex items-center gap-3">
        <div className="px-4 py-2 bg-gray-200 h-9 rounded-lg animate-pulse"></div>
        <div className="px-4 py-2 bg-gray-200 h-9 rounded-lg animate-pulse"></div>
      </div>
      {/* Frame selector placeholder */}
      <div className="mt-4 flex items-center gap-3">
        <div className="px-4 py-2 bg-gray-200 h-9 rounded-lg animate-pulse"></div>
        <div className="px-4 py-2 bg-gray-200 h-9 rounded-lg animate-pulse"></div>
      </div>
      {/* Add to cart button placeholder */}
      <div className="mt-10">
        <div className="px-4 py-2 bg-gray-200 w-full rounded-lg animate-pulse"></div>
      </div>
      {/* Return guarantee placeholder */}
      <div className="mt-6 text-center">
        <div className="group inline-flex text-sm text-medium">
          <div className="mr-2 h-5 w-5 flex-shrink-0 bg-gray-200 rounded-full"></div>
          <div className="bg-gray-200 h-4 w-24 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
