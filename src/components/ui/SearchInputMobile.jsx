"use client"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X } from "lucide-react"

export default function SearchInputMobile() {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?q=${encodeURIComponent(searchQuery.trim())}`);
      setOpen(false);
      setSearchQuery('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <>
      {/* SMALL COMPACT SEARCH */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="p-3 rounded-full flex items-center justify-center"
        >
          <Search className="text-white" size={18} />
        </button>
      )}

      {/* FULLSCREEN SEARCH */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 p-4"
          >
            {/* TOP SEARCH BAR */}
            <form onSubmit={handleSubmit} className="flex items-center gap-3">
              <Search className="text-white opacity-80" size={18} />

              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Mağazada ara"
                className="flex-1 bg-transparent text-white text-lg outline-none placeholder:text-gray-400"
              />

              <button type="button" onClick={() => {
                setOpen(false);
                setSearchQuery('');
              }}>
                <X className="text-white" size={24} />
              </button>
            </form>

            {/* CONTENT BELOW (scroll area) */}
            <div className="mt-6 overflow-y-auto h-[80vh]">
              <p className="text-gray-400">Arama sonuçları buraya gelecek...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
