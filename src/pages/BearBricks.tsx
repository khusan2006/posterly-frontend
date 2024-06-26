import Filters from "@/components/Filters";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductListing from "@/components/ProductListing";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useQuery } from "@tanstack/react-query";
import { NavLink, useNavigate } from "react-router-dom";

import { X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {Helmet} from 'react-helmet'
import { motion } from "framer-motion";
import useUrlParameters from "@/hooks/useUrlParameters";
import { useFilteredData } from "@/hooks/useFilteredData";
import { POSTER_PER_PAGINATION } from "@/config";
import { getBearBricks } from "@/api/bearbrick";
import { posterData } from "@/lib/types";
const BREADCRUMBS = [
  { id: 1, name: "Дом", href: "/" },
  { id: 2, name: "беарбриcкс", href: "/bearbricks" },
];
const BearBricks = () => {
  const [currentPaginationNumber, setCurrentPaginationNumber] = useState(1);
  const [sortBy, setSortBy] = useState<string>("");

  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["bearbricks"],
    queryFn: () => getBearBricks(),
  });
  const memoizedData = useMemo(() => {
    return data;
  }, [data]);
  const filters = useUrlParameters();
  const memoizedFilters = useMemo(() => {
    return Object.fromEntries(filters);
  }, [filters]);
  // filter data based on params
  const bearBricks = useFilteredData(memoizedData as posterData[], memoizedFilters);

  const sortedBearBricks = useMemo(() => {
    let items = bearBricks;
    if (sortBy === "A-Z") {
      items = bearBricks?.slice()?.sort((a, b) => {
        if (!a.name || !b.name) return 1;
        return a.name.localeCompare(b.name);
      });
    } else if (sortBy === "Z-A") {
      items = bearBricks?.slice()?.sort((a, b) => {
        if (!a.name || !b.name) return 1;
        return b.name.localeCompare(a.name);
      });
    } else if (sortBy === "newest") {
      items = bearBricks?.slice();
    } else if (sortBy === "oldest") {
      items = bearBricks?.slice().reverse();
    }
    return items;
  }, [sortBy, bearBricks]);
  const totalPaginationNumbers = Math.ceil(
    Number(bearBricks?.length) / POSTER_PER_PAGINATION
  );

  const handlePrev = () => {
    if (currentPaginationNumber > 1) {
      setCurrentPaginationNumber((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPaginationNumber < totalPaginationNumbers) {
      setCurrentPaginationNumber((prev) => prev + 1);
    }
  };
  const handlePaginationNumber = (number: number) => {
    setCurrentPaginationNumber(number);
  };
  const handleClick = (filter: [string, string | (string | null)[] | null]) => {
    const newFilters = filters.filter((item) => {
      if (!item.includes(filter[0])) {
        return item;
      }
    });
    let url = "/products?";
    newFilters.forEach(([key, value]) => {
      if (url == "/products?") {
        url += `${key}=${encodeURIComponent(value as string)}`;
      } else {
        url += `&${key}=${encodeURIComponent(value as string)}`;
      }
    });

    navigate(url);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPaginationNumber]);

  return (
    <MaxWidthWrapper>
      <Helmet>
        <title>Buy BearBricks Online - Posterly</title>
        <meta
          name="description"
          content="Discover a wide selection of bearBricks online at Posterly. Browse our collection and find the perfect bearBricks for your home or office."
        />
      </Helmet>
      <ol className="flex items-center space-x-2 mt-6">
        {BREADCRUMBS.map((breadcrumb, i) => (
          <li key={breadcrumb.href}>
            <div className="flex items-center text-sm">
              <NavLink
                to={breadcrumb.href}
                className="font-medium text-sm text-muted-foreground hover:text-gray-900"
              >
                {breadcrumb.name}
              </NavLink>
              {i !== BREADCRUMBS.length - 1 ? (
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
      <h2 className="text-4xl font-medium my-3">Все беарбриcкс</h2>

      <div className="flex justify-between w-full">
        <div className="flex gap-20">
          <Filters />
          <div className="flex gap-4">
            {filters
              ? filters?.map((filter) => (
                  <div
                    className="cursor-pointer py-2 px-4 bg-orange-100 text-orange-900 rounded-2xl flex text-sm items-center"
                    onClick={() => handleClick(filter)}
                  >
                    {filter[1]}
                    <span className="ml-1">
                      <X size={15} />
                    </span>
                  </div>
                ))
              : null}
          </div>
        </div>
        <div className="md:flex items-center gap-3 hidden">
          <p className="text-sm">Сортировать по:</p>
          <Select onValueChange={(value) => setSortBy(value)}>
            <SelectTrigger className="w-[fit-content] h-[20px] flex items-center text-sm border-0">
              <SelectValue placeholder="Ascending" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A-Z">A-Z</SelectItem>
              <SelectItem value="Z-A">Z-A</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setSortBy(value)}>
            <SelectTrigger className="w-[fit-content] h-[20px] flex items-center text-sm border-0">
              <SelectValue placeholder="newest" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">from newest</SelectItem>
              <SelectItem value="oldest">from oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <motion.div
        layout
        className="my-4 w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8"
      >
        {sortedBearBricks?.length !== 0
          ? sortedBearBricks
              ?.slice(
                POSTER_PER_PAGINATION * (currentPaginationNumber - 1),
                POSTER_PER_PAGINATION * currentPaginationNumber
              )
              .map((poster, i) => (
                <ProductListing
                  key={`product-${i}`}
                  product={poster}
                  index={i}
                />
              ))
          : bearBricks
              ?.slice(
                POSTER_PER_PAGINATION * (currentPaginationNumber - 1),
                POSTER_PER_PAGINATION * currentPaginationNumber
              )
              .map((poster, i) => (
                <ProductListing
                  key={`product-${i}`}
                  product={poster}
                  index={i}
                />
              ))}
      </motion.div>
      <Pagination className="my-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="cursor-pointer"
              onClick={() => handlePrev()}
            />
          </PaginationItem>
          {Array.from({ length: totalPaginationNumbers }, (_, index) => (
            <PaginationItem>
              <PaginationLink
                className="cursor-pointer"
                isActive={index + 1 == currentPaginationNumber}
                onClick={() => handlePaginationNumber(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            {totalPaginationNumbers > 5 ? <PaginationEllipsis /> : null}
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className="cursor-pointer"
              onClick={() => handleNext()}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </MaxWidthWrapper>
  );
};

export default BearBricks;
