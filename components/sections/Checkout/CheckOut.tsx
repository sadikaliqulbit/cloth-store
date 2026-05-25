"use client";

import { ArrowLeft } from "lucide-react";
import "@/style/checkout.css";
import "@/style/main.css";
import CheckoutForm from "./CheckoutForm";
import OrderCard from "./OrderCard";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { CartItem } from "@/types";
import { useAuth } from "@/hooks/useAuth";

function CheckOut() {
  const { currentUser } = useAuth();
  const [checkout, setCheckout] = useState<CartItem[]>([]);
  const route = useRouter();

  useEffect(() => {
    const cartKey = currentUser ? `cart__${currentUser.email}` : "cart";
    const stored = localStorage.getItem(cartKey);
    setCheckout(stored ? JSON.parse(stored) : []);
  }, [currentUser]);

  const subtotal = checkout.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <section className="shopping-cart-section-style ">
      <div className=" mx-auto">
        <button className="mb-8 md:mb-12">
          <ArrowLeft
            strokeWidth={1.5}
            className="w-8 h-8"
            onClick={() => route.push("/shopping-bag")}
          />
        </button>

        <div>
          <h1 className="checkout-heading">Checkout</h1>
        </div>
        <div className="flex gap-6 sm:gap-10 mt-3">
          <button className="checkout-tab-active">Information</button>

          <button className="checkout-tab">Shipping</button>

          <button className="checkout-tab">Payment</button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[140px] items-start">
          <CheckoutForm />
          <div className="checkout-order-wrapper mt-10 w-full lg:max-w-[406px]">
            <div className="flex justify-end">
              <span className="font-beatriceDeckMedium text-[14px] text-[#000E8A]">
                ({checkout.reduce((sum, item) => sum + item.quantity, 0)})
              </span>
            </div>

            <h2 className="checkout-subtitle mb-6">Your Order</h2>

            <div className="space-y-5 overflow-hidden max-h-[288px] overflow-y-auto scrollbar-hide">
              {checkout.map((item) => (
                <OrderCard key={item.id} item={item} />
              ))}
            </div>
 
            <div className="border-t border-black/10 mt-6 pt-5">
              <div className="checkout-total-row">
                <span className="font-beatriceDeckMedium text-[12px]">
                  Subtotal
                </span>

                <span className="font-beatriceDeckMedium text-[12px]">
                  ${subtotal}
                </span>
              </div>

              <div className="checkout-total-row mt-3">
                <span className="font-beatriceDeckMedium text-[12px]">
                  Shipping
                </span>

                <span className="text-black/55 font-beatriceDeckRegular text-[10px]">
                  Calculated at next step
                </span>
              </div>

              <div className="checkout-total-final">
                <span className="font-beatriceDeckMedium text-[14px]">
                  Total
                </span>
                <span className="font-beatriceDeckMedium text-[14px]">
                  ${subtotal + 10}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CheckOut;
