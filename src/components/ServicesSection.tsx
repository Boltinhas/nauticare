import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services, categories } from "@/data/services";

const ServicesSection = () => {
  const [activeCategory, setActiveCategory] = useState<string>("estetica");
  const navigate = useNavigate();

  const filtered = services.filter((s) => s.category === activeCategory);

  return (
    <section id="servicos" className="py-24 md:py-32">
      <div className="container">
        <motion.h2
          className="text-3xl md:text-5xl font-display text-foreground mb-4"
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
        >
          Serviços Especializados
        </motion.h2>
        <motion.p
          className="font-body text-muted-foreground text-sm mb-12 max-w-lg tracking-wide"
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
        >
          Serviços náuticos de elite, executados com precisão e materiais premium.
        </motion.p>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`font-body text-xs uppercase tracking-widest px-6 py-3 rounded-sm border transition-all ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent text-foreground/60 border-border hover:border-foreground/30"
              }`}
            >
              <span className="mr-2">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-border">
          {filtered.map((service, index) => (
            <motion.div
              key={service.id}
              className="border-b border-border md:even:border-l p-8 md:p-10 group hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] transition-all duration-300"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: [0.19, 1, 0.22, 1] }}
            >
              <h3 className="text-lg md:text-xl font-display text-foreground mb-3">
                {service.name}
              </h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4">
                {service.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-body text-primary text-sm font-semibold tabular-nums">
                  {service.price}
                </span>
                <button
                  onClick={() => navigate(`/servico/${service.id}`)}
                  className="flex items-center gap-1.5 font-body text-xs uppercase tracking-widest text-foreground/60 hover:text-primary transition-colors group/btn"
                >
                  Saber Mais
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
