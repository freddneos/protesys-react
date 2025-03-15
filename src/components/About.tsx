import { motion } from "framer-motion";
import { UilClinicMedical, UilCog } from '@iconscout/react-unicons';
import { useTexts } from '../hooks/useTexts';

const FeatureCard = ({ feature, index }: { feature: { title: string; description: string }, index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, delay: index * 0.2 }}
    whileHover={{ y: -5, scale: 1.02 }}
    className="relative group"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-[32px] blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
    
    <div className="card bg-base-100 shadow-xl relative overflow-hidden rounded-[30px] backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="card-body p-8">
        <motion.div
          initial={{ rotate: 0 }}
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.7 }}
          className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center"
        >
          {index % 2 === 0 ? (
            <UilClinicMedical size={32} className="w-8 h-8 text-primary group-hover:text-secondary transition-colors duration-300" />
          ) : (
            <UilCog size={32} className="w-8 h-8 text-primary group-hover:text-secondary transition-colors duration-300" />
          )}
        </motion.div>
        
        <h3 className="card-title text-2xl mb-4 group-hover:text-primary transition-colors duration-300">
          {feature.title}
        </h3>
        
        <p className="text-base-content/70 leading-relaxed">
          {feature.description}
        </p>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-32 h-32 border border-base-content/5 rounded-full opacity-0 group-hover:opacity-100 transform group-hover:scale-150 transition-all duration-700" />
      </div>
    </div>
  </motion.div>
);

export const About = () => {
  const texts = useTexts();
  
  return (
    <section id="about" className="relative min-h-screen bg-base-200 py-32 flex items-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: [-360, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute right-0 top-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -left-20 bottom-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-secondary/5 to-transparent blur-3xl"
        />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-6 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 inline-block">
              Sobre nós
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-focus to-secondary bg-clip-text text-transparent leading-[1.2] max-w-4xl mx-auto">
              {texts.about.title}
            </h2>

            <p className="text-xl text-base-content/70 max-w-3xl mx-auto leading-relaxed">
              {texts.about.description}
            </p>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {texts.about.features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};