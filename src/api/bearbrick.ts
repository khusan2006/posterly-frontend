import { BASE_URL } from "@/config";
import { BearBrickData } from "@/lib/types";


export const getBearBricks = async () => {
  try {
    const res = await fetch(`${BASE_URL}/bearbricks`);
    const data = await res.json();

    return data;
  } catch (err) {
    throw new Error("something went wrong");
  }
};
export const createBearBrick = async (data: BearBrickData) => {
    //formatting data
    const categories = data?.categories?.split(",");
    const sold = Number(data.sold);
    const postData = {
      price: [data.price],
      categories,
      sold: sold,
      name: data.name,
      images: data.images,
    };
  
    try {
      const response = await fetch(`${BASE_URL}/bearbricks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add new poster");
      }
  
      alert("New poster added successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  
  export const getBearBricksByCategory = async(category?: string) => {
    try {
      const response = await fetch(`${BASE_URL}/bearbricks/main/${category}`);
      if (!response.ok) {
        throw new Error("Failed to fetch poster");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  