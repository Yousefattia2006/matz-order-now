import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function WhatsAppFloat() {
  const whatsappNumber = "201093363030";
  const message = encodeURIComponent("مرحباً، عندي استفسار عن TazaMart");

  return (
    <motion.a
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 left-4 md:left-6 z-40 bg-[#25D366] text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow"
      aria-label="تواصل معنا عبر واتساب"
    >
      <MessageCircle className="h-7 w-7" />
    </motion.a>
  );
}
