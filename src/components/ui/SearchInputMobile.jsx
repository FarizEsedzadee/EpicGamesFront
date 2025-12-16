"use client"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function SearchInputMobile() {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const { t } = useLanguage()

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
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="p-3 rounded-full flex items-center justify-center"
        >
          <Search className="text-white" size={18} />
        </button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 p-4"
          >
            <form onSubmit={handleSubmit} className="flex items-center gap-3">
              <Search className="text-white opacity-80" size={18} />

              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t('searchStore')}
                className="flex-1 bg-transparent text-white text-lg outline-none placeholder:text-gray-400"
              />

              <button type="button" onClick={() => {
                setOpen(false);
                setSearchQuery('');
              }}>
                <X className="text-white" size={24} />
              </button>
            </form>

            <div className="mt-6 overflow-y-auto h-[80vh]">
              <p className="text-gray-400">Arama sonuçları buraya gelecek...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
