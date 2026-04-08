import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import logoDark from "@/assets/logo-dark.png";

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "inicio", label: "Início", route: "/" },
  { id: "servicos", label: "Serviços", route: "/#servicos" },
  { id: "packs", label: "Packs", route: "/#packs" },
  { id: "sobre", label: "Sobre Nós", route: "/sobre-nos" },
  { id: "reservar", label: "Reservar", route: "/#reservar", highlight: true },
];

const Navbar = ({ activeTab, onTabChange }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (tab: typeof tabs[0]) => {
    if (tab.id === "sobre") {
      navigate("/sobre-nos");
    } else if (tab.id === "inicio") {
      if (location.pathname !== "/") {
        navigate("/");
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      if (location.pathname !== "/") {
        navigate("/" + "#" + tab.id);
      } else {
        onTabChange(tab.id);
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-28">
        <img
          src={logoDark}
          alt="Nauticare"
          className="w-auto h-auto max-h-9 md:max-h-10 cursor-pointer"
          onClick={() => handleClick(tabs[0])}
        />

        <div className="hidden md:flex items-center gap-1">
          {tabs.map((tab) => {
            const isActive = 
              (tab.id === "inicio" && location.pathname === "/" && activeTab === "inicio") ||
              (tab.id !== "inicio" && activeTab === tab.id) || 
              (tab.id === "sobre" && location.pathname === "/sobre-nos");
            const isHighlight = 'highlight' in tab && tab.highlight;
            return (
              <button
                key={tab.id}
                onClick={() => { handleClick(tab); }}
                className={`relative px-5 py-2 font-body text-sm uppercase tracking-widest transition-colors ${
                  isHighlight
                    ? "bg-primary text-primary-foreground rounded-sm ml-2 hover:bg-primary/90"
                    : isActive
                      ? "text-primary"
                      : "text-foreground/60 hover:text-foreground"
                }`}
              >
                {tab.label}
                {isActive && !isHighlight && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className={`block w-6 h-0.5 bg-foreground transition-transform ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-foreground transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-foreground transition-transform ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-border overflow-hidden"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { handleClick(tab); setMobileOpen(false); }}
                className={`block w-full text-left px-6 py-4 font-body text-sm uppercase tracking-widest ${
                  (tab.id === "inicio" && location.pathname === "/" && activeTab === "inicio") ||
                  (tab.id !== "inicio" && activeTab === tab.id) || 
                  (tab.id === "sobre" && location.pathname === "/sobre-nos")
                    ? "text-primary" : "text-foreground/60"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
