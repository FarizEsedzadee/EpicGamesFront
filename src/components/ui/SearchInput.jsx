"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X } from "lucide-react"

export default function SearchInput() {
  const [open, setOpen] = useState(false)

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
            <div className="flex items-center gap-3">
              <Search className="text-white opacity-80" size={18} />

              <input
                autoFocus
                placeholder="Mağazada ara"
                className="flex-1 bg-transparent text-white text-lg outline-none placeholder:text-gray-400"
              />

              <button onClick={() => setOpen(false)}>
                <X className="text-white" size={24} />
              </button>
            </div>

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
