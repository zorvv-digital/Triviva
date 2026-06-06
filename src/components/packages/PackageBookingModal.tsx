import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar as CalendarIcon, Users, Send } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { TravelPackage } from "@/data/packages";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useContactInfo } from "@/hooks/useContactInfo";

interface PackageBookingModalProps {
  pkg: { title: string; location: string } | null;
  isOpen: boolean;
  onClose: () => void;
  price: number;
}

const PackageBookingModal = ({ pkg, isOpen, onClose, price }: PackageBookingModalProps) => {
  const [startDate, setStartDate] = useState<Date>();
  const [guests, setGuests] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { data } = useContactInfo();

  if (!pkg) return null;

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedDate = startDate ? format(startDate, "PPP") : "";
    
    let message = `Hello *Triviva*, I would like to inquire about booking the package:\n\n*${pkg.title}* (${pkg.location})`;
    
    if (startDate) {
      message += `\n📅 *Travel Date:* _${formattedDate}_`;
    }
    if (guests) {
      message += `\n👥 *Number of Guests:* ${guests} person(s)`;
    }
    
    message += `\n\nPlease let me know the availability and share details at the earliest. Thank you!`;

    const rawPhone = data?.contact?.phone?.lines?.[0] || "";
    const cleanPhone = rawPhone.replace(/[^0-9]/g, "");

    if (!cleanPhone) {
      toast.error("Agency contact phone number is not configured.");
      return;
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
    toast.success("WhatsApp chat opened with prefilled inquiry.");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative bg-white w-full max-w-md rounded-[2rem] shadow-2xl border border-black/[0.02] overflow-hidden z-10 max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-black/[0.03] flex items-center justify-between bg-white relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -mr-10 -mt-10 pointer-events-none" />
              <div className="relative z-10">
                <span className="section-label mb-1.5 block">Premium Package</span>
                <h3 className="text-xl md:text-2xl font-display font-bold text-[#111827]">
                  Book {pkg.title}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:text-slate-900 transition-colors relative z-10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Form */}
            <form onSubmit={handleWhatsAppSubmit} className="flex-1 overflow-y-auto p-8 md:p-10 space-y-6 bg-white">
              <div className="space-y-6">
                {/* Start Date */}
                <div className="space-y-2 flex flex-col">
                   <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">Preferred Travel Date</label>
                  <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 h-auto text-slate-900 font-body text-sm hover:bg-slate-100/50 hover:text-slate-900 focus:bg-white focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all duration-300 shadow-sm",
                          !startDate && "text-slate-400 hover:text-slate-400"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-slate-400" />
                        {startDate ? format(startDate, "PPP") : <span className="text-slate-400">Pick travel date (optional)</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 z-[110]" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={(date) => {
                          setStartDate(date);
                          setIsCalendarOpen(false);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Number of Guests */}
                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">Number of Persons</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Users className="w-4 h-4 text-slate-400" />
                    </span>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      placeholder="Number of persons (optional)"
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-11 pr-4 py-3 text-slate-900 font-body text-sm outline-none focus:bg-white focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all duration-300 shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-black/[0.03]">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-body font-bold py-4 rounded-xl transition-all hover:shadow-[0_8px_25px_rgba(37,211,102,0.3)] shadow-sm cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.835-4.22c1.654.982 3.51 1.5 5.409 1.5 5.867 0 10.639-4.76 10.643-10.613.002-2.836-1.1-5.503-3.102-7.505C17.838 1.16 15.176.06 12.31.06c-5.871 0-10.64 4.76-10.643 10.617-.001 2.012.528 3.979 1.536 5.714l-.992 3.626 3.712-.974z" />
                  </svg>
                  Inquire on WhatsApp
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PackageBookingModal;
