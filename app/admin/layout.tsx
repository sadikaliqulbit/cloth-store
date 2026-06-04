"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, ShoppingBag, Package, Users, LogOut, BarChart2 } from "lucide-react";
import "@/style/admin.css";
import Image from "next/image";
import logo from "@/public/assets/images/logo.svg";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart2 },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div>
      <aside className="admin-sidebar">
        <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
          <Image src={logo} alt="logo" width={28} height={28} className="invert" />
          <div>
            <p className="font-beatriceDeckExtrabold text-[14px] uppercase tracking-wider">Admin</p>
            <p className="font-beatriceRegular text-[10px] text-white/40">Control Panel</p>
          </div>
        </div>

        <nav className="mt-4 flex-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href} className={active ? "admin-nav-link-active" : "admin-nav-link"}>
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="px-6 py-6 border-t border-white/10">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-3 text-[13px] font-beatriceDeckMedium text-white/50 hover:text-white transition"
          >
            <LogOut size={16} />
            Back to Store
          </button>
        </div>
      </aside>

      <main className="admin-content">{children}</main>
    </div>
  );
}
