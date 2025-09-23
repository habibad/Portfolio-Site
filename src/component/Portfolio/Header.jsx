import React from 'react';
import { Home, User, Briefcase, Code, FileText, Mail, Moon, Sun } from 'lucide-react';

const Header = ({ darkMode, toggleDarkMode, activeSection, scrollToSection }) => {
  const navItems = [
    { id: 'home', label: 'HOME', icon: Home },
    { id: 'about', label: 'ABOUT', icon: User },
    { id: 'experience', label: 'EXPERIENCE', icon: Briefcase },
    { id: 'projects', label: 'PROJECTS', icon: Code },
    { id: 'publications', label: 'RESEARCH', icon: FileText },
    { id: 'contact', label: 'CONTACT', icon: Mail }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl transition-all duration-500 ${darkMode ? 'bg-black/20 border-b border-blue-500/20' : 'bg-white/10 border-b border-purple-200/30'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 font-black text-2xl bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Web Developer
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(({ id, label, icon: Icon }, index) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`relative px-4 py-3 rounded-xl text-sm font-bold tracking-wider transition-all duration-300 flex items-center gap-2 overflow-hidden group ${
                  activeSection === id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                style={{
                  transform: `translateY(${Math.sin(Date.now() / 1000 + index) * 2}px)`
                }}
              >
                <Icon size={16} className="relative z-10" />
                <span className="relative z-10">{label}</span>
                {activeSection === id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 animate-pulse"></div>
                )}
              </button>
            ))}
          </div>
          
          <button
            onClick={toggleDarkMode}
            className={`relative p-4 rounded-full transition-all duration-500 transform hover:scale-110 ${
              darkMode 
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg shadow-yellow-500/25' 
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-purple-500/25'
            }`}
          >
            {darkMode ? (
              <Sun size={20} className="text-black animate-spin" />
            ) : (
              <Moon size={20} className="text-white animate-pulse" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;