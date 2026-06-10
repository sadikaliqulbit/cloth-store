"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { CartItem } from "@/types";
import { getProducts } from "@/api/api";
import Image from "next/image";
import "@/style/admin.css";
import Pagination from "@/components/ui/Pagination/Pagination";

const categories = ["All", "men's clothing", "women's clothing", "jewelery", "electronics"];
const PER_PAGE = 8;

export default function AdminProductsPage() {
  const [products, setProducts] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getProducts().then((data) => { setProducts(data); setLoading(false); });
  }, []);

  useEffect(() => { setPage(1); }, [search, category]);

  const filtered = products.filter((p) => {
    const matchCat = category === "All" || p.category === category;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div>
      <div className="admin-topbar">
        <div>
          <h1 className="admin-section-title">Products</h1>
          <p className="font-beatriceRegular text-[12px] text-black/40 mt-1">{products.length} total products</p>
        </div>
      </div>

      <div className="p-8">
        <div className="bg-white border border-black/5 p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="flex items-center gap-2 bg-[#f5f5f5] px-3 h-[40px] w-full md:max-w-[300px]">
              <Search size={14} className="text-black/40" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-[12px] font-beatriceRegular w-full"
              />
              {search && <button onClick={() => setSearch("")}><X size={12} className="text-black/40" /></button>}
            </div>

            <div className="flex gap-2 flex-wrap">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`h-[36px] px-4 text-[11px] font-beatriceDeckMedium uppercase tracking-wider transition ${
                    category === c ? "bg-black text-white" : "bg-[#f5f5f5] text-black/50 hover:text-black"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <p className="font-beatriceRegular text-[13px] text-black/30 text-center py-16">Loading products...</p>
          ) : filtered.length === 0 ? (
            <p className="font-beatriceRegular text-[13px] text-black/30 text-center py-16">No products found.</p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.map((product) => (
                      <tr key={product.id} className="hover:bg-[#fafafa]">
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#f1f2f7] flex items-center justify-center flex-shrink-0">
                              <Image src={product.image} alt={product.title} width={36} height={36} className="object-contain w-9 h-9" />
                            </div>
                            <p className="font-beatriceDeckMedium text-[13px] max-w-[300px] truncate">{product.title}</p>
                          </div>
                        </td>
                        <td>
                          <span className="admin-badge bg-black/5 text-black/60">{product.category}</span>
                        </td>
                        <td className="font-beatriceDeckMedium">${product.price.toFixed(2)}</td>
                        <td className="font-beatriceRegular text-black/30 text-[12px]">#{product.id}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Pagination
                currentPage={page}
                totalPages={totalPages}
                totalItems={filtered.length}
                perPage={PER_PAGE}
                onPageChange={setPage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
