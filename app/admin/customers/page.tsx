"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { User, Order } from "@/types";
import "@/style/admin.css";
import Pagination from "@/components/ui/Pagination/Pagination";

const PER_PAGE = 10;

export default function AdminCustomersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem("users") ?? "[]"));
    setOrders(JSON.parse(localStorage.getItem("orders") ?? "[]"));
  }, []);

  useEffect(() => { setPage(1); }, [search]);

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return !q || u.firstName.toLowerCase().includes(q) || u.lastName.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const getOrderCount = (email: string) =>
    orders.filter((o) => o.shippingInfo.email === email).length;

  const getTotalSpent = (email: string) =>
    orders
      .filter((o) => o.shippingInfo.email === email)
      .reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.price * i.quantity, 0) + 10, 0);

  return (
    <div>
      <div className="admin-topbar">
        <div>
          <h1 className="admin-section-title">Customers</h1>
          <p className="font-beatriceRegular text-[12px] text-black/40 mt-1">{users.length} registered customers</p>
        </div>
      </div>

      <div className="p-8">
        <div className="bg-white border border-black/5 p-6">
          <div className="flex items-center gap-2 bg-[#f5f5f5] px-3 h-[40px] w-full md:max-w-[300px] mb-6">
            <Search size={14} className="text-black/40" />
            <input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-[12px] font-beatriceRegular w-full"
            />
            {search && <button onClick={() => setSearch("")}><X size={12} className="text-black/40" /></button>}
          </div>

          {filtered.length === 0 ? (
            <p className="font-beatriceRegular text-[13px] text-black/30 text-center py-16">No customers found.</p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Email</th>
                      <th>Orders</th>
                      <th>Total Spent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.map((user, i) => {
                      const orderCount = getOrderCount(user.email);
                      const spent = getTotalSpent(user.email);
                      return (
                        <tr key={i} className="hover:bg-[#fafafa]">
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-beatriceDeckMedium text-[11px] flex-shrink-0">
                                {user.firstName[0]?.toUpperCase()}
                              </div>
                              <p className="font-beatriceDeckMedium text-[13px]">
                                {user.firstName} {user.lastName}
                              </p>
                            </div>
                          </td>
                          <td className="font-beatriceRegular text-black/60">{user.email}</td>
                          <td>
                            <span className={`admin-badge ${orderCount > 0 ? "admin-badge-processing" : "bg-black/5 text-black/40"}`}>
                              {orderCount} order{orderCount !== 1 ? "s" : ""}
                            </span>
                          </td>
                          <td className="font-beatriceDeckMedium">
                            {spent > 0 ? `$${spent.toFixed(2)}` : <span className="text-black/30 font-beatriceRegular">—</span>}
                          </td>
                        </tr>
                      );
                    })}
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
