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

interface Solution {
  icon: React.ElementType;
  title: string;
  description: string;
  details: string;
}

const solutions: Solution[] = [
  {
    icon: Electricity,
    title: "Automação Inteligente para Processos Complexos",
    description: "Simplifique processos complexos com automação inteligente",
    details: "Nossa plataforma automatiza todo o fluxo de trabalho da sua clínica, desde o agendamento inicial até a entrega final. Reduza erros, economize tempo e mantenha um padrão de qualidade consistente em todos os processos."
  },
  {
    icon: ElementEqual,
    title: "Integração Completa com Ferramentas Essenciais",
    description: "Conecte todas as suas ferramentas em um só lugar",
    details: "Integração perfeita com WhatsApp, Google Calendar, sistemas de pagamento e muito mais. Centralize suas operações e elimine a necessidade de alternar entre múltiplas plataformas."
  },
  {
    icon: SearchZoomIn1,
    title: "Indicadores Visuais e Relatórios Precisos",
    description: "Tome decisões baseadas em dados reais e atualizados",
    details: "Dashboards intuitivos e relatórios detalhados fornecem insights valiosos sobre seu negócio. Acompanhe KPIs importantes, identifique tendências e otimize seus processos com base em dados concretos."
  },
  {
    icon: Chart21,
    title: "Gestão de Próteses e CRM em um Só Lugar",
    description: "Gerencie relacionamentos e projetos em uma única plataforma",
    details: "Combine o poder de um CRM robusto com ferramentas especializadas para gestão de próteses. Mantenha um histórico completo de cada cliente, acompanhe o status de cada projeto e garanta a satisfação total."
  },
  {
    icon: BoxAdd,
    title: "Plataforma Pronta para Escalar com sua Clínica",
    description: "Cresça sem preocupações com uma solução escalável",
    details: "Nossa plataforma evolui com seu negócio. Adicione novos profissionais, expanda suas operações e mantenha o controle total, sem comprometer a eficiência ou a qualidade do atendimento."
  }
];

interface SolutionCardProps extends Solution {
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
}

const SolutionCard = ({ icon: Icon, title, description, details, isExpanded, onToggle, index }: SolutionCardProps) => (
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
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section className="min-h-screen bg-base-100 relative">
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
              Por que Escolher o Protesys?
            </span>
          </h2>
          <p className="text-xl text-base-content/70">
            Descubra como podemos transformar a gestão da sua clínica
          </p>
        </motion.div>

        <div className="grid gap-4 max-w-4xl mx-auto w-full">
          {solutions.map((solution, index) => (
            <SolutionCard
              key={index}
              {...solution}
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