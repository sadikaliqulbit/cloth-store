"use client";

import { Heart, Menu, ShoppingBag, User, LogOut } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import logo from "../../../public/assets/images/logo.svg";
import Image from "next/image";
import AuthModal from "@/components/ui/AuthModal/AuthModal";
import { useAuth } from "@/hooks/useAuth";
import { User as UserType } from "@/types";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { currentUser, login, logout } = useAuth();

  const navLinks = [
    { id: 1, title: "Home", href: "/" },
    { id: 2, title: "Collections", href: "/" },
    { id: 3, title: "New", href: "/" },
  ];
 
  useEffect(() => {
    const updateCount = () => {
      if (!currentUser) { setCartCount(0); return; }
      const key = `cart__${currentUser.email}`;
      const stored = localStorage.getItem(key);
      const items = stored ? JSON.parse(stored) : [];
      setCartCount(items.length);
    };
    updateCount();
    window.addEventListener("storage", updateCount); 
    const interval = setInterval(updateCount, 500);
    return () => { window.removeEventListener("storage", updateCount); clearInterval(interval); };
  }, [currentUser]);

  const handleLogin = (user: UserType) => {
    login(user);
  };

  return (
    <>
      <header className="w-full">
        <div className="mx-auto flex h-[92px] max-w-[1440px] items-center justify-between px-5 md:px-8 lg:px-11">
          <div className="flex items-center gap-10">
            <button className="flex mtd:hidden cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu strokeWidth={1.5} className="h-6 w-6 text-black" />
            </button>

            <nav className="hidden items-center gap-10 mtd:flex">
              {navLinks.map((item) => (
                <Link key={item.id} href={item.href}
                  className="text-[15px] font-beatriceDeckMedium tracking-wide text-black transition-opacity duration-300 hover:opacity-60">
                  {item.title}
                </Link>
              ))}
            </nav>

            {isMenuOpen && (
              <div className="absolute left-0 top-[75px] z-50 flex w-full flex-col gap-6 bg-white px-5 py-8 shadow-lg mtd:hidden">
                {navLinks.map((item) => (
                  <Link key={item.id} href={item.href}
                    className="font-beatriceDeckMedium text-lg text-black transition-all duration-300 hover:text-gray-600"
                    onClick={() => setIsMenuOpen(false)}>
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="absolute left-1/2 -translate-x-1/2">
            <Image src={logo} alt="logo" width={35} height={35} />
          </div>

          <div className="flex items-center gap-3">
            <button aria-label="Add to wishlist"
              className="relative hidden h-12 w-12 items-center justify-center rounded-full bg-black text-white mtd:flex">
              <Heart strokeWidth={1.7} className="h-5 w-5 rotate-[-50.22deg]" />
            </button>

            <div className="flex justify-center items-center">
              <Link href="/shopping-bag"
                className="hidden mtd:flex justify-center h-12 w-20 items-center gap-2 rounded-full bg-black text-white">
                <span className="font-beatriceDeckMedium text-[12px] text-center">Cart</span>
              </Link>
              <div className="relative flex w-[41px] h-[41px] justify-center mtd:w-[50px] mtd:h-[50px] items-center rounded-full border-[5px] border-black text-white">
                <Link href="/shopping-bag" aria-label="Shopping cart">
                  <ShoppingBag strokeWidth={1.7} className="h-5 w-5 mtd:h-6 mtd:w-6 text-black" />
                </Link>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] text-white font-beatriceDeckMedium">
                    {cartCount}
                  </span>
                )}
              </div>
            </div>

            {currentUser ? (
              <div className="flex items-center gap-2 border border-[#000] rounded-full pl-5">
                <span className="hidden mtd:block text-[11px] font-beatriceDeckMedium text-black/60">
                  {currentUser.firstName}
                </span>
                <button
                  onClick={logout}
                  aria-label="Logout"
                  className="flex w-[41px] h-[41px] mtd:w-[50px] mtd:h-[50px] items-center justify-center rounded-full bg-black text-white"
                >
                  <LogOut strokeWidth={1.7} className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowModal(true)}
                aria-label="Login"
                className="flex w-[41px] h-[41px] mtd:w-[50px] mtd:h-[50px] items-center justify-center rounded-full bg-black text-white"
              >
                <User strokeWidth={1.7} className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </header>

      {showModal && (
        <AuthModal onClose={() => setShowModal(false)} onLogin={handleLogin} />
      )}
    </>
  );
}

export default Header;
