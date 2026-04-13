import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, Music, Sun, Moon } from 'lucide-react';

const CommandPalette = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const sections = [
    { name: 'Introduction', path: '/', icon: <FileText size={16} /> },
    { name: 'About Me', path: '/about', icon: <FileText size={16} /> },
    { name: 'Projects', path: '/projects', icon: <FileText size={16} /> },
    { name: 'Skills & Tools', path: '/skills', icon: <FileText size={16} /> },
    { name: 'Experience', path: '/experience', icon: <FileText size={16} /> },
    { name: 'Education', path: '/education', icon: <FileText size={16} /> },
    { name: 'Contact', path: '/contact', icon: <FileText size={16} /> },
    { name: 'Stats', path: '/stats', icon: <FileText size={16} /> },
  ];

  const filteredSections = sections.filter((s) => 
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const allItems = [
    ...filteredSections.map((s) => ({ ...s, type: 'section' })),
  ];

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % allItems.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + allItems.length) % allItems.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = allItems[selectedIndex];
        if (selected.type === 'section') {
          navigate(selected.path);
          onClose();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, allItems, navigate, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-start justify-center pt-[10vh] px-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ type: 'spring', damping: 20 }}
          className="w-full max-w-2xl bg-dark-secondary border border-dark-border rounded-xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-dark-border">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Type a command or search..."
              className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-sm"
              autoFocus
            />
            <kbd className="px-2 py-1 text-xs bg-dark-border rounded text-gray-500">ESC</kbd>
          </div>

          {/* Results */}
          <div className="max-h-[400px] overflow-y-auto">
            {/* Links Section */}
            {filteredSections.length > 0 && (
              <div className="p-2">
                <div className="px-3 py-2 text-xs text-gray-500 font-medium">Sections</div>
                {filteredSections.map((section, index) => {
                  const itemIndex = allItems.findIndex((item) => item.name === section.name);
                  return (
                    <button
                      key={section.path}
                      onClick={() => {
                        navigate(section.path);
                        onClose();
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                        selectedIndex === itemIndex
                          ? 'bg-dark-border text-white'
                          : 'text-gray-400 hover:bg-dark-border hover:text-white'
                      }`}
                    >
                      <span className="text-gray-500">{section.icon}</span>
                      <span className="text-sm">{section.name}</span>
                    </button>
                  );
                })}
              </div>
            )}



            {/* No results */}
            {filteredSections.length === 0 && search !== '' && (
              <div className="p-8 text-center text-gray-500 text-sm">No results found</div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-dark-border flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-dark-border rounded">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-dark-border rounded">↓</kbd>
                to navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-dark-border rounded">↵</kbd>
                to select
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CommandPalette;
