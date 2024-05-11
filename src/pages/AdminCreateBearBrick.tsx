import {  FieldValues, useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import FormInput from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { BearBrickFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import UploadImage from "@/components/UploadImage";
import { useState } from "react";
import { createBearBrick } from "@/api/bearbrick";
import { BearBrickData } from "@/lib/types";

const AdminCreateBearBrick = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const form = useForm({
    resolver: zodResolver(BearBrickFormSchema),
  });


  const onSubmit = async (data: FieldValues) => {
    const bearbrick: BearBrickData  = { ...data as {name: string, price: string, sold: string, categories: string}, images: imageUrls };
    createBearBrick(bearbrick);
  };
  return (
    <section className="px-6">
      <h2 className="font-bold text-3xl mt-10">Create new Bearbrick</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid sm:grid-cols-2 gap-8 pt-4"
        >
          <FormInput form={form} label={"name"} name="name" />
          <FormInput
            form={form}
            label={"price"}
            name="price"
          />
        

          <FormInput form={form} label={"sold"} name="sold" />
          <FormInput form={form} label={"categories"} name="categories" />
          <UploadImage setImageUrls={setImageUrls} />
          <Button className="self-end">Create BearBricks</Button>
        </form>
      </Form>
    </section>
  );
};

export default AdminCreateBearBrick;
