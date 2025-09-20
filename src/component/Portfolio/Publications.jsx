import React from 'react';
import { Calendar, Award, Brain, Globe } from 'lucide-react';

const Publications = ({ darkMode, scrollY, publications }) => {
  return (
    <section id="publications" className={`py-32 relative ${darkMode ? 'bg-gradient-to-br from-gray-900 to-black' : 'bg-gradient-to-br from-blue-50 to-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-6xl font-black mb-6 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            RESEARCH IMPACT
          </h2>
          <div className="w-36 h-2 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full mx-auto animate-pulse"></div>
        </div>

        <div className="grid gap-8">
          {publications.map((pub, index) => (
            <div
              key={index}
              className={`p-8 rounded-3xl backdrop-blur-lg border transition-all duration-500 hover:scale-105 group relative overflow-hidden ${
                darkMode ? 'bg-white/5 border-white/10 hover:border-emerald-400/50' : 'bg-white/30 border-white/30 hover:border-blue-400/50'
              }`}
              style={{
                transform: `translateX(${Math.sin(scrollY * 0.003 + index) * 10}px)`,
              }}
            >
              {/* Status and Impact Badges */}
              <div className="flex items-start justify-between mb-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                      pub.status === 'Published' 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                        : pub.status === 'Accepted'
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                        : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
                    }`}>
                      {pub.status}
                    </span>
                    <span className="px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      {pub.impact}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    {pub.title}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-4xl`}>
                    {pub.authors}
                  </p>
                </div>
                
                <div className="text-right space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-blue-400" />
                    <span className="text-sm font-medium">{pub.conference}</span>
                  </div>
                  <div className="text-sm font-bold text-emerald-400">
                    📊 {pub.citations} citations
                  </div>
                </div>
              </div>

              {/* Research Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-white/5' : 'bg-white/50'}`}>
                  <Award className="mx-auto mb-2 text-yellow-500" size={24} />
                  <div className="text-sm font-medium">Impact Factor</div>
                  <div className="text-lg font-bold text-yellow-500">High</div>
                </div>
                <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-white/5' : 'bg-white/50'}`}>
                  <Brain className="mx-auto mb-2 text-purple-500" size={24} />
                  <div className="text-sm font-medium">Innovation</div>
                  <div className="text-lg font-bold text-purple-500">Breakthrough</div>
                </div>
                <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-white/5' : 'bg-white/50'}`}>
                  <Globe className="mx-auto mb-2 text-blue-500" size={24} />
                  <div className="text-sm font-medium">Reach</div>
                  <div className="text-lg font-bold text-blue-500">Global</div>
                </div>
              </div>

              {/* Animated border */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Publications;