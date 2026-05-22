"use client";
import { ChevronRight, ChevronUp } from "lucide-react";
import { useState } from "react";

const sizes = ["XS", "S", "M", "L", "XL", "2X"];

function FilterSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <div className="mb-6 border-b border-black/10 pb-3">
        <h3 className="mb-3 font-beatriceDeckMedium text-[14px] text-black">
          Size
        </h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              className="flex h-10 w-10 items-center justify-center border border-black/20 bg-white font-beatriceDeckMedium text-sm text-black transition-all hover:border-black"
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6 border-b border-black/10 pb-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mb-3 flex w-full items-center justify-between"
        >
          <h3 className="font-beatriceDeckBold text-[14px] text-black">
            Availability
          </h3>
          <ChevronUp
            className={`h-4 w-4 text-black transition-transform duration-300 ${
              isOpen ? "rotate-0" : "rotate-180"
            }`}
          />
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-4">
            {[
              { label: "Available", count: 450 },
              { label: "Out Of Stock", count: 18 },
            ].map(({ label, count }) => (
              <label
                key={label}
                className="flex cursor-pointer items-center gap-3"
              >
                <input type="checkbox" className="h-4 w-4 accent-black" />
                <span className="font-beatriceDeckMedium text-[12px] text-black">
                  {label}{" "}
                  <span className="font-beatriceDeckBold text-[12px] text-[#000E8A]">
                    ({count})
                  </span>
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-5">
        {[
          "Category",
          "Colors",
          "Price Range",
          "Collections",
          "Tags",
          "Ratings",
        ].map((section) => (
          <div
            key={section}
            className="flex cursor-pointer items-center justify-between border-b border-black/10 pb-4"
          >
            <h3 className="font-beatriceDeckBold text-[14px] text-black">
              {section}
            </h3>
            <ChevronRight className="h-4 w-4 text-black/60" strokeWidth={1.5} />
          </div>
        ))}
      </div>
    </>
  );
}

export default FilterSidebar;
