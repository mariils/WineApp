import { createContext, ReactNode, useContext, useState } from "react";
import type { Wine } from "../types/wine";

export type CartItem = { wine: Wine; quantity: number };

type AppContextData = {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  cart: CartItem[];
  addToCart: (wine: Wine) => void;
  changeQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  cartCount: number;
  cartTotal: number;
};

const AppContext = createContext<AppContextData | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  function toggleFavorite(id: string) {
    setFavorites((current) =>
      current.includes(id) ? current.filter((f) => f !== id) : [...current, id]
    );
  }

  function addToCart(wine: Wine) {
    setCart((current) => {
      const exists = current.some((item) => item.wine.id === wine.id);
      if (exists) {
        return current.map((item) =>
          item.wine.id === wine.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...current, { wine, quantity: 1 }];
    });
  }

  function changeQuantity(id: string, delta: number) {
    setCart((current) =>
      current
        .map((item) =>
          item.wine.id === id
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(id: string) {
    setCart((current) => current.filter((item) => item.wine.id !== id));
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.wine.price * item.quantity,
    0
  );

  return (
    <AppContext.Provider
      value={{
        favorites,
        toggleFavorite,
        cart,
        addToCart,
        changeQuantity,
        removeFromCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp deve ser usado dentro do AppProvider");
  }
  return context;
}