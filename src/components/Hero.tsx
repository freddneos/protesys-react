import { motion } from "framer-motion";
import { ArrowRight } from "iconsax-react";

export const Hero = () => {
  return (
    <section className="hero min-h-screen bg-base-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="hero-content text-center"
      >
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">
            Sua Clínica no Controle. Próteses no Prazo.
          </h1>
          <p className="text-lg mb-6 text-base-content/70">
            Comece com a gestão inteligente de próteses e evolua para um CRM completo para clínicas odontológicas.
          </p>
          <div className="flex justify-center gap-4">
            <button className="btn btn-primary">
              Entre na Lista de Espera
            </button>
            <button className="btn btn-secondary gap-2">
              Agende uma Demonstração <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};