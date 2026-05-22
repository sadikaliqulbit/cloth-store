import { CartItem } from "@/types";

const BASE_URL = "https://fakestoreapi.com/products";

type ApiProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export const getProducts = async (): Promise<CartItem[]> => {
  const response = await fetch(BASE_URL);
  const data: ApiProduct[] = await response.json();
  return data.map(({ id, image, price, category, title }) => ({
    id,
    image,
    price,
    category,
    title,
    size: "",
    color: "",
    quantity: 1,
  }));
};

export const getProductById = async (id: string | string[] | undefined): Promise<ApiProduct> => {
  const response = await fetch(`${BASE_URL}/${id}`);
  return response.json();
};

export const getProductImages = async (): Promise<string[]> => {
  const response = await fetch(BASE_URL);
  const data: ApiProduct[] = await response.json();
  return data.map((item) => item.image);
};
