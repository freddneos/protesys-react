import { motion, AnimatePresence } from "framer-motion";
import { useState } from 'react';
import {
  Electricity,
  ElementEqual,
  SearchZoomIn1,
  Chart21,
  BoxAdd,
  ArrowCircleDown2,
  ArrowCircleUp2
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
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group relative"
  >
    {/* Card glow effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-[32px] blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
    
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onToggle}
      className="card bg-base-200 shadow-xl relative overflow-hidden rounded-[30px] backdrop-blur-sm cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="card-body p-8 relative">
        <div className="flex items-center gap-6">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.7 }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center"
          >
            <Icon size={32} className="text-primary group-hover:text-secondary transition-colors duration-300" variant="Bold" />
          </motion.div>

          <div className="flex-1">
            <h3 className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">
              {title}
            </h3>
            <p className="text-base-content/70 mt-1">
              {description}
            </p>
          </div>

          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-primary group-hover:text-secondary transition-colors duration-300"
          >
            {isExpanded ? (
              <ArrowCircleUp2 size={28} variant="Bold" />
            ) : (
              <ArrowCircleDown2 size={28} variant="Bold" />
            )}
          </motion.div>
        </div>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-6 p-6 rounded-2xl bg-base-300/50 backdrop-blur-sm relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl opacity-50" />
                <p className="relative text-base-content/80 leading-relaxed">
                  {details}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  </motion.div>
);

export const SolutionsSection = () => {
  const { texts } = useTexts();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section id="solutions" className="relative min-h-screen bg-base-100 py-32">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute w-[800px] h-[800px] -top-[400px] -right-[400px] bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [45, 0, 45]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute w-[800px] h-[800px] -bottom-[400px] -left-[400px] bg-secondary/5 rounded-full blur-3xl"
        />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
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
              Diferenciais
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-primary-focus to-secondary bg-clip-text text-transparent">
                {texts.solutions.title}
              </span>
            </h2>

            <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
              {texts.solutions.subtitle}
            </p>
          </motion.div>
        </motion.div>

        <div className="grid gap-6 max-w-4xl mx-auto">
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