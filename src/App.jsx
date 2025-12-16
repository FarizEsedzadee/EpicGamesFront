import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Browse from "./pages/Browse"
import GameDetail from "./pages/GameDetail"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Wishlist from "./pages/Wishlist"
import News from "./pages/News"
import NewsDetail from "./pages/NewsDetail"
import Cart from "./pages/Cart"
import Gifts from "./pages/Gifts"
import Profile from "./pages/Profile"
import { WishlistProvider } from "./contexts/WishlistContext"
import { CartProvider } from "./contexts/CartContext"
import { AuthProvider } from "./contexts/AuthContext"
import { LanguageProvider } from "./contexts/LanguageContext"
import './App.css'

function App() {

  return (
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/game/:gameId" element={<GameDetail />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/gifts" element={<Gifts />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:slug" element={<NewsDetail />} />
            </Routes>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  )
}

export default App
