import { Icons } from "@/components/Icons";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

const ThankYouPage = () => {
  return (
    <main>
      <MaxWidthWrapper className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Icons.logo />
        <h3 className="font-semibold text-xl">Спасибо за ваш заказ!</h3>
        <h3 className="font-medium text-base md:text-start text-center">Наши операторы свяжутся с вами в ближайшее время</h3>
        <NavLink to={'/'}>
          <Button>Вернуться к просмотру</Button>
        </NavLink>
      </MaxWidthWrapper>
    </main>
  );
};

export default ThankYouPage;
