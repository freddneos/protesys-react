import { motion } from "framer-motion";
import { Code1, Hospital } from "iconsax-react";

interface Founder {
  name: string;
  role: string;
  bio: string;
  image: string;
  icon: React.ElementType;
}

const founders: Founder[] = [
  {
    name: "Frederico Bezerra",
    role: "Co-fundador, CEO/CTO",
    bio: "Especialista em tecnologia e startups, com atuação em quatro continentes. Possui mais de 15 anos de experiência em engenharia de software e é responsável por liderar a inovação tecnológica do Protesys, garantindo uma plataforma robusta e escalável.",
    image: "/founder_2.png",
    icon: Code1
  },
  {
    name: "Daniel Marques",
    role: "Co-fundador, COO",
    bio: "Especialista em gestão de clínicas odontológicas, com anos de experiência à frente de estratégias que geraram milhões em faturamento. Mestre em gestão estratégica, tática e operacional, é o responsável por traduzir as necessidades das clínicas em soluções práticas e eficientes.",
    image: "/founder_1.png",
    icon: Hospital
  }
];

const FounderCard = ({ name, role, bio, image, icon: Icon }: Founder) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="card bg-base-200 hover:bg-base-300 transition-all duration-300"
  >
    <div className="card-body p-8">
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        <div className="relative">
          <div className="avatar">
            <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={image}
                alt={name}
                className="rounded-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Icon size={24} className="text-primary-content" variant="Bold" />
          </div>
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl font-bold mb-1">{name}</h3>
          <p className="text-primary font-semibold mb-4">{role}</p>
          <p className="text-base-content/70 leading-relaxed">{bio}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

export const FoundersSection = () => {
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
              Especialistas por Trás da Inovação
            </span>
          </h2>
          <p className="text-xl text-base-content/70">
            Conheça a equipe que está revolucionando a gestão de clínicas odontológicas
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {founders.map((founder, index) => (
            <FounderCard key={index} {...founder} />
          ))}
        </div>
      </div>
    </section>
  );
};