import logoWhite from "@/assets/logo-white.png";

const Footer = () => {
  return (
    <footer className="bg-surface-dark text-surface-dark-foreground py-16 border-t border-surface-dark-foreground/10">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <img src={logoWhite} alt="Nauticare" className="w-auto h-auto max-w-[200px] mb-6" />
            <p className="font-body text-surface-dark-foreground/50 text-sm leading-relaxed">
              Serviços náuticos personalizados e de elite. Setúbal & Tróia.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm mb-4">Contactos</h4>
            <div className="space-y-2 font-body text-sm text-surface-dark-foreground/60">
              <p>Diogo Libânio — <a href="tel:+351934599001" className="text-primary hover:underline">+351 934 599 001</a></p>
              <p>Martim Torres — <a href="tel:+351933813134" className="text-primary hover:underline">+351 933 813 134</a></p>
              <p><a href="mailto:nauticare.info@gmail.com" className="text-primary hover:underline">nauticare.info@gmail.com</a></p>
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm mb-4">Siga-nos</h4>
            <div className="space-y-2 font-body text-sm text-surface-dark-foreground/60">
              <a href="https://instagram.com/nauticare.official" target="_blank" rel="noopener noreferrer" className="block hover:text-primary transition-colors">
                @nauticare.official
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-surface-dark-foreground/10 mt-12 pt-8">
          <p className="font-body text-surface-dark-foreground/30 text-xs text-center uppercase tracking-widest">
            © {new Date().getFullYear()} Nauticare. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
