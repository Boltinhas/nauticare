import { motion } from "framer-motion";
import { packs, services } from "@/data/services";

const PacksSection = () => {
  const getServiceName = (id: string) => services.find((s) => s.id === id)?.name || id;

  return (
    <section id="packs" className="py-24 md:py-32 bg-surface-dark text-surface-dark-foreground">
      <div className="container">
        <motion.h2
          className="text-3xl md:text-5xl font-display mb-4"
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
        >
          Packs de Luxo
        </motion.h2>
        <motion.p
          className="font-body text-surface-dark-foreground/50 text-sm mb-16 max-w-lg tracking-wide"
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
        >
          Combinações estratégicas de serviços para máximo valor e proteção contínua.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packs.map((pack, index) => (
            <motion.div
              key={pack.id}
              className={`relative rounded-sm p-8 md:p-10 border transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(0,85,255,0.15)] ${
                pack.featured
                  ? "border-primary bg-primary/5"
                  : "border-surface-dark-foreground/10 bg-surface-dark-foreground/[0.03]"
              }`}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
            >
              {pack.featured && (
                <span className="absolute -top-3 left-8 bg-primary text-primary-foreground font-body text-[10px] uppercase tracking-widest px-4 py-1 rounded-sm">
                  Recomendado
                </span>
              )}
              {pack.savings && (
                <span className="absolute -top-3 left-8 bg-nauticare-red text-primary-foreground font-body text-[10px] uppercase tracking-widest px-4 py-1 rounded-sm">
                  {pack.savings}
                </span>
              )}

              <h3 className="text-2xl font-display mb-3">{pack.name}</h3>
              <p className="font-body text-surface-dark-foreground/50 text-sm leading-relaxed mb-6">
                {pack.description}
              </p>

              <div className="space-y-2 mb-8">
                {pack.services.map((sid) => (
                  <div key={sid} className="flex items-start gap-2">
                    <span className="text-primary text-xs mt-1">▸</span>
                    <span className="font-body text-surface-dark-foreground/70 text-sm">
                      {getServiceName(sid)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-auto">
                <span className="font-body text-primary text-sm font-semibold uppercase tracking-widest tabular-nums">
                  {pack.price}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PacksSection;
