import React from 'react';

const Footer = ({ darkMode }) => {
  return (
    <footer className={`py-12 border-t relative overflow-hidden ${
      darkMode ? 'bg-gradient-to-r from-gray-900 to-black border-gray-700' : 'bg-gradient-to-r from-gray-50 to-white border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="mb-6">
          <div className="text-2xl font-black bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
            ANIKUR.DEV
          </div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Crafting tomorrow's solutions with today's passion
          </p>
        </div>
        
        <div className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
          © 2025 Md Anikur Rahaman • Built with React, Love & Lots of Coffee ☕
        </div>
        
        <div className="mt-4 flex justify-center space-x-4">
          {['🚀', '💻', '🧠', '⚡', '🌟'].map((emoji, index) => (
            <span
              key={index}
              className="text-2xl animate-bounce"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {emoji}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;