"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getProducts } from "@/services/api";

function NewThisWeek() {
  type Product = {
    image: string;
    price: number;
    category: string;
    title: string;
  };
  const [item, setItem] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTitle = async () => {
      const data = await getProducts();
      setItem(data);
    };

    fetchTitle();
  }, []);

  const nextSlide = () => {
    if (currentIndex < item.length - 2) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <section className="w-full overflow-hidden mt-20">
      <div className="flex justify-between items-center">
        <h1 className=" font-beatriceDeckExtrabold text-[35px] mtd:text-[48px] uppercase leading-[40px] tracking-[2px] text-black">
          New
          <br />
          this week
          <span className="font-beatriceDeckExtrabold leading-[40px] text-[#000E8A] text-[20px]">
            (50)
          </span>
        </h1>

        <p className="mt-4 font-beatriceDeckRegular text-[16px] leading-[100%] tracking-[2px] text-black/70">
          See All
        </p>
      </div>
      <div className="grid grid-cols-1 gap-3 mtd:grid-cols-4">
        <div className="mt-10 flex items-center gap-4">
          <div
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 392}px)`,
            }}
          >
            {item.map((item, index) => (
              <div key={index}>
                <div className="flex h-[300px] w-[290px] xl:h-[376px] xl:min-w-[366px] 3xl:w-full items-center justify-center border border-black/5 bg-[#f1f2f7]">
                  <Image
                    src={item.image}
                    alt="product"
                    width={366}
                    height={376}
                    className="h-[300px] w-[300px] object-contain"
                  />
                </div>
                <div className="mt-5 p-[1.5rem] mtd:p-5 lg:p-0">
                  <span className="font-beatriceDeckMedium text-[14px] text-black/60 font-medium">
                    {item.category}
                  </span>
                  <div className="flex justify-between items-center">
                    <p className="font-beatriceDeckMedium text-[14px] text-[#000000] font-medium">
                      {item.title}
                    </p>
                    <p className="font-beatriceDeckMedium text-[14px] text-[#000000] font-medium">
                      ${item.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-7">
        <div className="flex items-center gap-2">
          <button
            aria-label="prev Slide"
            onClick={prevSlide}
            className="flex h-[40px] w-[40px] items-center justify-center border border-black/10 bg-white transition-all duration-300 hover:bg-black hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            aria-label="Next slide"
            onClick={nextSlide}
            className="flex h-[40px] w-[40px] items-center justify-center border border-black/10 bg-white transition-all duration-300 hover:bg-black hover:text-white"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default NewThisWeek;
