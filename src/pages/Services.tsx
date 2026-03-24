import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/ui/HeroSection";
import SectionTitle from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Dumbbell,
  UserCheck,
  Activity,
  Apple,
  Users,
  Layers,
  HeartPulse,
  ShowerHead,
  ArrowRight,
} from "lucide-react";
import heroServices from "@/assets/hero-services.jpg";
import heroHome from "@/assets/hero-home.jpg";

const services = [
  {
    icon: Dumbbell,
    title: "Bireysel Antrenman",
    desc: "Kişisel hedeflerinize yönelik özel antrenman programları ile sonuca odaklı çalışmalar.",
  },
  {
    icon: UserCheck,
    title: "Kişisel Antrenör",
    desc: "Sertifikalı personal trainer desteğiyle birebir koçluk ve motivasyon.",
  },
  {
    icon: Activity,
    title: "Vücut Analiz Hizmeti",
    desc: "Profesyonel vücut kompozisyonu analizi ile ilerlemenizi takip edin.",
  },
  {
    icon: Apple,
    title: "Beslenme Danışmanlığı",
    desc: "Uzman diyetisyenlerle kişiye özel beslenme planları.",
  },
  {
    icon: Users,
    title: "Grup Dersleri",
    desc: "HIIT, Yoga, Pilates ve daha fazlası ile motivasyonunuzu artırın.",
  },
  {
    icon: Layers,
    title: "Fonksiyonel Antrenman",
    desc: "Geniş fonksiyonel antrenman alanlarında performansınızı geliştirin.",
  },
  {
    icon: HeartPulse,
    title: "Kardiyo & Ağırlık",
    desc: "Son model kardiyo cihazları ve serbest ağırlık alanları.",
  },
  {
    icon: ShowerHead,
    title: "Hijyenik Alanlar",
    desc: "Temiz, modern duş ve soyunma alanlarıyla konforlu deneyim.",
  },
];

/* ─── Animation Variants ─── */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const Services = () => {
  return (
    <Layout>
      <HeroSection
        image={heroServices}
        subtitle="Hizmetlerimiz"
        title="Profesyonel Hizmetler"
        description="Swiss Fit Club'da sunduğumuz kapsamlı hizmetlerle sağlıklı yaşamın her adımında yanınızdayız."
        height="h-[50vh] md:h-[65vh]"
      />

      {/* ─── Services Grid ─── */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <SectionTitle
            subtitle="Hizmetler"
            title="Sunduğumuz Hizmetler"
            description="Beylikdüzü fitness salonu standartlarını yükselten kapsamlı hizmet yelpazemiz."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                variants={fadeUp}
                custom={i}
                className="group relative bg-card border border-border rounded-xl p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 text-center overflow-hidden"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                {/* Hover gradient backdrop */}
                <span className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-300">
                    <s.icon className="text-primary" size={24} />
                  </div>
                  <h3 className="font-heading text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                    {s.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${heroHome})` }}
        />
        {/* Dark overlay — CTA fotoğraf üstünde olduğu için burada koyu kalması doğru */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-heading text-3xl md:text-5xl font-bold uppercase mb-6 leading-tight text-white">
              Hizmetlerimiz Hakkında Bilgi Alın
            </h2>
            <p className="text-white/70 max-w-xl mx-auto mb-10 text-base md:text-lg">
              Beylikdüzü'nde personal trainer desteği ve premium fitness deneyimi için bize ulaşın.
            </p>
            <Link to="/iletisim">
              <Button variant="cta" size="lg" className="group/btn">
                İletişime Geçin
                <ArrowRight
                  size={18}
                  className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1"
                />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;