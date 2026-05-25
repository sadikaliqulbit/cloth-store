"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Card from "../Card/Card"; 
import { CartItem } from "@/types";
import { getProducts } from "@/api/api";

type SortOption = "default" | "high-to-low" | "low-to-high";

const tabs = [
  { label: "(All)", value: "all" },
  { label: "Men", value: "men" },
  { label: "Women", value: "women" },
  { label: "KID", value: "kid" },
];

function XIVCollections() {
  const router = useRouter();
  const [allProducts, setAllProducts] = useState<CartItem[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [sort, setSort] = useState<SortOption>("default");
  const [showSort, setShowSort] = useState(false);

  useEffect(() => {
    getProducts().then(setAllProducts);
  }, []);

  const filtered = allProducts
    .filter((p) => {
      if (activeTab === "all") return true;
      if (activeTab === "men") return p.category.toLowerCase().includes("men");
      if (activeTab === "women") return p.category.toLowerCase().includes("women");
      if (activeTab === "kid") return p.category.toLowerCase().includes("kid");
      return true;
    })
    .sort((a, b) => {
      if (sort === "high-to-low") return b.price - a.price;
      if (sort === "low-to-high") return a.price - b.price;
      return 0;
    });

  return (
    <section>
      <div className="mt-20">
        <h1 className="font-beatriceDeckExtrabold text-[35px] mtd:text-[48px] uppercase leading-[40px] tracking-[2px] text-black">
          xiv<br />collections<br />23-24
        </h1>
      </div>

      <div className="block mtd:flex justify-between border-b border-b-[#DFDFDF] items-center">
        <div className="flex gap-4 mt-12 mb-4">
          {tabs.map((tab) => (
            <button key={tab.value} onClick={() => setActiveTab(tab.value)}
              className={`font-beatriceRegular text-[16px] transition-colors ${
                activeTab === tab.value ? "font-medium text-black" : "font-normal text-[#8A8A8A] hover:text-black"
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-start gap-20">
          <button
            onClick={() => router.push("/products")}
            className="font-beatriceRegular text-[14px] font-normal text-black hover:opacity-60 transition-opacity">
            Filters(+)
          </button>

          <div className="relative font-beatriceRegular text-[14px] font-normal text-black">
            <button onClick={() => setShowSort(!showSort)} className="hover:opacity-60 transition-opacity">
              Sorts(-)
            </button>
            {showSort && (
              <div className="absolute right-0 top-6 z-10 bg-white border border-black/10 shadow-md min-w-[140px]">
                {[
                  { label: "Default", value: "default" },
                  { label: "More to Less", value: "high-to-low" },
                  { label: "Less to More", value: "low-to-high" },
                ].map((opt) => (
                  <button key={opt.value}
                    onClick={() => { setSort(opt.value as SortOption); setShowSort(false); }}
                    className={`block w-full text-left px-4 py-2 text-[12px] hover:bg-black/5 transition-colors ${sort === opt.value ? "font-medium" : "text-black/60"}`}>
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Card initialItems={3} isClickable filteredItems={filtered} />

      <div className="mt-8 flex justify-center">
        <button
          onClick={() => router.push(`/products${activeTab !== "all" ? `?category=${activeTab}` : ""}`)}
          className="font-beatriceDeckMedium text-[13px] uppercase tracking-[1px] border border-black px-10 py-3 hover:bg-black hover:text-white transition-all">
          See All
        </button>
      </div>
    </section>
  );
}

export default XIVCollections;
