"use client";

import Image from "next/image";
import { useState } from "react";
import "@/style/main.css";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import AuthModal from "@/components/ui/AuthModal/AuthModal";

export default function ShoppingBagPage() {
  const router = useRouter();
  const { currentUser, login } = useAuth();
  const { items, removeItem, updateQuantity, itemKey } = useCart(currentUser?.email ?? null);
  const [showModal, setShowModal] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 10;
  const total = subtotal + shipping;

  if (!currentUser) {
    return (
      <section className="shopping-cart-section-style flex flex-col items-center justify-center gap-6 min-h-[60vh]">
        <p className="font-beatriceDeckMedium text-[16px]">Please sign in to view your cart.</p>
        <button onClick={() => setShowModal(true)}
          className="h-[48px] px-10 bg-black text-white font-beatriceDeckMedium text-[13px] uppercase tracking-[1px] hover:opacity-80 transition">
          Sign In
        </button>
        {showModal && <AuthModal onClose={() => setShowModal(false)} onLogin={login} />}
      </section>
    );
  }

  return (
    <section className="shopping-cart-section-style">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-6 mb-10">
          <h1 className="text-[13px] font-beatriceRegular font-medium">SHOPPING BAG</h1>
          <div className="flex items-center gap-2 text-sm">
            <div className="bg-white px-2 py-2">
              <Heart strokeWidth={1.7} className="h-2 w-2 rotate-[-50.22deg]" />
            </div>
            <span className="text-[11px] font-beatriceRegular font-medium text-[#8A8A8A]">FAVOURITES</span>
          </div>
        </div>

        <hr className="hidden mb-10 text-[#C9C9C9] lg:flex lg:w-[712px]" />

        {items.length === 0 ? (
          <p className="font-beatriceRegular text-[14px] text-black/50">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-52">
            <div className="grid grid-cols-1 mtd:grid-cols-[305px_305px] gap-y-6 mtd:gap-x-[62px]">
              {items.map((item) => {
                const key = itemKey(item);
                return (
                  <div key={key} className="overflow-hidden">
                    <div className="flex gap-4">
                      <div>
                        <div className="relative bg-[#f1f2f7] flex items-center justify-center max-w-[265px] h-[314px]">
                          <Image src={item.image} alt={item.title} width={265} height={314}
                            className="w-[265px] h-[314px] object-contain" />
                          <div className="absolute left-[86.47%] top-[92.33%] bg-white px-2 py-2">
                            <Heart strokeWidth={1.7} className="h-2 w-2 rotate-[-50.22deg]" />
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-sm text-black/60 font-medium">{item.category}</p>
                          <div className="flex items-center justify-between mt-1">
                            <h3 className="text-sm md:text-base font-medium">{item.title}</h3>
                            <p className="font-medium">${item.price}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between items-center h-[253px]">
                        <button onClick={() => removeItem(key)}
                          className="text-xl text-gray-400 hover:text-red-500">×</button>
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-8 h-8 border flex items-center justify-center text-sm">
                            {item.size}
                          </div>
                          <div className="w-8 h-8 border" style={{ backgroundColor: item.color }} />
                          <div className="flex flex-col items-center">
                            <button onClick={() => updateQuantity(key, item.quantity - 1)}
                              className="w-8 h-8 border hover:bg-gray-100">−</button>
                            <span className="w-8 h-8 border flex items-center justify-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(key, item.quantity + 1)}
                              className="w-8 h-8 border hover:bg-gray-100">+</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border border-[#C9C9C9] p-6 shadow-sm h-fit sticky top-6 w-full lg:max-w-[306px] mx-auto">
              <h2 className="text-[14px] font-semibold mb-6 font-beatriceDeckMedium">ORDER SUMMARY</h2>
              <div className="space-y-4 font-beatriceDeckMedium text-[12px]">
                <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>${shipping}</span></div>
              </div>
              <hr className="my-6" />
              <div className="flex justify-between">
                <p className="font-beatriceDeckMedium text-[16px]">
                  TOTAL <span className="font-beatriceDeckMedium text-[12px] text-black/55">(TAX INCL.)</span>
                </p>
                <span className="font-beatriceDeckMedium text-[16px]">${total.toFixed(2)}</span>
              </div>
              <label className="flex items-start gap-2 mt-6 text-sm">
                <input type="checkbox" className="mt-1" />
                <span className="font-thin text-[11px]">I agree to the Terms and Conditions</span>
              </label>
              <button className="font-beatriceDeckMedium w-full bg-[#D9D9D9] text-black py-4 mt-6 transition"
                onClick={() => router.push("/checkout")}>
                CONTINUE
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
