import "../../../style/main.css";
import { Search } from "lucide-react";
import NewCollection from "@/components/ui/NewCollection/NewCollection";
import NewThisWeek from "@/components/ui/NewThisWeek/NewThisWeek";
import XIVCollections from "@/components/ui/XIVCollections/XIVCollections";
import FashionDesignApproach from "@/components/ui/FashionDesignApproach/FashionDesignApproach";
function Hero() {
  return (
    <>
      <section className="hero_style_main">
        <div className="min-w-[69px] ">
          <p className="font-beatriceDeckRegular text-[12px] mtd:text-[16px]  uppercase">men</p>
          <p className="font-beatriceDeckRegular text-[12px] mtd:text-[16px]  uppercase">women</p>
          <p className="font-beatriceDeckRegular mtd:text-[16px]  uppercase">kid</p>
        </div>
        <div className="mt-5">
          <div className="flex w-full max-w-[367px] items-center justify-between rounded-[2px] bg-[#D9D9D9] px-3 py-2">
            <Search className="h-4 w-4 text-black/60" />
            <input aria-label="Email" type="text" className="w-full bg-transparent outline-none" />
            <span className="font-beatriceDeckRegular text-[12px] text-black/60 cursor-pointer">
              Search
            </span>
          </div>
        </div>

        <NewCollection />
        <NewThisWeek />
        <XIVCollections />
        <FashionDesignApproach />
        
      </section>
    </>
  );
}

export default Hero;
