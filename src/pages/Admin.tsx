import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "@/form/FormInput";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const Admin = () => {
  const [isAuthinticated, setIsAuthinticated] = useState(false);
  const form = useForm();
  const navigate = useNavigate();
  const onSubmit = (data: FieldValues) => {
    const password = "Khusan24022024";
    const name = "khusan";
    if (name === data.name && password === data.password) {
      setIsAuthinticated(true);
      navigate("posters");
    }
  };
  return (
    <section className="flex w-full h-full flex-col items-center justify-center p-20">
      {isAuthinticated ? (
        <>
          <Outlet />
          <NavLink to={'orders'}>
            <h3 className="text-xl font-semibold">navigate to orders</h3>
          </NavLink>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-semibold">Login to Admin Panel</h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4 mt-6"
            >
              <FormInput form={form} label={"name"} name="name" />
              <FormInput form={form} label={"password"} name="password" />

              <Button className="w-full">Login</Button>
            </form>
          </Form>
        </>
      )}
    </section>
  );
};

export default Admin;
