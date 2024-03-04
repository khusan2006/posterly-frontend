import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  price: number | string,
  options: {
    notation?: Intl.NumberFormatOptions["notation"];
  } = {}
) {
  const { notation = "compact" } = options;

  const numericPrice = typeof price === "string" ? parseFloat(price) : price;

  const formattedPrice = new Intl.NumberFormat("ru-RU", {
    style: "decimal",
    notation,
    maximumFractionDigits: 0,
  }).format(numericPrice).replace(/\./, ' ');

  return `${formattedPrice} UZS`;
}

export function shuffleArray(array: []) {
  let currentIndex: number = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export function truncate(name: string, maxLength: number) {
  if (name.length > maxLength) {
    return name.substring(0, maxLength - 3) + "...";
  }
  return name;
}
