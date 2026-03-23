import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/ui/HeroSection";
import SectionTitle from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroClasses from "@/assets/hero-classes.jpg";
import heroHome from "@/assets/hero-home.jpg";

const classes = [
  {
    name: "HIIT",
    desc: "Yüksek yoğunluklu interval antrenmanlarla kısa sürede maksimum kalori yakın.",
    target: "Tüm seviyeler",
    benefit: "Yağ yakımı & dayanıklılık",
  },
  {
    name: "Pilates",
    desc: "Esnekliğinizi artırın, postürünüzü düzeltin ve kas tonusunuzu geliştirin.",
    target: "Her yaşa uygun",
    benefit: "Esneklik & denge",
  },
  {
    name: "Yoga",
    desc: "Zihin ve beden uyumunu sağlayarak stresten arınmanın en etkili yolu.",
    target: "Tüm seviyeler",
    benefit: "Rahatlama & esneklik",
  },
  {
    name: "Functional Training",
    desc: "Günlük hayatta kullanılan hareketleri güçlendiren fonksiyonel antrenmanlar.",
    target: "Orta-ileri seviye",
    benefit: "Güç & koordinasyon",
  },
  {
    name: "Spinning",
    desc: "Yüksek tempolu bisiklet derslerinde enerjinizi zirveye taşıyın.",
    target: "Tüm seviyeler",
    benefit: "Kardiyo & bacak gücü",
  },
  {
    name: "Zumba",
    desc: "Dans eşliğinde eğlenceli ve enerjik bir kardiyo deneyimi yaşayın.",
    target: "Her yaşa uygun",
    benefit: "Eğlenceli kardiyo",
  },
  {
    name: "Body Pump",
    desc: "Hafif ağırlıklarla yüksek tekrarlı kas dayanıklılığı antrenmanı.",
    target: "Orta seviye",
    benefit: "Kas tonusu & şekillendirme",
  },
  {
    name: "Cross Training",
    desc: "Farklı disiplinleri birleştiren yoğun ve sonuç odaklı antrenmanlar.",
    target: "İleri seviye",
    benefit: "Güç & dayanıklılık",
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

const GroupClasses = () => {
  return (
    <Layout>
      <HeroSection
        image={heroClasses}
        subtitle="Grup Derslerimiz"
        title="Birlikte Daha Güçlü"
        description="Profesyonel eğitmenler eşliğinde grup derslerimizle motivasyonunuzu artırın ve hedeflerinize ulaşın."
        height="h-[50vh] md:h-[65vh]"
      />

      {/* ─── Classes Grid ─── */}
      <section className="py-20 md:py-28">
        <div className="container">
          <SectionTitle
            subtitle="Derslerimiz"
            title="Premium Grup Dersleri"
            description="Beykent'te grup dersleri ile formda kalmanın en keyifli yolu. Her seviyeye uygun profesyonel programlar."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {classes.map((c, i) => (
              <motion.div
                key={c.name}
                variants={fadeUp}
                custom={i}
                className="group bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
              >
                {/* Image header */}
                <div className="h-40 overflow-hidden relative">
                  <img
                    src={heroHome}
                    alt={c.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 font-heading text-2xl font-bold uppercase tracking-wide">
                    {c.name}
                  </h3>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{c.desc}</p>
                  <div className="space-y-1.5 text-xs">
                    <p className="flex items-center gap-2">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary shrink-0" />
                      <span className="text-muted-foreground">
                        <span className="text-primary font-medium">Hedef:</span> {c.target}
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary shrink-0" />
                      <span className="text-muted-foreground">
                        <span className="text-primary font-medium">Kazanım:</span> {c.benefit}
                      </span>
                    </p>
                  </div>
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
          style={{ backgroundImage: `url(${heroClasses})` }}
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-heading text-3xl md:text-5xl font-bold uppercase mb-6 leading-tight">
              Ücretsiz Deneme Dersine Katılın
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10 text-base md:text-lg">
              Grup derslerimizi ücretsiz deneyin ve Swiss Fit Club farkını hissedin.
            </p>
            <Link to="/iletisim">
              <Button variant="cta" size="lg" className="group/btn">
                Hemen Başvur
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

export default GroupClasses;