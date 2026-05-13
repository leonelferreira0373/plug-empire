"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  image: string;
  size?: string;
  color?: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  add: (item: CartItem) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggle: () => void;
};

const keyOf = (i: Pick<CartItem, "slug" | "size" | "color">) =>
  `${i.slug}__${i.size ?? ""}__${i.color ?? ""}`;

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      add: (item) =>
        set((s) => {
          const k = keyOf(item);
          const existing = s.items.find((i) => keyOf(i) === k);
          if (existing) {
            return {
              items: s.items.map((i) =>
                keyOf(i) === k ? { ...i, qty: i.qty + item.qty } : i,
              ),
              isOpen: true,
            };
          }
          return { items: [...s.items, item], isOpen: true };
        }),
      remove: (key) =>
        set((s) => ({ items: s.items.filter((i) => keyOf(i) !== key) })),
      setQty: (key, qty) =>
        set((s) => ({
          items: s.items
            .map((i) => (keyOf(i) === key ? { ...i, qty } : i))
            .filter((i) => i.qty > 0),
        })),
      clear: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
    }),
    {
      name: "plug-empire-cart",
      partialize: (s) => ({ items: s.items }),
    },
  ),
);

export const cartKey = keyOf;
