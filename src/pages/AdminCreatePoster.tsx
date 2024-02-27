import { FieldValues, useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import FormInput from "@/form/FormInput";
import { Button } from "@/components/ui/button";
import { PosterFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import UploadImage from "@/components/UploadImage";
import { useState } from "react";
import { createPoster } from "@/api/posters";

const AdminCreatePoster = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const form = useForm({
    resolver: zodResolver(PosterFormSchema),
  });

  const onSubmit = async (data: FieldValues) => {
    const posterData = { ...data, images: imageUrls };
    createPoster(posterData);
  };
  return (
    <section className="px-6">
      <h2 className="font-bold text-3xl mt-10">Create new Poster</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid sm:grid-cols-2 gap-8 pt-4"
        >
          <FormInput form={form} label={"name"} name="name" />
          <FormInput
            form={form}
            label={"price for A3 with frame"}
            name="price1"
          />
          <FormInput
            form={form}
            label={"price for A3 without frame"}
            name="price2"
          />
          <FormInput
            form={form}
            label={"price for A4 with frame"}
            name="price3"
          />
          <FormInput
            form={form}
            label={"price for A4 without frame"}
            name="price4"
          />
          <FormInput form={form} label={"sold"} name="sold" />
          <FormInput form={form} label={"categories"} name="categories" />
          <UploadImage setImageUrls={setImageUrls} />
          <Button className="self-end">Create Poster</Button>
        </form>
      </Form>
    </section>
  );
};

export default AdminCreatePoster;
