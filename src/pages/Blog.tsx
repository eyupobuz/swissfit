import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/ui/HeroSection";
import SectionTitle from "@/components/ui/SectionTitle";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroHome from "@/assets/hero-home.jpg";
import heroClub from "@/assets/hero-club.jpg";
import heroClasses from "@/assets/hero-classes.jpg";
import heroServices from "@/assets/hero-services.jpg";
import heroContact from "@/assets/hero-contact.jpg";
import heroBlog from "@/assets/hero-blog.jpg";

const blogPosts = [
  {
    slug: "beylikduzu-spor-salonu",
    title: "Beylikdüzü Spor Salonu Seçerken Nelere Dikkat Edilmeli?",
    date: "15 Mart 2024",
    category: "Rehber",
    summary:
      "Beylikdüzü'nde doğru spor salonunu seçmek için dikkat etmeniz gereken kriterler ve öneriler. Ekipman kalitesi, eğitmen kadrosu, hijyen standartları ve konum gibi faktörleri değerlendirin.",
    image: heroHome,
  },
  {
    slug: "beykent-spor-salonu",
    title: "Beykent Spor Salonu Tavsiyesi ve Doğru Salon Seçimi",
    date: "10 Mart 2024",
    category: "Tavsiye",
    summary:
      "Beykent bölgesinde kaliteli bir spor salonu arıyorsanız bu rehber tam size göre. Hizmet çeşitliliği, ekipman kalitesi ve üyelik seçeneklerini karşılaştırın.",
    image: heroClub,
  },
  {
    slug: "beylikduzu-fitness-salonu",
    title: "Beylikdüzü Fitness Salonu Arayanlar İçin Kapsamlı Rehber",
    date: "5 Mart 2024",
    category: "Rehber",
    summary:
      "Beylikdüzü fitness merkezi seçeneklerini karşılaştırın ve ihtiyaçlarınıza en uygun premium fitness salonunu bulun.",
    image: heroClasses,
  },
  {
    slug: "beykent-grup-dersleri",
    title: "Beykent'te Grup Dersleri ile Formda Kalmanın Yolları",
    date: "1 Mart 2024",
    category: "Fitness",
    summary:
      "Grup dersleri ile motivasyonunuzu artırın ve sosyal bir ortamda spor yapın. HIIT, Pilates, Yoga ve daha fazlası.",
    image: heroServices,
  },
  {
    slug: "beylikduzu-personal-trainer",
    title: "Beylikdüzü'nde Personal Trainer Desteğinin Avantajları",
    date: "25 Şubat 2024",
    category: "Sağlık",
    summary:
      "Kişisel antrenör desteği ile hedeflerinize daha hızlı ulaşmanın yolları. Beylikdüzü'de profesyonel personal trainer rehberi.",
    image: heroContact,
  },
  {
    slug: "beykent-paradise-avm-spor",
    title: "Beykent Paradise AVM Yakınında Premium Spor Salonu Deneyimi",
    date: "20 Şubat 2024",
    category: "Deneyim",
    summary:
      "Paradise AVM'deki premium fitness deneyimini keşfedin. Modern ekipmanlar, profesyonel kadro ve lüks ortam.",
    image: heroBlog,
  },
  {
    slug: "beylikduzu-kilo-verme",
    title: "Beylikdüzü'de Spor Salonu ile Sağlıklı Kilo Verme Rehberi",
    date: "15 Şubat 2024",
    category: "Sağlık",
    summary:
      "Doğru egzersiz programı ve beslenme desteğiyle sağlıklı kilo vermenin yolları. Beylikdüzü fitness uzmanlarından ipuçları.",
    image: heroHome,
  },
  {
    slug: "beykent-fonksiyonel-antrenman",
    title: "Beykent'te Fonksiyonel Antrenman: Nedir, Nasıl Yapılır?",
    date: "10 Şubat 2024",
    category: "Eğitim",
    summary:
      "Fonksiyonel antrenmanın faydaları ve doğru uygulama teknikleri. Beykent fitness merkezinde profesyonel destekle antrenman.",
    image: heroClub,
  },
  {
    slug: "beylikduzu-beslenme-danismanligi",
    title: "Beylikdüzü Fitness Salonu Beslenme Danışmanlığı Hizmetleri",
    date: "5 Şubat 2024",
    category: "Beslenme",
    summary:
      "Spor ve beslenmenin birlikteliği ile hedeflerinize ulaşın. Beylikdüzü'de uzman diyetisyen desteğiyle kişiye özel beslenme planları.",
    image: heroServices,
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

const Blog = () => {
  return (
    <Layout>
      <HeroSection
        image={heroHome}
        subtitle="Blog & Fitness Rehberi"
        title="Sağlıklı Yaşam Rehberi"
        description="Beylikdüzü spor salonu rehberleri, Beykent fitness ipuçları, beslenme önerileri ve sağlıklı yaşam hakkında güncel içerikler."
        height="h-[40vh] md:h-[50vh]"
      />

      {/* SEO Intro */}
      <section className="py-12 bg-surface border-b border-border">
        <div className="container max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-muted-foreground text-sm leading-relaxed"
          >
            Swiss Fit Club blog sayfasında Beylikdüzü spor salonu rehberleri, Beykent fitness merkezi
            ipuçları, sağlıklı beslenme önerileri, antrenman programları ve kişisel gelişim
            içeriklerini bulabilirsiniz. Beylikdüzü'de personal trainer desteği, Beykent'te grup
            dersleri ve fitness dünyasının en güncel konuları hakkında bilgi edinin.
          </motion.p>
        </div>
      </section>

      {/* ─── Blog Grid ─── */}
      <section className="py-20 md:py-28">
        <div className="container">
          <SectionTitle
            subtitle="Tüm Yazılar"
            title="Blog Yazıları"
            description="Beylikdüzü ve Beykent bölgesinden fitness, spor ve sağlıklı yaşam rehberleri."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {blogPosts.map((post, i) => (
              <motion.div key={post.slug} variants={fadeUp} custom={i}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="group relative block bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 h-full"
                >
                  {/* Image */}
                  <div className="h-52 overflow-hidden relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded font-medium">
                        {post.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                    </div>
                    <h2 className="font-heading text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300 leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {post.summary}
                    </p>
                    <span className="inline-flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      Devamını Oku
                      <ArrowRight size={14} className="ml-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SEO Bottom */}
      <section className="py-16 bg-surface">
        <div className="container max-w-4xl space-y-4">
          <h2 className="font-heading text-xl font-bold text-center uppercase mb-6">
            Beylikdüzü Fitness & Beykent Spor Salonu Blog
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Swiss Fit Club blogu, Beylikdüzü spor salonu ve Beykent fitness merkezi hakkında en
            güncel ve faydalı içerikleri sunmaktadır. Beylikdüzü fitness salonu arayanlar, Beykent
            spor salonu tavsiyesi isteyenler ve Beylikdüzü'de personal trainer desteği arayanlar için
            kapsamlı rehberler hazırlıyoruz.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Blog içeriklerimizde antrenman teknikleri, beslenme önerileri, grup dersleri hakkında
            bilgiler, fonksiyonel antrenman rehberleri ve sağlıklı yaşam ipuçları bulabilirsiniz.
            Beykent'te grup dersleri, Beylikdüzü'de kilo verme programları ve Beykent Paradise
            AVM'deki premium fitness deneyimi hakkında detaylı yazılarımızı keşfedin.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;