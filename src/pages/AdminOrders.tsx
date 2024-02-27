import { getOrders } from "@/api/orders";
import { getCustomPosters, getPosters } from "@/api/posters";
import { Order } from "@/lib/types";
import { Separator } from "@radix-ui/react-separator";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const AdminOrders = () => {
  const { data } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
  const { data: posters } = useQuery({
    queryKey: ["posters"],
    queryFn: getPosters,
  });
  const { data: customPosters } = useQuery({
    queryKey: ["customPosters"],
    queryFn: getCustomPosters,
  });

  useEffect(() => {
    Notification.requestPermission().then(function (permission) {
      if (permission !== "granted") {
        alert("You need to grant permission to receive notifications");
      }
    });
  }, []);
  if (!data) return;
  if (!posters) return;

  return (
    <section className="p-10">
      <h2 className="font-bold text-2xl">Orders</h2>
      <div className="flex flex-col w-full gap-8">
        {data.map((order: Order) => (
          <>
            <div>
              <div className="flex flex-col">
                <h3>customer: {order.customerName}</h3>
                <h4>phone number: {order.customerPhone}</h4>
              </div>
              <div className="flex gap-4">
                {order.posters.map((order) => {
                  let item;
                  let custom;
                  if (posters) {
                    item = posters.find((item) => item._id == order.product);
                  }
                  if (!item) {
                    item = customPosters?.find(
                      (item) => item._id == order.product
                    );
                    custom = true;
                  }

                  return (
                    <div>
                      <img
                        src={
                          item?.images
                            ? item?.images[0] : 
                            ''
                            // : order.product.images[0]  
                        }
                        className="w-32 h-32"
                        alt={item?.name}
                      />
                      {custom ? (
                        <h3 className="font-bold text-xl">Custom Poster</h3>
                      ) : null}
                      <h5>quantity: {order.quantity}</h5>
                      <h5>format: {order.format}</h5>
                      <h5>frame: {order.frame}</h5>
                    </div>
                  );
                })}
              </div>
            </div>
            <Separator />
          </>
        ))}
      </div>
    </section>
  );
};

export default AdminOrders;
