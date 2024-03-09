import { BASE_URL } from "@/config";
import { posterData } from "@/lib/types";
type Poster = {
  _id?: string | undefined;
  name?: string | undefined;
  price1?: string;
  price2?: string;
  price3?: string;
  price4?: string;
  categories?: string | undefined;
  images: string[] | undefined;
  sold?: string | undefined;
  createdAt?: Date | undefined;
};

export const createPoster = async (data: Poster) => {
  //formatting data
  const categories = data?.categories?.split(",");
  const price = [data.price1, data.price2, data.price3, data.price4];
  const sold = Number(data.sold);
  const postData = {
    price,
    categories,
    sold: sold,
    name: data.name,
    images: data.images,
  };

  try {
    const response = await fetch(`${BASE_URL}/posters`, {
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

export const getPosters = async () => {
  try {
    const res = await fetch(`${BASE_URL}/posters`);
    const data: posterData[] = await res.json();

    return data;
  } catch (err) {
    throw new Error("something went wrong");
  }
};

export const getPoster = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/posters/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch poster");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getPostersByCategory = async(category?: string) => {
  try {
    const response = await fetch(`${BASE_URL}/posters/main/${category}`);
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

export const createCustomPoster = async (data: {name: string, images: string[], price: string}) => {
  try {
    const response = await fetch(`${BASE_URL}/custom`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to add new poster");
    }
    return response;
    alert("New custom poster added successfully!");
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};

export const getLastCustomPoster = async () => {
  try {
    const res = await fetch(`${BASE_URL}/custom`);
    const data: posterData[] = await res.json();

    return data[0];
  } catch (err) {
    throw new Error("something went wrong");
  }
};

export const getCustomPosters = async () => {
  try {
    const res = await fetch(`${BASE_URL}/custom`);
    const data: posterData[] = await res.json();

    return data;
  } catch (err) {
    throw new Error("something went wrong");
  }
};
export async function updatePosterSold(id: string, quantity: number) {
  try {
    const response = await fetch(`${BASE_URL}/posters/${id}/sold`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }),
    });
    if (!response.ok) {
      throw new Error("Failed to update poster sold");
    }
    await response.json();
    // Do something with the updated poster data
  } catch (error) {
    console.error("Error updating poster sold:", error);
  }
}
