'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ChevronRight, ChevronLeft, Download, Mail, Github, Linkedin, MapPin, Calendar, Clock, Code2, Database, Cloud, Smartphone, GitBranch, Terminal, Server, Cpu, Zap, Target, BookOpen, Trophy, User, Briefcase, GraduationCap, ExternalLink, ArrowRight, Menu, X, ChevronDown, Play, Pause } from 'lucide-react';

// Custom hook para manejo de animaciones
const useParticles = (isAnimating: boolean) => {
  useEffect(() => {
    const canvasElement = document.getElementById('particles-canvas') as HTMLCanvasElement | null;
    if (!canvasElement) return;
    
    const ctx = canvasElement.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number | null = null;
    type Particle = { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number; };
    let particles: Particle[] = [];
    
    const resizeCanvas = () => {
      canvasElement.width = window.innerWidth;
      canvasElement.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvasElement.width,
        y: Math.random() * canvasElement.height,
        size: Math.random() * 2 + 1,
        speedX: Math.random() * 3 - 1.5,
        speedY: Math.random() * 3 - 1.5,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        if (particle.x < 0 || particle.x > canvasElement.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvasElement.height) particle.speedY *= -1;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 20, 60, ${particle.opacity})`;
        ctx.fill();
      });
      
      // Draw connections
      particles.forEach((particleA, indexA) => {
        particles.forEach((particleB, indexB) => {
          if (indexA !== indexB) {
            const distance = Math.sqrt(
              Math.pow(particleA.x - particleB.x, 2) + 
              Math.pow(particleA.y - particleB.y, 2)
            );
            
            if (distance < 100) {
              ctx.strokeStyle = `rgba(220, 20, 60, ${0.1 * (1 - distance / 100)})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(particleA.x, particleA.y);
              ctx.lineTo(particleB.x, particleB.y);
              ctx.stroke();
            }
          }
        });
      });
      
      if (isAnimating) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
    };
  }, [isAnimating]);
};

// Componente Card reutilizable (inspirado en React Bits)
const cardVariants = {
  default: "bg-gray-900 border-gray-700 hover:border-red-600/50",
  glass: "bg-gray-900/90 backdrop-blur-sm border-gray-700",
  gradient: "bg-gradient-to-r from-red-600/10 to-red-800/10 border-red-600/30"
} as const;
type CardVariant = keyof typeof cardVariants;
type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
  className?: string;
  variant?: CardVariant;
};

const Card: React.FC<CardProps> = ({ children, className = "", variant = "default", ...props }) => {
  const baseClasses = "rounded-lg border transition-all duration-300";
  
  return (
    <div className={`${baseClasses} ${cardVariants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};

// Componente Button mejorado
const buttonVariantMap = {
  primary: "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/25",
  secondary: "border border-red-600 text-red-500 hover:bg-red-600 hover:text-white",
  ghost: "text-gray-400 hover:text-white hover:bg-gray-800"
} as const;
const buttonSizeMap = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3",
  lg: "px-8 py-4 text-lg"
} as const;

type ButtonVariant = keyof typeof buttonVariantMap;
type ButtonSize = keyof typeof buttonSizeMap;
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ children, variant = "primary", size = "md", className = "", onClick, ...props }) => {
  const baseClasses = "font-medium rounded-lg transition-all duration-300 flex items-center justify-center space-x-2";
  
  return (
    <button 
      className={`${baseClasses} ${buttonVariantMap[variant]} ${buttonSizeMap[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

// Componente Badge
type BadgeVariant = 'default' | 'success' | 'warning' | 'info' | 'danger';
type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  children?: React.ReactNode;
  variant?: BadgeVariant;
};

const Badge: React.FC<BadgeProps> = ({ children, variant = "default", ...props }) => {
  const variants: Record<BadgeVariant, string> = {
    default: "bg-gray-700 text-gray-300",
    success: "bg-green-600/20 text-green-400",
    warning: "bg-yellow-600/20 text-yellow-400",
    info: "bg-blue-600/20 text-blue-400",
    danger: "bg-red-600/20 text-red-400"
  };
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${variants[variant]}`} {...props}>
      {children}
    </span>
  );
};

// Hook personalizado para datos
const usePortfolioData = () => {
  const caseFiles = useMemo(() => [
    {
      id: "CF-001",
      title: "Sistema de Inventario Avícola",
      status: "En Desarrollo",
      problem: "Procesos manuales de inventario causando pérdidas de tiempo y errores en una empresa avícola",
      analysis: "Identificación de 15 procesos repetitivos que consumían 8 horas diarias de trabajo manual",
      solution: "API REST con Django + MySQL + App Flutter para gestión móvil",
      impact: "85% reducción en tiempo de inventario, eliminación de errores de transcripción",
      technologies: ["Django", "MySQL", "Flutter", "Django REST Framework"],
      timeframe: "3 meses",
      metrics: {
        timeSaved: "6 horas/día",
        errorReduction: "95%",
        efficiency: "300%"
      }
    },
    {
      id: "CF-002", 
      title: "Pipeline CI/CD Automatizada",
      status: "Completado",
      problem: "Deployments manuales propensos a errores y tiempo excesivo de liberación",
      analysis: "Proceso de deployment tomaba 2 horas con 40% de fallos por errores humanos",
      solution: "Jenkins pipeline + Docker + Azure DevOps con testing automatizado",
      impact: "Deployments de 2 horas a 15 minutos, 0% fallos en producción",
      technologies: ["Jenkins", "Docker", "Azure DevOps", "GitHub Actions"],
      timeframe: "1 mes",
      metrics: {
        timeSaved: "1.75 horas/deploy",
        errorReduction: "100%",
        efficiency: "800%"
      }
    },
    {
      id: "CF-003",
      title: "Arquitectura Hexagonal Spring Boot",
      status: "Completado", 
      problem: "Código monolítico difícil de mantener y testear en aplicaciones empresariales",
      analysis: "Acoplamiento fuerte entre capas generaba dificultades para testing y mantenimiento",
      solution: "Refactorización a arquitectura hexagonal con Spring Boot + patrón Repository",
      impact: "50% reducción en bugs, testing coverage del 85%",
      technologies: ["Java", "Spring Boot", "JUnit", "Maven", "MySQL"],
      timeframe: "2 meses",
      metrics: {
        testCoverage: "85%",
        bugReduction: "50%",
        maintainability: "200%"
      }
    }
  ], []);

  const skills = useMemo(() => ({
    "Dominio Avanzado": [
      { name: "Java", level: "avanzado", icon: Code2, description: "Spring Boot ecosystem, APIs REST, JPA/Hibernate" },
      { name: "Spring Boot", level: "avanzado", icon: Server, description: "Security, Testing, Microservicios" },
      { name: "MySQL", level: "avanzado", icon: Database, description: "Queries complejas, optimización, diseño de esquemas" },
      { name: "Arquitectura Software", level: "avanzado", icon: Cpu, description: "Patrones hexagonales, Modelo 4+1, APIs" },
      { name: "Scrum", level: "avanzado", icon: Target, description: "Historias de usuario, estimaciones, retrospectivas" }
    ],
    "Competencias Consolidadas": [
      { name: "Docker", level: "intermedio", icon: Terminal, description: "Dockerfiles, docker-compose, containerización" },
      { name: "Azure", level: "intermedio", icon: Cloud, description: "DevOps, deployment, conceptos cloud" },
      { name: "Git", level: "intermedio", icon: GitBranch, description: "GitFlow, branching strategies, pull requests" },
      { name: "Python/Django", level: "intermedio", icon: Code2, description: "Django REST Framework, APIs" },
      { name: "Flutter", level: "basico", icon: Smartphone, description: "Desarrollo móvil básico" }
    ],
    "En Desarrollo": [
      { name: "React/Next.js", level: "aprendizaje", icon: Code2, description: "Hooks, TypeScript, SSR" },
      { name: "PyTorch", level: "aprendizaje", icon: Cpu, description: "Tensores, gradientes, conceptos ML" },
      { name: "GraphQL", level: "aprendizaje", icon: Database, description: "APIs modernas, real-time" },
      { name: "Arquitectura Cloud", level: "aprendizaje", icon: Cloud, description: "Cloud-native, microservicios" }
    ]
  }), []);

  return { caseFiles, skills };
};

const Portfolio = () => {
  const [currentSection, setCurrentSection] = useState('hero');
  const [currentCase, setCurrentCase] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [skillFilter, setSkillFilter] = useState('all');
  const [isAnimating, setIsAnimating] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Backend Development',
    message: ''
  });

  const { caseFiles, skills } = usePortfolioData();
  
  // Custom hook para partículas
  useParticles(isAnimating);

  // Manejar cambios en el formulario
  const handleFormChange = useCallback((field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  // Navegación mejorada
  const navigation = useMemo(() => [
    { id: 'hero', label: 'Central Lab', icon: Zap },
    { id: 'cases', label: 'Case Files', icon: BookOpen },
    { id: 'skills', label: 'Tech Arsenal', icon: Cpu },
    { id: 'profile', label: 'Scientist Profile', icon: User },
    { id: 'contact', label: 'Archives', icon: Mail }
  ], []);

  const NavigationMenu = ({ isMobile = false }) => (
    <nav className={`${isMobile ? 'flex flex-col space-y-4' : 'hidden lg:flex lg:flex-col lg:space-y-2'}`}>
      {navigation.map(({ id, label, icon: Icon }) => (
        <Button
          key={id}
          variant={currentSection === id ? "primary" : "ghost"}
          onClick={() => {
            setCurrentSection(id);
            setMobileMenuOpen(false);
          }}
          className="w-full justify-start group"
        >
          <Icon className="w-5 h-5" />
          <span>{label}</span>
          {currentSection === id && (
            <div className="w-2 h-2 bg-white rounded-full ml-auto animate-pulse" />
          )}
        </Button>
      ))}
    </nav>
  );

  const HeroSection = () => (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <canvas id="particles-canvas" className="absolute inset-0 z-0" />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <Card variant="glass" className="inline-block p-4 mb-6">
          <div className="text-red-500 text-sm font-mono mb-2">SISTEMA INICIADO // STATUS: ACTIVO</div>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
            Nicolás García
            <span className="block text-red-500 text-2xl lg:text-3xl font-normal mt-2">Backend Engineer</span>
          </h1>
        </Card>

        <Card variant="glass" className="p-8 mb-8">
          <div className="text-red-400 text-sm font-mono mb-4">FILOSOFÍA_CORE.exe</div>
          <blockquote className="text-xl lg:text-2xl text-gray-200 font-light leading-relaxed mb-6">
            "Automatizo procesos para liberar tiempo y vivir plenamente"
          </blockquote>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm text-gray-400">
            <div className="flex items-center justify-center space-x-2">
              <Zap className="w-4 h-4 text-red-500" />
              <span>Trabajo más inteligente</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Clock className="w-4 h-4 text-red-500" />
              <span>Cada línea = 1 hora recuperada</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Target className="w-4 h-4 text-red-500" />
              <span>Automatización → Libertad</span>
            </div>
          </div>
        </Card>

        <div className="flex flex-col lg:flex-row gap-4 justify-center">
          <Button size="lg" onClick={() => setCurrentSection('cases')}>
            <BookOpen className="w-5 h-5" />
            <span>Explorar Case Files</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="secondary" size="lg" onClick={() => setCurrentSection('skills')}>
            <Cpu className="w-5 h-5" />
            <span>Tech Arsenal</span>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-gray-500 text-sm mb-2">UBICACIÓN_ACTUAL</div>
        <div className="flex items-center justify-center space-x-2 text-gray-400">
          <MapPin className="w-4 h-4" />
          <span>Pasto, Nariño, Colombia</span>
        </div>
      </div>
    </section>
  );

  const CaseFilesSection = () => (
    <section className="min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-red-500 text-sm font-mono mb-4">ARCHIVOS_FORENSES_DIGITALES.db</div>
          <h2 className="text-4xl font-bold text-white mb-6">Case Files</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Documentación de casos de optimización y automatización de procesos
          </p>
        </div>

        <Card className="overflow-hidden">
          {/* Case Navigation */}
          <div className="border-b border-gray-700 p-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {caseFiles.map((caseFile, index) => (
                <Button
                  key={index}
                  variant={currentCase === index ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentCase(index)}
                  className="font-mono"
                >
                  {caseFile.id}
                </Button>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentCase((prev) => (prev > 0 ? prev - 1 : caseFiles.length - 1))}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Anterior</span>
              </Button>
              <span className="text-gray-400 font-mono">
                {currentCase + 1} / {caseFiles.length}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentCase((prev) => (prev < caseFiles.length - 1 ? prev + 1 : 0))}
              >
                <span>Siguiente</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Case Content */}
          <div className="p-8">
            {caseFiles[currentCase] && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-white">{caseFiles[currentCase].title}</h3>
                      <Badge variant={caseFiles[currentCase].status === 'Completado' ? 'success' : 'warning'}>
                        {caseFiles[currentCase].status}
                      </Badge>
                    </div>
                    <div className="text-red-500 font-mono text-sm mb-2">
                      CASO_{caseFiles[currentCase].id} // TIMEFRAME: {caseFiles[currentCase].timeframe}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <Card className="p-6">
                      <h4 className="text-red-400 font-semibold mb-3 flex items-center">
                        <Target className="w-4 h-4 mr-2" />
                        PROBLEMA IDENTIFICADO
                      </h4>
                      <p className="text-gray-300">{caseFiles[currentCase].problem}</p>
                    </Card>

                    <Card className="p-6">
                      <h4 className="text-blue-400 font-semibold mb-3 flex items-center">
                        <BookOpen className="w-4 h-4 mr-2" />
                        ANÁLISIS FORENSE
                      </h4>
                      <p className="text-gray-300">{caseFiles[currentCase].analysis}</p>
                    </Card>

                    <Card className="p-6">
                      <h4 className="text-green-400 font-semibold mb-3 flex items-center">
                        <Code2 className="w-4 h-4 mr-2" />
                        SOLUCIÓN IMPLEMENTADA
                      </h4>
                      <p className="text-gray-300 mb-4">{caseFiles[currentCase].solution}</p>
                      <div className="flex flex-wrap gap-2">
                        {caseFiles[currentCase].technologies.map((tech, i) => (
                          <Badge key={i}>{tech}</Badge>
                        ))}
                      </div>
                    </Card>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card className="p-6">
                    <h4 className="text-yellow-400 font-semibold mb-4 flex items-center">
                      <Trophy className="w-4 h-4 mr-2" />
                      MÉTRICAS DE IMPACTO
                    </h4>
                    <div className="space-y-4">
                      {Object.entries(caseFiles[currentCase].metrics).map(([key, value], i) => (
                        <div key={i} className="flex justify-between items-center">
                          <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="text-white font-bold">{value}</span>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card variant="gradient" className="p-6">
                    <h4 className="text-red-400 font-semibold mb-3">RESULTADO FINAL</h4>
                    <p className="text-gray-300 text-sm">{caseFiles[currentCase].impact}</p>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </section>
  );

  const ContactSection = () => (
    <section className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-red-500 text-sm font-mono mb-4">CONTACT_ARCHIVES.sys</div>
          <h2 className="text-4xl font-bold text-white mb-6">Archivos de Contacto</h2>
          <p className="text-gray-400 text-lg">
            Expediente completo y canales de comunicación
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="p-8">
            <div className="flex items-center mb-6">
              <Mail className="w-6 h-6 text-red-500 mr-3" />
              <h3 className="text-xl font-bold text-white">Mensaje Directo</h3>
            </div>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Nombre</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => handleFormChange('name', e.target.value)}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none transition-colors"
                  placeholder="Tu nombre completo"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => handleFormChange('email', e.target.value)}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none transition-colors"
                  placeholder="tu.email@ejemplo.com"
                />
              </div>
              
              <div>
               <label className="b text-gray-400 mb-2">Tipo de Proyecto</label>
                <select 
                  value={formData.projectType}
                  onChange={(e) => handleFormChange('projectType', e.target.value)}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none transition-colors"
                >
                  <option>Backend Development</option>
                  <option>Full Stack Project</option>
                  <option>Cloud Architecture</option>
                  <option>PAutomation</option>
                  <option>Technical Consultation</option>
                  <option>Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Mensaje</label>
                <textarea 
                  rows={4} 
                  value={formData.message}
                  onChange={(e) => handleFormChange('message', e.target.value)}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none transition-colors resize-none"
                  placeholder="Describe tu proyecto o consulta..."
                />
              </div>
              
              <Button size="lg" className="w-full">
                <Mail className="w-4 h-4" />
                <span>Enviar Mensaje</span>
              </Button>
            </form>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="p-8">
              <h3 className="text-xl font-bold text-white mb-6">Enlaces Profesionales</h3>
              <div className="space-y-4">
                <a 
                  href="#" 
                  className="flex items-center space-x-4 p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors group"
                >
                  <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center group-hover:bg-red-600 transition-colors">
                    <Github className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-medium">GitHub</div>
                    <div className="text-gray-400 text-sm">Repositorios y proyectos</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </a>

                <a 
                  href="#" 
                  className="flex items-center space-x-4 p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors group"
                >
                  <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <Linkedin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-medium">LinkedIn</div>
                    <div className="text-gray-400 text-sm">Red profesional</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </a>
              </div>
            </Card>

            <Card className="p-8">
              <h3 className="text-xl font-bold text-white mb-6">Contacto Rápido</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="w-5 h-5 text-red-500" />
                  <span>nicolas.garcia@email.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-red-500" />
                  <span>Pasto, Nariño, Colombia</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Clock className="w-5 h-5 text-red-500" />
                  <span>UTC-5 (COT) - Disponible 9AM-6PM</span>
                </div>
              </div>
              
              <Card variant="gradient" className="mt-6 p-4">
                <div className="text-red-400 text-sm font-medium mb-2">ESTADO ACTUAL</div>
                <div className="text-gray-300 text-sm">
                  ✅ Disponible para proyectos freelance<br/>
                  ✅ Consultorías técnicas<br/>
                  ⚡ Respuesta típica: 24-48 horas
                </div>
              </Card>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden">
      {/* Desktop Sidebar Navigation */}
      <div className="fixed left-0 top-0 h-full w-64 bg-gray-900/95 backdrop-blur-sm border-r border-gray-700 z-50 hidden lg:block">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-white font-bold">S.T.A.R. Labs</div>
              <div className="text-gray-400 text-xs">Command Center</div>
            </div>
          </div>
          <NavigationMenu />
          
          <div className="mt-8 p-4 bg-gray-800/50 rounded-lg">
            <div className="text-xs text-gray-400 mb-2">ANIMATION CONTROL</div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAnimating(!isAnimating)}
              className="w-full"
            >
              {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isAnimating ? 'Pause' : 'Play'} Particles</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-sm">Nicolás García</div>
              <div className="text-gray-400 text-xs">Backend Engineer</div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 p-4">
            <NavigationMenu isMobile />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 pt-20 lg:pt-0">
        {currentSection === 'hero' && <HeroSection />}
        {currentSection === 'cases' && <CaseFilesSection />}
        {currentSection === 'skills' && <SkillsSection />}
        {currentSection === 'profile' && <ProfileSection />}
        {currentSection === 'contact' && <ContactSection />}
      </div>

      {/* Floating Action Button (Mobile) */}
      <div className="fixed bottom-6 right-6 lg:hidden">
        <Button
          size="lg"
          onClick={() => setCurrentSection(currentSection === 'contact' ? 'hero' : 'contact')}
          className="w-14 h-14 rounded-full shadow-lg"
        >
          {currentSection === 'contact' ? <Zap className="w-6 h-6" /> : <Mail className="w-6 h-6" />}
        </Button>
      </div>
    </div>
  );
};

// Exportar el componente principal como default para Next.js
export default Portfolio;

// Skills Section y Profile Section simplificadas usando los nuevos componentes
type Skill = {
  name: string;
  level: string;
  icon: React.ComponentType<any>;
  description: string;
};

const SkillsSection = () => {
  const { skills } = usePortfolioData();
  const [skillFilter, setSkillFilter] = useState<'all' | keyof typeof skills>('all');
  
  const filteredSkills: Record<string, Skill[]> = skillFilter === 'all'
    ? (skills as unknown as Record<string, Skill[]>)
    : ({ [skillFilter]: skills[skillFilter] } as Record<string, Skill[]>);

  return (
    <section className="min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-red-500 text-sm font-mono mb-4">TECH_ARSENAL.sys</div>
          <h2 className="text-4xl font-bold text-white mb-6">Arsenal Técnico</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Competencias organizadas por nivel de dominio y experiencia práctica
          </p>
        </div>

        {/* Skill Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {(['all', ...Object.keys(skills)] as (string | keyof typeof skills)[]).map((filter) => (
            <Button
              key={String(filter)}
              variant={skillFilter === filter ? "primary" : "ghost"}
              onClick={() => setSkillFilter(filter as 'all' | keyof typeof skills)}
            >
              {filter === 'all' ? 'Ver Todo' : String(filter)}
            </Button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="space-y-12">
          {Object.entries(filteredSkills).map(([category, skillList]: [string, Skill[]]) => (
            <div key={category}>
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                <div className="w-1 h-8 bg-red-600 mr-4"></div>
                {category}
                <span className="ml-4 text-sm text-gray-400 font-normal">
                  ({skillList.length} competencias)
                </span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skillList.map((skill: Skill, index: number) => {
                  const Icon = skill.icon;
                  return (
                    <Card key={index} className="p-6 group">
                      <div className="flex items-center mb-4">
                        <div className="p-3 bg-gray-800 rounded-lg mr-4 group-hover:bg-red-600/20 transition-colors">
                          <Icon className="w-6 h-6 text-red-500" />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">{skill.name}</h4>
                          <Badge variant={
                            skill.level === 'avanzado' ? 'success' :
                            skill.level === 'intermedio' ? 'warning' : 'info'
                          }>
                            {skill.level}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm">{skill.description}</p>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProfileSection = () => {
  const experience = [
    {
      type: "Académica",
      title: "Ingeniería de Software",
      institution: "Universidad",
      period: "2023 - Presente",
      description: "Python nativo, Django, Java, Patrones de Software, Arquitectura, Next.js, MySQL, TypeScript, Flutter, GitHub Actions, Jenkins, MongoDB Atlas",
      achievements: ["Monitor académico por un semestre", "Proyectos con metodologías ágiles", "Pipeline CI/CD con Jenkins"]
    },
    {
      type: "Freelance", 
      title: "Desarrollador Web",
      institution: "Colegio Local",
      period: "2024",
      description: "Desarrollo y colaboración en sitio web institucional usando WordPress, optimización de procesos de nómina",
      achievements: ["Sitio web responsive", "Optimización de procesos administrativos", "Gestión de contenido"]
    },
    {
      type: "Proyecto Actual",
      title: "Backend Developer",
      institution: "Empresa Avícola",
      period: "2024 - Presente", 
      description: "Desarrollo de sistema de gestión de inventario y formularios usando Django, MySQL y Flutter",
      achievements: ["API REST completa", "App móvil para inventario", "85% reducción en tiempo de procesos"]
    }
  ];

  return (
    <section className="min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-red-500 text-sm font-mono mb-4">SCIENTIST_PROFILE.bio</div>
          <h2 className="text-4xl font-bold text-white mb-6">El Científico Detrás del Código</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Balance entre excelencia técnica y calidad de vida
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Professional Profile */}
          <Card className="p-8">
            <div className="flex items-center mb-8">
              <Briefcase className="w-8 h-8 text-red-500 mr-4" />
              <h3 className="text-2xl font-bold text-white">Perfil Profesional</h3>
            </div>

            <div className="space-y-8">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <GraduationCap className="w-5 h-5 text-red-500 mr-2" />
                  Experiencia
                </h4>
                <div className="space-y-4">
                  {experience.map((exp, index) => (
                    <div key={index} className="border-l-2 border-red-600 pl-6 pb-6">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge variant="danger">{exp.type}</Badge>
                        <span className="text-gray-400 text-sm">{exp.period}</span>
                      </div>
                      <h5 className="text-white font-semibold">{exp.title}</h5>
                      <p className="text-gray-500 text-sm mb-2">{exp.institution}</p>
                      <p className="text-gray-400 text-sm mb-3">{exp.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.achievements.map((achievement, i) => (
                          <Badge key={i}>• {achievement}</Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Personal Profile */}
          <Card className="p-8">
            <div className="flex items-center mb-8">
              <User className="w-8 h-8 text-red-500 mr-4" />
              <h3 className="text-2xl font-bold text-white">Perfil Personal</h3>
            </div>

            <div className="space-y-8">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Target className="w-5 h-5 text-red-500 mr-2" />
                  Filosofía de Vida
                </h4>
                <Card variant="gradient" className="p-6">
                  <p className="text-gray-300 mb-4">
                    "La tecnología debe servir a la vida, no dominarla. Cada proceso automatizado es tiempo recuperado para las cosas que realmente importan."
                  </p>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center text-sm text-gray-400">
                      <Zap className="w-4 h-4 text-red-500 mr-2" />
                      <span>Optimización constante de procesos</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <Clock className="w-4 h-4 text-red-500 mr-2" />
                      <span>Balance trabajo-vida personal</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <Target className="w-4 h-4 text-red-500 mr-2" />
                      <span>Enfoque en impacto real</span>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="p-6">
                <h4 className="text-white font-semibold mb-4">Ubicación & Disponibilidad</h4>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-300">
                    <MapPin className="w-4 h-4 text-red-500 mr-3" />
                    <span>Pasto, Nariño, Colombia</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Clock className="w-4 h-4 text-red-500 mr-3" />
                    <span>Zona horaria: UTC-5 (COT)</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Zap className="w-4 h-4 text-red-500 mr-3" />
                    <span>Disponible para proyectos remotos</span>
                  </div>
                </div>
              </Card>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};