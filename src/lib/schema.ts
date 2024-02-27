import { z } from "zod";

export const PosterFormSchema = z.object({
  name: z.string({
    required_error: "please enter name",
  }),
  price1: z.string({
    required_error: "please enter price",
  }),
  price2: z.string({
    required_error: "please enter price",
  }),
  price3: z.string({
    required_error: "please enter price",
  }),
  price4: z.string({
    required_error: "please enter price",
  }),
  sold: z.string({
    required_error: "please select sold",
  }),
  categories: z.string({
    required_error: "please enter categoires",
  }),
});

export const FilterSchema = z.object({
  categories: z.string().optional(), // Array of selected categories
  priceRange: z.array(z.number()).optional(),
  soldOption: z.string().optional(), // Selected sorting option
});

export const OrderFormSchema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty" }),
  phone: z.string()
});
