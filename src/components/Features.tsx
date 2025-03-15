import { motion } from "framer-motion";
import {
  Crown,
  Calendar,
  ChartSquare,
  Notification,
  MessageProgramming,
  Money
} from "iconsax-react";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface FeatureCardProps extends Feature {
  index: number;
}

const features: Feature[] = [
  {
    icon: Crown,
    title: "Gestão de Próteses",
    description:
      "Controle total das etapas  de Molde, Prova com cera, Prova com dente, Acrilização e entrega. todos os possives atrasos e errors em um só lugar."
  },
  {
    icon: Calendar,
    title: "Automação de Agendamentos",
    description: "Organize prazos e horários com inteligência , sem conflitos e sem atrasos."
  },
  {
    icon: ChartSquare,
    title: "Relatórios Detalhados",
    description: "Tenha dados precisos e exportáveis para melhor tomada de decisão."
  },
  {
    icon: Notification,
    title: "Notificações Inteligentes",
    description: "Receba alertas automáticos sobre prazos e mudanças de status."
  },
  {
    icon: MessageProgramming,
    title: "Integrações Poderosas",
    description: "Conecte-se com WhatsApp, Google Sheets e potencialize seus processos com Inteligência Artificial."
  },
  {
    icon: Money,
    title: "Gestão Smart",
    description: "Tenha controle de ponta a ponta do processo de prótese e não perca nenhum prazo."
  }
];

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
  return (
    <section className="min-h-screen py-20 px-4 bg-base-100 flex items-center">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-[1.3] py-2">
            Tudo o que sua Clínica Precisa em um Só Lugar
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};