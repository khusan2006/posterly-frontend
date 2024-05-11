import { BASE_URL } from "@/config";
import { shuffleArray } from "@/lib/utils";

export const getPosterCategories = async () => {
  try {
    const res = await fetch(`${BASE_URL}/categories/poster`);
    const data = await res.json();
    const shuffledArray = shuffleArray(data);
    return shuffledArray.slice(0, 5);
  } catch (err) {
    throw new Error("something went wrong");
  }
};
export const getBearBrickcategories = async () => {
  try {
    const res = await fetch(`${BASE_URL}/categories/bearbrick`);
    const data = await res.json();
    const shuffledArray = shuffleArray(data);
    return shuffledArray.slice(0, 5);
  } catch (err) {
    throw new Error("something went wrong");
  }
};

export const getAllCategories = async () => {
  try {
    const res = await fetch(`${BASE_URL}/categories`);
    const data: string[] = await res.json();
    return data;
  } catch (err) {
    throw new Error("something went wrong");
  }
};
