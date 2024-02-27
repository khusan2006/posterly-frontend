import queryString from "query-string";
import { useLocation } from "react-router-dom";

const useUrlParameters = () => {
    const location = useLocation();
    const searchParams = queryString.parse(location.search);
    const filters = Object.entries(searchParams);
    return filters
}

export default useUrlParameters
