"use client";

import { getProducts } from "@/services/api";
import { CartItem } from "@/types";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import "@/style/main.css"; 
import { useRouter } from "next/navigation";

type CardProps = {
  initialItems?: number;
  gridCols?: string;
  cardClassName?: string;
  isClickable:boolean;
};

function Card({
  initialItems = 3,
  gridCols = "lg:grid-cols-2",
  cardClassName = "",
  isClickable=false
}: CardProps) {
  const [item, setItem] = useState<CartItem[]>([]);
  const [showAll, setShowAll] = useState(false);
  const routes = useRouter();

  useEffect(() => {
    const fetchTitle = async () => {
      const data = await getProducts();
      setItem(data);
    };

    fetchTitle();
  }, []);

  const visibleItems = showAll ? item : item.slice(0, initialItems);

  const handleRouter = (id: number) => {
    if (isClickable) {
      routes.push(`/product-details/${id}`);
    }
  };

  return (
    <section>
      <div
        className={`mt-10 grid grid-cols-2 gap-2 md:grid-cols-2 mtd:gap-4 xl:grid-cols-3 xl:gap-10 ${gridCols}`}
      >
        {visibleItems.map((item, index) => (
          <div key={index} className="cursor-pointer" onClick={() => handleRouter(item.id)}>
            <div
              className={`flex items-center justify-center border border-black/5 bg-[#f1f2f7] min-w-[169px] h-[200px] mtd:min-w-[265px] mtd:h-[314px] ${cardClassName}`}
            >
              <Image
                src={item.image}
                alt="product"
                width={366}
                height={376}
                className="h-[140px] w-[140px] mtd:h-[300px] mtd:w-[300px] object-contain"
              />
            </div>

            <div className="mt-5 p-[1.5rem] lg:p-0 mtd:p-5 ">
              <span className="font-beatriceDeckMedium text-[14px] font-medium text-black/60">
                {item.category}
              </span>

              <div className="flex items-center justify-between">
                <p className="font-beatriceDeckMedium text-[12px] mtd:text-[14px] font-medium text-[#000000]">
                  {item.title}
                </p>

                <p className="font-beatriceDeckMedium text-[12px] mtd:text-[14px] font-medium text-[#000000]">
                  ${item.price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {item.length > initialItems && (
        <div className="mt-10 flex items-center justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex flex-col items-center justify-center"
          >
            <p className="font-beatriceRegular text-[16px] font-normal">
              {showAll ? "Show Less" : "More"}
            </p>

            <ChevronDown className="mt-1" />
          </button>
        </div>
      )}
    </section>
  );
}

export default Card;
