import React, { useState, useRef, useEffect } from 'react';
import { Zap, Mail, Code, Award, Layers, Download, X } from 'lucide-react';
import Resume_pdf from '../../assets/Md_Anikur_Rahaman .pdf';
import gsap from 'gsap';


const Hero = ({ scrollToSection, darkMode }) => {
  const [showPdfModal, setShowPdfModal] = useState(false);
  

  const stats = [
    { label: "Projects", value: "15+", icon: Code },
    { label: "Research Papers", value: "5+", icon: Award },
    { label: "Technologies", value: "20+", icon: Layers },
    { label: "Coffee Cups", value: "∞", icon: Zap }
  ];

  // PDF Modal Component
  const PdfModal = () => {
    if (!showPdfModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
        <div className={`relative w-full max-w-4xl h-[90vh] rounded-2xl overflow-hidden shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {/* Modal Header */}
          <div className={`flex justify-between items-center p-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
            <h2 className="text-xl font-bold">My Resume</h2>
            <div className="flex space-x-3">
              {/* Download Button */}
              <a
                href={Resume_pdf}
                download
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'} transition-colors`}
                title="Download Resume"
              >
                <Download size={20} />
              </a>
              {/* Close Button */}
              <button
                onClick={() => setShowPdfModal(false)}
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'} transition-colors`}
                title="Close"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="h-[calc(90vh-72px)] overflow-auto">
            <iframe
              src={Resume_pdf}
              className="w-full h-full"
              title="Resume PDF"
            />
          </div>
        </div>
      </div>
    );
  };


      const heroTexts = [
    "Hi, I am Anikur",
    "Hi, I am a Web Designer & Developer",
    "Hi, I am a Researcher",
    "Hi, I am an Innovator",
    "Hi, I am a Problem Solver"
  ];

  const [currentText, setCurrentText] = useState(0);
  const textRef = useRef();

  useEffect(() => {
    // Animate in on mount
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 40, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' }
    );

    const interval = setInterval(() => {
      // Animate out
      gsap.to(textRef.current, {
        opacity: 0,
        y: -40,
        scale: 0.8,
        duration: 0.6,
        ease: 'power3.in',
        onComplete: () => {
          setCurrentText((prev) => (prev + 1) % heroTexts.length);
          // Animate in new text
          gsap.fromTo(
            textRef.current,
            { opacity: 0, y: 40, scale: 0.8 },
            { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' }
          );
        }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [currentText]);


  return (
    <>
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 rounded-full animate-pulse ${darkMode ? 'bg-blue-400' : 'bg-purple-500'
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
          {/* Animated GSAP Heading */}
          <div className="relative mb-8 h-[110px] flex items-center justify-center">
            <span
              ref={textRef}
              className="block text-5xl md:text-7xl font-black bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
              style={{
                opacity: 1,
                transform: "scale(1)"
              }}
            >
              {heroTexts[currentText]}
            </span>
          </div>

          {/* Typing Animation Effect */}
          <div className="text-xl md:text-3xl mb-12 font-light leading-relaxed">
            {/* Typing Animation Effect with Spiral Animation */}
            <div className="text-xl md:text-3xl mb-12 font-light leading-relaxed">
              <div className="inline-block">
                <span
                  className={`spiral-text ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  style={{ animationDelay: '0s' }}
                >
                  🚀 Full-Stack Wizard •
                </span>
                <span
                  className="spiral-text bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent font-semibold"
                  style={{ animationDelay: '0.2s' }}
                >
                  {' '}AI Researcher •
                </span>
                <span
                  className={`spiral-text ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  style={{ animationDelay: '0.4s' }}
                >
                  Innovation Catalyst
                </span>
                <span className="animate-pulse text-blue-500 text-4xl">|</span>
              </div>
            </div>
            <style>
              {`
                  .spiral-text {
                    display: inline-block;
                    opacity: 0;
                    animation: spiral-in 1s cubic-bezier(0.68,-0.55,0.27,1.55) forwards;
                  }
                  @keyframes spiral-in {
                    0% {
                      opacity: 0;
                      transform: translate(-60px, -60px) rotate(-360deg) scale(0.5);
                    }
                    60% {
                      opacity: 1;
                      transform: translate(10px, 10px) rotate(20deg) scale(1.1);
                    }
                    100% {
                      opacity: 1;
                      transform: translate(0, 0) rotate(0deg) scale(1);
                    }
                  }
                  `}
            </style>
          </div>

          {/* Floating Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => setShowPdfModal(true)}
              className="group relative px-12 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-blue-500/50"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Zap className="group-hover:rotate-12 transition-transform duration-300" size={20} />
                VIEW RESUME
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className={`group px-12 py-4 border-2 font-bold text-lg rounded-2xl transform hover:scale-110 transition-all duration-300 relative overflow-hidden ${darkMode
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
                className={`p-6 rounded-2xl backdrop-blur-lg transition-all duration-300 hover:scale-105 border ${darkMode
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

      {/* PDF Modal */}
      <PdfModal />
    </>
  );
};

export default Hero;