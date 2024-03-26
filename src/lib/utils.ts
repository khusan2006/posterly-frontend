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

export const sendTelegramMessage = async () => {
  const token = '6571950431:AAGYUGmaARM0qU0Y8ymUuU04xLCzIk89p90'; // Replace with your bot token
  const message = 'new order is received'; // Replace with your message
  const chatIds = ['1086434993', '1569925076']; // Replace with your chat IDs

  try {
    // Send message to each chat ID
    await Promise.all(chatIds.map(async (chatId) => {
      await fetch(
        `https://api.telegram.org/bot${token}/sendMessage`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
          }),
        }
      );
    }));
    console.log('Message sent successfully to all users!');
  } catch (error) {
    console.error('Error sending message:', error);
  }
};