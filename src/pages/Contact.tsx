import { useState } from "react";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/ui/HeroSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import heroContact from "@/assets/hero-contact.jpg";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      toast.success("Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.");
      setForm({ name: "", email: "", phone: "", message: "" });
      setSending(false);
    }, 600);
  };

  return (
    <Layout>
      <HeroSection
        image={heroContact}
        subtitle="İletişim"
        title="Bize Ulaşın"
        description="Sorularınız, üyelik bilgileri veya deneme dersi talepleriniz için bize ulaşın."
        height="h-[40vh] md:h-[50vh]"
      />

      <section className="py-20 md:py-28">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* ─── Form ─── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <p className="text-primary font-heading text-sm tracking-[0.3em] uppercase mb-3">
                İletişim Formu
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase mb-2 leading-tight">
                Mesaj Gönderin
              </h2>
              <p className="text-muted-foreground mb-8">
                Formu doldurun, ekibimiz en kısa sürede size dönüş yapsın.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Input
                    placeholder="Adınız Soyadınız"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="bg-card border-border focus:border-primary/50 transition-colors"
                  />
                  <Input
                    type="tel"
                    placeholder="Telefon Numaranız"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="bg-card border-border focus:border-primary/50 transition-colors"
                  />
                </div>
                <Input
                  type="email"
                  placeholder="E-posta Adresiniz"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="bg-card border-border focus:border-primary/50 transition-colors"
                />
                <Textarea
                  placeholder="Mesajınız..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={5}
                  className="bg-card border-border focus:border-primary/50 transition-colors resize-none"
                />
                <Button
                  type="submit"
                  variant="cta"
                  size="lg"
                  className="w-full group/btn"
                  disabled={sending}
                >
                  {sending ? "Gönderiliyor..." : "Mesaj Gönder"}
                  <Send
                    size={16}
                    className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1"
                  />
                </Button>
              </form>
            </motion.div>

            {/* ─── Info ─── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="space-y-6"
            >
              {/* Contact info card */}
              <div className="bg-card border border-border rounded-lg p-6 space-y-4 transition-colors duration-300 hover:border-primary/20">
                <h3 className="font-heading text-xl font-semibold">İletişim Bilgileri</h3>
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

export default Contact;