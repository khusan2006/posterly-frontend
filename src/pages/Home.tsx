import { getBearBrickcategories, getPosterCategories } from "@/api/categories";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import SalesSlider from "@/components/SalesSlider";
import { useQuery } from "@tanstack/react-query";
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";
import { useEffect } from "react";
import ProductReelBearBrick from "../components/ProductReelBearBrick";
const perks = [
  {
    name: "Мгновенная доставка",
    Icon: ArrowDownToLine,
    description:
      "Получите ваши ресурсы на свою электронную почту за считанные секунды и сразу же загрузите их.",
  },
  {
    name: "Гарантированное качество",
    Icon: CheckCircle,
    description:
      "Каждый актив на нашей платформе проверяется нашей командой, чтобы обеспечить самые высокие стандарты качества. Не счастлив? Мы предлагаем 30-дневную гарантию возврата денег.",
  },
  {
    name: "Для планеты",
    Icon: Leaf,
    description:
      "Мы обязались направить 1% от продаж на сохранение и восстановление природной среды.",
  },
];

export default function Home() {
  const { data: categories } = useQuery({
    queryKey: ["poster-categories"],
    queryFn: () => getPosterCategories(),
     
  });
  const { data: bearbrickcategories } = useQuery({
    queryKey: ["bearbrick-categories"],
    queryFn: () => getBearBrickcategories(),
  });


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <MaxWidthWrapper>
        <SalesSlider />
      </MaxWidthWrapper>
      <MaxWidthWrapper>
        <ProductReel title="brand new" href="/products" />
        {categories
          ? categories?.map((category) => (
              <ProductReel
                title={category}
                href={`/products?category=${category}`}
              />
            ))
          : Array.from({ length: 5 }, () => <ProductReel title="" href="/" />)}
        {bearbrickcategories
          ? bearbrickcategories?.map((category) => (
              <ProductReelBearBrick
                title={category}
                href={`/products?category=${category}`}
              />
            ))
          : Array.from({ length: 5 }, () => <ProductReel title="" href="/" />)}
        
      </MaxWidthWrapper>
      <section className="border-t border-gray-200 bg-gray-50">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <div
                key={perk.name}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-orange-100 text-orange-900">
                    {<perk.Icon className="w-1/3 h-1/3" />}
                  </div>
                </div>

                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-gray-900">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
