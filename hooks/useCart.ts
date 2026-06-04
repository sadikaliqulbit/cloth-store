"use client";

import { useState, useEffect } from "react";
import { CartItem } from "@/types";
 
const itemKey = (item: CartItem) => `${item.id}__${item.size}__${item.color}`;

function getStorageKey(email: string) {
  return `cart__${email}`;
}

export function useCart(userEmail: string | null) {
  const storageKey = userEmail ? getStorageKey(userEmail) : null;

  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined" || !storageKey) return [];
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : [];
  });   
  
  useEffect(() => {
    if (!storageKey) {
      setItems([]);
      return;
    }
    const stored = localStorage.getItem(storageKey);
    setItems(stored ? JSON.parse(stored) : []);
  }, [storageKey]);

  const save = (updated: CartItem[]) => {
    if (storageKey) localStorage.setItem(storageKey, JSON.stringify(updated));
    setItems(updated);
  };

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => itemKey(i) === itemKey(item));
      const updated =
        idx !== -1
          ? prev.map((i, index) =>
              index === idx ? { ...i, quantity: i.quantity + 1 } : i
            )
          : [...prev, item];
      if (storageKey) localStorage.setItem(storageKey, JSON.stringify(updated));
      return updated;
    });
  };

  const removeItem = (key: string) => {
    setItems((prev) => {
      const updated = prev.filter((i) => itemKey(i) !== key);
      if (storageKey) localStorage.setItem(storageKey, JSON.stringify(updated));
      return updated;
    });
  };

  const updateQuantity = (key: string, qty: number) => {
    if (qty < 1) return;
    setItems((prev) => {
      const updated = prev.map((i) =>
        itemKey(i) === key ? { ...i, quantity: qty } : i
      );
      if (storageKey) localStorage.setItem(storageKey, JSON.stringify(updated));
      return updated;
    });
  };

  const clearCart = () => save([]);

  return { items, addItem, removeItem, updateQuantity, clearCart, itemKey };
}
