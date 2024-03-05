import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";
import { FilterSchema } from "@/lib/schema";
import FormSelect from "../form/FormSelect";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/api/categories";
import FormSlider from "../form/FormSlider";
import { useNavigate } from "react-router-dom";

const data = ["0-100", "100-400", "above 400"];

const Filters = () => {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(FilterSchema),
  });

  const { data: categories } = useQuery({
    queryKey: ["allCategories"],
    queryFn: () => getAllCategories(),
  });
  const onSubmit = (data: FieldValues) => {
    let url = "/products?";
    if (data.categories) {
      url = url + `category=${data.categories}`;
    }
    if (data.categories && data.priceRange) {
      url = url + `&priceRange=${data.priceRange}`;
    } else if (data.priceRange) {
      url = url + `priceRange=${data.priceRange}`;
    }
    if ((data.categories || data.priceRange) && data.soldOption) {
      url = url + `&soldOption=${data.soldOption}`;
    } else if (data.soldOption) {
      url = url + `soldOption=${data.soldOption}`;
    }
    navigate(url);
    form.reset();
  };

  return (
    <Sheet>
      <SheetTrigger className="group -m-2 flex items-center p-2 text-blue-500 text-base font-medium">
        фильтровать плакаты
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="flex w-full flex-col pr-0 sm:max-w-lg"
      >
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>

        <>
          <div className="flex w-full flex-col pr-6"></div>
          <div className="space-y-6 pr-6">
            <Separator />
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-8"
              >
                <FormSelect
                  name="categories"
                  form={form}
                  label="select categories"
                  data={categories as string[]}
                />

                <FormSlider
                  name="priceRange"
                  label="please select the range"
                  form={form}
                />
                <FormSelect
                  name="soldOption"
                  form={form}
                  label="select posters based how many time they are sold"
                  data={data}
                />

                <SheetFooter>
                  <SheetTrigger asChild>
                    <Button type="submit" className="w-full mt-4">
                      Filter Posters
                    </Button>
                  </SheetTrigger>
                </SheetFooter>
              </form>
            </Form>
          </div>
        </>
      </SheetContent>
    </Sheet>
  );
};

export default Filters;
