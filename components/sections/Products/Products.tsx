"use client";

import { Search, ChevronRight, ChevronLeft } from "lucide-react";
import Card from "@/components/ui/Card/Card";
import "@/style/main.css";
import { useState } from "react";
import FilterSidebar from "./FilterSidebar";

const filterButtons = [
  "NEW",
  "BEST SELLERS",
  "SHIRTS",
  "POLO SHIRTS",
  "SHORTS",
  "T-SHIRTS",
  "JEANS",
  "JACKETS",
  "COATS",
];

function Products() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <section className="hero_style_main relative">
      <div className="flex gap-8">
        <div className="mt-20 hidden w-[280px] flex-shrink-0 lg:block">
          <FilterSidebar />
        </div>

        <div
          className={`fixed left-0 top-[250px] z-50 h-screen w-[300px] overflow-y-auto bg-white p-5 transition-all duration-500 lg:hidden ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-beatriceDeckBold text-[18px] font-bold text-black">
              Filters
            </h2>
            <button onClick={toggleMenu}>
              <ChevronLeft className="h-6 w-6 text-black" />
            </button>
          </div>
          <FilterSidebar />
        </div>

        {isMenuOpen && (
          <div
            onClick={toggleMenu}
            className="fixed inset-0 z-40 bg-black/80 lg:hidden"
          />
        )}

        <div className="flex-1">
          <div className="mb-10">
            <div>
              <p className="font-beatriceDeckMedium text-[14px] font-medium text-black/60">
                Home / Products
              </p>
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
                      className="w-full bg-transparent px-3 outline-none"
                      aria-label="email"
                    />
                    <span className="cursor-pointer font-beatriceDeckRegular text-[12px] text-black/60">
                      Search
                    </span>
                  </div>
                </div>
              </div>

              <div
                className={`flex items-center gap-2 lg:hidden ${isMenuOpen ? "hidden" : "flex"}`}
              >
                <button
                  onClick={toggleMenu}
                  className="font-beatriceDeckBold text-[16px] font-bold text-black"
                  aria-label="Open filters"
                >
                  Filters
                </button>
                <ChevronRight
                  className="h-5 w-5 cursor-pointer text-black"
                  strokeWidth={1.5}
                />
              </div>

              <div className="flex justify-center items-center scrollbar-hide overflow-x-auto">
                <div className="flex w-max gap-[10px]">
                  {filterButtons.map((filter) => (
                    <button
                      key={filter}
                      className="flex-shrink-0 min-w-[101px] h-[30px] border border-[#BEBEBE] bg-transparent px-[12px] text-center font-beatriceRegular text-[10px] font-normal uppercase tracking-[0.8px] text-[#5E5E5E] transition-all duration-300 hover:border-black hover:text-black"
                    >
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
          />
        </div>
      </div>
    </section>
  );
}

export default Products;
