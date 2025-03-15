import { motion } from "framer-motion";
import { ArrowRight } from "iconsax-react";
import Typewriter from "typewriter-effect";
import { UilClinicMedical, UilCog } from '@iconscout/react-unicons';
import { useTexts } from '../hooks/useTexts';

export const Hero = () => {
  const texts = useTexts();
  
  return (
    <section className="hero min-h-screen bg-base-100 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
      />
      <motion.div
        animate={{
          rotate: -360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-secondary/5 blur-3xl"
      />

      <div className="hero-content text-center relative z-10">
        <div className="max-w-5xl lg:max-w-6xl xl:max-w-7xl">
          {/* Floating Icons */}
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -left-10 top-0"
          >
            <UilClinicMedical className="text-primary w-12 h-12 opacity-70" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -right-10 top-20"
          >
            <UilCog className="text-secondary w-10 h-10 opacity-70" />
          </motion.div>

          {/* Main Content with Animations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="flex flex-col gap-4 text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              <span>{texts.hero.title}</span>
            </h1>

            <div className="text-lg md:text-xl lg:text-2xl text-base-content/70 mb-12 h-32 flex items-center justify-center">
              <Typewriter
                options={{
                  strings: texts.hero.typewriterTexts,
                  autoStart: true,
                  loop: true,
                  delay: 50,
                  deleteSpeed: 30
                }}
              />
            </div>
            
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4 items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.button 
                className="btn btn-primary btn-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {texts.hero.buttons.waitlist}
              </motion.button>
              
              <motion.button 
                className="btn btn-secondary btn-lg gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {texts.hero.buttons.demo} <ArrowRight size={24} />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};