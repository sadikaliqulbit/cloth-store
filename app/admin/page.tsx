"use client";

import { useEffect, useState } from "react";
import { ShoppingBag, Users, TrendingUp, Package, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Order, CartItem } from "@/types";
import Image from "next/image";
import "@/style/admin.css";

type Stat = {
  label: string;
  value: string;
  change: string;
  up: boolean;
  icon: React.ReactNode;
};

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<unknown[]>([]);
  const [topProducts, setTopProducts] = useState<{ item: CartItem; total: number }[]>([]);

  useEffect(() => {
    const storedOrders: Order[] = JSON.parse(localStorage.getItem("orders") ?? "[]");
    const storedUsers: unknown[] = JSON.parse(localStorage.getItem("users") ?? "[]");
    setOrders(storedOrders);
    setUsers(storedUsers);

    const productMap = new Map<string, { item: CartItem; total: number }>();
    storedOrders.forEach((order) => {
      order.items.forEach((item) => {
        const key = String(item.id);
        const existing = productMap.get(key);
        if (existing) {
          existing.total += item.quantity;
        } else {
          productMap.set(key, { item, total: item.quantity });
        }
      });
    });
    const sorted = Array.from(productMap.values()).sort((a, b) => b.total - a.total).slice(0, 5);
    setTopProducts(sorted);
  }, []);

  const totalRevenue = orders.reduce(
    (sum, o) => sum + o.items.reduce((s, i) => s + i.price * i.quantity, 0) + 10,
    0
  );
  const totalItems = orders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0), 0);

  const stats: Stat[] = [
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      change: "+12.5%",
      up: true,
      icon: <TrendingUp size={20} />,
    },
    {
      label: "Total Orders",
      value: String(orders.length),
      change: "+8.2%",
      up: true,
      icon: <ShoppingBag size={20} />,
    },
    {
      label: "Customers",
      value: String(users.length),
      change: "+3.1%",
      up: true,
      icon: <Users size={20} />,
    },
    {
      label: "Items Sold",
      value: String(totalItems),
      change: "-2.4%",
      up: false,
      icon: <Package size={20} />,
    },
  ];

  const statusList = ["Pending", "Processing", "Delivered", "Cancelled"];
  const [orderStatuses, setOrderStatuses] = useState<Record<number, string>>({});

  useEffect(() => {
    const stored = localStorage.getItem("orderStatuses");
    if (stored) setOrderStatuses(JSON.parse(stored));
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

  return (
    <div>
      <div className="admin-topbar">
        <div>
          <h1 className="admin-section-title">Dashboard</h1>
          <p className="font-beatriceRegular text-[12px] text-black/40 mt-1">
            Welcome back — here&apos;s what&apos;s happening today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white text-[11px] font-beatriceDeckMedium">
            A
          </div>
          <span className="font-beatriceDeckMedium text-[13px]">Admin</span>
        </div>
      </div>

      <div className="p-8">
        {/* Stats */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="admin-stat-card">
              <div className="flex items-center justify-between mb-4">
                <span className="font-beatriceDeckMedium text-[11px] uppercase tracking-wider text-black/40">
                  {stat.label}
                </span>
                <div className="w-9 h-9 bg-black/5 flex items-center justify-center text-black/60">
                  {stat.icon}
                </div>
              </div>
              <p className="font-beatriceDeckExtrabold text-[28px] leading-none">{stat.value}</p>
              <div className={`flex items-center gap-1 mt-2 ${stat.up ? "text-green-600" : "text-red-500"}`}>
                {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                <span className="font-beatriceRegular text-[11px]">{stat.change} this month</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">
          {/* Recent Orders */}
          <div className="bg-white border border-black/5 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-beatriceDeckMedium text-[14px] uppercase tracking-wider">Recent Orders</h2>
              <a href="/admin/orders" className="font-beatriceRegular text-[12px] text-black/40 hover:text-black underline underline-offset-2 transition">
                View all
              </a>
            </div>

            {orders.length === 0 ? (
              <p className="font-beatriceRegular text-[13px] text-black/30 text-center py-10">No orders yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(-8).reverse().map((order) => {
                      const orderTotal = order.items.reduce((s, i) => s + i.price * i.quantity, 0) + 10;
                      return (
                        <tr key={order.id}>
                          <td className="font-beatriceDeckMedium text-[12px] text-black/50">#{order.id.toString().slice(-6)}</td>
                          <td>
                            <p className="font-beatriceDeckMedium text-[13px]">
                              {order.shippingInfo.firstName} {order.shippingInfo.lastName}
                            </p>
                            <p className="font-beatriceRegular text-[11px] text-black/40">{order.shippingInfo.email}</p>
                          </td>
                          <td className="font-beatriceRegular">{order.items.reduce((s, i) => s + i.quantity, 0)}</td>
                          <td className="font-beatriceDeckMedium">${orderTotal.toFixed(2)}</td>
                          <td className="font-beatriceRegular text-black/50">
                            {new Date(order.placedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </td>
                          <td>
                            <select
                              value={getStatus(order.id)}
                              onChange={(e) => updateStatus(order.id, e.target.value)}
                              className={`${badgeClass(getStatus(order.id))} cursor-pointer outline-none bg-transparent border-none`}
                            >
                              {statusList.map((s) => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Top Products */}
          <div className="bg-white border border-black/5 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-beatriceDeckMedium text-[14px] uppercase tracking-wider">Top Products</h2>
              <a href="/admin/products" className="font-beatriceRegular text-[12px] text-black/40 hover:text-black underline underline-offset-2 transition">
                View all
              </a>
            </div>

            {topProducts.length === 0 ? (
              <p className="font-beatriceRegular text-[13px] text-black/30 text-center py-10">No data yet.</p>
            ) : (
              <div className="space-y-4">
                {topProducts.map(({ item, total }, i) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <span className="font-beatriceDeckMedium text-[11px] text-black/30 w-4">{i + 1}</span>
                    <div className="w-10 h-10 bg-[#f1f2f7] flex items-center justify-center flex-shrink-0">
                      <Image src={item.image} alt={item.title} width={36} height={36} className="object-contain w-9 h-9" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-beatriceDeckMedium text-[12px] truncate">{item.title}</p>
                      <p className="font-beatriceRegular text-[11px] text-black/40">{item.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-beatriceDeckMedium text-[13px]">{total} sold</p>
                      <p className="font-beatriceRegular text-[11px] text-black/40">${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="bg-white border border-black/5 p-6 xl:col-span-2">
            <h2 className="font-beatriceDeckMedium text-[14px] uppercase tracking-wider mb-6">Order Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {statusList.map((status) => {
                const count = orders.filter((o) => getStatus(o.id) === status).length;
                const pct = orders.length > 0 ? Math.round((count / orders.length) * 100) : 0;
                return (
                  <div key={status} className="text-center p-4 bg-[#f9f9f9]">
                    <p className={`font-beatriceDeckExtrabold text-[28px] ${status === "Delivered" ? "text-green-600" : status === "Cancelled" ? "text-red-500" : status === "Processing" ? "text-blue-600" : "text-yellow-600"}`}>
                      {count}
                    </p>
                    <p className="font-beatriceDeckMedium text-[11px] uppercase tracking-wider text-black/50 mt-1">{status}</p>
                    <p className="font-beatriceRegular text-[10px] text-black/30 mt-1">{pct}%</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-black text-white p-6">
            <h2 className="font-beatriceDeckMedium text-[14px] uppercase tracking-wider mb-6 text-white/60">Revenue Summary</h2>
            <p className="font-beatriceDeckExtrabold text-[36px] leading-none">${totalRevenue.toFixed(2)}</p>
            <p className="font-beatriceRegular text-[12px] text-white/40 mt-2">Total lifetime revenue</p>
            <div className="mt-6 space-y-3 border-t border-white/10 pt-6">
              <div className="flex justify-between">
                <span className="font-beatriceRegular text-[12px] text-white/50">Orders</span>
                <span className="font-beatriceDeckMedium text-[12px]">{orders.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-beatriceRegular text-[12px] text-white/50">Avg. Order Value</span>
                <span className="font-beatriceDeckMedium text-[12px]">
                  ${orders.length > 0 ? (totalRevenue / orders.length).toFixed(2) : "0.00"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-beatriceRegular text-[12px] text-white/50">Total Items Sold</span>
                <span className="font-beatriceDeckMedium text-[12px]">{totalItems}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
