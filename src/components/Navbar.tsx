import React from 'react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="navbar bg-base-100 shadow-md px-6"
    >
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-2xl font-bold">
          <h1 className="text-neutral">Prote<span className="px-0 mx-0 text-primary">Sys</span></h1>
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li><a>Home</a></li>
          <li><a>Features</a></li>
          <li><a>Pricing</a></li>
          <li><a>Contact</a></li>
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;
