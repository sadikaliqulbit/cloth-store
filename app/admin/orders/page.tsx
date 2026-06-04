"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { Order } from "@/types";
import "@/style/admin.css";

const statusList = ["All", "Pending", "Processing", "Delivered", "Cancelled"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderStatuses, setOrderStatuses] = useState<Record<number, string>>({});
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Order | null>(null);

  useEffect(() => {
    setOrders(JSON.parse(localStorage.getItem("orders") ?? "[]"));
    setOrderStatuses(JSON.parse(localStorage.getItem("orderStatuses") ?? "{}"));
  }, []);

  const updateStatus = (id: number, status: string) => {
    const updated = { ...orderStatuses, [id]: status };
    setOrderStatuses(updated);
    localStorage.setItem("orderStatuses", JSON.stringify(updated));
  };

  const getStatus = (id: number) => orderStatuses[id] ?? "Pending";

  const badgeClass = (status: string) => {
    if (status === "Delivered") return "admin-badge admin-badge-delivered";
    if (status === "Cancelled") return "admin-badge admin-badge-cancelled";
    if (status === "Processing") return "admin-badge admin-badge-processing";
    return "admin-badge admin-badge-pending";
  };

  const filtered = orders
    .filter((o) => filter === "All" || getStatus(o.id) === filter)
    .filter((o) => {
      const q = search.toLowerCase();
      return (
        !q ||
        o.shippingInfo.firstName.toLowerCase().includes(q) ||
        o.shippingInfo.lastName.toLowerCase().includes(q) ||
        o.shippingInfo.email.toLowerCase().includes(q) ||
        String(o.id).includes(q)
      );
    })
    .reverse();

  return (
    <div>
      <div className="admin-topbar">
        <div>
          <h1 className="admin-section-title">Orders</h1>
          <p className="font-beatriceRegular text-[12px] text-black/40 mt-1">
            {orders.length} total orders
          </p>
        </div>
      </div>

      <div className="p-8">
        <div className="bg-white border border-black/5 p-6">
          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="flex items-center gap-2 bg-[#f5f5f5] px-3 h-[40px] w-full md:max-w-[300px]">
              <Search size={14} className="text-black/40" />
              <input
                type="text"
                placeholder="Search orders..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-[12px] font-beatriceRegular w-full"
              />
              {search && <button onClick={() => setSearch("")}><X size={12} className="text-black/40" /></button>}
            </div>

            <div className="flex gap-2 flex-wrap">
              {statusList.map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`h-[36px] px-4 text-[11px] font-beatriceDeckMedium uppercase tracking-wider transition ${
                    filter === s ? "bg-black text-white" : "bg-[#f5f5f5] text-black/50 hover:text-black"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="font-beatriceRegular text-[13px] text-black/30 text-center py-16">No orders found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Location</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((order) => {
                    const total = order.items.reduce((s, i) => s + i.price * i.quantity, 0) + 10;
                    const status = getStatus(order.id);
                    return (
                      <tr key={order.id} className="hover:bg-[#fafafa]">
                        <td className="font-beatriceDeckMedium text-[12px] text-black/40">
                          #{String(order.id).slice(-6)}
                        </td>
                        <td>
                          <p className="font-beatriceDeckMedium text-[13px]">
                            {order.shippingInfo.firstName} {order.shippingInfo.lastName}
                          </p>
                          <p className="font-beatriceRegular text-[11px] text-black/40">{order.shippingInfo.email}</p>
                        </td>
                        <td className="font-beatriceRegular text-black/60">
                          {order.shippingInfo.city}, {order.shippingInfo.country}
                        </td>
                        <td className="font-beatriceRegular">{order.items.reduce((s, i) => s + i.quantity, 0)}</td>
                        <td className="font-beatriceDeckMedium">${total.toFixed(2)}</td>
                        <td className="font-beatriceRegular text-black/50">
                          {new Date(order.placedAt).toLocaleDateString("en-US", {
                            month: "short", day: "numeric", year: "numeric",
                          })}
                        </td>
                        <td>
                          <select
                            value={status}
                            onChange={(e) => updateStatus(order.id, e.target.value)}
                            className={`${badgeClass(status)} cursor-pointer outline-none bg-transparent border-none`}
                          >
                            {statusList.slice(1).map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <button
                            onClick={() => setSelected(order)}
                            className="font-beatriceRegular text-[11px] text-black/40 hover:text-black underline underline-offset-2 transition"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Order Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-[540px] max-h-[90vh] overflow-y-auto p-8 relative">
            <button
              onClick={() => setSelected(null)}
              className="absolute right-5 top-5 text-black/30 hover:text-black"
            >
              <X size={18} />
            </button>

            <p className="font-beatriceRegular text-[11px] text-black/40 mb-1">
              Order #{String(selected.id).slice(-6)}
            </p>
            <h2 className="font-beatriceDeckExtrabold text-[20px] uppercase mb-6">
              {selected.shippingInfo.firstName} {selected.shippingInfo.lastName}
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="font-beatriceDeckMedium text-[10px] uppercase tracking-wider text-black/40 mb-1">Email</p>
                <p className="font-beatriceRegular text-[13px]">{selected.shippingInfo.email}</p>
              </div>
              <div>
                <p className="font-beatriceDeckMedium text-[10px] uppercase tracking-wider text-black/40 mb-1">Phone</p>
                <p className="font-beatriceRegular text-[13px]">{selected.shippingInfo.phone}</p>
              </div>
              <div className="col-span-2">
                <p className="font-beatriceDeckMedium text-[10px] uppercase tracking-wider text-black/40 mb-1">Address</p>
                <p className="font-beatriceRegular text-[13px]">
                  {selected.shippingInfo.address}, {selected.shippingInfo.city},{" "}
                  {selected.shippingInfo.state}, {selected.shippingInfo.country} — {selected.shippingInfo.postalCode}
                </p>
              </div>
            </div>

            <div className="border-t border-black/5 pt-6">
              <p className="font-beatriceDeckMedium text-[11px] uppercase tracking-wider text-black/40 mb-4">Items</p>
              <div className="space-y-3">
                {selected.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#f1f2f7] flex items-center justify-center flex-shrink-0">
                        <img src={item.image} alt={item.title} className="w-7 h-7 object-contain" />
                      </div>
                      <div>
                        <p className="font-beatriceDeckMedium text-[12px] max-w-[200px] truncate">{item.title}</p>
                        <p className="font-beatriceRegular text-[11px] text-black/40">
                          {item.size} / {item.color} × {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-beatriceDeckMedium text-[13px]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-black/5 mt-6 pt-4 space-y-2">
              <div className="flex justify-between font-beatriceRegular text-[13px] text-black/50">
                <span>Subtotal</span>
                <span>${selected.items.reduce((s, i) => s + i.price * i.quantity, 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-beatriceRegular text-[13px] text-black/50">
                <span>Shipping</span><span>$10.00</span>
              </div>
              <div className="flex justify-between font-beatriceDeckMedium text-[15px]">
                <span>Total</span>
                <span>${(selected.items.reduce((s, i) => s + i.price * i.quantity, 0) + 10).toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6">
              <p className="font-beatriceDeckMedium text-[11px] uppercase tracking-wider text-black/40 mb-2">Update Status</p>
              <select
                value={getStatus(selected.id)}
                onChange={(e) => updateStatus(selected.id, e.target.value)}
                className="admin-input"
              >
                {statusList.slice(1).map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
