import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    // Load wishlist from localStorage on init
    const saved = localStorage.getItem('epicgames-wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem('epicgames-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (game) => {
    setWishlist((prev) => {
      // Prevent duplicates
      if (prev.some((item) => item.gameId === game.gameId)) {
        return prev;
      }
      return [...prev, game];
    });
  };

  const removeFromWishlist = (gameId) => {
    setWishlist((prev) => prev.filter((item) => item.gameId !== gameId));
  };

  const isInWishlist = (gameId) => {
    return wishlist.some((item) => item.gameId === gameId);
  };

  const toggleWishlist = (game) => {
    if (isInWishlist(game.gameId)) {
      removeFromWishlist(game.gameId);
    } else {
      addToWishlist(game);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
