import { Suspense } from "react";
import Products from "@/components/sections/Products/Products";

export default function ProductsPage() {
  return (
    <Suspense>
      <Products />
    </Suspense>
  );
}
