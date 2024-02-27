import { posterData } from "@/lib/types";
import { useMemo } from "react";

export function useFilteredData(
  data: posterData[] | undefined,
  options: {
    [k: string]: string | (string | null)[] | null;
  }
) {
  const filteredData = useMemo(() => {
    if (!data) return;
    let filteredData = data;
    const { category, soldOption, priceRange } = options;
    if (category) {
      filteredData = filteredData?.filter((item) =>
        item.categories?.includes(category as string)
      );
    }
    if (soldOption) {
      if (soldOption === "0-100") {
        filteredData = filteredData?.filter((item) => {
          const sold = Number(item.sold);
          if (sold > 0 && sold < 100) {
            return item;
          }
        });
      }
      if (soldOption === "100-400") {
        filteredData = filteredData?.filter((item) => {
          const sold = Number(item.sold);
          if (sold > 100 && sold < 400) {
            return item;
          }
        });
      }
      if (soldOption === "above 400") {
        filteredData = filteredData?.filter((item) => {
          const sold = Number(item.sold);
          if (sold > 400) {
            return item;
          }
        });
      }
    }
    if (priceRange) {
      filteredData = filteredData?.filter((item) => {
        if (typeof priceRange === "string") {
          const [minPrice, maxPrice] = priceRange.split(",");
          if (
            Number(item.price) > Number(minPrice) &&
            Number(item.price) < Number(maxPrice)
          ) {
            return item;
          }
        }
      });
    }
    return filteredData;
  }, [data, options]);

  return filteredData;
}
