"use client";

import { Search, ChevronRight, ChevronLeft } from "lucide-react";
import Card from "@/components/ui/Card/Card";
import "@/style/main.css";
import { useState, useEffect } from "react";
import FilterSidebar from "./FilterSidebar";
import { CartItem } from "@/types"; 
import { useSearchParams } from "next/navigation";
import { getProducts } from "@/api/api";

const filterButtons = [
  "ALL", "NEW", "BEST SELLERS", "SHIRTS", "POLO SHIRTS",
  "SHORTS", "T-SHIRTS", "JEANS", "JACKETS", "COATS",
];

const categoryMap: Record<string, string> = {
  SHIRTS: "men's clothing",
  "T-SHIRTS": "men's clothing",
  JEANS: "men's clothing",
  JACKETS: "women's clothing",
  COATS: "women's clothing",
  "POLO SHIRTS": "men's clothing",
  SHORTS: "men's clothing",
};

function Products() {
  const searchParams = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [allProducts, setAllProducts] = useState<CartItem[]>([]);
  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [selectedSize, setSelectedSize] = useState("");
 
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat === "men") setActiveFilter("SHIRTS");
    else if (cat === "women") setActiveFilter("JACKETS");
    const q = searchParams.get("q");
    if (q) setSearch(q);
  }, [searchParams]);

  useEffect(() => {
    getProducts().then(setAllProducts);
  }, []);

  const filtered = allProducts.filter((p) => {
    const matchSearch =
      search === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());

    const categoryKeyword = categoryMap[activeFilter] ?? "";
    const matchCategory =
      activeFilter === "ALL" ||
      activeFilter === "NEW" ||
      activeFilter === "BEST SELLERS" ||
      p.category.toLowerCase().includes(categoryKeyword.toLowerCase());

    const matchSize = selectedSize === "" || p.size === selectedSize || p.size === "";

    return matchSearch && matchCategory && matchSize;
  });

  return (
    <section className="hero_style_main relative">
      <div className="flex gap-8"> 
        <div className="mt-20 hidden w-[280px] flex-shrink-0 lg:block">
          <FilterSidebar selectedSize={selectedSize} onSizeChange={setSelectedSize} />
        </div>
 
        <div className={`fixed left-0 top-[250px] z-50 h-screen w-[300px] overflow-y-auto bg-white p-5 transition-all duration-500 lg:hidden ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-beatriceDeckBold text-[18px] font-bold text-black">Filters</h2>
            <button onClick={() => setIsMenuOpen(false)}>
              <ChevronLeft className="h-6 w-6 text-black" />
            </button>
          </div>
          <FilterSidebar selectedSize={selectedSize} onSizeChange={setSelectedSize} />
        </div>

        {isMenuOpen && (
          <div onClick={() => setIsMenuOpen(false)} className="fixed inset-0 z-40 bg-black/80 lg:hidden" />
        )}

        <div className="flex-1">
          <div className="mb-10">
            <div>
              <p className="font-beatriceDeckMedium text-[14px] font-medium text-black/60">Home / Products</p>
              <h1 className="font-beatriceDeckExtrabold text-[35px] font-bold uppercase leading-[40px] tracking-[2px] text-black">
                Products
              </h1>
            </div>

            <div className="grid grid-cols-1 gap-3 xl:grid-cols-[338px_1fr]">
              <div className="flex flex-col justify-between gap-4">
                <div className="mt-3 w-full max-w-[420px]">
                  <div className="flex w-full max-w-[367px] items-center justify-between rounded-[2px] bg-[#D9D9D9] px-3 py-2">
                    <Search className="h-4 w-4 text-black/60" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search products..."
                      className="w-full bg-transparent px-3 outline-none font-beatriceRegular text-[12px]"
                    />
                    {search && (
                      <button onClick={() => setSearch("")}
                        className="cursor-pointer font-beatriceDeckRegular text-[12px] text-black/60 hover:text-black">✕</button>
                    )}
                  </div>
                </div>
              </div>

              <div className={`flex items-center gap-2 lg:hidden ${isMenuOpen ? "hidden" : "flex"}`}>
                <button onClick={() => setIsMenuOpen(true)}
                  className="font-beatriceDeckBold text-[16px] font-bold text-black">Filters</button>
                <ChevronRight className="h-5 w-5 cursor-pointer text-black" strokeWidth={1.5} />
              </div>

              <div className="flex justify-center items-center scrollbar-hide overflow-x-auto">
                <div className="flex w-max gap-[10px]">
                  {filterButtons.map((filter) => (
                    <button key={filter} onClick={() => setActiveFilter(filter)}
                      className={`flex-shrink-0 min-w-[101px] h-[30px] border px-[12px] text-center font-beatriceRegular text-[10px] font-normal uppercase tracking-[0.8px] transition-all duration-300 ${
                        activeFilter === filter
                          ? "border-black bg-black text-white"
                          : "border-[#BEBEBE] bg-transparent text-[#5E5E5E] hover:border-black hover:text-black"
                      }`}>
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Card
            initialItems={8}
            cardClassName="min-w-[149px] h-[200px] mtd:min-w-[265px] mtd:h-[314px]"
            isClickable
            filteredItems={filtered}
          />
        </div>
      </div>
    </section>
  );
}

export default Products;
