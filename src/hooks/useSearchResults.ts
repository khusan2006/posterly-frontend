import { getPosters } from "@/api/posters";
import { useQuery } from "@tanstack/react-query";

const useSearchResults = (searchText: string) => {
  const { data: posters } = useQuery({
    queryKey: ["posters"],
    queryFn: () => {
      if(!searchText) {
        return []
      }else{
        return getPosters()
      }
    },
  });
  if (searchText === "") return [];
  const data = posters?.filter((item) => {
    if( item.categories?.some(category => category.toLowerCase().includes(searchText.toLowerCase()))) {
        return item
    }
    if (item.name?.toLowerCase().includes(searchText)) {
        return item;
      }
  });
  return data;
};

export default useSearchResults;
