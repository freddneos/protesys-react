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
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow"
    >
      <div className="card-body">
        <Icon size={40} className="text-primary mb-4" variant="Bulk" />
        <h3 className="card-title text-xl font-bold mb-2">{title}</h3>
        <p className="text-base-content/70">{description}</p>
      </div>
    </motion.div>
  );
};

export const Features = () => {
  const texts = useTexts();
  
  return (
    <section id="features" className="min-h-screen py-20 px-4 bg-base-100 flex items-center">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-[1.3] py-2">
            {texts.features.title}
          </h2>
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