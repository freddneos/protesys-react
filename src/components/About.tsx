import { motion } from "framer-motion";
import { UilClinicMedical, UilCog } from '@iconscout/react-unicons';
import { useTexts } from '../hooks/useTexts';

export const About = () => {
  const texts = useTexts();
  
  return (
    <section className="h-screen bg-base-200 relative overflow-hidden flex items-center">
      {/* Animated background elements */}
      <motion.div
        animate={{
          rotate: -360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute right-0 top-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
      />
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -left-20 bottom-0 w-96 h-96 rounded-full bg-secondary/5 blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-[1.4] py-2">
            {texts.about.title}
          </h2>
          <p className="text-lg md:text-xl text-base-content/70 max-w-3xl mx-auto leading-relaxed py-2">
            {texts.about.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {texts.about.features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="card-body items-center text-center">
                <div className="text-primary mb-4">
                  {index % 2 === 0 ? (
                    <UilClinicMedical className="w-12 h-12" />
                  ) : (
                    <UilCog className="w-12 h-12" />
                  )}
                </div>
                <h3 className="card-title text-xl mb-3">{feature.title}</h3>
                <p className="text-base-content/70">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};