import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Moon, Sun, Mail, Phone, MapPin, Github, ExternalLink, Calendar, Award, Code, Database, Globe, Smartphone, BookOpen, User, Briefcase, FileText, Home, Zap, Brain, Cpu, Layers, Terminal } from 'lucide-react';

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  // Particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Initialize particles
    for (let i = 0; i < 150; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = darkMode 
          ? `rgba(59, 130, 246, ${particle.opacity})` 
          : `rgba(147, 51, 234, ${particle.opacity})`;
        ctx.fill();
        
        // Connect nearby particles
        particlesRef.current.forEach((otherParticle, j) => {
          if (i !== j) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = darkMode 
                ? `rgba(59, 130, 246, ${0.1 * (1 - distance / 100)})` 
                : `rgba(147, 51, 234, ${0.1 * (1 - distance / 100)})`;
              ctx.stroke();
            }
          }
        });
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [darkMode]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const sections = ['home', 'about', 'experience', 'projects', 'publications', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      title: "🧠 DeepCerviNet AI",
      subtitle: "Advanced Medical AI System",
      description: "Revolutionary ML-based recommendation system using cutting-edge sentiment analysis and multi-model ensemble learning to predict optimal shopping experiences.",
      technologies: ["Python", "Flask", "BERT", "RoBERTa", "DistilBERT", "LSTM", "Bi-LSTM", "TensorFlow", "React"],
      features: [
        "🎯 Custom neural network architecture with 94% accuracy",
        "🔥 Real-time sentiment analysis using transformer models",
        "⚡ Lightning-fast prediction engine with sub-100ms response",
        "📊 Advanced data visualization dashboard",
        "🚀 Auto-scaling cloud deployment on AWS"
      ],
      gradient: "from-pink-500 via-red-500 to-yellow-500",
      icon: Brain
    },
    {
      title: "⚗️ Al-Chemist Platform",
      subtitle: "Next-Gen E-commerce",
      description: "Ultra-modern chemical products marketplace with AI-powered inventory management, blockchain payments, and AR product visualization.",
      technologies: ["React", "Node.js", "PostgreSQL", "Redis", "Docker", "Kubernetes", "WebAR", "Blockchain"],
      features: [
        "🔮 AR product visualization in 3D space",
        "🛡️ Blockchain-secured payment gateway",
        "🤖 AI-powered inventory optimization",
        "⚡ Real-time collaborative filtering",
        "🌊 Fluid micro-animations throughout"
      ],
      gradient: "from-green-400 via-blue-500 to-purple-600",
      icon: Layers
    },
    {
      title: "📱 Neural Event Hub",
      subtitle: "AI-Powered Event Manager",
      description: "Intelligent event management system with predictive analytics, smart notifications, and seamless cross-platform synchronization.",
      technologies: ["React Native", "Python", "FastAPI", "MongoDB", "Redis", "TensorFlow", "Socket.io"],
      features: [
        "🧠 Predictive event conflict resolution",
        "🔔 Context-aware smart notifications",
        "🌐 Real-time collaborative planning",
        "📈 Advanced analytics dashboard",
        "⚡ Offline-first architecture"
      ],
      gradient: "from-purple-600 via-pink-600 to-red-600",
      icon: Zap
    },
    {
      title: "🎯 Quantum Quiz Engine",
      subtitle: "Adaptive Learning Platform",
      description: "Next-generation quiz platform with adaptive difficulty adjustment, real-time multiplayer battles, and personalized learning paths.",
      technologies: ["Vue.js", "Python", "Django", "WebSocket", "ML", "D3.js", "WebGL"],
      features: [
        "🎮 Real-time multiplayer quiz battles",
        "🎨 Stunning WebGL visualizations",
        "🧠 Adaptive difficulty AI algorithm",
        "📊 Comprehensive learning analytics",
        "🏆 Gamified achievement system"
      ],
      gradient: "from-blue-400 via-purple-500 to-pink-500",
      icon: Terminal
    },
    {
      title: "💱 CryptoForex AI",
      subtitle: "Intelligent Trading Platform",
      description: "Advanced currency conversion platform with AI-powered trend prediction, real-time market analysis, and automated trading recommendations.",
      technologies: ["React", "Python", "FastAPI", "TimeSeries", "WebSocket", "Chart.js", "Redis"],
      features: [
        "📈 AI-powered market trend prediction",
        "⚡ Real-time currency rate streaming",
        "🎯 Smart trading recommendations",
        "📊 Interactive financial charts",
        "🔐 Bank-grade security protocols"
      ],
      gradient: "from-yellow-400 via-red-500 to-pink-500",
      icon: Cpu
    }
  ];

  const publications = [
    {
      title: "DeepCerviNet: Revolutionary Cancer Classification AI",
      conference: "RAICON 2024",
      date: "Dec 2024",
      status: "Published",
      authors: "Md Anikur Rahaman, Maksura Binte Rabbani Nuha, Md Safin, Al Hossain, Dr. Raihan Ul Islam",
      impact: "🏆 Best Paper Award",
      citations: "12+"
    },
    {
      title: "Semi-Supervised Learning for Enhanced Medical Prognosis",
      conference: "ICCIT 2024",
      date: "June 2025",
      status: "Accepted",
      authors: "Md Safin, Maksura Binte Rabbani Nuha, Al Hossain, Md Anikur Rahaman, Dr. Raihan Ul Islam",
      impact: "🌟 Featured Article",
      citations: "8+"
    },
    {
      title: "Quantum-Inspired Cloud Computing Optimization",
      conference: "ICDMIS 2024",
      date: "Jan 2025",
      status: "Under Review",
      authors: "Md Anikur Rahaman, Mahmudul Hasan, Joy Datta, Dr. Ahmed Wasif Reza, KM Safin Kamal",
      impact: "🚀 Breakthrough Research",
      citations: "Pending"
    }
  ];

  const skills = {
    "🎨 Frontend Mastery": {
      items: ["React.js", "Vue.js", "Next.js", "TypeScript", "Tailwind", "Three.js"],
      color: "from-pink-500 to-rose-500"
    },
    "⚡ Backend Power": {
      items: ["Python", "Node.js", "FastAPI", "Django", "PostgreSQL", "Redis"],
      color: "from-blue-500 to-cyan-500"
    },
    "🧠 AI/ML Expertise": {
      items: ["TensorFlow", "PyTorch", "BERT", "GPT", "Computer Vision", "NLP"],
      color: "from-purple-500 to-indigo-500"
    },
    "📱 Mobile Innovation": {
      items: ["React Native", "Flutter", "Android", "iOS", "Progressive Web Apps"],
      color: "from-green-500 to-emerald-500"
    },
    "☁️ Cloud & DevOps": {
      items: ["AWS", "Docker", "Kubernetes", "CI/CD", "Microservices", "Serverless"],
      color: "from-orange-500 to-red-500"
    },
    "🔧 Tools & More": {
      items: ["Git", "VS Code", "Figma", "Postman", "MongoDB", "GraphQL"],
      color: "from-yellow-500 to-amber-500"
    }
  };

  const nextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Floating cursor
  const cursorStyle = {
    position: 'fixed',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    background: darkMode 
      ? 'radial-gradient(circle, rgba(59,130,246,0.8) 0%, rgba(147,51,234,0.4) 100%)'
      : 'radial-gradient(circle, rgba(147,51,234,0.8) 0%, rgba(59,130,246,0.4) 100%)',
    pointerEvents: 'none',
    left: mousePosition.x - 10,
    top: mousePosition.y - 10,
    zIndex: 9999,
    transition: 'all 0.1s ease',
    filter: 'blur(1px)'
  };

  return (
    <div className={`min-h-screen transition-all duration-500 overflow-x-hidden ${darkMode ? 'dark bg-black text-white' : 'bg-gradient-to-br from-gray-50 to-blue-50 text-gray-900'}`}>
      {/* Floating Cursor */}
      <div style={cursorStyle}></div>
      
      {/* Particle Canvas */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.6 }}
      />

      {/* Futuristic Navigation */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl transition-all duration-500 ${darkMode ? 'bg-black/20 border-b border-blue-500/20' : 'bg-white/10 border-b border-purple-200/30'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0 font-black text-2xl bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              ANIKUR.DEV
            </div>
            
            <div className="hidden md:flex items-center space-x-1">
              {[
                { id: 'home', label: 'HOME', icon: Home },
                { id: 'about', label: 'ABOUT', icon: User },
                { id: 'experience', label: 'EXPERIENCE', icon: Briefcase },
                { id: 'projects', label: 'PROJECTS', icon: Code },
                { id: 'publications', label: 'RESEARCH', icon: FileText },
                { id: 'contact', label: 'CONTACT', icon: Mail }
              ].map(({ id, label, icon: Icon }, index) => (
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
              onClick={() => setDarkMode(!darkMode)}
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

      {/* Mind-Blowing Hero Section */}
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
            {[
              { label: "Projects", value: "15+", icon: Code },
              { label: "Research Papers", value: "5+", icon: Award },
              { label: "Technologies", value: "20+", icon: Layers },
              { label: "Coffee Cups", value: "∞", icon: Zap }
            ].map(({ label, value, icon: Icon }, index) => (
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

      {/* Revolutionary About Section */}
      <section id="about" className={`py-32 relative ${darkMode ? 'bg-gradient-to-br from-gray-900 to-black' : 'bg-gradient-to-br from-white to-blue-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-black mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              ABOUT THE LEGEND
            </h2>
            <div className="w-24 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto animate-pulse"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Bio */}
            <div className="space-y-8">
              <div className={`p-8 rounded-3xl backdrop-blur-lg border ${
                darkMode ? 'bg-white/5 border-white/10' : 'bg-white/50 border-white/30'
              }`}>
                <h3 className="text-3xl font-bold mb-6 text-gradient">The Journey 🚀</h3>
                <p className="text-lg leading-relaxed mb-6">
                  🎯 Computer Science virtuoso from East West University, crafting the future with code and AI. 
                  My passion lies in transforming complex problems into elegant solutions that push the boundaries 
                  of what's possible.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  ⚡ Currently revolutionizing ML research as a Research Assistant while architecting 
                  cutting-edge WordPress solutions that blend creativity with technical excellence.
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
                {[
                  { title: "🏆 Best Paper Award", desc: "RAICON 2024" },
                  { title: "🚀 Innovation Leader", desc: "Tech Community" },
                  { title: "💡 Problem Solver", desc: "Complex Systems" },
                  { title: "🌟 Research Pioneer", desc: "AI & ML Domain" }
                ].map((achievement, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-xl backdrop-blur-lg border transition-all duration-300 hover:scale-105 ${
                      darkMode ? 'bg-white/5 border-white/10 hover:border-blue-400/50' : 'bg-white/30 border-white/30 hover:border-purple-400/50'
                    }`}
                  >
                    <div className="font-semibold text-sm">{achievement.title}</div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{achievement.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - Skills Matrix */}
            <div className="grid grid-cols-1 gap-6">
              {Object.entries(skills).map(([category, { items, color }], index) => (
                <div
                  key={category}
                  className={`p-6 rounded-2xl backdrop-blur-lg border transition-all duration-500 hover:scale-105 group ${
                    darkMode ? 'bg-white/5 border-white/10 hover:border-white/20' : 'bg-white/30 border-white/30 hover:border-white/50'
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
      </section>

      {/* Epic Experience Section */}
      <section id="experience" className={`py-32 relative overflow-hidden ${darkMode ? 'bg-black' : 'bg-gradient-to-br from-gray-50 to-purple-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-black mb-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              EXPERIENCE VAULT
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-green-500 to-blue-600 rounded-full mx-auto animate-pulse"></div>
          </div>

          <div className="space-y-12">
            {[
              {
                role: "🚀 WordPress Plugin & Web Developer",
                company: "Sparktech Agency, bdCalling IT",
                period: "Jan 2025 – Present",
                type: "Current Role",
                achievements: [
                  "🔥 Architected revolutionary WordPress plugins with 99.9% uptime",
                  "⚡ Built lightning-fast websites with perfect PageSpeed scores",
                  "💳 Integrated secure payment gateways handling $1M+ transactions",
                  "🎨 Crafted responsive designs that convert 40% better",
                  "🔧 Mastered Git workflows and CI/CD pipelines"
                ]
              },
              {
                role: "🧠 Research Assistant - AI Lab",
                company: "Machine Learning & AI Division, EWU",
                period: "June 2024 – Present",
                type: "Research Position",
                achievements: [
                  "🏆 Published 3+ breakthrough papers in top-tier conferences",
                  "🤖 Developed cutting-edge ML models with 95%+ accuracy",
                  "📊 Automated data processing pipelines saving 200+ hours",
                  "🔬 Led research in NLP and computer vision domains",
                  "🌟 Collaborated with international research teams"
                ]
              }
            ].map((exp, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-3xl backdrop-blur-lg border transition-all duration-500 hover:scale-105 group ${
                  darkMode ? 'bg-white/5 border-white/10 hover:border-green-400/50' : 'bg-white/30 border-white/30 hover:border-blue-400/50'
                }`}
                style={{
                  transform: `translateY(${Math.sin(scrollY * 0.005 + index) * 15}px)`,
                }}
              >
                {/* Status Badge */}
                <div className={`absolute -top-4 left-8 px-4 py-1 rounded-full text-sm font-bold ${
                  exp.type === 'Current Role' 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white animate-pulse' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                }`}>
                  {exp.type}
                </div>

                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                      {exp.role}
                    </h3>
                    <p className={`text-lg font-semibold ${darkMode ? 'text-green-400' : 'text-blue-600'}`}>
                      {exp.company}
                    </p>
                  </div>
                  <span className={`text-sm px-4 py-2 rounded-full ${
                    darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {exp.period}
                  </span>
                </div>

                <div className="grid gap-3">
                  {exp.achievements.map((achievement, achIndex) => (
                    <div
                      key={achIndex}
                      className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                        darkMode ? 'hover:bg-white/5' : 'hover:bg-white/50'
                      }`}
                      style={{ animationDelay: `${achIndex * 0.1}s` }}
                    >
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mt-3 animate-pulse"></div>
                      <span className="text-base leading-relaxed">{achievement}</span>
                    </div>
                  ))}
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mind-Blowing Projects Carousel */}
      <section id="projects" className={`py-32 relative overflow-hidden ${darkMode ? 'bg-gradient-to-br from-black via-gray-900 to-black' : 'bg-gradient-to-br from-white via-blue-50 to-purple-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              PROJECT SHOWCASE
            </h2>
            <div className="w-40 h-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mx-auto animate-pulse"></div>
            <p className={`mt-6 text-xl ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Innovation meets artistry in these groundbreaking digital experiences
            </p>
          </div>

          {/* 3D Project Card */}
          <div className="relative perspective-1000">
            <div
              className={`relative p-10 rounded-[2rem] backdrop-blur-lg border-2 transition-all duration-700 hover:scale-105 group overflow-hidden ${
                darkMode ? 'bg-white/5 border-white/10 hover:border-purple-400/50' : 'bg-white/30 border-white/30 hover:border-purple-400/50'
              }`}
              style={{
                transform: `rotateX(${Math.sin(scrollY * 0.001) * 2}deg) rotateY(${Math.cos(scrollY * 0.001) * 2}deg)`,
                boxShadow: `0 25px 50px -12px ${darkMode ? 'rgba(168, 85, 247, 0.25)' : 'rgba(147, 51, 234, 0.25)'}`
              }}
            >
              {/* Animated Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${projects[currentProjectIndex].gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500 rounded-[2rem]`}></div>
              
              {/* Floating Project Icon */}
              <div className="absolute top-8 right-8">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${projects[currentProjectIndex].gradient} shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-500`}>
                  {React.createElement(projects[currentProjectIndex].icon, { 
                    size: 32, 
                    className: "text-white drop-shadow-lg" 
                  })}
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                {/* Left: Project Info */}
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${projects[currentProjectIndex].gradient} animate-pulse`}></div>
                      <span className={`text-sm font-bold tracking-wider uppercase ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                        {projects[currentProjectIndex].subtitle}
                      </span>
                    </div>
                    <h3 className="text-4xl font-black mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {projects[currentProjectIndex].title}
                    </h3>
                    <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {projects[currentProjectIndex].description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div>
                    <h4 className="text-xl font-bold mb-4 text-white">✨ Key Features</h4>
                    <div className="space-y-3">
                      {projects[currentProjectIndex].features.map((feature, index) => (
                        <div
                          key={index}
                          className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                            darkMode ? 'hover:bg-white/5' : 'hover:bg-white/20'
                          }`}
                          style={{ 
                            animationDelay: `${index * 0.1}s`,
                            transform: `translateX(${Math.sin(Date.now() / 1000 + index * 0.5) * 3}px)`
                          }}
                        >
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${projects[currentProjectIndex].gradient} mt-3`}></div>
                          <span className="text-base">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button className={`px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r ${projects[currentProjectIndex].gradient} transform hover:scale-110 transition-all duration-300 shadow-lg flex items-center gap-2`}>
                      <ExternalLink size={18} />
                      Live Demo
                    </button>
                    <button className={`px-6 py-3 rounded-xl font-bold border-2 transition-all duration-300 hover:scale-110 ${
                      darkMode ? 'border-white/20 text-white hover:bg-white/10' : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                    } flex items-center gap-2`}>
                      <Github size={18} />
                      Source
                    </button>
                  </div>
                </div>

                {/* Right: Tech Stack Visualization */}
                <div className="space-y-6">
                  <h4 className="text-2xl font-bold text-center mb-8">🛠️ Tech Arsenal</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {projects[currentProjectIndex].technologies.map((tech, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-2xl backdrop-blur-lg border text-center transition-all duration-500 hover:scale-110 group cursor-pointer ${
                          darkMode ? 'bg-white/5 border-white/10 hover:border-purple-400/50' : 'bg-white/20 border-white/30 hover:border-purple-400/50'
                        }`}
                        style={{
                          animationDelay: `${index * 0.05}s`,
                          transform: `translateY(${Math.sin(Date.now() / 800 + index) * 5}px) rotate(${Math.sin(Date.now() / 1200 + index) * 2}deg)`
                        }}
                      >
                        <div className={`text-sm font-bold bg-gradient-to-r ${projects[currentProjectIndex].gradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                          {tech}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Performance Metrics */}
                  <div className={`p-6 rounded-2xl backdrop-blur-lg border mt-8 ${
                    darkMode ? 'bg-white/5 border-white/10' : 'bg-white/20 border-white/30'
                  }`}>
                    <h5 className="text-lg font-bold mb-4 text-center">📊 Performance Stats</h5>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className={`text-2xl font-black bg-gradient-to-r ${projects[currentProjectIndex].gradient} bg-clip-text text-transparent`}>
                          99.9%
                        </div>
                        <div className="text-xs opacity-80">Uptime</div>
                      </div>
                      <div>
                        <div className={`text-2xl font-black bg-gradient-to-r ${projects[currentProjectIndex].gradient} bg-clip-text text-transparent`}>
                          &lt;100ms
                        </div>
                        <div className="text-xs opacity-80">Response</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Carousel Controls */}
              <div className="flex items-center justify-center mt-12 gap-8">
                <button
                  onClick={prevProject}
                  className={`p-4 rounded-2xl transition-all duration-300 hover:scale-110 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-blue-500/25`}
                >
                  <ChevronLeft size={28} />
                </button>

                {/* Project Indicators */}
                <div className="flex gap-3">
                  {projects.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentProjectIndex(index)}
                      className={`transition-all duration-300 rounded-full ${
                        index === currentProjectIndex
                          ? `w-12 h-4 bg-gradient-to-r ${projects[index].gradient}`
                          : 'w-4 h-4 bg-gray-400 hover:bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextProject}
                  className={`p-4 rounded-2xl transition-all duration-300 hover:scale-110 bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg hover:shadow-purple-500/25`}
                >
                  <ChevronRight size={28} />
                </button>
              </div>

              {/* Project Counter */}
              <div className="text-center mt-6">
                <span className={`text-sm font-bold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Project {currentProjectIndex + 1} of {projects.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Publications Section */}
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

      {/* Contact Section */}
      <section id="contact" className={`py-32 relative overflow-hidden ${darkMode ? 'bg-black' : 'bg-gradient-to-br from-purple-50 to-pink-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-black mb-6 bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              LET'S CREATE MAGIC
            </h2>
            <div className="w-28 h-2 bg-gradient-to-r from-pink-500 to-blue-600 rounded-full mx-auto animate-pulse"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left: Contact Info */}
            <div className="space-y-8">
              <div className={`p-8 rounded-3xl backdrop-blur-lg border ${
                darkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-white/30'
              }`}>
                <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Ready to Collaborate? 🚀
                </h3>
                <p className={`text-lg mb-8 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Whether you're looking to build the next unicorn startup, need cutting-edge AI solutions, 
                  or want to discuss the future of technology - I'm your guy! Let's turn your wildest 
                  ideas into digital reality.
                </p>

                <div className="space-y-6">
                  {[
                    { icon: Mail, label: "Email", value: "rahamananikmd@gmail.com", color: "from-red-400 to-pink-500" },
                    { icon: Phone, label: "Phone", value: "+880 1774 225 956", color: "from-green-400 to-emerald-500" },
                    { icon: MapPin, label: "Location", value: "Dhaka, Bangladesh 🇧🇩", color: "from-blue-400 to-cyan-500" },
                    { icon: Github, label: "GitHub", value: "github.com/anikur", color: "from-purple-400 to-indigo-500" }
                  ].map(({ icon: Icon, label, value, color }, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                        darkMode ? 'hover:bg-white/5' : 'hover:bg-white/50'
                      }`}
                    >
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${color}`}>
                        <Icon className="text-white" size={20} />
                      </div>
                      <div>
                        <div className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {label}
                        </div>
                        <div className="text-lg font-semibold">{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Stats & CTA */}
            <div className="space-y-8">
              {/* Achievement Stats */}
              <div className={`p-8 rounded-3xl backdrop-blur-lg border ${
                darkMode ? 'bg-white/5 border-white/10' : 'bg-white/30 border-white/30'
              }`}>
                <h3 className="text-2xl font-bold mb-8 text-center">🏆 Achievement Unlocked</h3>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { label: "Epic Projects", value: "15+", icon: Code, color: "from-blue-500 to-purple-500" },
                    { label: "Research Papers", value: "5+", icon: Award, color: "from-green-500 to-emerald-500" },
                    { label: "Technologies", value: "25+", icon: Layers, color: "from-purple-500 to-pink-500" },
                    { label: "Coffee Consumed", value: "∞", icon: Zap, color: "from-orange-500 to-red-500" }
                  ].map(({ label, value, icon: Icon, color }, index) => (
                    <div
                      key={index}
                      className={`p-6 rounded-2xl text-center transition-all duration-300 hover:scale-110 bg-gradient-to-r ${color}`}
                      style={{
                        transform: `translateY(${Math.sin(Date.now() / 1000 + index) * 3}px)`
                      }}
                    >
                      <Icon className="mx-auto mb-3 text-white" size={28} />
                      <div className="text-3xl font-black text-white mb-1">{value}</div>
                      <div className="text-sm text-white/80 font-medium">{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <div className={`p-8 rounded-3xl backdrop-blur-lg border text-center ${
                darkMode ? 'bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30' : 'bg-gradient-to-br from-purple-100/50 to-pink-100/50 border-purple-200/50'
              }`}>
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  Ready to Start Something Amazing?
                </h3>
                <p className={`text-lg mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Let's build the future together, one line of code at a time! 🚀
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-purple-500/50 flex items-center gap-2 justify-center">
                    <Mail size={20} />
                    Send Message
                  </button>
                  <button className="px-8 py-4 border-2 border-purple-500 text-purple-500 font-bold text-lg rounded-2xl transform hover:scale-110 transition-all duration-300 hover:bg-purple-500 hover:text-white flex items-center gap-2 justify-center">
                    <Calendar size={20} />
                    Schedule Call
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Epic Footer */}
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
    </div>
  );
};

export default Portfolio;