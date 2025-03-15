import { motion, useAnimation, useInView } from "framer-motion";
import { ArrowRight, Calendar } from "iconsax-react";
import Typewriter from "typewriter-effect";
import { UilClinicMedical, UilCog } from '@iconscout/react-unicons';
import { useTexts } from '../hooks/useTexts';
import { useTheme } from '../hooks/useTheme';
import React, { useRef, useEffect } from "react";

// Função auxiliar para renderizar HTML de forma segura
const RenderHTML: React.FC<{ html: string; className?: string }> = ({ html, className }) => {
  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
};

export const Hero = () => {
  const { texts } = useTexts();
  const { theme } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const mainControls = useAnimation();
  const floatingIconsControls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
      floatingIconsControls.start("visible");
    }
  }, [isInView, mainControls, floatingIconsControls]);
  
  // Função para rolar até a seção de lista de espera
  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist');
    if (waitlistSection) {
      const yOffset = -80; // Ajuste para compensar a altura do navbar fixo
      const y = waitlistSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Função para abrir modal de agendamento de demo ou redirecionar para calendly
  // const openDemoSchedule = () => {
  //   window.open('https://calendly.com/protesys/demo', '_blank');
  // };
  
  // Efeito de partículas flutuantes
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 2,
    duration: Math.random() * 15 + 10
  }));

  return (
    <section 
      id="hero" 
      ref={ref}
      className="relative min-h-[95vh] pt-20 pb-10 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Particles background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Dynamic particles */}
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className={`absolute rounded-full ${theme === 'dark' ? 'bg-primary/10' : 'bg-primary/5'}`}
            style={{ 
              width: particle.size, 
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "reverse"
            }}
          />
        ))}
      </div>

      {/* Animated background elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 2 }}
        className="absolute -right-10 top-20"
      >
        <motion.div
          animate={{
            rotate: 360
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <UilCog size={64} color="currentColor" className="text-primary w-16 h-16 opacity-20" />
        </motion.div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 2 }}
        className="absolute left-10 bottom-32"
      >
        <motion.div
          animate={{
            rotate: -360
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <UilClinicMedical size={80} color="currentColor" className="text-secondary w-20 h-20 opacity-20" />
        </motion.div>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        {/* Main Content with Animations */}
        <motion.div
          className="text-center max-w-4xl"
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0 }
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ 
            duration: 0.8, 
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          <motion.div
            whileInView={{ scale: [0.9, 1] }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-8 tracking-tight">
              <span className="inline-block">
                {typeof texts.hero.title === 'string' && texts.hero.title.includes('<') ? (
                  <RenderHTML 
                    html={texts.hero.title} 
                    className="bg-gradient-to-r from-primary via-primary-focus to-secondary bg-clip-text text-transparent" 
                  />
                ) : (
                  <span className="bg-gradient-to-r from-primary via-primary-focus to-secondary bg-clip-text text-transparent">
                    {texts.hero.title}
                  </span>
                )}
              </span>
            </h1>
          </motion.div>

          <motion.div 
            className="hidden md:flex text-lg md:text-xl lg:text-2xl text-base-content/80 mb-12 h-24 items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <div className="typewriter-container relative">
              <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-secondary/60 animate-pulse"></span>
              <Typewriter
                options={{
                  strings: texts.hero.typewriterTexts.map(text => {
                    // Remove tags HTML caso existam para evitar problemas com o Typewriter
                    return typeof text === 'string' ? text.replace(/<[^>]*>/g, '') : text;
                  }),
                  autoStart: true,
                  loop: true,
                  delay: 40,
                  deleteSpeed: 20,
                  cursor: "",
                }}
              />
              <span className="absolute -right-6 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary/60 animate-pulse"></span>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-6 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {/* <motion.button 
              onClick={scrollToWaitlist}
              className="btn btn-primary btn-lg rounded-full shadow-lg shadow-primary/20 px-8"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(var(--primary), 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className="relative z-10">
                {typeof texts.hero.buttons.waitlist === 'string' && texts.hero.buttons.waitlist.includes('<') ? (
                  <RenderHTML html={texts.hero.buttons.waitlist} />
                ) : (
                  texts.hero.buttons.waitlist
                )}
              </span>
            </motion.button> */}
            
            <motion.button 
              onClick={scrollToWaitlist}
              // className="btn btn-outline btn-secondary btn-lg gap-3 rounded-full group px-8"
              className="btn btn-primary btn-lg rounded-full shadow-lg shadow-primary/20 px-8"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(var(--secondary), 0.3)" 
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Calendar size="20" variant="Bold" className="opacity-80" />
              <span>
                {typeof texts.hero.buttons.demo === 'string' && texts.hero.buttons.demo.includes('<') ? (
                  <RenderHTML html={texts.hero.buttons.demo} />
                ) : (
                  texts.hero.buttons.demo
                )}
              </span>
              <motion.div
                className="ml-1 opacity-70"
                animate={{ x: [0, 5, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5,
                  repeatDelay: 1
                }}
              >
                <ArrowRight size="20" />
              </motion.div>
            </motion.button>
          </motion.div>
          
          {/* Statistics or trust indicators */}
          <motion.div
            className="mt-16 flex flex-wrap justify-center gap-4 md:gap-10 text-base-content/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success"></div>
              <p className="text-sm md:text-base font-medium">Clínicas confiam em nós</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-secondary"></div>
              <p className="text-sm md:text-base font-medium">100% Seguro</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <p className="text-sm md:text-base font-medium">Suporte especializado</p>
            </div>
          </motion.div>
        </motion.div>      
      </div>

      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-base-100 opacity-80 -z-10" />
    </section>
  );
};