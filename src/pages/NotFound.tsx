import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Dumbbell } from "lucide-react";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 bg-surface" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.04),transparent_70%)]" />

        <div className="container relative z-10 text-center py-20">
          {/* Animated 404 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative inline-block mb-8"
          >
            <span className="font-heading text-[8rem] md:text-[12rem] font-bold leading-none text-border/40 select-none">
              404
            </span>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Dumbbell className="text-primary/20" size={64} strokeWidth={1.5} />
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="max-w-md mx-auto"
          >
            <h1 className="font-heading text-2xl md:text-3xl font-bold uppercase mb-4">
              Sayfa Bulunamadı
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Aradığınız sayfa mevcut değil veya taşınmış olabilir. Ana sayfaya dönerek
              Swiss Fit Club'ı keşfetmeye devam edebilirsiniz.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/">
                <Button variant="cta" className="group/btn">
                  <Home size={16} className="mr-2" />
                  Ana Sayfaya Dön
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => window.history.back()}
                className="group/btn"
              >
                <ArrowLeft
                  size={16}
                  className="mr-2 transition-transform duration-300 group-hover/btn:-translate-x-1"
                />
                Geri Git
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;