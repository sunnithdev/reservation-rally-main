import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
};

const images = [
  "https://images.unsplash.com/photo-1737116846855-26bfe6387515?q=80&w=1994&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1508424757105-b6d5ad9329d0?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1559329007-40df8a9345d8?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1737133976175-a551a2a437ec?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-50">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-50/90 to-neutral-50/50 backdrop-blur-sm" />
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial="initial"
            animate="animate"
            className="max-w-2xl space-y-8"
          >
            <motion.span 
              {...fadeIn}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 rounded-full bg-neutral-100 text-neutral-600 text-sm font-medium tracking-wide"
            >
              Welcome to TableMaster
            </motion.span>
            
            <motion.h1
              {...fadeIn}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-neutral-900"
            >
              Exquisite Dining, 
              <span className="block">Unlocked</span>
            </motion.h1>
            
            <motion.p
              {...fadeIn}
              transition={{ delay: 0.6 }}
              className="text-base md:text-base text-neutral-600 leading-relaxed"
            >
             Your gateway to high-demand reservations 
             <span className="block"> and extraordinary culinary moments.</span>
             
            </motion.p>
            
            <motion.div
              {...fadeIn}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link
                to="/restaurants"
                className="inline-flex items-center px-8 py-3.5 rounded-full bg-neutral-900 text-white font-medium transition-all duration-300 hover:bg-neutral-800 hover:scale-[1.02] active:scale-[0.98]"
              >
                Explore Restaurants
              </Link>
              <Link
                to="/membership"
                className="inline-flex items-center px-8 py-3.5 rounded-full border bg-red-900 text-neutral-100 font-medium transition-all duration-300 hover:bg-neutral-100 hover:scale-[1.02] active:scale-[0.98]"
              >
                Join TableMaster
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial="initial"
            animate="animate"
            className="relative aspect-[4/3] rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-neutral-900/10" />
            <AnimatePresence>
        {images.map((image, index) => (
          <motion.img
            key={image}
            src={image}
            alt={`Restaurant image ${index + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: index === currentImageIndex ? 1 : 0 }}
            animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
            }}
            style={{
              zIndex: index === currentImageIndex ? 1 : 0,
            }}
          />
        ))}
      </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/20 to-transparent" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}