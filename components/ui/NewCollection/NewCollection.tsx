"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import arrow from "@/public/assets/NewCollection/arrow.svg";
import { useRouter } from "next/navigation";
import { getProductImages } from "@/api/api";

function NewCollection() {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const route = useRouter();

  useEffect(() => {
    const fetchImages = async () => {
      const data = await getProductImages();
      setImages(data);
    };

    fetchImages();
  }, []);

  const nextSlide = () => {
    if (currentIndex < images.length - 2) {
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
      <div className="grid grid-cols-1 gap-3 mtd:grid-cols-[338px_1fr]">
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="font-beatriceDeckExtrabold text-[35px] mtd:text-[48px] uppercase leading-[40px] tracking-[2px] text-black">
              New
              <br />
              Collection
            </h1>

            <p className="mt-4 font-beatriceDeckRegular text-[16px] leading-[100%] tracking-[2px] text-black/70">
              Summer
              <br />
              2024
            </p>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <button
              className="flex h-[50px] w-[265px] items-center justify-between bg-[#d9d9d9] px-5"
              onClick={() => route.push("/products")}
            >
              <span className="font-beatriceDeckMedium text-[16px]">
                Go To Shop
              </span>

              <Image src={arrow} alt="arrow" width={35} height={35} />
            </button>

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
        </div>
        <div className="relative overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 392}px)`,
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="flex h-[376px] min-w-[300px] xl:min-w-[366px] 3xl:w-full items-center justify-center border border-black/5 bg-[#f7f7f7]"
              >
                <Image
                  src={image}
                  alt="product"
                  width={366}
                  height={376}
                  className="h-[300px] w-[300px] object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewCollection;
