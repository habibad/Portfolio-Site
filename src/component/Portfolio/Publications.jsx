import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { Calendar, Award, Brain, Globe } from 'lucide-react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { publications } from './data.jsx';

gsap.registerPlugin(ScrollTrigger);

const Publications = ({ darkMode, scrollY }) => {
  const publicationsRef = useRef(null);
  const containerRef = useRef(null);
  const data = publications;

  useLayoutEffect(() => {
    if (!publicationsRef.current || !containerRef.current || publications.length === 0) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.publication_card');
      const container = containerRef.current;
      
      if (cards.length === 0) return;

      // Set initial positions for all cards except the first one
      cards.forEach((card, index) => {
        if (index === 0) {
          // First card is immediately visible
          gsap.set(card, {
            yPercent: 0,
            opacity: 1,
            zIndex: cards.length,
            scale: 1,
          });
        } else {
          // Other cards start hidden
          gsap.set(card, {
            yPercent: 100,
            opacity: 0,
            zIndex: cards.length - index,
            scale: 1 - (index * 0.02),
          });
        }
      });

      // Create the main scroll trigger that pins the entire section
      const mainTrigger = ScrollTrigger.create({
        trigger: publicationsRef.current,
        start: "top top",
        // Use full cards.length to give each card its own scroll segment
        end: () => `+=${cards.length * window.innerHeight * 1.2}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (cards.length === 1) return; // If only one card, keep it visible
          
          const progress = self.progress;
          const totalCards = cards.length;
          // Divide the scroll progress into totalCards segments so the last card has a valid range
          const progressPerCard = 1 / totalCards;
          
          cards.forEach((card, index) => {
            const cardStartProgress = index * progressPerCard;
            const cardEndProgress = (index + 1) * progressPerCard;
            
            if (index === 0) {
              // First card - always visible, gets stacked over time
              const stackProgress = Math.min(progress / progressPerCard, 1);
              gsap.set(card, {
                yPercent: -stackProgress * 10,
                opacity: 1,
                zIndex: cards.length - Math.floor(progress * (totalCards - 1)),
                scale: 1 - (stackProgress * 0.05),
              });
            } else {
              // Other cards
              if (progress >= cardStartProgress && progress <= cardEndProgress) {
                // Card is currently animating in
                const cardProgress = (progress - cardStartProgress) / progressPerCard;
                gsap.set(card, {
                  yPercent: (1 - cardProgress) * 100 - (index * 5),
                  opacity: Math.max(0.3, cardProgress),
                  zIndex: cards.length - index + Math.floor(cardProgress * 10),
                  scale: 1 - (index * 0.02) + (cardProgress * 0.02),
                });
              } else if (progress > cardEndProgress) {
                // Card is fully stacked
                gsap.set(card, {
                  yPercent: -index * 5,
                  opacity: 1,
                  zIndex: cards.length - index,
                  scale: 1 - (index * 0.02),
                });
              } else {
                // Card hasn't appeared yet
                gsap.set(card, {
                  yPercent: 100,
                  opacity: 0,
                  zIndex: cards.length - index,
                  scale: 1 - (index * 0.02),
                });
              }
            }
          });
        }
      });

      // Animate title on enter
      gsap.fromTo('.publications-title', 
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: publicationsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, publicationsRef);

    return () => ctx.revert();
  }, [publications.length]);

  return (
    <section
      ref={publicationsRef}
      id="publications"
      className={`relative w-full h-screen ${darkMode ? 'bg-gradient-to-br from-gray-900 to-black' : 'bg-gradient-to-br from-blue-50 to-white'
        }`}
    >
      <div 
        ref={containerRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex flex-col"
      >
        {/* Fixed Header */}
        <div className="text-center pt-36 pb-12">
          <h2 className="publications-title text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            RESEARCH IMPACT
          </h2>
          <div className="w-36 h-2 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full mx-auto animate-pulse"></div>
        </div>

        {/* Cards Container - Only render if publications exist */}
        {publications.length > 0 && (
          <div className="flex-1 relative">
            {publications.map((pub, index) => (
              <div 
                key={index} 
                className='publication_card absolute inset-0 flex items-center justify-center px-4'
              >
              <div
                className={`w-full max-w-5xl p-8 rounded-3xl backdrop-blur-lg border transition-all duration-500 group relative overflow-hidden shadow-2xl ${darkMode
                  ? 'bg-white/5 border-white/10 hover:border-emerald-400/50'
                  : 'bg-white/30 border-white/30 hover:border-blue-400/50'
                  }`}
              >
                {/* Status and Impact Badges */}
                <div className="flex items-start justify-between mb-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-bold ${pub.status === 'Published'
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                          : pub.status === 'Accepted'
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                            : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
                          }`}
                      >
                        {pub.status}
                      </span>
                      <span className="px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        {pub.impact}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                      {pub.title}
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-4xl`}>
                      {pub.authors}
                    </p>
                  </div>

                  <div className="text-right space-y-2 flex-shrink-0 ml-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-blue-400" />
                      <span className="text-sm font-medium">{pub.conference}</span>
                    </div>
                    <div className="text-sm font-bold text-emerald-400">📊 {pub.citations} citations</div>
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

                {/* Progress Indicator */}
                <div className="absolute bottom-4 right-4">
                  <span className={`text-xs font-medium px-2 py-1 rounded ${darkMode ? 'bg-white/10 text-white/70' : 'bg-black/10 text-black/70'}`}>
                    {index + 1} / {publications.length}
                  </span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          ))}
        </div>
        )}

        {/* No Publications Message */}
        {publications.length === 0 && (
          <div className="flex-1 flex items-center justify-center">
            <div className={`text-center p-8 rounded-2xl ${darkMode ? 'bg-white/5' : 'bg-white/30'}`}>
              <h3 className="text-2xl font-bold mb-4 text-gray-400">No Publications Yet</h3>
              <p className="text-gray-500">Research publications will appear here soon.</p>
            </div>
          </div>
        )}

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className={`flex flex-col items-center space-y-2 ${darkMode ? 'text-white/70' : 'text-black/70'}`}>
            <span className="text-xs font-medium">Scroll to explore</span>
            <div className="w-px h-8 bg-gradient-to-b from-current to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Publications;