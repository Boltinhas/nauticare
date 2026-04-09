import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-dark.png";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BookingForm, BookingFormData } from "@/components/BookingForm";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";

interface Booking {
    id: number;
    created_at: string;
    date: string;
    boat_size: string;
    services: string[];
    name: string;
    email: string;
    phone: string;
    boat_name: string;
    marina: string;
    observations?: string;
}

export default function Admin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date());
  const [isBookingFormOpen, setBookingFormOpen] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [bookingsError, setBookingsError] = useState<string | null>(null);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);

  const fetchBookings = async () => {
      setBookingsLoading(true);
      setBookingsError(null);
      const { data, error } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });

      if (error) {
          console.error("Error fetching bookings:", error);
          setBookingsError("Não foi possível carregar as reservas.");
      } else {
          setBookings(data as Booking[]);
      }
      setBookingsLoading(false);
  };

  useEffect(() => {
    if(isAuthenticated) {
        fetchBookings();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (selectedDay) {
      const formattedSelectedDay = format(selectedDay, "yyyy-MM-dd");
      const filtered = bookings.filter(booking => booking.date === formattedSelectedDay);
      setFilteredBookings(filtered);
    } else {
        setFilteredBookings([]);
    }
  }, [selectedDay, bookings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      if (password === "Nauticaredlmt2026") {
        setIsAuthenticated(true);
      } else {
        setError("Password incorreta");
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleBookingSubmit = async (data: BookingFormData) => {
    const { date, boatSize, services, name, email, phone, boatName, marina, observations } = data;

    const { error } = await supabase
      .from('bookings')
      .insert([
        {
          date: format(date, "yyyy-MM-dd"),
          boat_size: boatSize,
          services,
          name,
          email,
          phone,
          boat_name: boatName,
          marina,
          observations,
        },
      ]);

    if (error) {
      console.error('Error inserting booking:', error);
    } else {
      await fetchBookings();
      setBookingFormOpen(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-md"
        >
          <div className="flex justify-center">
            <img src={logo} alt="Logo" className="h-12" />
          </div>
          <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">Admin Login</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 text-gray-900 bg-gray-200 dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? "Aguarde..." : "Login"}
            </Button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="bg-gray-100 dark:bg-gray-900 min-h-screen">
        <header className="bg-white dark:bg-gray-800 shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <img src={logo} alt="Logo" className="h-10" />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
                <Button onClick={() => setBookingFormOpen(true)}>Adicionar reserva manualmente</Button>
            </div>
        </header>
        <main className="container mx-auto py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="md:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Bookings Calendar</h2>
                <Calendar mode="single" selected={selectedDay} onSelect={setSelectedDay} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Bookings para {selectedDay?.toLocaleDateString()}</h2>
                {bookingsLoading ? (
                    <p>A carregar reservas...</p>
                ) : bookingsError ? (
                    <p className="text-red-500">{bookingsError}</p>
                ) : filteredBookings.length > 0 ? (
                    <div className="space-y-4">
                        {filteredBookings.map(booking => (
                            <div key={booking.id} className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-700">
                                <h3 className="font-bold">{booking.boat_name}</h3>
                                <p>Cliente: {booking.name}</p>
                                <p>Serviços: {booking.services.join(', ')}</p>
                                <p>Porto: {booking.marina}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Nenhuma reserva para este dia.</p>
                )}
            </motion.div>
        </main>

        <Dialog open={isBookingFormOpen} onOpenChange={setBookingFormOpen}>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Adicionar reserva manualmente</DialogTitle>
                </DialogHeader>
                <BookingForm onSubmit={handleBookingSubmit} />
            </DialogContent>
        </Dialog>
    </motion.div>
  );
}
