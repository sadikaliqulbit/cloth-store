import React from "react";
import Card from "../Card/Card";

function XIVCollections() {
  return (
    <section>
      <div className=" mt-20">
        <h1 className=" font-beatriceDeckExtrabold text-[35px] mtd:text-[48px] uppercase leading-[40px] tracking-[2px] text-black">
          xiv
          <br />
          collections
          <br />
          23-24
        </h1>
      </div>
      <div className="block mtd:flex justify-between border-b border-b-[#DFDFDF] items-center">
        <div className="flex gap-4 mt-12 mb-4">
          <p className="font-beatriceRegular font-medium text-[16px] text-[#000000]">
            (All)
          </p>
          <p className="font-beatriceRegular font-normal text-[16px] text-[#8A8A8A]">
            Men
          </p>
          <p className="font-beatriceRegular font-normal text-[16px] text-[#8A8A8A]">
            Women
          </p>
          <p className="font-beatriceRegular font-normal text-[16px] text-[#8A8A8A]">
            KID
          </p>
        </div>
        <div className=" flex tems-start gap-20">
          <button className="font-beatriceRegular text-[14px] font-normal text-black">
            Filters(+)
          </button>

          <div className="font-beatriceRegular text-[14px] font-normal text-black">
            <p>Sorts(-)</p>
            <div className="mt-1 flex flex-col text-black/60">
              <span>More to Less</span>
              <span>Less to More</span>
            </div>
          </div>
        </div>
      </div>

      <Card initialItems={3} isClickable />
    </section>
  );
}

export default XIVCollections;
