"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "@/style/main.css";
import { Order } from "@/types";

export default function OrderConfirmedPage() {
  const router = useRouter();

  const getLastOrder = (): Order | null => {
    if (typeof window === "undefined") return null;
    const orders = localStorage.getItem("orders");
    if (!orders) return null;
    const parsed: Order[] = JSON.parse(orders);
    return parsed[parsed.length - 1] ?? null;
  };

  const [order] = useState<Order | null>(getLastOrder);

  if (!order) return null;

  const total = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0) + 10;

  return (
    <section className="shopping-cart-section-style">
      <div className="max-w-xl mx-auto text-center">
        <div className="text-5xl mb-6">✓</div>
        <h1 className="font-beatriceDeckExtrabold text-[22px] xl:text-[40px]">Order Confirmed!</h1>
        <p className="font-beatriceRegular text-[13px] text-black/60 mb-8">
          Thank you, {order.shippingInfo.firstName}! Your order has been placed.
        </p>

        <div className="border border-[#e2e2e2] p-6 text-left space-y-3 mb-8">
          <h2 className="font-beatriceDeckMedium text-[14px] mb-4">Order Summary</h2>
          {order.items.map((item, i) => (
            <div key={i} className="flex justify-between font-beatriceRegular text-[13px]">
              <span>{item.title} × {item.quantity}</span>
              <span>${item.price * item.quantity}</span>
            </div>
          ))}
          <hr className="my-3" />
          <div className="flex justify-between font-beatriceDeckMedium text-[13px]">
            <span>Shipping</span><span>$10</span>
          </div>
          <div className="flex justify-between font-beatriceDeckMedium text-[15px]">
            <span>Total</span><span>${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="border border-[#e2e2e2] p-6 text-left mb-8">
          <h2 className="font-beatriceDeckMedium text-[14px] mb-4">Shipping To</h2>
          <p className="font-beatriceRegular text-[13px] text-black/70">
            {order.shippingInfo.firstName} {order.shippingInfo.lastName}<br />
            {order.shippingInfo.address}, {order.shippingInfo.city}<br />
            {order.shippingInfo.state}, {order.shippingInfo.country} - {order.shippingInfo.postalCode}<br />
            {order.shippingInfo.email}
          </p>
        </div>

        <button
          onClick={() => router.push("/")}
          className="font-beatriceDeckMedium bg-black text-white px-10 py-4 text-[13px] uppercase tracking-[1px] hover:opacity-90 transition"
        >
          Continue Shopping
        </button>
      </div>
    </section>
  );
}
