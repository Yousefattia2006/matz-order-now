import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { categories } from "@/data/categories";
import { getFeaturedProducts } from "@/data/products";
import { motion } from "framer-motion";
import { ShoppingCart, Truck, Phone, Leaf, ArrowLeft, MessageCircle } from "lucide-react";
import heroImage from "@/assets/hero-produce.jpg";

export default function Index() {
  const featuredProducts = getFeaturedProducts().slice(0, 8);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-primary/90 to-primary/70" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-4">
              طازج كل يوم، يوصلك على بابك 🌿
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8">
              اطلب أونلاين واستلم طلبك طازج وبسرعة
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/shop">
                <Button variant="warm" size="xl" className="w-full sm:w-auto gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  اطلب دلوقتي
                </Button>
              </Link>
            </div>
            <p className="text-primary-foreground/70 mt-6 text-lg">
              📦 نظام بري أوردر — بنجهز طلبك ونوصله ليك
            </p>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            إزاي بيشتغل؟ 🤔
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: ShoppingCart, title: "اختار منتجاتك", desc: "تصفح واختار من خضار وفاكهة ولحوم طازجة", emoji: "🛒" },
              { icon: Truck, title: "حدد منطقتك", desc: "اختار منطقة التوصيل وشوف رسوم التوصيل", emoji: "📍" },
              { icon: Phone, title: "تأكيد عبر واتساب", desc: "الطلب بيتبعت على واتساب وهنتواصل معاك", emoji: "📱" },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-background rounded-2xl p-8 text-center shadow-sm"
              >
                <div className="text-5xl mb-4">{step.emoji}</div>
                <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-lg">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            تسوق من أقسامنا 🛍️
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/shop?category=${category.id}`}
                  className={`block ${category.color} rounded-2xl p-6 text-center hover:shadow-lg transition-shadow`}
                >
                  <div className="text-5xl md:text-6xl mb-3">{category.emoji}</div>
                  <h3 className="font-bold text-foreground text-lg">{category.nameAr}</h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              منتجات مميزة ⭐
            </h2>
            <Link to="/shop" className="hidden md:flex items-center gap-2 text-primary font-bold text-lg hover:gap-3 transition-all">
              شوف الكل
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-8 md:hidden">
            <Link to="/shop">
              <Button variant="outline" size="lg" className="gap-2">
                شوف كل المنتجات
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why TazaMart */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            ليه تازة مارت؟ 💚
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: Leaf, title: "خضار طازجة يومياً", emoji: "✅" },
              { icon: Truck, title: "توصيل سريع", emoji: "🚚" },
              { icon: "💰", title: "أسعار منافسة", emoji: "💰" },
              { icon: Phone, title: "اطلب بسهولة عبر الواتساب", emoji: "📱" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 text-center"
              >
                <div className="text-4xl mb-3">{item.emoji}</div>
                <h3 className="font-bold text-foreground text-lg">{item.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-12 bg-[#25D366]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            عندك استفسار؟ كلمنا على واتساب مباشرة! 💬
          </h2>
          <a
            href="https://wa.me/201000000000"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="secondary"
              size="xl"
              className="gap-2 bg-white text-[#25D366] hover:bg-white/90"
            >
              <MessageCircle className="h-6 w-6" />
              تواصل معنا
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
