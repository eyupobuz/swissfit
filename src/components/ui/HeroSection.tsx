import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface HeroSectionProps {
  image: string;
  title: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  height?: string;
}

const HeroSection = ({
  image,
  title,
  subtitle,
  description,
  ctaText,
  ctaLink = "/iletisim",
  height = "h-[70vh] md:h-[85vh]",
}: HeroSectionProps) => {
  return (
    <section className={`relative ${height} flex items-center overflow-hidden`}>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 hero-overlay" />
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl hero-text"
        >
          {subtitle && (
            <p className="text-primary font-heading text-sm md:text-base tracking-[0.3em] uppercase mb-4 font-bold">
              {subtitle}
            </p>
          )}
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase leading-tight mb-6 text-white">
            {title}
          </h1>
          {description && (
            <p className="text-white/85 text-base md:text-lg max-w-xl mb-8 leading-relaxed">
              {description}
            </p>
          )}
          {ctaText && (
            <Link to={ctaLink}>
              <Button variant="cta" size="lg">
                {ctaText}
              </Button>
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;