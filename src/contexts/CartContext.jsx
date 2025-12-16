import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

const STORAGE_KEY = 'epicgames-cart';

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (game, quantity = 1) => {
    if (!game) return;
    setItems((prev) => {
      const exists = prev.find((item) => item.gameId === game.gameId);
      if (exists) {
        return prev.map((item) =>
          item.gameId === game.gameId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      const price = game.price || {};
      return [
        ...prev,
        {
          gameId: game.gameId,
          title: game.title,
          price: price,
          media: game.media,
          productType: game.productType,
          isFree: game.isFree,
          quantity,
        },
      ];
    });
  };

  const removeFromCart = (gameId) => {
    setItems((prev) => prev.filter((item) => item.gameId !== gameId));
  };

  const updateQuantity = (gameId, quantity) => {
    setItems((prev) =>
      prev.map((item) =>
        item.gameId === gameId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const isInCart = (gameId) => items.some((item) => item.gameId === gameId);

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => {
      if (item.isFree) return sum;
      const priceValue =
        item.price?.discountRate && item.price?.current !== undefined
          ? item.price.current
          : item.price?.current ?? item.price?.original ?? 0;
      const numeric = typeof priceValue === 'string' ? parseFloat(priceValue) : priceValue;
      return sum + (numeric || 0) * (item.quantity || 1);
    }, 0);
    return { subtotal, total: subtotal };
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
        totals,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

