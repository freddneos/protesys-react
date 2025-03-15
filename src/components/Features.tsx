import { motion } from "framer-motion";
import {
  Crown,
  Calendar,
  ChartSquare,
  Notification,
  MessageProgramming,
  Money
} from "iconsax-react";
import { useTexts } from '../hooks/useTexts';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
}

const featureIcons = [Crown, Calendar, ChartSquare, Notification, MessageProgramming, Money];

const FeatureCard = ({ icon: Icon, title, description, index }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-base-200 via-base-200 to-base-300 p-1"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative bg-base-100 rounded-[22px] p-8 h-full">
        {/* Glowing orb background for icon */}
        <div className="absolute top-6 right-6 w-24 h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-xl transform group-hover:scale-150 transition-transform duration-700" />
        
        <div className="relative z-10">
          <div className="mb-6 relative">
            <motion.div
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center"
            >
              <Icon size={32} className="text-primary group-hover:text-secondary transition-colors duration-300" variant="Bulk" />
            </motion.div>
          </div>
          
          <h3 className="text-2xl font-bold mb-4 text-base-content group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          
          <p className="text-base-content/70 leading-relaxed">
            {description}
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-4 right-4 w-20 h-20 border border-base-content/5 rounded-full opacity-0 group-hover:opacity-100 transform group-hover:scale-150 transition-all duration-700" />
      </div>
    </motion.div>
  );
};

export const Features = () => {
  const texts = useTexts();
  
  return (
    <section id="features" className="relative py-32 px-4 bg-base-100">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] -top-40 -right-40 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute w-[500px] h-[500px] -bottom-40 -left-40 bg-secondary/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-6 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 inline-block">
              Recursos
            </span>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-focus to-secondary bg-clip-text text-transparent leading-[1.2] max-w-4xl mx-auto">
              {texts.features.title}
            </h2>
            
            <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
              Tudo que você precisa para revolucionar a gestão da sua clínica odontológica
            </p>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {texts.features.items.map((feature, index) => (
            <FeatureCard 
              key={index} 
              icon={featureIcons[index % featureIcons.length]} 
              title={feature.title} 
              description={feature.description} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};