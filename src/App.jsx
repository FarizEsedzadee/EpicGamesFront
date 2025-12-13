import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Browse from "./pages/Browse"
import GameDetail from "./pages/GameDetail"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import './App.css'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/game/:gameId" element={<GameDetail />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
    </Routes>
  )
}

export default App
