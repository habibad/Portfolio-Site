import React from 'react';
import { Zap, Mail, Code, Award, Layers } from 'lucide-react';

const Hero = ({ scrollToSection, darkMode }) => {
  const stats = [
    { label: "Projects", value: "15+", icon: Code },
    { label: "Research Papers", value: "5+", icon: Award },
    { label: "Technologies", value: "20+", icon: Layers },
    { label: "Coffee Cups", value: "∞", icon: Zap }
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full animate-pulse ${
              darkMode ? 'bg-blue-400' : 'bg-purple-500'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-6xl">
        {/* Glitch Effect Name */}
        <div className="relative mb-8">
          <h1 className="text-7xl md:text-9xl font-black mb-4 relative">
            <span 
              className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent animate-pulse"
              style={{ transform: `translate(${Math.sin(Date.now() / 200) * 2}px, ${Math.cos(Date.now() / 300) * 1}px)` }}
            >
              ANIKUR
            </span>
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent relative z-10">
              ANIKUR
            </span>
          </h1>
          <div className="h-2 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse shadow-lg"></div>
        </div>

        {/* Typing Animation Effect */}
        <div className="text-xl md:text-3xl mb-12 font-light leading-relaxed">
          <div className="inline-block">
            <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              🚀 Full-Stack Wizard • 
            </span>
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent font-semibold">
              {' '}AI Researcher • 
            </span>
            <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Innovation Catalyst
            </span>
            <span className="animate-pulse text-blue-500 text-4xl">|</span>
          </div>
        </div>

        {/* Floating Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            onClick={() => scrollToSection('projects')}
            className="group relative px-12 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-blue-500/50"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Zap className="group-hover:rotate-12 transition-transform duration-300" size={20} />
              EXPLORE PROJECTS
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
          </button>
          
          <button
            onClick={() => scrollToSection('contact')}
            className={`group px-12 py-4 border-2 font-bold text-lg rounded-2xl transform hover:scale-110 transition-all duration-300 relative overflow-hidden ${
              darkMode 
                ? 'border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black' 
                : 'border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white'
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Mail className="group-hover:rotate-12 transition-transform duration-300" size={20} />
              LET'S CONNECT
            </span>
            <div className={`absolute inset-0 ${darkMode ? 'bg-blue-400' : 'bg-purple-500'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
          </button>
        </div>

        {/* Floating Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map(({ label, value, icon: Icon }, index) => (
            <div 
              key={label}
              className={`p-6 rounded-2xl backdrop-blur-lg transition-all duration-300 hover:scale-105 border ${
                darkMode 
                  ? 'bg-white/5 border-white/10 hover:border-blue-400/50' 
                  : 'bg-white/20 border-white/20 hover:border-purple-400/50'
              }`}
              style={{
                transform: `translateY(${Math.sin(Date.now() / 1000 + index * 0.5) * 5}px)`
              }}
            >
              <Icon className="mx-auto mb-2 text-blue-400" size={24} />
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {value}
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;