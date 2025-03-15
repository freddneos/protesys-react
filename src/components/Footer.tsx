import { 
  Instagram, 
  Facebook, 
  Whatsapp,
  MessageText1,
  Location
} from "iconsax-react";
import { motion } from "framer-motion";
import { useTexts } from '../hooks/useTexts';

export const Footer = () => {
  const { texts } = useTexts();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-flow-col gap-4"
      >
        {texts.footer.links.map((link, index) => (
          <a key={index} className="link link-hover">{link}</a>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        <div className="grid grid-flow-col gap-4">
          <a 
            href="https://instagram.com/protesysgestao" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-ghost btn-square"
          >
            <Instagram size={24} className="text-primary" variant="Bold" />
          </a>
          <a 
            href="https://facebook.com/protesysgestao" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-ghost btn-square"
          >
            <Facebook size={24} className="text-primary" variant="Bold" />
          </a>
          <a 
            href='https://api.whatsapp.com/send?phone=5521985466095&text=Ol%C3%A1%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20Protesys.' 
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
          <span>{texts.footer.contact.email}</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm">
          <Location size={16} className="text-primary" />
          <span>{texts.footer.contact.location}</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-base-content/70">
          {texts.footer.copyright.replace('{year}', currentYear.toString())}
        </p>
      </motion.div>
    </footer>
  );
};