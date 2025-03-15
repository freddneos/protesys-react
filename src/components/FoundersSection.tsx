import { motion } from "framer-motion";
import { Code1, Hospital } from "iconsax-react";
import { useTexts } from '../hooks/useTexts';

const founderIcons = {
  "Code1": Code1,
  "Hospital": Hospital
};

interface FounderCardProps {
  name: string;
  role: string;
  bio: string;
  image: string;
  icon: React.ElementType;
  index: number;
}

const FounderCard = ({ name, role, bio, image, icon: Icon, index }: FounderCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
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
  const texts = useTexts();
  
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
              {texts.founders.title}
            </span>
          </h2>
          <p className="text-xl text-base-content/70">
            {texts.founders.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {texts.founders.items.map((founder, index) => {
            const IconComponent = index % 2 === 0 ? Code1 : Hospital;
            
            return (
              <FounderCard 
                key={index}
                name={founder.name}
                role={founder.role}
                bio={founder.bio}
                image={founder.image}
                icon={IconComponent}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};