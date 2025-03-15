import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UilBars, UilTimes } from '@iconscout/react-unicons';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 navbar backdrop-blur-md bg-base-100/80 transition-all duration-300 ${
          isScrolled ? 'shadow-lg py-2' : 'py-4'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex-1">
            <motion.a 
              className="btn btn-ghost normal-case text-2xl font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h1 className="text-neutral">
                Prote
                <motion.span 
                  className="px-0 mx-0 text-primary"
                  animate={{ 
                    opacity: [1, 0.8, 1],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Sys
                </motion.span>
              </h1>
            </motion.a>
          </div>

          {/* Desktop Menu */}
          <div className="flex-none hidden md:block">
            <ul className="menu menu-horizontal p-0 gap-2">
              {['Home', 'Features', 'Pricing', 'Contact'].map((item) => (
                <motion.li key={item}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a className="px-4 rounded-lg hover:bg-primary hover:text-primary-content transition-all duration-200">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex-none md:hidden">
            <button
              className="btn btn-ghost btn-circle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <UilTimes className="w-6 h-6" />
              ) : (
                <UilBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-64 bg-base-100 shadow-xl p-6 pt-20"
            >
              <ul className="menu gap-2">
                {['Home', 'Features', 'Pricing', 'Contact'].map((item) => (
                  <motion.li key={item}
                    whileHover={{ scale: 1.05, x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a className="hover:bg-primary hover:text-primary-content transition-all duration-200">
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
