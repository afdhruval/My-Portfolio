import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Clock, Music, Github } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const location = useLocation();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const sections = [
    { name: "Introduction", path: "/" },
    { name: "About Me", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Skills & Tools", path: "/skills" },
    { name: "Experience", path: "/experience" },
    { name: "Education", path: "/education" },
    { name: "Contact", path: "/contact" },
    { name: "Stats", path: "/stats" },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  const SidebarContent = () => (
    <div className="h-full flex flex-col">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between px-4 py-4 border-b border-dark-border">
        <div className="flex items-center gap-2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="text-white"
          >
            <path
              d="M3 3L10.5 21L13.5 13.5L21 10.5L3 3Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-base font-bold text-white">DD is.dev</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-xs text-green-500">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            <span>{currentTime}</span>
          </span>
          <button className="p-1.5">
            <Music size={16} className="text-gray-400" />
          </button>
          <button onClick={() => setIsOpen(false)} className="p-1.5">
            <X size={18} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* Home Link (Mobile) */}
      <div className="lg:hidden px-4 py-3 border-b border-dark-border">
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center px-3 py-2.5 text-white hover:bg-dark-border rounded-lg transition-colors"
        >
          <span className="text-sm font-medium">Home</span>
        </Link>
      </div>

      {/* Sections */}
      <div className="px-4 py-3">
        <div className="px-3 py-2 text-xs text-gray-500 font-semibold uppercase tracking-wider">
          Sections
        </div>
        <nav className="mt-1">
          <ul className="space-y-0.5">
            {sections.map((section) => (
              <li key={section.path}>
                <Link
                  to={section.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                    location.pathname === section.path
                      ? "bg-gray-800 text-white font-normal"
                      : "text-gray-400 hover:bg-dark-border hover:text-white"
                  }`}
                >
                  <span>{section.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-transparent hover:bg-dark-secondary transition-colors rounded-lg"
      >
        {isOpen ? (
          <X size={20} className="text-white" />
        ) : (
          <Menu size={20} className="text-white" />
        )}
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-0 h-screen w-64 bg-dark border-r border-dark-border overflow-y-auto">
        <div className="pt-20 px-4">
          <div className="px-3 py-2 text-xs text-gray-500 font-semibold uppercase tracking-wider">
            Sections
          </div>
          <nav className="mt-1">
            <ul className="space-y-0.5">
              {sections.map((section) => (
                <li key={section.path}>
                  <Link
                    to={section.path}
                    className={`block px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                      location.pathname === section.path
                        ? "bg-gray-800 text-white font-normal"
                        : "text-gray-400 hover:bg-dark-border hover:text-white"
                    }`}
                  >
                    {section.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 h-screen w-[85%] max-w-sm bg-dark border-r border-dark-border z-50 overflow-y-auto"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
