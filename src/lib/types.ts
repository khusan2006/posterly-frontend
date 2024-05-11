import { ReactNode } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

export type FormInputProps = {
  form: UseFormReturn<FieldValues, undefined>;
  label: ReactNode;
  name:
    | "name"
    | "price" 
    | "price1"
    | "price2"
    | "price3"
    | "price4"
    | "categories"
    | "sold"
    | "phone"
    | "password";
};

export type posterData = {
  _id?: string | undefined;
  name: string;
  price: string[];
  categories: string[];
  images: string[] ;
  sold: string;
  createdAt?: Date;
};
export type BearBricks = {
  _id?: string | undefined;
  name: string;
  price: string[];
  categories: string[];
  images: string[] ;
  sold: string;
  createdAt?: Date;
};
export type BearBrickData = {
  name: string;
  price: string;
  categories: string;
  images: string[] ;
  sold: string;
};

export type FormSelectProps<T> = {
  name: "categories" | "priceRange" | "soldOption";
  form: UseFormReturn<FieldValues, undefined>;
  label: ReactNode;
  data: T;
};
export type FormSliderProps = {
  name: "categories" | "priceRange" | "soldOption";
  form: UseFormReturn<FieldValues, undefined>;
  label: ReactNode;
};

type CartProduct = {
  _id?: string | undefined;
  name?: string | undefined;
  price?: string | undefined;
  categories?: string[] | undefined;
  images: string[] | undefined;
  sold?: string | undefined;
  createdAt?: Date | undefined;
};
export type CartData = {
  quantity: number;
  totalPrice: number;
  frame: string;
  format: string;
  product: CartProduct;
  images: string[];
};

export type Order = {
  _id: string,
  customerName: string,
  customerPhone: string,
  posters: {
    product: string | {
      images: string[]
    },
    format: string,
    frame: string,
    quantity: string,
    totalPrice: string,
    _id: string,
  }[],
  orderDate: Date
}