import { motion } from "framer-motion";
import { Code1, Hospital } from "iconsax-react";
import { useTexts } from '../hooks/useTexts';

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
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, delay: index * 0.2 }}
    className="relative group"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-[32px] blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-105" />
    
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="card bg-base-200 relative overflow-hidden rounded-[30px] backdrop-blur-sm"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="card-body p-8 relative">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            {/* Profile image container with layered design */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-md transform group-hover:scale-110 transition-transform duration-500" />
              
              <div className="avatar relative">
                <div className="w-40 h-40 rounded-full ring-2 ring-base-content/5 ring-offset-base-100 ring-offset-4 overflow-hidden">
                  <img
                    src={image}
                    alt={name}
                    className="rounded-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              </div>
              
              {/* Specialty icon badge */}
              <motion.div
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.7 }}
                className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg"
              >
                <Icon size={24} className="text-primary-content" variant="Bold" />
              </motion.div>
            </div>
          </motion.div>
          
          <div className="flex-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {name}
              </h3>
              <p className="text-lg font-medium text-base-content/80 mb-6">{role}</p>
              <p className="text-base-content/70 leading-relaxed text-lg">
                {bio}
              </p>
              
              {/* Social links or additional info */}
              <div className="mt-6 flex gap-4 items-center justify-center md:justify-start">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-circle btn-ghost btn-sm"
                  href="#"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22.23 0H1.77C.8 0 0 .8 0 1.77v20.46C0 23.2.8 24 1.77 24h20.46c.98 0 1.77-.8 1.77-1.77V1.77C24 .8 23.2 0 22.23 0zM7.27 20.1H3.65V9.24h3.62V20.1zM5.47 7.7c-1.15 0-2.08-.95-2.08-2.1 0-1.15.93-2.1 2.08-2.1 1.15 0 2.08.95 2.08 2.1 0 1.15-.93 2.1-2.08 2.1zm14.63 12.4h-3.62v-5.7c0-1.35-.03-3.1-1.88-3.1-1.88 0-2.17 1.48-2.17 3v5.8h-3.62V9.24h3.48v1.6h.05c.48-.92 1.65-1.88 3.4-1.88 3.65 0 4.32 2.4 4.32 5.53v5.61z"></path>
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

export const FoundersSection = () => {
  const texts = useTexts();
  
  return (
    <section id="founders" className="relative min-h-screen bg-base-100 py-32">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
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
              Nossa Equipe
            </span>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-primary-focus to-secondary bg-clip-text text-transparent">
                {texts.founders.title}
              </span>
            </h2>
            
            <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
              {texts.founders.subtitle}
            </p>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
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