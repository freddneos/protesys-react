import { motion } from "framer-motion";
import { useState } from 'react';
import {
  Electricity,
  ElementEqual,
  SearchZoomIn1,
  Chart21,
  BoxAdd,
  ArrowDown2,
  ArrowUp2
} from "iconsax-react";
import { useTexts } from '../hooks/useTexts';

interface SolutionCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  details: string;
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
}

const solutionIcons = [Electricity, ElementEqual, SearchZoomIn1, Chart21, BoxAdd];

const SolutionCard = ({ 
  icon: Icon, 
  title, 
  description, 
  details, 
  isExpanded, 
  onToggle, 
  index 
}: SolutionCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    onClick={onToggle}
    className="card bg-base-200 hover:bg-base-300 transition-all duration-300 cursor-pointer"
  >
    <div className="card-body p-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon size={24} className="text-primary" variant="Bold" />
        </div>
        <h3 className="flex-1 card-title text-xl">{title}</h3>
        <div className="text-primary">
          {isExpanded ? (
            <ArrowUp2 size={20} />
          ) : (
            <ArrowDown2 size={20} />
          )}
        </div>
      </div>
      
      <motion.div
        initial={false}
        animate={{ 
          height: isExpanded ? "auto" : 0, 
          opacity: isExpanded ? 1 : 0,
          marginTop: isExpanded ? "1rem" : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="text-base-content/70 mb-4">{description}</p>
        <p className="text-base-content/80 bg-base-300 p-4 rounded-lg">{details}</p>
      </motion.div>
    </div>
  </motion.div>
);

export const SolutionsSection = () => {
  const texts = useTexts();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section id="solutions" className="min-h-screen bg-base-100 relative">
      <div className="container mx-auto px-4 py-20 min-h-screen flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {texts.solutions.title}
            </span>
          </h2>
          <p className="text-xl text-base-content/70">
            {texts.solutions.subtitle}
          </p>
        </motion.div>

        <div className="grid gap-4 max-w-4xl mx-auto w-full">
          {texts.solutions.items.map((solution, index) => (
            <SolutionCard
              key={index}
              icon={solutionIcons[index % solutionIcons.length]}
              title={solution.title}
              description={solution.description}
              details={solution.details}
              index={index}
              isExpanded={expandedIndex === index}
              onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};