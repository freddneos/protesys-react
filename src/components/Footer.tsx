import { 
  Instagram, 
  Facebook, 
  Whatsapp,
  MessageText1,
  Location
} from "iconsax-react";
import { motion } from "framer-motion";

const currentYear = new Date().getFullYear();

export const Footer = () => {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-flow-col gap-4"
      >
        <a className="link link-hover">Sobre nós</a>
        <a className="link link-hover">Lista de Espera</a>
        <a className="link link-hover">Política de Privacidade</a>
        <a className="link link-hover">Termos de Uso</a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        <div className="grid grid-flow-col gap-4">
          <a 
            href="https://instagram.com/protesys" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-ghost btn-square"
          >
            <Instagram size={24} className="text-primary" variant="Bold" />
          </a>
          <a 
            href="https://facebook.com/protesys" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-ghost btn-square"
          >
            <Facebook size={24} className="text-primary" variant="Bold" />
          </a>
          <a 
            href="https://wa.me/5511999999999" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-ghost btn-square"
          >
            <Whatsapp size={24} className="text-primary" variant="Bold" />
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="grid grid-flow-row gap-2"
      >
        <div className="flex items-center justify-center gap-2 text-sm">
          <MessageText1 size={16} className="text-primary" />
          <span>contato@protesys.com.br</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm">
          <Location size={16} className="text-primary" />
          <span>São Paulo, SP - Brasil</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-base-content/70">
          Copyright © {currentYear} - Todos os direitos reservados à Protesys
        </p>
      </motion.div>
    </footer>
  );
};