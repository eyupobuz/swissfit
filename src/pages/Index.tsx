import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/ui/HeroSection";
import SectionTitle from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dumbbell,
  Users,
  Heart,
  ShieldCheck,
  MapPin,
  Clock,
  Trophy,
  Target,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import heroHome from "@/assets/hero-home.jpg";
import heroClasses from "@/assets/hero-classes.jpg";
import { useState } from "react";

/* ─── Static Content ─── */

const features = [
  {
    icon: Dumbbell,
    title: "Modern Ekipmanlar",
    desc: "Son teknoloji fitness ekipmanlarıyla güçlü antrenmanlar. Beylikdüzü spor salonu standartlarını yükselten profesyonel donanım.",
  },
  {
    icon: Users,
    title: "Profesyonel Eğitmenler",
    desc: "Alanında uzman, sertifikalı personal trainer kadrosu. Beylikdüzü'nde personal trainer desteğiyle hedeflerinize ulaşın.",
  },
  {
    icon: Heart,
    title: "Grup Dersleri",
    desc: "HIIT, Yoga, Pilates, Spinning ve daha fazlası. Beykent'te grup dersleri ile motivasyonunuzu artırın.",
  },
  {
    icon: ShieldCheck,
    title: "Hijyenik Alanlar",
    desc: "Her gün sterilize edilen temiz ve güvenli spor alanları. Beykent fitness merkezi standartlarının üzerinde hijyen.",
  },
  {
    icon: MapPin,
    title: "Merkezi Konum",
    desc: "Beykent Paradise AVM içinde kolay ulaşılabilir konum. Beylikdüzü fitness salonu arayanlar için ideal lokasyon.",
  },
  {
    icon: Clock,
    title: "Esnek Saatler",
    desc: "Sabah 06:00'dan gece 23:00'e kadar kesintisiz hizmet. Beykent spor salonu deneyimini istediğiniz saatte yaşayın.",
  },
];

const services = [
  {
    icon: Target,
    title: "Bireysel Antrenman",
    desc: "Kişisel hedeflerinize yönelik özel antrenman programları. Beylikdüzü'de personal trainer eşliğinde birebir çalışma imkanı.",
    link: "/hizmetlerimiz",
  },
  {
    icon: Users,
    title: "Grup Dersleri",
    desc: "HIIT, Pilates, Yoga, Spinning, Zumba ve daha fazlası. Beykent'te grup dersleri ile sosyal bir ortamda spor yapın.",
    link: "/grup-dersleri",
  },
  {
    icon: Trophy,
    title: "Premium Deneyim",
    desc: "Lüks spor kulübü standartlarında ekipman, alan ve hizmet kalitesi. Beylikdüzü fitness salonu deneyiminin zirvesi.",
    link: "/hizmetlerimiz",
  },
];

const faqs = [
  {
    q: "Swiss Fit Club Beylikdüzü'de nerede bulunuyor?",
    a: "Swiss Fit Club, Beylikdüzü Beykent Paradise AVM içinde yer almaktadır. Toplu taşıma ve özel araçla kolayca ulaşılabilir konumdadır. Beykent spor salonu arayanlar için en merkezi lokasyondayız.",
  },
  {
    q: "Beylikdüzü spor salonu üyelik fiyatları nasıl?",
    a: "Swiss Fit Club, farklı bütçelere uygun esnek üyelik paketleri sunmaktadır. Aylık, 3 aylık, 6 aylık ve yıllık üyelik seçeneklerimiz mevcuttur. Detaylı fiyat bilgisi için bizimle iletişime geçebilirsiniz.",
  },
  {
    q: "Beykent'te grup dersleri hangi saatlerde yapılıyor?",
    a: "Grup derslerimiz hafta içi sabah 07:00'den akşam 21:00'e, hafta sonu ise 09:00'dan 19:00'a kadar farklı saatlerde düzenlenmektedir. HIIT, Pilates, Yoga, Spinning, Zumba ve daha birçok ders seçeneğimiz mevcuttur.",
  },
  {
    q: "Beylikdüzü'de personal trainer hizmeti sunuyor musunuz?",
    a: "Evet, Swiss Fit Club'da sertifikalı personal trainer kadromuzla birebir kişisel antrenman hizmeti sunuyoruz. Beylikdüzü personal trainer desteğiyle hedeflerinize en hızlı şekilde ulaşabilirsiniz.",
  },
  {
    q: "Ücretsiz deneme dersi var mı?",
    a: "Evet! Swiss Fit Club'ı yakından tanımanız için ücretsiz deneme dersi imkanı sunuyoruz. Beylikdüzü fitness salonu deneyimimizi risk almadan keşfedebilirsiniz.",
  },
  {
    q: "Beykent fitness merkezi olarak hangi hizmetleri sunuyorsunuz?",
    a: "Bireysel antrenman, personal trainer, vücut analizi, beslenme danışmanlığı, grup dersleri, fonksiyonel antrenman, kardiyo ve ağırlık alanları, hijyenik duş ve soyunma alanları gibi kapsamlı hizmetler sunuyoruz.",
  },
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

/* ─── Page ─── */

const Index = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <Layout>
      {/* Hero */}
      <HeroSection
        image={heroHome}
        subtitle="Beylikdüzü'nün Premium Fitness Kulübü"
        title="Gücünüzü Keşfedin"
        description="Beylikdüzü ve Beykent'in en prestijli spor kulübünde, profesyonel eğitmenler eşliğinde hedeflerinize ulaşın. Beykent Paradise AVM'de premium fitness deneyimi."
        ctaText="Ücretsiz Deneme Dersi"
        ctaLink="/iletisim"
      />

      {/* ─── Features ─── */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <SectionTitle
            subtitle="Neden Swiss Fit Club?"
            title="Beylikdüzü'nün Lider Fitness Kulübü"
            description="Swiss Fit Club, modern ekipmanları, uzman kadrosu ve premium ortamıyla Beylikdüzü spor salonu standartlarını yeniden tanımlıyor."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                custom={i}
                className="group relative bg-card border border-border rounded-xl p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                {/* Top accent line on hover */}
                <span className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                <div className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 mb-5">
                  <f.icon className="text-primary" size={24} />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                  {f.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── About ─── */}
      <section className="py-20 md:py-28 bg-muted">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative"
            >
              <img
                src={heroClasses}
                alt="Swiss Fit Club Beylikdüzü grup dersleri"
                className="rounded-xl w-full h-[420px] object-cover"
                style={{ boxShadow: "var(--shadow-card)" }}
              />
              {/* Decorative offset frame */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-primary/20 rounded-xl -z-10 hidden lg:block" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <p className="text-primary font-heading text-sm tracking-[0.3em] uppercase mb-3 font-bold">
                Kulübümüz Hakkında
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase mb-6 leading-tight text-foreground">
                Beykent'in Premium
                <br />
                Spor Kulübü
              </h2>
              <div className="space-y-4 mb-8">
                <p className="text-muted-foreground leading-relaxed">
                  Swiss Fit Club, Beylikdüzü Beykent Paradise AVM'de konumlanan premium bir fitness
                  merkezidir. 2500 m²'lik antrenman alanımızda modern ekipmanlar, profesyonel eğitmen
                  kadrosu ve hijyenik ortamımızla sağlıklı yaşam yolculuğunuzda yanınızdayız.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Beylikdüzü spor salonu arayanlar için en doğru adres olan kulübümüz, bireysel
                  antrenman programlarından grup derslerine, personal trainer desteğinden beslenme
                  danışmanlığına kadar kapsamlı bir hizmet yelpazesi sunmaktadır.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Beykent fitness merkezi olarak amacımız, her üyemize kişiselleştirilmiş bir spor
                  deneyimi sunarak hedeflerine en kısa sürede ulaşmalarını sağlamaktır.
                </p>
              </div>
              <Link to="/kuluplerimiz">
                <Button variant="cta" className="group/btn">
                  Kulübümüzü Keşfet
                  <ArrowRight
                    size={16}
                    className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1"
                  />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Services Overview ─── */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <SectionTitle
            subtitle="Hizmetlerimiz"
            title="Kapsamlı Fitness Hizmetleri"
            description="Beylikdüzü fitness salonu hizmetlerinde fark yaratan Swiss Fit Club'da sunduğumuz profesyonel hizmetler."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid lg:grid-cols-3 gap-6"
          >
            {services.map((s, i) => (
              <motion.div key={s.title} variants={fadeUp} custom={i}>
                <Link
                  to={s.link}
                  className="group relative block bg-card border border-border rounded-xl p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 h-full overflow-hidden"
                  style={{ boxShadow: "var(--shadow-card)" }}
                >
                  {/* Hover gradient backdrop */}
                  <span className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 mb-5">
                      <s.icon className="text-primary" size={24} />
                    </div>
                    <h3 className="font-heading text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                      {s.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{s.desc}</p>
                    <span className="inline-flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      Detaylı Bilgi
                      <ArrowRight size={14} className="ml-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 md:py-28 bg-muted">
        <div className="container max-w-3xl">
          <SectionTitle
            subtitle="Sıkça Sorulan Sorular"
            title="Merak Edilenler"
            description="Beylikdüzü spor salonu, Beykent fitness merkezi ve Swiss Fit Club hakkında sıkça sorulan sorular."
          />
          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                  className={`bg-card border rounded-xl overflow-hidden transition-colors duration-300 ${
                    isOpen ? "border-primary/30" : "border-border"
                  }`}
                  style={{ boxShadow: "var(--shadow-card)" }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left transition-colors duration-200"
                    aria-expanded={isOpen}
                  >
                    <h3 className="font-heading text-sm md:text-base font-semibold pr-4 text-foreground">
                      {faq.q}
                    </h3>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="shrink-0"
                    >
                      <ChevronDown size={18} className="text-primary" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5">
                          <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${heroHome})` }}
        />
        <div className="absolute inset-0 bg-black/65" />

        <div className="container relative z-10 text-center hero-text">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-heading text-3xl md:text-5xl font-bold uppercase mb-6 leading-tight text-white">
              Hayalinizdeki Forma Ulaşın
            </h2>
            <p className="text-white/80 max-w-xl mx-auto mb-10 text-base md:text-lg">
              Beylikdüzü'nün premium fitness merkezi Swiss Fit Club'da ücretsiz deneme dersimize
              katılın ve farkı yaşayın.
            </p>
            <Link to="/iletisim">
              <Button variant="cta" size="lg" className="group/btn">
                Hemen Başla
                <ArrowRight
                  size={18}
                  className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1"
                />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── Extended SEO Content ─── */}
      <section className="py-16 bg-muted">
        <div className="container max-w-4xl space-y-6">
          <h2 className="font-heading text-2xl font-bold text-center uppercase mb-8 text-foreground">
            Beylikdüzü Spor Salonu & Beykent Fitness Merkezi
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Swiss Fit Club, Beylikdüzü spor salonu ve Beykent fitness merkezi arayanlar için premium
            bir fitness deneyimi sunmaktadır. Beykent Paradise AVM içinde yer alan kulübümüz; modern
            ekipmanları, profesyonel personal trainer kadrosu, grup dersleri ve hijyenik ortamıyla
            Beylikdüzü'nün en tercih edilen fitness salonu olmayı hedeflemektedir.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Beylikdüzü fitness salonu arayanlar için Swiss Fit Club, 2500 m²'lik geniş antrenman
            alanı, son model kardiyo ve ağırlık ekipmanları, fonksiyonel antrenman bölgesi ve
            profesyonel grup dersleriyle kapsamlı bir spor deneyimi sunmaktadır. Beykent spor salonu
            olarak bölgedeki en modern fitness merkezi olmaktan gurur duyuyoruz.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Beylikdüzü'nde personal trainer hizmeti arıyorsanız, Swiss Fit Club'ın sertifikalı
            eğitmen kadrosu sizin için kişiye özel antrenman programları hazırlamaktadır. Beykent'te
            grup dersleri ile sosyal bir ortamda spor yapmak isteyenler için HIIT, Pilates, Yoga,
            Spinning, Zumba, Body Pump, Cross Training ve Functional Training gibi geniş bir ders
            yelpazesi sunuyoruz.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed text-center">
            Beykent Paradise AVM yakınında premium spor salonu deneyimi için Swiss Fit Club'ı
            ziyaret edin. Beylikdüzü fitness merkezi standartlarını yeniden tanımlayan kulübümüzde
            ücretsiz deneme dersinizi hemen ayırtın.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Index;