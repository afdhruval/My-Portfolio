import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ExternalLink, Github, Music, Sun, Moon } from 'lucide-react';
import CommandPalette from './CommandPalette';
import MusicPlayer from './MusicPlayer';

const Navbar = () => {
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isMusicOpen, setIsMusicOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <nav className="fixed top-0 right-0 left-0 lg:left-64 bg-dark/95 backdrop-blur-md border-b border-dark-border z-30">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Nav Links */}
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M3 3L10.5 21L13.5 13.5L21 10.5L3 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-lg font-bold text-white hidden md:block">DD is.dev</span>
              </Link>
              <div className="hidden md:flex items-center gap-4 text-sm">
                <Link to="/" className="text-gray-soft hover:text-white transition-colors">
                  Home
                </Link>
                <a
                  href="https://www.linkedin.com/in/dhruval-dalwadi-892144306/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-gray-soft hover:text-white transition-colors"
                >
                  LinkedIn
                  <ExternalLink size={14} />
                </a>
                <a
                  href="/DHRUVAL_RESeME.pdf.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-gray-soft hover:text-white transition-colors"
                >
                  Resumedd
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* Search and Icons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsCommandOpen(true)}
                className="hidden sm:flex items-center gap-2 bg-dark-secondary border border-dark-border rounded-lg px-3 py-1.5 hover:border-gray-700 transition-colors"
              >
                <Search size={16} className="text-gray-soft" />
                <span className="text-sm text-gray-soft">Search sections...</span>
                <kbd className="hidden lg:inline-block px-2 py-0.5 text-xs bg-dark-border rounded">⌘K</kbd>
              </button>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-sm text-green-500">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span>{currentTime}</span>
                </span>
                <button
                  onClick={() => setIsMusicOpen(!isMusicOpen)}
                  className="p-2 hover:bg-dark-secondary rounded-lg transition-colors"
                >
                  <Music size={18} className="text-gray-soft hover:text-white transition-colors" />
                </button>
                <a
                  href="https://github.com/afdhruval"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-dark-secondary rounded-lg transition-colors"
                >
                  <Github size={18} className="text-gray-soft hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
      />
      <MusicPlayer
        isOpen={isMusicOpen}
        onClose={() => setIsMusicOpen(false)}
      />
    </>
  );
};

export default Navbar;
