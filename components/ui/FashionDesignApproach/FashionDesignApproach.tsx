"use client";

import { getProductImages } from "@/services/api";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function FashionDesignApproach() {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const data = await getProductImages();
      setImages(data);
    };

    fetchImages();
  }, []);

  return (
    <section className="mt-32 overflow-hidden"> 
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-beatriceDeckRegular text-[35px] mtd:text-[48px] font-normal text-center uppercase leading-[40px] tracking-[2px] text-black">
          Our Approach to fashion design
        </h1>

        <p className="mt-5 max-w-[685px] text-center font-beatriceLight text-[12px] mtd:text-[16px] font-light leading-7 text-black/70">
          at elegant vogue , we blend creativity with craftsmanship to create
          fashion that transcends trends and stands the test of time each design
          is meticulously crafted, ensuring the highest quality exquisite finish
        </p>
      </div>
 
      <div className="mt-20 overflow-x-auto scrollbar-hide">
        <div className="flex min-w-max items-start gap-9 ">
          {images.map((image, index) => (
            <div
              key={index}
              className={`
                flex-shrink-0 overflow-hidden  h-[300px] min-w-[300px] mtd:h-[376px] mtd:min-w-[366px]
                ${index % 2 === 0 ? "mt-0" : "mt-24"}
              `}
            >
              <Image
                src={image}
                alt="fashion-image"
                width={317}
                height={389}
                className="h-[100%] w-[317px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FashionDesignApproach;
