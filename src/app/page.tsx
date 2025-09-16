"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Code2, 
  Database, 
  Cloud, 
  Zap, 
  User, 
  FileText, 
  Mail, 
  Github, 
  Linkedin, 
  Instagram,
  ExternalLink,
  Download,
  ChevronRight,
  Terminal,
  Cpu,
  Settings,
  Target,
  Coffee,
  Music,
  Dumbbell,
  MapPin,
  Calendar,
  CheckCircle,
  ArrowRight,
  Play
} from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  // Mouse tracking for hero animations - optimized with throttling
  const rafRef = useRef<number | null>(null);
  
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (rafRef.current) return; // Skip if animation frame is already pending
    
    rafRef.current = requestAnimationFrame(() => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
      rafRef.current = null;
    });
  }, []);

  useEffect(() => {
    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      return () => {
        heroElement.removeEventListener('mousemove', handleMouseMove);
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      };
    }
  }, [handleMouseMove]);

  // Scroll spy for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'cases', 'tech', 'profile', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
    setIsMenuOpen(false);
  };

  const menuItems = [
    { id: 'hero', label: 'Central Lab', icon: Terminal },
    { id: 'cases', label: 'Case Files', icon: FileText },
    { id: 'tech', label: 'Tech Dashboard', icon: Cpu },
    { id: 'profile', label: 'Engineer Profile', icon: User },
    { id: 'contact', label: 'Archives & Contact', icon: Mail }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Animated circuits */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 opacity-10">
          <div className="w-full h-full border border-red-500 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-red-400 rounded-full animate-spin"></div>
        </div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 opacity-10">
          <div className="w-full h-full border border-blue-500 rounded-full animate-pulse delay-1000"></div>
        </div>
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:50px_50px] opacity-5"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-red-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg">N.GARCÍA</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-red-600/20 text-red-400 border border-red-600/30'
                      : 'hover:bg-red-600/10 hover:text-red-300'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-red-600/10 transition-colors"
            >
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-lg border-t border-red-900/20">
            <div className="px-4 py-4 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all ${
                    activeSection === item.id
                      ? 'bg-red-600/20 text-red-400'
                      : 'hover:bg-red-600/10'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Central Lab */}
      <section 
        id="hero" 
        ref={heroRef}
        className="min-h-screen flex items-center justify-center relative pt-16"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(220,20,60,0.1) 0%, transparent 50%)`
        }}
      >
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          {/* Main Hero Content */}
          <div className="mb-8">
            <div className="inline-flex items-center space-x-4 bg-red-600/10 border border-red-600/30 px-5 py-3 rounded-full mb-6">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-red-400 tracking-wider">SISTEMA ACTIVO</span>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-red-200 to-red-400 bg-clip-text text-transparent">
              NICOLÁS GARCÍA
            </h1>
            
            <div className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              <span className="text-red-400 font-semibold">"Automatizo procesos para optimizar el tiempo y disfrutar la vida"</span>
              <br />
              <span className="text-lg">Ingeniero de Software • Especialista en Backend • Arquitecto de Soluciones</span>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-3xl mx-auto">
              <div className="bg-black/40 backdrop-blur-lg rounded-lg p-4 border border-red-900/20">
                <div className="text-2xl font-bold text-red-400">2+</div>
                <div className="text-sm text-gray-400">Años Experiencia</div>
              </div>
              <div className="bg-black/40 backdrop-blur-lg rounded-lg p-4 border border-red-900/20">
                <div className="text-2xl font-bold text-blue-400">15+</div>
                <div className="text-sm text-gray-400">Tecnologías</div>
              </div>
              <div className="bg-black/40 backdrop-blur-lg rounded-lg p-4 border border-red-900/20">
                <div className="text-2xl font-bold text-yellow-400">5+</div>
                <div className="text-sm text-gray-400">Proyectos</div>
              </div>
              <div className="bg-black/40 backdrop-blur-lg rounded-lg p-4 border border-red-900/20">
                <div className="text-2xl font-bold text-green-400">100%</div>
                <div className="text-sm text-gray-400">Enfoque Calidad</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => scrollToSection('cases')}
              className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-red-600/20"
            >
              <FileText className="w-5 h-5" />
              <span>Ver Casos de Estudio</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => scrollToSection('tech')}
              className="group border border-red-600/50 hover:bg-red-600/10 px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
            >
              <Cpu className="w-5 h-5" />
              <span>Stack Técnico</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Quick Access Navigation */}
          <div className="mt-16 flex justify-center space-x-8">
            <button 
              onClick={() => scrollToSection('profile')}
              className="text-gray-400 hover:text-red-400 transition-colors text-sm"
            >
              Sobre Mí
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-400 hover:text-red-400 transition-colors text-sm"
            >
              Contacto
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="w-6 h-6 text-red-400 rotate-90" />
        </div>
      </section>

      {/* Case Files Section */}
      <section id="cases" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
              ARCHIVOS DE CASOS
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Análisis de procesos digitales optimizados. Cada caso representa horas recuperadas y eficiencia maximizada.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Case 1: API Enterprise */}
            <div className="group bg-black/60 backdrop-blur-lg rounded-xl border border-red-900/20 hover:border-red-600/40 transition-all duration-300 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-red-600/20 p-2 rounded-lg">
                    <Database className="w-6 h-6 text-red-400" />
                  </div>
                  <span className="text-xs bg-green-600/20 text-green-400 px-2 py-1 rounded-full">COMPLETADO</span>
                </div>
                
                <h3 className="text-xl font-bold mb-3">API REST Enterprise</h3>
                <p className="text-gray-400 mb-4 text-sm">
                  Desarrollo de API segura con Spring Boot, implementando JWT, documentación Swagger y optimización de queries MySQL.
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="text-sm">
                    <span className="text-red-400 font-semibold">Problema:</span>
                    <span className="text-gray-300"> Sistema legacy sin API unificada</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-blue-400 font-semibold">Solución:</span>
                    <span className="text-gray-300"> Arquitectura hexagonal + Spring Security</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-yellow-400 font-semibold">Impacto:</span>
                    <span className="text-gray-300"> 70% reducción en tiempo de consultas</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-orange-600/20 text-orange-300 px-2 py-1 rounded text-xs">Spring Boot</span>
                  <span className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded text-xs">MySQL</span>
                  <span className="bg-green-600/20 text-green-300 px-2 py-1 rounded text-xs">JWT</span>
                  <span className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-xs">Swagger</span>
                </div>

                <button className="group flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors">
                  <span className="text-sm font-medium">Ver detalles</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Case 2: Empresa Avícola */}
            <div className="group bg-black/60 backdrop-blur-lg rounded-xl border border-red-900/20 hover:border-red-600/40 transition-all duration-300 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-600/20 p-2 rounded-lg">
                    <Settings className="w-6 h-6 text-blue-400" />
                  </div>
                  <span className="text-xs bg-yellow-600/20 text-yellow-400 px-2 py-1 rounded-full">EN PROGRESO</span>
                </div>
                
                <h3 className="text-xl font-bold mb-3">Sistema Avícola Integral</h3>
                <p className="text-gray-400 mb-4 text-sm">
                  Automatización completa de inventarios y formularios con Django backend, Flutter mobile y optimizaciones MySQL.
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="text-sm">
                    <span className="text-red-400 font-semibold">Problema:</span>
                    <span className="text-gray-300"> Gestión manual de inventarios</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-blue-400 font-semibold">Solución:</span>
                    <span className="text-gray-300"> App móvil + dashboard web automatizado</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-yellow-400 font-semibold">Impacto:</span>
                    <span className="text-gray-300"> 85% reducción en tiempo de registro</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-green-600/20 text-green-300 px-2 py-1 rounded text-xs">Django</span>
                  <span className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded text-xs">Flutter</span>
                  <span className="bg-orange-600/20 text-orange-300 px-2 py-1 rounded text-xs">MySQL</span>
                  <span className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-xs">REST API</span>
                </div>

                <button className="group flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors">
                  <span className="text-sm font-medium">Ver progreso</span>
                  <Play className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Case 3: CI/CD Pipeline */}
            <div className="group bg-black/60 backdrop-blur-lg rounded-xl border border-red-900/20 hover:border-red-600/40 transition-all duration-300 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-purple-600/20 p-2 rounded-lg">
                    <Cloud className="w-6 h-6 text-purple-400" />
                  </div>
                  <span className="text-xs bg-green-600/20 text-green-400 px-2 py-1 rounded-full">COMPLETADO</span>
                </div>
                
                <h3 className="text-xl font-bold mb-3">Pipeline DevOps Azure</h3>
                <p className="text-gray-400 mb-4 text-sm">
                  Automatización completa de despliegues con Jenkins, Docker, y Azure DevOps para aplicaciones Spring Boot.
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="text-sm">
                    <span className="text-red-400 font-semibold">Problema:</span>
                    <span className="text-gray-300"> Despliegues manuales propensos a errores</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-blue-400 font-semibold">Solución:</span>
                    <span className="text-gray-300"> CI/CD completamente automatizado</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-yellow-400 font-semibold">Impacto:</span>
                    <span className="text-gray-300"> 95% reducción en tiempo de deploy</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded text-xs">Azure</span>
                  <span className="bg-red-600/20 text-red-300 px-2 py-1 rounded text-xs">Jenkins</span>
                  <span className="bg-cyan-600/20 text-cyan-300 px-2 py-1 rounded text-xs">Docker</span>
                  <span className="bg-yellow-600/20 text-yellow-300 px-2 py-1 rounded text-xs">GitHub Actions</span>
                </div>

                <button className="group flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors">
                  <span className="text-sm font-medium">Ver arquitectura</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Case Navigation */}
          <div className="text-center mt-12">
            <p className="text-gray-400 mb-4">¿Te interesa algún caso específico?</p>
            <button 
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center space-x-2 bg-red-600/20 border border-red-600/40 hover:bg-red-600/30 px-6 py-3 rounded-lg transition-all duration-300"
            >
              <Mail className="w-4 h-4" />
              <span>Solicitar detalles técnicos</span>
            </button>
          </div>
        </div>
      </section>

      {/* Tech Dashboard Section */}
      <section id="tech" className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              DASHBOARD TÉCNICO
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Arsenal tecnológico optimizado para máxima eficiencia. Cada herramienta seleccionada estratégicamente.
            </p>
          </div>

          {/* Tech Categories */}
          <div className="space-y-12">
            {/* Puntos Fuertes */}
            <div>
              <h3 className="text-2xl font-bold text-green-400 mb-6 flex items-center">
                <CheckCircle className="w-6 h-6 mr-3" />
                PUNTOS FUERTES (2+ años)
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-black/60 backdrop-blur-lg rounded-xl border border-green-600/20 p-6">
                  <div className="flex items-center mb-4">
                    <Database className="w-8 h-8 text-green-400 mr-3" />
                    <h4 className="text-xl font-bold">Backend & Arquitectura</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <span className="bg-orange-600/20 text-orange-300 px-3 py-2 rounded text-sm text-center">Spring Boot</span>
                    <span className="bg-red-600/20 text-red-300 px-3 py-2 rounded text-sm text-center">Spring Security</span>
                    <span className="bg-purple-600/20 text-purple-300 px-3 py-2 rounded text-sm text-center">JPA/Hibernate</span>
                    <span className="bg-blue-600/20 text-blue-300 px-3 py-2 rounded text-sm text-center">Swagger</span>
                    <span className="bg-yellow-600/20 text-yellow-300 px-3 py-2 rounded text-sm text-center">Modelo 4+1</span>
                    <span className="bg-green-600/20 text-green-300 px-3 py-2 rounded text-sm text-center">Hexagonal</span>
                  </div>
                </div>

                <div className="bg-black/60 backdrop-blur-lg rounded-xl border border-green-600/20 p-6">
                  <div className="flex items-center mb-4">
                    <Settings className="w-8 h-8 text-green-400 mr-3" />
                    <h4 className="text-xl font-bold">Bases de Datos & Metodologías</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <span className="bg-blue-600/20 text-blue-300 px-3 py-2 rounded text-sm text-center">MySQL</span>
                    <span className="bg-green-600/20 text-green-300 px-3 py-2 rounded text-sm text-center">MongoDB</span>
                    <span className="bg-purple-600/20 text-purple-300 px-3 py-2 rounded text-sm text-center">Scrum</span>
                    <span className="bg-orange-600/20 text-orange-300 px-3 py-2 rounded text-sm text-center">SOLID</span>
                    <span className="bg-red-600/20 text-red-300 px-3 py-2 rounded text-sm text-center">Git Flow</span>
                    <span className="bg-yellow-600/20 text-yellow-300 px-3 py-2 rounded text-sm text-center">APIs REST</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Competencias Intermedias */}
            <div>
              <h3 className="text-2xl font-bold text-blue-400 mb-6 flex items-center">
                <Target className="w-6 h-6 mr-3" />
                COMPETENCIAS CONSOLIDADAS
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-black/60 backdrop-blur-lg rounded-xl border border-blue-600/20 p-6">
                  <div className="flex items-center mb-4">
                    <Cloud className="w-6 h-6 text-blue-400 mr-2" />
                    <h4 className="font-bold">DevOps & Cloud</h4>
                  </div>
                  <div className="space-y-2">
                    <span className="block bg-blue-600/20 text-blue-300 px-3 py-2 rounded text-sm text-center">Azure DevOps</span>
                    <span className="block bg-cyan-600/20 text-cyan-300 px-3 py-2 rounded text-sm text-center">Docker</span>
                    <span className="block bg-purple-600/20 text-purple-300 px-3 py-2 rounded text-sm text-center">Jenkins</span>
                    <span className="block bg-gray-600/20 text-gray-300 px-3 py-2 rounded text-sm text-center">GitHub Actions</span>
                  </div>
                </div>

                <div className="bg-black/60 backdrop-blur-lg rounded-xl border border-blue-600/20 p-6">
                  <div className="flex items-center mb-4">
                    <Code2 className="w-6 h-6 text-blue-400 mr-2" />
                    <h4 className="font-bold">Full-Stack</h4>
                  </div>
                  <div className="space-y-2">
                    <span className="block bg-green-600/20 text-green-300 px-3 py-2 rounded text-sm text-center">Django + DRF</span>
                    <span className="block bg-cyan-600/20 text-cyan-300 px-3 py-2 rounded text-sm text-center">Flutter</span>
                    <span className="block bg-yellow-600/20 text-yellow-300 px-3 py-2 rounded text-sm text-center">JavaScript</span>
                    <span className="block bg-orange-600/20 text-orange-300 px-3 py-2 rounded text-sm text-center">HTML/CSS</span>
                  </div>
                </div>

                <div className="bg-black/60 backdrop-blur-lg rounded-xl border border-blue-600/20 p-6">
                  <div className="flex items-center mb-4">
                    <Zap className="w-6 h-6 text-blue-400 mr-2" />
                    <h4 className="font-bold">Herramientas</h4>
                  </div>
                  <div className="space-y-2">
                    <span className="block bg-red-600/20 text-red-300 px-3 py-2 rounded text-sm text-center">Git Avanzado</span>
                    <span className="block bg-blue-600/20 text-blue-300 px-3 py-2 rounded text-sm text-center">IaaS/PaaS</span>
                    <span className="block bg-green-600/20 text-green-300 px-3 py-2 rounded text-sm text-center">Swagger/OpenAPI</span>
                    <span className="block bg-yellow-600/20 text-yellow-300 px-3 py-2 rounded text-sm text-center">Postman</span>
                  </div>
                </div>
              </div>
            </div>

            {/* En Desarrollo Activo */}
            <div>
              <h3 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center">
                <Zap className="w-6 h-6 mr-3" />
                EN DESARROLLO ACTIVO
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-black/60 backdrop-blur-lg rounded-xl border border-yellow-600/20 p-6">
                  <div className="flex items-center mb-4">
                    <Code2 className="w-6 h-6 text-yellow-400 mr-2" />
                    <h4 className="font-bold text-sm">Frontend Moderno</h4>
                  </div>
                  <div className="space-y-2">
                    <span className="block bg-cyan-600/20 text-cyan-300 px-2 py-1 rounded text-xs text-center">React + Hooks</span>
                    <span className="block bg-black-600/20 text-white px-2 py-1 rounded text-xs text-center">Next.js</span>
                    <span className="block bg-blue-600/20 text-blue-300 px-2 py-1 rounded text-xs text-center">TypeScript</span>
                  </div>
                </div>

                <div className="bg-black/60 backdrop-blur-lg rounded-xl border border-yellow-600/20 p-6">
                  <div className="flex items-center mb-4">
                    <Cpu className="w-6 h-6 text-yellow-400 mr-2" />
                    <h4 className="font-bold text-sm">AI & ML</h4>
                  </div>
                  <div className="space-y-2">
                    <span className="block bg-orange-600/20 text-orange-300 px-2 py-1 rounded text-xs text-center">PyTorch</span>
                    <span className="block bg-red-600/20 text-red-300 px-2 py-1 rounded text-xs text-center">Tensores</span>
                    <span className="block bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-xs text-center">LLMs</span>
                  </div>
                </div>

                <div className="bg-black/60 backdrop-blur-lg rounded-xl border border-yellow-600/20 p-6">
                  <div className="flex items-center mb-4">
                    <Cloud className="w-6 h-6 text-yellow-400 mr-2" />
                    <h4 className="font-bold text-sm">Cloud Native</h4>
                  </div>
                  <div className="space-y-2">
                    <span className="block bg-blue-600/20 text-blue-300 px-2 py-1 rounded text-xs text-center">Azure Ecosystem Deep</span>
                    <span className="block bg-green-600/20 text-green-300 px-2 py-1 rounded text-xs text-center">GraphQL</span>
                    <span className="block bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-xs text-center">Webhooks</span>
                  </div>
                </div>

                <div className="bg-black/60 backdrop-blur-lg rounded-xl border border-yellow-600/20 p-6">
                  <div className="flex items-center mb-4">
                    <Settings className="w-6 h-6 text-yellow-400 mr-2" />
                    <h4 className="font-bold text-sm">Automatización</h4>
                  </div>
                  <div className="space-y-2">
                    <span className="block bg-cyan-600/20 text-cyan-300 px-2 py-1 rounded text-xs text-center">n8n</span>
                    <span className="block bg-green-600/20 text-green-300 px-2 py-1 rounded text-xs text-center">Pytest</span>
                    <span className="block bg-pink-600/20 text-pink-300 px-2 py-1 rounded text-xs text-center">Jest Testing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tech Roadmap */}
          <div className="mt-16 bg-gradient-to-r from-black/80 to-gray-900/80 backdrop-blur-lg rounded-2xl border border-red-900/20 p-8">
            <h3 className="text-2xl font-bold text-center mb-8 text-red-400">METAS 2025</h3>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h4 className="font-bold text-green-400">Q1: Backend Mastery</h4>
                <p className="text-sm text-gray-300">Consolidación Spring Boot + Azure + patrones avanzados</p>
              </div>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-yellow-600/20 rounded-full flex items-center justify-center mx-auto">
                  <Zap className="w-8 h-8 text-yellow-400" />
                </div>
                <h4 className="font-bold text-yellow-400">Q2: Frontend + Cloud</h4>
                <p className="text-sm text-gray-300">React/Next.js avanzado + arquitecturas cloud-native</p>
              </div>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto">
                  <Target className="w-8 h-8 text-blue-400" />
                </div>
                <h4 className="font-bold text-blue-400">Q3-Q4: AI Integration</h4>
                <p className="text-sm text-gray-300">PyTorch aplicado + LLMs en soluciones empresariales</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engineer Profile Section */}
      <section id="profile" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              EL HUMANO DETRÁS DEL CÓDIGO
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Como muchos, valoro el equilibrio entre trabajo y vida personal, usando la tecnología para optimizar el tiempo y crear conexiones auténticas.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Professional Side */}
            <div className="space-y-8">
              <div className="bg-black/60 backdrop-blur-lg rounded-xl border border-red-900/20 p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center mr-4">
                    <Terminal className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-2xl font-bold">El Ingeniero</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-red-400 mb-2">Formación & Experiencia</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Estudiante de Ingeniería de Software en la Universidad Cooperativa de Colombia con 2 años de experiencia práctica. 
                      He sido monitor universitario, guiando a estudiantes en conceptos técnicos y colaborando en proyectos institucionales.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-blue-400 mb-2">Metodologías & Liderazgo</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Especializado en Scrum y metodologías ágiles, principios SOLID y KISS, con experiencia liderando equipos pequeños en la implementación 
                      de mejores prácticas. Enfoque en documentación técnica comprehensiva y mentoring básico.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-yellow-400 mb-2">Proyectos Reales</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Contribuciones en desarrollo web para instituciones educativas con WordPress, y actualmente optimizando 
                      procesos para una empresa avícola con stack Django/MySQL/Flutter.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Side */}
            <div className="space-y-8">
              <div className="bg-black/60 backdrop-blur-lg rounded-xl border border-blue-900/20 p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mr-4">
                    <User className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold">El Ser Humano</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                    <MapPin className="w-6 h-6 text-green-400 mx-auto mb-2" />
                    <div className="text-sm font-medium">Pasto, Nariño</div>
                    <div className="text-xs text-gray-400">Colombia</div>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                    <Calendar className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                    <div className="text-sm font-medium">Disponible</div>
                    <div className="text-xs text-gray-400">Remoto/Híbrido</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Music className="w-9 h-9 text-purple-400" />
                    <div>
                      <div className="font-medium">Melómano</div>
                      <div className="text-sm text-gray-400">Disfruto desde salsa y rock en español hasta pop, rap y variedad de géneros musicales en varios idiomas. A veces me animo a tocar la batería.</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Dumbbell className="w-6 h-6 text-red-400" />
                    <div>
                      <div className="font-medium">Gym y deportes</div>
                      <div className="text-sm text-gray-400">2 años de disciplina en el gym. El Muay Thai es mi escape favorito en el tiempo libre.</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Coffee className="w-6 h-6 text-yellow-400" />
                    <div>
                      <div className="font-medium">Explorador</div>
                      <div className="text-sm text-gray-400">Me gustan los viajes, conocer culturas, meditar y conectar con la naturaleza</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Philosophy */}
              <div className="bg-gradient-to-r from-red-900/20 to-blue-900/20 backdrop-blur-lg rounded-xl border border-red-600/20 p-6">
                <h4 className="font-bold text-red-400 mb-3 text-center">Mi Filosofía</h4>
                <blockquote className="text-center italic text-gray-300 mb-4">
                  "No trabajo más horas, trabajo más inteligente. Cada línea de código es una hora más para vivir."
                </blockquote>
                <div className="text-sm text-gray-400 text-center">
                  Automatización → Eficiencia → Libertad → Vida plena
                </div>
              </div>
            </div>
          </div>

          {/* Soft Skills */}
          <div className="mt-16 bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-lg rounded-2xl border border-blue-900/20 p-8">
            <h3 className="text-2xl font-bold text-center mb-8 text-blue-400">HABILIDADES BLANDAS CLAVE</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto">
                  <User className="w-8 h-8 text-green-400" />
                </div>
                <h4 className="font-bold text-green-400">Empatía & Colaboración</h4>
                <p className="text-sm text-gray-300">Conexiones auténticas con colegas, mentoring técnico y trabajo en equipo efectivo</p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto">
                  <Zap className="w-8 h-8 text-purple-400" />
                </div>
                <h4 className="font-bold text-purple-400">Adaptabilidad</h4>
                <p className="text-sm text-gray-300">Aprendizaje continuo, mente abierta y capacidad para pivotear según necesidades del proyecto</p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto">
                  <Target className="w-8 h-8 text-blue-400" />
                </div>
                <h4 className="font-bold text-blue-400">Equilibrio & Resiliencia</h4>
                <p className="text-sm text-gray-300">Separación trabajo-vida personal, resiliencia a través del deporte y meditación</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
              ARCHIVOS & CONTACTO
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Expediente completo disponible. Listo para trabajar juntos y aportar valor real a tu equipo o empresa.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:items-start">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-black/60 backdrop-blur-lg rounded-xl border border-red-900/20 p-8">
                <h3 className="text-2xl font-bold mb-6 text-red-400">Información de Contacto</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 bg-gray-800/50 rounded-lg">
                    <MapPin className="w-5 h-5 text-green-400" />
                    <div>
                      <div className="font-medium">Ubicación</div>
                      <div className="text-sm text-gray-400">Pasto, Nariño, Colombia</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-3 bg-gray-800/50 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-sm text-gray-400">nikolasg1200@gmail.com</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-3 bg-gray-800/50 rounded-lg">
                    <Calendar className="w-5 h-5 text-purple-400" />
                    <div>
                      <div className="font-medium">Disponibilidad</div>
                      <div className="text-sm text-gray-400">Remoto/Híbrido</div>
                    </div>
                  </div>
                </div>

                {/* CV Download */}
                <div className="mt-8 p-6 bg-gradient-to-r from-red-900/20 to-yellow-900/20 rounded-xl border border-red-600/30">
                  <h4 className="font-bold text-yellow-400 mb-3 flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Expediente Técnico Completo
                  </h4>
                  <p className="text-sm text-gray-300 mb-4">
                    CV detallado con casos técnicos, arquitecturas implementadas y métricas de impacto.
                  </p>
                  <button className="w-full bg-gradient-to-r from-red-600 to-yellow-600 hover:from-red-500 hover:to-yellow-500 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2">
                    <Download className="w-5 h-5" />
                    <span>Descargar CV Técnico</span>
                  </button>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-black/60 backdrop-blur-lg rounded-xl border border-blue-900/20 p-8">
                <h3 className="text-xl font-bold mb-6 text-blue-400">Conecta Conmigo</h3>
                <div className="grid grid-cols-2 gap-4">
                  <a 
                    href="https://github.com/nicolasgarcia" 
                    className="group bg-gray-800/50 hover:bg-gray-700/50 p-4 rounded-lg transition-all duration-300 flex items-center space-x-3"
                  >
                    <Github className="w-6 h-6 text-gray-300 group-hover:text-white" />
                    <div>
                      <div className="font-medium">GitHub</div>
                      <div className="text-xs text-gray-400">Código & Proyectos</div>
                    </div>
                  </a>
                  
                  <a 
                    href="https://linkedin.com/in/nicolasgarcia" 
                    className="group bg-blue-900/30 hover:bg-blue-800/30 p-4 rounded-lg transition-all duration-300 flex items-center space-x-3"
                  >
                    <Linkedin className="w-6 h-6 text-blue-400 group-hover:text-blue-300" />
                    <div>
                      <div className="font-medium">LinkedIn</div>
                      <div className="text-xs text-gray-400">Perfil Profesional</div>
                    </div>
                  </a>
                </div>
                
                {/* Instagram - Subtle placement */}
                <div className="mt-4 pt-4 border-t border-gray-700/50">
                  <a 
                    href="https://instagram.com/nicolasgarcia" 
                    className="group text-gray-400 hover:text-purple-400 transition-colors flex items-center space-x-2 text-sm"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>Ver lado personal</span>
                    <ExternalLink className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-black/60 backdrop-blur-lg rounded-xl border border-yellow-900/20 p-8">
              <h3 className="text-2xl font-bold mb-6 text-yellow-400">Pongámonos en contacto</h3>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Nombre</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition-colors"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition-colors"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Tipo de Proyecto</label>
                  <select className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:outline-none transition-colors">
                    <option>Backend Development</option>
                    <option>Full-Stack Application</option>
                    <option>DevOps & Cloud</option>
                    <option>Process Automation</option>
                    <option>Technical Consulting</option>
                    <option>Otro</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Mensaje</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition-colors resize-none"
                    placeholder="Cuéntame sobre tu proyecto y cómo podemos automatizar procesos para generar impacto..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-600 to-red-600 hover:from-yellow-500 hover:to-red-500 px-6 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Mail className="w-5 h-5" />
                  <span>Enviar Propuesta</span>
                </button>
              </form>
              
              <div className="mt-6 p-4 bg-yellow-600/10 border border-yellow-600/30 rounded-lg">
                <p className="text-sm text-yellow-300 text-center">
                  <strong>Respuesta garantizada en 24 horas.</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-red-900/20 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg">NICOLÁS GARCÍA</span>
            </div>
            
            <div className="text-sm text-gray-400 text-center">
              <p>© 2025 Nicolás Alejandro García Pasmiño</p>
              <p className="mt-1">"Cada línea de código es una hora más para vivir"</p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-400">Disponible</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;