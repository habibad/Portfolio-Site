import React from 'react';
import { MapPin, BookOpen } from 'lucide-react';
import { TfiAngleDoubleDown } from "react-icons/tfi";

const About = ({ darkMode, scrollY, skills }) => {
  const achievements = [
    { title: "🏆 Best Paper Award", desc: "RAICON 2024" },
    { title: "🚀 Innovation Leader", desc: "Tech Community" },
    { title: "💡 Problem Solver", desc: "Complex Systems" },
    { title: "🌟 Research Pioneer", desc: "AI & ML Domain" }
  ];

  return (
    <section id="about" className={`py-32 relative ${darkMode ? 'bg-gradient-to-br from-gray-900 to-black' : 'bg-gradient-to-br from-white to-blue-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-6xl font-black mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            ABOUT THE LEGEND
          </h2>
          <div className="w-24 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto animate-pulse"></div>
        </div>

        <div className="w-full flex gap-16 items-center">
          {/* Left side - Bio */}
          <div className='w-1/2 h-[600px]'>
            <div className="space-y-8">
              <div className={`p-8 rounded-3xl backdrop-blur-lg border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white/50 border-white/30'
                }`}>
                <h3 className="text-3xl font-bold mb-6 text-gradient">The Journey 🚀</h3>
                <p className="text-lg leading-relaxed mb-6">
                  🎯 Computer Science virtuoso from East West University, crafting the future with code and AI.
                  My passion lies in transforming complex problems into elegant solutions that push the boundaries
                  of what's possible.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  ⚡ Currently revolutionizing ML research as a Research Assistant while architecting
                  cutting-edge Web solutions that blend creativity with technical excellence.
                </p>

                <div className="flex items-center gap-6 text-sm flex-wrap">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20">
                    <MapPin size={16} className="text-blue-400" />
                    <span>Dhaka, Bangladesh 🇧🇩</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20">
                    <BookOpen size={16} className="text-green-400" />
                    <span>CGPA: 3.03/4.0 📚</span>
                  </div>
                </div>
              </div>

              {/* Achievement Badges */}
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl backdrop-blur-lg border transition-all duration-300 hover:scale-105 ${darkMode ? 'bg-white/5 border-white/10 hover:border-blue-400/50' : 'bg-white/30 border-white/30 hover:border-purple-400/50'
                      }`}
                  >
                    <div className="font-semibold text-sm">{achievement.title}</div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{achievement.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Right side - Skills Matrix */}
          <div className='h-[600px] w-1/2 overflow-y-scroll scrollbar-hide relative group p-3'>
          <div className='absolute top-0 left-0 w-full h-full z-30 flex items-center justify-center group-hover:z-0 group-hover:hidden hover:hidden' style={{background: 'radial-gradient(circle, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.1) 100%)'}}>
            <div className="w-20 h-20  z-40 flex flex-col justify-center items-center " style={{background: 'radial-gradient(circle, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.1) 100%)'}}>
              <span>Scroll</span>
              <span><TfiAngleDoubleDown /></span>
            </div>
          </div>

            <div className="grid grid-cols-1 gap-6 cursor-pointer">
              {Object.entries(skills).map(([category, { items, color }], index) => (
                <div
                  key={category}
                  className={`p-6 rounded-2xl backdrop-blur-lg border transition-all duration-500 hover:scale-105 group ${darkMode ? 'bg-white/5 border-white/10 hover:border-white/20' : 'bg-white/30 border-white/30 hover:border-white/50'
                    }`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    transform: `translateX(${Math.sin(scrollY * 0.01 + index) * 10}px)`
                  }}
                >
                  <h3 className={`text-xl font-bold mb-4 bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className={`px-3 py-1 text-sm rounded-full bg-gradient-to-r ${color} text-white font-medium transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer`}
                        style={{
                          animationDelay: `${skillIndex * 0.05}s`
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;