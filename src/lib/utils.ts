import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CartData } from "./types";

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
  })
    .format(numericPrice)
    .replace(/\./, " ");

  return `${formattedPrice}`;
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

type OrderType = {
  posters: CartData[];
  customerName: string;
  customerPhone: string;
};
export const sendTelegramMessage = async (orderData: OrderType) => {
  orderData.posters.map(async (order) => {
    if (!order.product.images) return;
    const token = "6571950431:AAGYUGmaARM0qU0Y8ymUuU04xLCzIk89p90"; // Replace with your bot token
    const message = `
     🔥New Order is received🔥\n
    👤Customer name: ${orderData.customerName}\n
    📞Phone number: ${orderData.customerPhone}\n
    📝Quantity: ${order.quantity}\n
    🖼 With frame: ${order.frame}\n
    📃format: ${order.format}`; // Replace with your message
    const chatId = "-1002109040580";
    const formData = new FormData();
    formData.append("chat_id", chatId);
    formData.append("photo", order?.product?.images[0]);
    formData.append("caption", message);
    try {
      const response = await fetch(
        `https://api.telegram.org/bot${token}/sendPhoto`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });
};
