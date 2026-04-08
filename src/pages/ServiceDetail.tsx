import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { services, boatSizeCategories } from "@/data/services";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const service = services.find((s) => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-body text-muted-foreground">Serviço não encontrado.</p>
      </div>
    );
  }

  const categoryLabel =
    service.category === "estetica"
      ? "Estética & Detalhe"
      : service.category === "manutencao"
        ? "Manutenção & Técnica"
        : "Gestão & Segurança";

  return (
    <div className="min-h-screen bg-background">
      <Navbar activeTab="" onTabChange={() => navigate("/")} />

      <main className="pt-32 pb-24">
        <div className="container max-w-4xl">
          {/* Back button */}
          <motion.button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar aos Serviços
          </motion.button>

          {/* Category badge */}
          <motion.span
            className="inline-block font-body text-xs uppercase tracking-widest text-primary mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {categoryLabel}
          </motion.span>

          {/* Title */}
          <motion.h1
            className="text-3xl md:text-5xl font-display text-foreground mb-6"
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          >
            {service.name}
          </motion.h1>

          {/* Detailed description */}
          <motion.p
            className="font-body text-muted-foreground text-base md:text-lg leading-relaxed mb-16 max-w-3xl"
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
          >
            {service.detailedDescription}
          </motion.p>

          {/* Price table */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
          >
            <h2 className="text-xl md:text-2xl font-display text-foreground mb-6">
              Tabela de Preços
            </h2>
            <div className="border border-border rounded-sm overflow-hidden">
              <div className="grid grid-cols-2 bg-muted/30">
                <div className="px-6 py-4 font-body text-xs uppercase tracking-widest text-muted-foreground border-r border-border">
                  Tamanho da Embarcação
                </div>
                <div className="px-6 py-4 font-body text-xs uppercase tracking-widest text-muted-foreground">
                  Preço
                </div>
              </div>
              {boatSizeCategories.map((cat, index) => (
                <div
                  key={cat.id}
                  className={`grid grid-cols-2 ${index < boatSizeCategories.length - 1 ? "border-b border-border" : ""}`}
                >
                  <div className="px-6 py-5 font-body text-sm text-foreground border-r border-border">
                    {cat.label}
                  </div>
                  <div className="px-6 py-5 font-body text-sm text-primary font-semibold tabular-nums">
                    {service.prices[cat.id]}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="mt-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button
              onClick={() => navigate("/#reservar")}
              className="bg-primary text-primary-foreground font-body uppercase tracking-widest text-sm px-8 py-4 rounded-sm hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg shadow-primary/20"
            >
              Reservar Este Serviço
            </button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
