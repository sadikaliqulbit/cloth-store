"use client";

import "../../../style/main.css";
import { Search } from "lucide-react";
import NewCollection from "@/components/ui/NewCollection/NewCollection";
import NewThisWeek from "@/components/ui/NewThisWeek/NewThisWeek";
import XIVCollections from "@/components/ui/XIVCollections/XIVCollections";
import FashionDesignApproach from "@/components/ui/FashionDesignApproach/FashionDesignApproach";
import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/components/ui/Input/InputField";

function Hero() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) router.push(`/products?q=${encodeURIComponent(search.trim())}`);
  };

  return (
    <>
      <section className="hero_style_main">
        <div className="max-w-[69px]">
          <p className="font-beatriceDeckRegular text-[12px] mtd:text-[16px] uppercase cursor-pointer hover:opacity-60 transition-opacity"
            onClick={() => router.push("/products?category=men")}>men</p>
          <p className="font-beatriceDeckRegular text-[12px] mtd:text-[16px] uppercase cursor-pointer hover:opacity-60 transition-opacity"
            onClick={() => router.push("/products?category=women")}>women</p>
          <p className="font-beatriceDeckRegular mtd:text-[16px] uppercase cursor-pointer hover:opacity-60 transition-opacity"
            onClick={() => router.push("/products?category=kid")}>kid</p>
        </div>

        <form onSubmit={handleSearch} className="mt-5">
          <div className="overflow-auto flex w-full max-w-[367px] items-center justify-between rounded-[2px] bg-[#D9D9D9] px-3 py-2">
            <Search className="h-4 w-4 text-black/60" />
            <InputField
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-transparent px-3 outline-none font-beatriceRegular text-[12px]"
            />
            <button type="submit" className="font-beatriceDeckRegular text-[12px] text-black/60 cursor-pointer hover:text-black transition-colors">
              Search
            </button>
          </div>
        </form>

        <NewCollection />
        <NewThisWeek />
        <XIVCollections />
        <FashionDesignApproach />
      </section>
    </>
  );
}

export default Hero;
