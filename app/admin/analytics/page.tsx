"use client";

import { useEffect, useState } from "react";
import { Order } from "@/types";
import "@/style/admin.css";

export default function AdminAnalyticsPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderStatuses, setOrderStatuses] = useState<Record<number, string>>({});

  useEffect(() => {
    setOrders(JSON.parse(localStorage.getItem("orders") ?? "[]"));
    setOrderStatuses(JSON.parse(localStorage.getItem("orderStatuses") ?? "{}"));
  }, []);

  const getStatus = (id: number) => orderStatuses[id] ?? "Pending";

  const totalRevenue = orders.reduce(
    (sum, o) => sum + o.items.reduce((s, i) => s + i.price * i.quantity, 0) + 10,
    0
  );
 
  const categoryMap: Record<string, number> = {};
  orders.forEach((o) => {
    o.items.forEach((item) => {
      categoryMap[item.category] = (categoryMap[item.category] ?? 0) + item.price * item.quantity;
    });
  });
  const categoryData = Object.entries(categoryMap).sort((a, b) => b[1] - a[1]);
 
  const monthlyMap: Record<string, { orders: number; revenue: number }> = {};
  orders.forEach((o) => {
    const month = new Date(o.placedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" });
    if (!monthlyMap[month]) monthlyMap[month] = { orders: 0, revenue: 0 };
    monthlyMap[month].orders += 1;
    monthlyMap[month].revenue += o.items.reduce((s, i) => s + i.price * i.quantity, 0) + 10;
  });
  const monthlyData = Object.entries(monthlyMap).slice(-6);

  const maxRevenue = Math.max(...monthlyData.map(([, d]) => d.revenue), 1);

  const statusCounts = ["Pending", "Processing", "Delivered", "Cancelled"].map((s) => ({
    label: s,
    count: orders.filter((o) => getStatus(o.id) === s).length,
  }));

  const completionRate =
    orders.length > 0
      ? Math.round((statusCounts.find((s) => s.label === "Delivered")?.count ?? 0) / orders.length * 100)
      : 0;

  return (
    <div>
      <div className="admin-topbar">
        <div>
          <h1 className="admin-section-title">Analytics</h1>
          <p className="font-beatriceRegular text-[12px] text-black/40 mt-1">Store performance overview</p>
        </div>
      </div>

      <div className="p-8 space-y-6"> 
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { label: "Total Revenue", value: `$${totalRevenue.toFixed(2)}` },
            { label: "Total Orders", value: orders.length },
            { label: "Completion Rate", value: `${completionRate}%` },
            { label: "Avg. Order", value: orders.length > 0 ? `$${(totalRevenue / orders.length).toFixed(2)}` : "$0" },
          ].map((kpi) => (
            <div key={kpi.label} className="admin-stat-card">
              <p className="font-beatriceDeckMedium text-[11px] uppercase tracking-wider text-black/40 mb-3">{kpi.label}</p>
              <p className="font-beatriceDeckExtrabold text-[30px] leading-none">{kpi.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6"> 
          <div className="bg-white border border-black/5 p-6">
            <h2 className="font-beatriceDeckMedium text-[14px] uppercase tracking-wider mb-6">Monthly Revenue</h2>
            {monthlyData.length === 0 ? (
              <p className="font-beatriceRegular text-[13px] text-black/30 text-center py-10">No data yet.</p>
            ) : (
              <div className="flex items-end gap-3 h-[180px]">
                {monthlyData.map(([month, data]) => (
                  <div key={month} className="flex flex-col items-center gap-2 flex-1">
                    <p className="font-beatriceDeckMedium text-[10px] text-black/50">
                      ${data.revenue.toFixed(0)}
                    </p>
                    <div
                      className="w-full bg-black transition-all"
                      style={{ height: `${Math.max((data.revenue / maxRevenue) * 140, 4)}px` }}
                    />
                    <p className="font-beatriceRegular text-[10px] text-black/40 text-center">{month.split(" ")[0]}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
 
          <div className="bg-white border border-black/5 p-6">
            <h2 className="font-beatriceDeckMedium text-[14px] uppercase tracking-wider mb-6">Order Status Breakdown</h2>
            <div className="space-y-4">
              {statusCounts.map(({ label, count }) => {
                const pct = orders.length > 0 ? (count / orders.length) * 100 : 0;
                const barColor =
                  label === "Delivered" ? "bg-green-500"
                  : label === "Cancelled" ? "bg-red-400"
                  : label === "Processing" ? "bg-blue-500"
                  : "bg-yellow-400";
                return (
                  <div key={label}>
                    <div className="flex justify-between mb-1">
                      <span className="font-beatriceDeckMedium text-[12px] uppercase tracking-wider">{label}</span>
                      <span className="font-beatriceRegular text-[12px] text-black/50">{count} ({pct.toFixed(0)}%)</span>
                    </div>
                    <div className="h-2 bg-black/5 w-full">
                      <div className={`h-2 ${barColor} transition-all`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
 
        <div className="bg-white border border-black/5 p-6">
          <h2 className="font-beatriceDeckMedium text-[14px] uppercase tracking-wider mb-6">Revenue by Category</h2>
          {categoryData.length === 0 ? (
            <p className="font-beatriceRegular text-[13px] text-black/30 text-center py-10">No data yet.</p>
          ) : (
            <div className="space-y-4">
              {categoryData.map(([cat, revenue]) => {
                const maxCat = categoryData[0][1];
                const pct = (revenue / maxCat) * 100;
                return (
                  <div key={cat} className="flex items-center gap-4">
                    <span className="font-beatriceDeckMedium text-[12px] uppercase tracking-wider w-[160px] truncate">{cat}</span>
                    <div className="flex-1 h-2 bg-black/5">
                      <div className="h-2 bg-black transition-all" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="font-beatriceDeckMedium text-[13px] w-[80px] text-right">${revenue.toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
