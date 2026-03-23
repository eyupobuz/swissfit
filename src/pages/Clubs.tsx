import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/ui/HeroSection";
import SectionTitle from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Dumbbell,
  ShowerHead,
  Users,
  Wifi,
  ArrowRight,
} from "lucide-react";
import heroClub from "@/assets/hero-club.jpg";

const features = [
  { icon: Dumbbell, title: "Modern Ekipmanlar", desc: "Son model kardiyo ve ağırlık ekipmanları" },
  { icon: Users, title: "Grup Dersleri", desc: "HIIT, Yoga, Pilates ve daha fazlası" },
  { icon: ShowerHead, title: "Duş & Soyunma", desc: "Hijyenik ve ferah soyunma alanları" },
  { icon: Wifi, title: "Ücretsiz WiFi", desc: "Kesintisiz internet bağlantısı" },
];

/* ─── Animation Variants ─── */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const Clubs = () => {
  return (
    <Layout>
      <HeroSection
        image={heroClub}
        subtitle="Kulüplerimiz"
        title="Beykent Paradise AVM"
        description="Beylikdüzü'nün kalbinde, premium fitness deneyimi sizi bekliyor."
        height="h-[50vh] md:h-[65vh]"
      />

      <section className="py-20 md:py-28">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* ─── Left Column ─── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <SectionTitle
                subtitle="Şubemiz"
                title="Beykent Paradise AVM Şubesi"
                center={false}
              />
              <div className="space-y-4 mb-8">
                <p className="text-muted-foreground leading-relaxed">
                  Swiss Fit Club Beykent Paradise AVM şubesi, Beylikdüzü'nün en modern ve prestijli
                  fitness merkezlerinden biridir. Geniş antrenman alanları, son teknoloji ekipmanlar
                  ve profesyonel eğitmen kadrosuyla hizmetinizdeyiz.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Beykent spor salonu arayanlar için ideal bir seçenek olan kulübümüz, hem bireysel
                  antrenman hem de grup dersleri ile her seviyeden sporcuya hitap etmektedir.
                </p>
              </div>

              {/* Feature cards */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="grid grid-cols-2 gap-4 mb-8"
              >
                {features.map((f, i) => (
                  <motion.div
                    key={f.title}
                    variants={fadeUp}
                    custom={i}
                    className="group bg-card border border-border rounded-lg p-4 transition-all duration-300 hover:border-primary/40 hover:shadow-md hover:shadow-primary/5"
                  >
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 mb-3">
                      <f.icon className="text-primary" size={20} />
                    </div>
                    <h4 className="font-heading text-sm font-semibold mb-1 group-hover:text-primary transition-colors duration-300">
                      {f.title}
                    </h4>
                    <p className="text-muted-foreground text-xs leading-relaxed">{f.desc}</p>
                  </motion.div>
                ))}
              </motion.div>

              <Link to="/iletisim">
                <Button variant="cta" className="group/btn">
                  Ücretsiz Deneme Dersi
                  <ArrowRight
                    size={16}
                    className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1"
                  />
                </Button>
              </Link>
            </motion.div>

            {/* ─── Right Column ─── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="space-y-6"
            >
              {/* Club image */}
              <div className="relative">
                <img
                  src={heroClub}
                  alt="Swiss Fit Club Beykent Paradise AVM"
                  className="rounded-lg w-full h-64 object-cover"
                />
                <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-primary/20 rounded-lg -z-10 hidden lg:block" />
              </div>

              {/* Contact card */}
              <div className="bg-card border border-border rounded-lg p-6 space-y-4 transition-colors duration-300 hover:border-primary/20">
                <h4 className="font-heading text-lg font-semibold">İletişim & Konum</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 shrink-0 mt-0.5">
                      <MapPin size={14} className="text-primary" />
                    </div>
                    <span className="pt-1">Beykent Paradise AVM, Beylikdüzü / İstanbul</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 shrink-0">
                      <Phone size={14} className="text-primary" />
                    </div>
                    +90 (212) 000 00 00
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 shrink-0">
                      <Mail size={14} className="text-primary" />
                    </div>
                    info@swissfitclub.com
                  </div>
                </div>
              </div>

              {/* Hours card */}
              <div className="bg-card border border-border rounded-lg p-6 transition-colors duration-300 hover:border-primary/20">
                <h4 className="font-heading text-lg font-semibold mb-4 flex items-center gap-2">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-primary/10">
                    <Clock size={14} className="text-primary" />
                  </div>
                  Çalışma Saatleri
                </h4>
                <div className="space-y-2.5 text-sm text-muted-foreground">
                  <div className="flex justify-between items-center">
                    <span>Pazartesi – Cuma</span>
                    <span className="font-medium text-foreground">06:00 – 23:00</span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex justify-between items-center">
                    <span>Cumartesi</span>
                    <span className="font-medium text-foreground">08:00 – 22:00</span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex justify-between items-center">
                    <span>Pazar</span>
                    <span className="font-medium text-foreground">09:00 – 21:00</span>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-card border border-border rounded-lg overflow-hidden h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.5!2d28.6!3d41.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAwJzAwLjAiTiAyOMKwMzYnMDAuMCJF!5e0!3m2!1str!2str!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Swiss Fit Club Konum"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Clubs;