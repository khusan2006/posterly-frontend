import { createOrder } from "@/api/orders";
import { updatePosterSold } from "@/api/posters";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/form/FormInput";
import FormPhoneInput from "@/components/form/FormPhoneInput";
import { OrderFormSchema } from "@/lib/schema";
import { clearCart, getCart } from "@/slices/CartSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(OrderFormSchema),
  });
  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ["order"],
    mutationFn: createOrder,
  });
  function showNotification() {
    if (Notification.permission === "granted") {
      new Notification("new order is recieved");
    }
  }

  const posters = useSelector(getCart);
  const onSubmit = async (data: FieldValues) => {
    const orderData = {
      posters: posters,
      customerName: data.name,
      customerPhone: data.phone,
    };
    posters.forEach(poster => {
         updatePosterSold(poster.product._id as string, Number(poster.quantity))
    })
    mutate(orderData);
    form.reset();
    dispatch(clearCart());
    showNotification();
  };
  if (isSuccess) navigate("/thank-you");
  return (
    <section>
      <MaxWidthWrapper className="flex md:flex-row flex-col my-20">
        <div className="flex-1 flex flex-col justify-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-8 "
            >
              <FormInput
                form={form}
                label={"Пожалуйста, Введите Ваше Имя"}
                name="name"
              />

              <FormPhoneInput
                form={form}
                label={"Пожалуйста, введите свой номер телефона"}
                name="phone"
              />

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "your order is being processed" : "заказ"}
              </Button>
            </form>
          </Form>
        </div>
        <div className="flex-1 hidden md:block">
          <img src="/order-page.png" alt="cart with full of items" />
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Order;
