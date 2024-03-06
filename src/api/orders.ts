import { BASE_URL } from "@/config";
import { CartData } from "@/lib/types";

type Order = {
    posters: CartData[],
    customerName: string,
    customerPhone: string,

}

export const createOrder = async (data: Order) => {
  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to add new poster");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};


export const getOrders = async () => {
    try {
      const res = await fetch(`${BASE_URL}/orders`);
      const data = await res.json();
  
      return data;
    } catch (err) {
      throw new Error("something went wrong");
    }
  };