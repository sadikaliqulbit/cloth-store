"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getProductById } from "@/services/api";
import "@/style/main.css";
import { CartItem } from "@/types";

const sizes = ["XS", "S", "M", "L", "XL", "2X"];

const colors = ["#D9D9D9", "#A9A9A9", "#1E1E1E", "#A6D6CA", "#FFFFFF", "#B9C1E8"];

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

function ProductsDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("#2d2d2d");

  useEffect(() => {
    const fetch = async () => {
      const data = await getProductById(id);
      setProduct(data);
      setSelectedImage(data.image);
    };
    fetch();
  }, [id]);

  if (!product)
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );

  const thumbnails = [
    product.image,
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  const handleAddToCart = () => {
    if (!product) return;

    const cartItem: CartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
    };

    const existing = localStorage.getItem("cart");
    const cart: CartItem[] = existing ? JSON.parse(existing) : [];

    const index = cart.findIndex(
      (item) => item.id === product.id && item.size === selectedSize && item.color === selectedColor
    );

    if (index !== -1) {
      cart[index].quantity += 1;
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <section className="cart-details-style relative mb-20 mtd:mb-0">
      <div className="mx-auto">
        <div className="grid lg:grid-cols-[1fr_420px]">
          <div className="flex justify-center items-center flex-col gap-10 mtd:flex-row">
            <div className="flex-1 border border-[#e5e5e5] bg-[#f1f2f7] min-w-[393px] h-[601px] mtd:max-w-[367px] mtd:h-[438px]">
              <Image
                src={selectedImage}
                alt="product"
                width={367}
                height={438}
                className="w-[367px] h-[438px] object-contain"
              />
            </div>
            <div className="mx-[20px] mtd:mx-0 scrollbar-hide flex gap-3 overflow-x-auto mtd:flex-col">
              {thumbnails.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className="flex-shrink-0 cursor-pointer border border-[#d9d9d9] min-w-[62px] h-[75px]"
                >
                  <Image
                    src={img}
                    alt="thumb"
                    width={62}
                    height={75}
                    className="w-[62px] h-[75px] object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mx-[20px] mtd:mx-auto mtd:w-full mt-9 border border-[#e2e2e2] p-5 md:p-9 xl:sticky xl:top-10 xl:h-fit lg:mt-0 lg:max-w-[306px]">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-beatriceDeckMedium text-[14px] uppercase tracking-[1px] text-black">
                  {product.category}
                </h2>
                <p className="mt-1 font-beatriceDeckMedium text-[13px] text-black/70">
                  {product.title}
                </p>
                <p className="mt-3 font-beatriceDeckMedium text-[14px] text-black">
                  ${product.price}
                </p>
                <p className="mt-1 font-beatriceRegular text-[12px] text-[#7b7b7b]">
                  MRP incl. of all taxes
                </p>
              </div>
              <button>
                <Heart
                  size={18}
                  className="stroke-[#7c7c7c] transition-all hover:fill-black hover:stroke-black"
                />
              </button>
            </div>

            <p className="mt-10 max-w-[280px] font-beatriceDeckMedium text-[12px] leading-[22px] text-black">
              {product.description}
            </p>

            <div className="mt-10">
              <p className="font-beatriceRegular text-[13px] uppercase tracking-[1px] text-[#8c8c8c]">
                Color
              </p>
              <div className="mt-4 flex gap-1">
                {colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    style={{ backgroundColor: color }}
                    className={`h-[32px] w-[32px] border transition-all ${
                      selectedColor === color
                        ? "border-black"
                        : "border-[#d8d8d8]"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-10">
              <p className="font-beatriceRegular text-[13px] uppercase tracking-[1px] text-[#8c8c8c]">
                Size
              </p>
              <div className="mt-4 flex flex-wrap gap-1">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`flex h-[36px] min-w-[38px] items-center font-beatriceDeckMedium justify-center border text-[10px] transition-all ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-[#d8d8d8] bg-white text-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button className="font-beatriceRegular mt-4 text-[10px] uppercase text-[#8a8a8a]">
                Find your size | Measurement guide
              </button>
            </div>

            <button
              className="mt-3 hidden h-[52px] w-full bg-black mtd:max-w-[229px] font-beatriceRegular text-[13px] uppercase tracking-[1px] text-white transition-all hover:opacity-90 mtd:block"
              onClick={() => handleAddToCart()}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 z-50 w-full border-t border-[#dfdfdf] bg-white mtd:hidden">
        <button
          className="h-[52px] w-full bg-black font-beatriceRegular text-[13px] uppercase tracking-[1px] text-white"
          onClick={() => handleAddToCart()}
        >
          Add to Cart
        </button>
      </div>
    </section>
  );
}

export default ProductsDetails;
