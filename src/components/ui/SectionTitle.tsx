import { motion } from "framer-motion";

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  description?: string;
  center?: boolean;
}

const SectionTitle = ({ subtitle, title, description, center = true }: SectionTitleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`mb-12 ${center ? "text-center" : ""}`}
    >
      {subtitle && (
        <p className="text-primary font-heading text-sm tracking-[0.3em] uppercase mb-3">
          {subtitle}
        </p>
      )}
      <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold uppercase">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionTitle;
