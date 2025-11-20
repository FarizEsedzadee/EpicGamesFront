import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="bg-[#101014] text-white min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/register" element={<SignUp />} />
      </Routes>
    </div>
  )
}

export default App
