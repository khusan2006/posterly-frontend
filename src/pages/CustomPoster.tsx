import { createCustomPoster, getLastCustomPoster } from "@/api/posters";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import UploadImage from "@/components/UploadImage";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { addItem } from "@/slices/CartSlice";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const CustomPoster = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [format, setFormat] = useState("A3");
  const [itemQuantity, setItemQuantity] = useState(1);
  const [frame, setFrame] = useState("с рамкой");
  const [currentPrice, setCurrentPrice] = useState("");
  const form = useForm();
  useEffect(() => {
    if (format === "A4" && frame === "без рамки") {
      setCurrentPrice("50000");
    } else if (format === "A4" && frame === "с рамкой") {
      setCurrentPrice("80000");
    } else if (format === "A3" && frame === "с рамкой") {
      setCurrentPrice("120000");
    } else if (format === "A3" && frame === "без рамки") {
      setCurrentPrice("70000");
    }
  }, [format, frame]);
  useEffect(() => {
    window.scrollTo(0, 0);
    setFormat("A3");
    setFrame("с рамкой");
  }, []);
  const dispatch = useDispatch();
  const onSubmit = async () => {
    createCustomPoster({
      name: "custom poster",
      images: imageUrls,
      price: currentPrice,
    });
    const result = await getLastCustomPoster();
    const data = {
      quantity: itemQuantity,
      totalPrice: Number(currentPrice) * Number(itemQuantity),
      frame,
      format,
      product: result,
    };
    dispatch(addItem(data));
    setImageUrls([]);
    setFormat("A3");
    setFrame("с рамкой");
    toast.success("poster added to the cart");
  };
  return (
    <section className="py-10">
      <MaxWidthWrapper>
        <h2 className="text-2xl font-semibold mb-6">Пользовательский плакат</h2>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <UploadImage
            singleImage={true}
            className="h-[30vh] flex items-center justify-center "
            setImageUrls={setImageUrls}
          />
          <div className="mt-4 space-y-2">
            <h3 className="text-base font-normal text-muted-foreground">
              выбрать формат
            </h3>
            <div className="flex items-center gap-3">
              <button
              type="button"
                className={`px-4 py-2 border-2 border-orange-500 text-orange-500 rounded-lg font-medium cursor-pointer ${
                  format == "A3" ? "bg-orange-500 text-white" : ""
                }`}
                onClick={() => setFormat("A3")}
              >
                A3
              </button>
              <button
                type="button"
                className={`px-4 py-2 border-2 font-medium border-orange-500  cursor-pointer w-[fit-content] rounded-lg ${
                  format == "A4" ? "bg-orange-500 text-white" : ""
                }`}
                onClick={() => setFormat("A4")}
              >
                A4
              </button>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <h3 className="text-base font-normal text-muted-foreground">
              выбрать рамку
            </h3>
            <div className="flex items-center gap-3">
              <div
                className={`px-4 py-2 border-2 border-orange-500 text-orange-500 rounded-lg font-medium cursor-pointer ${
                  frame == "с рамкой" ? "bg-orange-500 text-white" : ""
                }`}
                onClick={() => setFrame("с рамкой")}
              >
                с рамкой
              </div>
              <div
                className={`px-4 py-2 border-2 border-orange-500 text-orange-500 rounded-lg font-medium cursor-pointer ${
                  frame == "без рамки" ? "bg-orange-500 text-white" : ""
                }`}
                onClick={() => setFrame("без рамки")}
              >
                без рамки
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <h3 className="text-base font-normal text-muted-foreground">
              Количество товара
            </h3>
            <div className="flex items-center gap-1 text-xl">
              <Minus
                className="cursor-pointer"
                size={18}
                onClick={() => {
                  if (itemQuantity > 1) {
                    setItemQuantity((prev) => prev - 1);
                  }
                }}
              />
              {itemQuantity}
              <Plus
                className="cursor-pointer"
                size={18}
                onClick={() => setItemQuantity((prev) => prev + 1)}
              />
            </div>
          </div>
          <h4 className="my-6 text-xl font-medium">
            Цена: {formatPrice(Number(currentPrice) * Number(itemQuantity))}
          </h4>
          <Button type="submit" className="w-full" disabled={imageUrls.length == 0}>
            Заказать сейчас
          </Button>
        </form>
      </MaxWidthWrapper>
    </section>
  );
};

export default CustomPoster;
