import { useState } from "react";
import { motion } from "framer-motion";
import { services, packs, boatSizeCategories, type BoatSize } from "@/data/services";
import { Calendar } from "@/components/ui/calendar";

const locations = ["Marina de Setúbal", "Marina de Tróia"];

const BookingSection = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedPack, setSelectedPack] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedLocation, setSelectedLocation] = useState("");
  const [boatName, setBoatName] = useState("");
  const [boatSize, setBoatSize] = useState<BoatSize | "">("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
    if (selectedPack) setSelectedPack("");
  };

  const selectPack = (id: string) => {
    setSelectedPack(id === selectedPack ? "" : id);
    if (id !== selectedPack) setSelectedServices([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedServices.length === 0 && !selectedPack) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="reservar" className="py-24 md:py-32">
        <div className="container max-w-2xl text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-3xl md:text-5xl font-display text-foreground mb-6">
              Reserva Enviada
            </h2>
            <p className="font-body text-muted-foreground text-sm mb-8">
              A sua reserva foi registada com sucesso. Entraremos em contacto em breve para confirmar o agendamento.
            </p>
            <button
              onClick={() => { setSubmitted(false); setSelectedServices([]); setSelectedPack(""); }}
              className="bg-primary text-primary-foreground font-body uppercase tracking-widest text-sm px-8 py-4 rounded-sm hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              Nova Reserva
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="reservar" className="py-24 md:py-32">
      <div className="container max-w-5xl">
        <motion.h2
          className="text-3xl md:text-5xl font-display text-foreground mb-4"
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
        >
          Reservar Slot
        </motion.h2>
        <motion.p
          className="font-body text-muted-foreground text-sm mb-12 max-w-lg tracking-wide"
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
        >
          Selecione os serviços, data e local para agendar a manutenção da sua embarcação.
        </motion.p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Column 1 - Service checklist */}
          <div className="space-y-6">
            <div>
              <label className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-3 block">
                Serviços Individuais
              </label>
              <div className="space-y-2">
                {services.map((service) => (
                  <label
                    key={service.id}
                    className={`flex items-center gap-3 border rounded-sm px-4 py-3 cursor-pointer transition-all ${
                      selectedServices.includes(service.id)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-foreground/20"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service.id)}
                      onChange={() => toggleService(service.id)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      selectedServices.includes(service.id)
                        ? "bg-primary border-primary"
                        : "border-border"
                    }`}>
                      {selectedServices.includes(service.id) && (
                        <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="font-body text-sm text-foreground">{service.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-3 block">
                Ou escolha um Pack
              </label>
              <div className="space-y-2">
                {packs.map((pack) => (
                  <label
                    key={pack.id}
                    className={`flex items-center gap-3 border rounded-sm px-4 py-3 cursor-pointer transition-all ${
                      selectedPack === pack.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-foreground/20"
                    }`}
                  >
                    <input
                      type="radio"
                      name="pack"
                      checked={selectedPack === pack.id}
                      onChange={() => selectPack(pack.id)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      selectedPack === pack.id
                        ? "border-primary"
                        : "border-border"
                    }`}>
                      {selectedPack === pack.id && (
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      )}
                    </div>
                    <span className="font-body text-sm text-foreground">{pack.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2 - Details */}
          <div className="space-y-6">
            {/* Location */}
            <div>
              <label className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                Localização
              </label>
              <div className="flex gap-3">
                {locations.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setSelectedLocation(loc)}
                    className={`flex-1 border rounded-sm px-4 py-3 font-body text-sm transition-all ${
                      selectedLocation === loc
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border text-foreground/60 hover:border-foreground/30"
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

            {/* Boat size category */}
            <div>
              <label className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                Tamanho da Embarcação
              </label>
              <div className="grid grid-cols-2 gap-2">
                {boatSizeCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setBoatSize(cat.id)}
                    className={`border rounded-sm px-3 py-3 font-body text-sm transition-all text-left ${
                      boatSize === cat.id
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border text-foreground/60 hover:border-foreground/30"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Boat name */}
            <div>
              <label className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                Nome do Barco
              </label>
              <input
                type="text"
                value={boatName}
                onChange={(e) => setBoatName(e.target.value)}
                placeholder="Ex: Sea Spirit"
                className="w-full bg-transparent border border-border rounded-sm px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Contact */}
            <div>
              <label className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                Nome
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-transparent border border-border rounded-sm px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                Telefone
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="+351"
                className="w-full bg-transparent border border-border rounded-sm px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Column 3 - Calendar */}
          <div>
            <label className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
              Data Pretendida
            </label>
            <div className="border border-border rounded-sm p-4 flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date()}
                className="font-body"
              />
            </div>

            {/* Summary */}
            {(selectedServices.length > 0 || selectedPack) && (
              <div className="mt-4 border border-border rounded-sm p-4">
                <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-2">Resumo</p>
                <div className="space-y-1">
                  {selectedPack ? (
                    <p className="font-body text-sm text-foreground">
                      {packs.find(p => p.id === selectedPack)?.name}
                    </p>
                  ) : (
                    selectedServices.map(id => (
                      <p key={id} className="font-body text-sm text-foreground">
                        ▸ {services.find(s => s.id === id)?.name}
                      </p>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={selectedServices.length === 0 && !selectedPack}
              className="w-full mt-6 bg-primary text-primary-foreground font-body uppercase tracking-widest text-sm px-8 py-4 rounded-sm hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg shadow-primary/20 disabled:opacity-40 disabled:pointer-events-none"
            >
              Confirmar Reserva
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default BookingSection;
