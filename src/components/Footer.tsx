import { Link } from "react-router-dom";
import { Phone, MessageCircle, MapPin } from "lucide-react";

export function Footer() {
  const whatsappNumber = "201093363030";

  return (
    <footer className="bg-primary text-primary-foreground py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold">TazaMart</span>
            </div>
            <p className="text-primary-foreground/80 text-lg">
              طازج كل يوم، يوصلك على بابك
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-4">روابط سريعة</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-primary-foreground/80 hover:text-primary-foreground text-lg transition-colors"
                >
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="text-primary-foreground/80 hover:text-primary-foreground text-lg transition-colors"
                >
                  تسوق
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-primary-foreground/80 hover:text-primary-foreground text-lg transition-colors"
                >
                  السلة
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-bold mb-4">تواصل معنا</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5" />
                <a
                  href="tel:+201093363030"
                  className="text-primary-foreground/80 hover:text-primary-foreground text-lg"
                  dir="ltr"
                >
                  +20 109 336 3030
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5" />
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/80 hover:text-primary-foreground text-lg"
                >
                  واتساب
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-5 w-5" />
                <span className="text-primary-foreground/80 text-lg">
                  القاهرة، مصر
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60 text-base">
            💳 الدفع عند الاستلام
          </p>
          <p className="text-primary-foreground/60 text-sm mt-2">
            © {new Date().getFullYear()} TazaMart. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
