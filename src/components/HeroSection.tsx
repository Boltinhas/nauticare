import { motion } from "framer-motion";
import heroImage from "@/assets/hero-yacht.jpg";
import logoWhite from "@/assets/logo-white.png";
import logoBarco from "@/assets/logo-barco.png";

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-end overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Iate de luxo"
          className="w-full h-full object-cover object-[center_35%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/60 to-surface-dark/20" />
      </div>

      {/* Boat logo top-right */}
      <motion.div
        className="absolute top-36 right-0 md:right-0"
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="bg-primary-foreground backdrop-blur-sm rounded-l-xl pl-5 pr-6 py-4 shadow-xl">
          <img
            src={logoBarco}
            alt="Nauticare boat logo"
            className="h-16 md:h-24 lg:h-28"
          />
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative container pb-24 md:pb-32">
        <motion.img
          src={logoWhite}
          alt="Nauticare"
          className="w-auto h-auto max-w-[500px] md:max-w-4xl lg:max-w-5xl mb-6"
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.h1
          className="text-3xl md:text-5xl lg:text-6xl font-display text-primary-foreground leading-none mb-6"
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Detalhe e Manutenção Náutica
        </motion.h1>

        <motion.p
          className="font-body text-primary-foreground/70 text-base md:text-lg max-w-xl mb-10 tracking-wide"
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Serviços náuticos personalizados e de elite. Da Marina de Setúbal para as águas da Tróia.
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection;
