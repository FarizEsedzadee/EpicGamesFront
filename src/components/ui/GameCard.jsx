import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bookmark, BookmarkCheck, ShoppingCart } from "lucide-react";
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'react-router-dom';

export default function GameCard({ game }) {
  const wishlistContext = useWishlist();
  const isInWishlist = wishlistContext?.isInWishlist || (() => false);
  const toggleWishlist = wishlistContext?.toggleWishlist || (() => { });
  const inWishlist = isInWishlist(game.gameId);
  const cartContext = useCart();
  const isInCart = cartContext?.isInCart || (() => false);
  const addToCart = cartContext?.addToCart || (() => { });
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(game);
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInCart(game.gameId)) {
      navigate('/cart');
    } else {
      if (!isAuthenticated) {
        navigate('/login', { state: { from: location.pathname } });
        return;
      }
      addToCart(game, 1);
    }
  };

  return (
    <Link to={`/game/${game.gameId}`} preventScrollReset className="group cursor-pointer flex flex-col h-full">
      <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3 bg-[#202020]">
        <img src={game.media?.coverImage} alt={game.title} className="h-full object-cover transition-opacity duration-300 group-hover:opacity-90" />
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleWishlistClick}
            className={`p-1.5 rounded-full transition-colors ${inWishlist
              ? 'bg-white text-black hover:bg-gray-200'
              : 'bg-black/70 text-white hover:bg-black'
              }`}
            title={inWishlist ? 'İstek listesinden kaldır' : 'İstek listesine ekle'}
          >
            {inWishlist ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
          </button>
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <h6 className="text-[#88888a] text-[10px] uppercase font-bold mb-1">{game.productType}</h6>
        <h3 className="text-white text-sm font-medium mb-2 line-clamp-1 group-hover:underline">{game.title}</h3>
        <div className="mt-auto flex items-center gap-2 flex-wrap">
          {game.isFree ? (
            <span className="text-white text-sm font-medium">Ücretsiz</span>
          ) : game.price.discountRate && game.price.original > 0 ? (
            <>
              <span className="bg-[#0074e4] text-white text-[11px] px-1.5 py-0.5 rounded-sm font-bold">
                -{game.price.discountRate}%
              </span>
              <span className="text-[#88888a] text-[14px] line-through">{game.price.currency}{game.price.original}</span>
              <span className="text-white text-sm font-medium">
                {game.price.discountRate === 100 ? 'Ücretsiz' : `${game.price.currency}${game.price.current}`}
              </span>
            </>
          ) : (
            <span className="text-white text-sm font-medium">{game.price.current}</span>
          )}
        </div>
        <button
          onClick={handleCartClick}
          className="mt-3 inline-flex items-center gap-2 text-[13px] text-[#9bd2ff] hover:text-white transition-colors"
        >
          <ShoppingCart size={16} />
          {isInCart(game.gameId) ? 'Sepette' : 'Sepete ekle'}
        </button>
      </div>
    </Link>
  );
};