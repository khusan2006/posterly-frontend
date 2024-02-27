import { formatPrice } from "@/lib/utils";
import {
  decreaseItemQuantity,
  deleteItem,
  increaseItemQuantity,
} from "@/slices/CartSlice";
import { Minus, Plus, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { CartData } from "@/lib/types";

const CartItem = ({ item }: { item: CartData }) => {
  const dispatch = useDispatch();
  if (!item) return;
  const { product } = item;
  if (!product.images) return;
  const image = product.images[0];

  return (
    <div className="">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative h-36 w-20 min-w-fit overflow-hidden rounded">
            <img
              src={image}
              alt={product.name}
              className="absolute object-cover"
            />
          </div>

          <div className="flex flex-col self-start">
            <span className="line-clamp-1 text-sm font-medium mb-1">
              {product.name}
            </span>

            <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
              {product.categories && product?.categories[0]}
            </span>
            <div className="flex gap-2 mt-2">
              <span className="line-clamp-1 text-xs capitalize bg-orange-100 text-orange-900 px-1 py-0.5 rounded-mf">
                {item.format && item.format}
              </span>
              <span className="line-clamp-1 text-xs capitalize bg-orange-100 text-orange-900 px-1 py-0.5 rounded-mf">
                {item.frame && item.frame}
              </span>
            </div>

            <div className="mt-2 text-xs text-muted-foreground">
              <button
                onClick={() => dispatch(deleteItem(item))}
                className="flex items-center gap-0.5"
              >
                <X className="w-3 h-4" />
                Удалять
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-10 font-medium items-end pr-6">
          <div className="ml-auto line-clamp-1 text-sm">
            {formatPrice(product.price as string)}
          </div>
          <div className="flex items-center gap-1">
            <Minus
              className="cursor-pointer"
              size={16}
              onClick={() => dispatch(decreaseItemQuantity(item))}
            />
            {item.quantity}
            <Plus
              className="cursor-pointer"
              size={16}
              onClick={() => dispatch(increaseItemQuantity(item))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
