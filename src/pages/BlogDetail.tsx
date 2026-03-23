import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar, Tag, ArrowLeft, ArrowRight } from "lucide-react";
import heroHome from "@/assets/hero-home.jpg";
import heroClub from "@/assets/hero-club.jpg";
import heroClasses from "@/assets/hero-classes.jpg";
import heroServices from "@/assets/hero-services.jpg";
import heroContact from "@/assets/hero-contact.jpg";

interface BlogSection {
  heading?: string;
  text: string;
}

interface BlogPostData {
  title: string;
  seoTitle: string;
  metaDesc: string;
  image: string;
  date: string;
  category: string;
  readTime: string;
  sections: BlogSection[];
  tags: string[];
  relatedSlugs: string[];
}

const blogData: Record<string, BlogPostData> = {
  "beylikduzu-spor-salonu": {
    title: "Beylikdüzü Spor Salonu Seçerken Nelere Dikkat Edilmeli?",
    seoTitle: "Beylikdüzü Spor Salonu | En İyi Fitness Salonu Rehberi 2024",
    metaDesc: "Beylikdüzü'nde spor salonu ararken dikkat etmeniz gereken kriterler. Ekipman kalitesi, eğitmen kadrosu, hijyen ve konum.",
    image: heroHome, date: "15 Mart 2024", category: "Rehber", readTime: "6 dk",
    tags: ["Beylikdüzü spor salonu", "fitness salonu seçimi", "Beylikdüzü fitness"],
    relatedSlugs: ["beykent-spor-salonu", "beylikduzu-fitness-salonu", "beylikduzu-personal-trainer"],
    sections: [
      { text: "Beylikdüzü, İstanbul'un en hızlı gelişen bölgelerinden biri olarak spor salonu seçenekleri açısından oldukça zengin bir ilçedir. Ancak doğru Beylikdüzü spor salonunu seçmek, fitness hedeflerinize ulaşmanız için kritik öneme sahiptir. Bu rehberde, Beylikdüzü'de spor salonu seçerken dikkat etmeniz gereken tüm önemli kriterleri detaylı şekilde ele alıyoruz." },
      { heading: "1. Ekipman Kalitesi ve Çeşitliliği", text: "Bir Beylikdüzü spor salonu seçerken öncelikle ekipman kalitesine dikkat etmelisiniz. Modern ve bakımlı ekipmanlar, hem güvenli hem de etkili antrenmanlar yapmanızı sağlar. Kardiyo cihazları, serbest ağırlık alanı, fonksiyonel antrenman ekipmanları ve cable makineleri gibi geniş bir ekipman yelpazesi sunan salonları tercih edin. Swiss Fit Club olarak son teknoloji fitness ekipmanlarımızla Beylikdüzü fitness salonu standartlarını yükseltiyoruz." },
      { heading: "2. Profesyonel Eğitmen Kadrosu", text: "Eğitmen kadrosu, bir Beylikdüzü spor salonunun kalitesini belirleyen en önemli faktörlerden biridir. Sertifikalı ve deneyimli personal trainerlar, doğru form ve teknikle çalışmanızı sağlayarak sakatlanma riskini en aza indirir. Beylikdüzü'de personal trainer desteği sunan bir salon seçmek, hedeflerinize daha hızlı ulaşmanızı sağlayacaktır. Swiss Fit Club'da tüm eğitmenlerimiz uluslararası sertifikalara sahiptir." },
      { heading: "3. Hijyen ve Temizlik Standartları", text: "Hijyen standartları, özellikle günümüzde çok daha önemli hale gelmiştir. Düzenli olarak dezenfekte edilen ekipmanlar, temiz duş alanları, profesyonel havalandırma sistemi ve steril ortam olmazsa olmaz kriterler arasındadır. Beylikdüzü fitness merkezi olarak Swiss Fit Club, sektörün en yüksek hijyen standartlarını uygulamaktadır." },
      { heading: "4. Grup Dersleri ve Ders Çeşitliliği", text: "İyi bir Beylikdüzü spor salonu, bireysel antrenmanın yanı sıra zengin bir grup dersi programı da sunmalıdır. HIIT, Pilates, Yoga, Spinning, Zumba, Body Pump ve Cross Training gibi farklı ders seçenekleri, antrenmanlarınızı çeşitlendirmenize ve motivasyonunuzu yüksek tutmanıza yardımcı olur." },
      { heading: "5. Konum ve Ulaşım Kolaylığı", text: "Konum ve ulaşım kolaylığı, Beylikdüzü spor salonuna düzenli gitmeniz için önemli bir etkendir. Swiss Fit Club, Beykent Paradise AVM içindeki merkezi konumuyla hem toplu taşıma hem de özel araçla kolay ulaşılabilir bir fitness deneyimi sunmaktadır. AVM içindeki otopark imkanı da büyük bir avantaj sağlamaktadır." },
      { heading: "6. Üyelik Seçenekleri ve Fiyatlandırma", text: "Beylikdüzü'de spor salonu üyeliği değerlendirirken sadece fiyata değil, sunulan hizmet kapsamına da bakmanız önemlidir. Aylık, 3 aylık, 6 aylık ve yıllık üyelik seçenekleri sunan, esnek ödeme planları olan salonları tercih edin. Kaliteli bir Beylikdüzü fitness salonu deneyimi, uzun vadede sağlığınıza yapacağınız en iyi yatırımdır." },
      { text: "Sonuç olarak, Beylikdüzü spor salonu seçiminizi yaparken ekipman kalitesi, eğitmen kadrosu, hijyen standartları, ders çeşitliliği, konum ve fiyatlandırma gibi kriterleri birlikte değerlendirmenizi öneririz. Swiss Fit Club olarak tüm bu kriterlerde Beylikdüzü'nün en iyisini sunma hedefiyle çalışıyoruz. Ücretsiz deneme dersimize katılarak farkı kendiniz yaşayabilirsiniz." }
    ]
  },
  "beykent-spor-salonu": {
    title: "Beykent Spor Salonu Tavsiyesi ve Doğru Salon Seçimi",
    seoTitle: "Beykent Spor Salonu | Tavsiye ve Karşılaştırma 2024",
    metaDesc: "Beykent bölgesinde en iyi spor salonu tavsiyesi ve seçim rehberi. Hizmet karşılaştırması ve öneriler.",
    image: heroClub, date: "10 Mart 2024", category: "Tavsiye", readTime: "5 dk",
    tags: ["Beykent spor salonu", "Beykent fitness", "spor salonu tavsiye"],
    relatedSlugs: ["beylikduzu-spor-salonu", "beykent-paradise-avm-spor", "beykent-grup-dersleri"],
    sections: [
      { text: "Beykent bölgesinde yaşayan ve kaliteli bir spor salonu arayan kişiler için doğru tercih yapmak büyük önem taşır. Bir Beykent spor salonu seçerken göz önünde bulundurmanız gereken birkaç önemli kriter bulunmaktadır. Bu yazıda Beykent'teki fitness seçeneklerini değerlendiriyoruz." },
      { heading: "Hizmet Çeşitliliği Önemlidir", text: "Bir Beykent spor salonu seçerken salonun sunduğu hizmet çeşitliliğine bakmalısınız. Sadece ekipman değil, aynı zamanda grup dersleri, personal trainer desteği, vücut analizi ve beslenme danışmanlığı gibi ek hizmetler de değerlendirme kriterleriniz arasında olmalıdır. Beykent fitness merkezi arayanlar için kapsamlı hizmet sunan salonlar her zaman daha avantajlıdır." },
      { heading: "Swiss Fit Club Beykent Paradise AVM", text: "Swiss Fit Club Beykent Paradise AVM şubesi, tüm bu kriterleri karşılayan premium bir fitness merkezidir. Modern ekipmanlarımız, profesyonel eğitmen kadromuz ve geniş ders programımızla Beykent'in en kapsamlı spor salonu olmayı hedefliyoruz. Beykent spor salonu arayanlar için ideal bir seçenek olan kulübümüz, 2500 m²'lik geniş alanıyla konforlu bir antrenman deneyimi sunmaktadır." },
      { heading: "Fiyat-Performans Dengesi", text: "Üyelik fiyatlarını karşılaştırırken sadece aylık ücretlere değil, sunulan hizmetlerin kapsamına da bakmanız önemlidir. Beykent fitness merkezi olarak Swiss Fit Club, premium hizmet kalitesini erişilebilir fiyatlarla sunmaktadır. Kaliteli bir spor salonu deneyimi, uzun vadede sağlığınıza yapacağınız en iyi yatırımdır." },
      { heading: "Beykent'te Spor Salonu Seçim Kriterleri", text: "Beykent bölgesinde spor salonu seçerken dikkat etmeniz gereken diğer faktörler arasında çalışma saatleri, otopark imkanı, duş ve soyunma alanlarının kalitesi, sosyal ortam ve genel atmosfer yer almaktadır. Swiss Fit Club, tüm bu alanlarda üstün bir deneyim sunmaktadır." },
      { text: "Beykent spor salonu arayanlar için Swiss Fit Club, kalite, konfor ve profesyonelliğin buluştuğu en doğru adrestir. Ücretsiz deneme dersimize katılarak Beykent'in en premium fitness deneyimini yaşayın." }
    ]
  },
  "beylikduzu-fitness-salonu": {
    title: "Beylikdüzü Fitness Salonu Arayanlar İçin Kapsamlı Rehber",
    seoTitle: "Beylikdüzü Fitness Salonu | Kapsamlı Karşılaştırma Rehberi 2024",
    metaDesc: "Beylikdüzü fitness merkezi arayanlar için detaylı karşılaştırma rehberi. En iyi fitness salonları ve özellikleri.",
    image: heroClasses, date: "5 Mart 2024", category: "Rehber", readTime: "7 dk",
    tags: ["Beylikdüzü fitness salonu", "Beylikdüzü fitness merkezi", "fitness rehber"],
    relatedSlugs: ["beylikduzu-spor-salonu", "beylikduzu-personal-trainer", "beylikduzu-kilo-verme"],
    sections: [
      { text: "Beylikdüzü fitness salonu arayanlar için bu kapsamlı rehber, doğru seçimi yapmanıza yardımcı olacaktır. Bölgede çok sayıda fitness merkezi bulunsa da, hepsinin sunduğu deneyim aynı değildir. Premium bir Beylikdüzü fitness salonu deneyimi için nelere dikkat etmeniz gerektiğini detaylı olarak inceliyoruz." },
      { heading: "Premium Fitness Salonu Kriterleri", text: "Premium bir Beylikdüzü fitness salonu deneyimi için modern ekipmanlar, profesyonel eğitmenler, hijyenik ortam ve konforlu alan gibi temel kriterlerin karşılanması gerekmektedir. Bunun yanı sıra grup dersleri, personal trainer hizmeti ve beslenme danışmanlığı gibi ek hizmetler de önemlidir." },
      { heading: "Beylikdüzü'de Fitness Merkezi Seçenekleri", text: "Beylikdüzü, İstanbul'un batı yakasındaki en gelişmiş ilçelerden biri olarak çok sayıda fitness merkezi barındırmaktadır. Ancak gerçek anlamda premium bir deneyim sunan Beylikdüzü fitness salonu sayısı sınırlıdır. Ekipman kalitesi, alan genişliği ve hizmet çeşitliliği açısından fark yaratan salonları tercih etmeniz önerilir." },
      { heading: "Swiss Fit Club Farkı", text: "Swiss Fit Club, Beylikdüzü fitness merkezi standartlarını yükselten hizmet anlayışıyla öne çıkmaktadır. Beykent Paradise AVM'deki konumumuz, hem alışveriş hem de spor ihtiyaçlarınızı tek noktadan karşılamanızı sağlar. 2500 m²'lik alanımızda son model ekipmanlar, profesyonel eğitmenler ve 50'den fazla haftalık grup dersiyle hizmet vermekteyiz." },
      { heading: "Antrenman Alanları ve Ekipmanlar", text: "Beylikdüzü fitness salonu olarak Swiss Fit Club, farklı antrenman ihtiyaçlarına yönelik özel alanlar sunmaktadır. Kardiyo bölgesi, serbest ağırlık alanı, fonksiyonel antrenman sahası, stretching alanı ve grup dersleri stüdyosu ile her türlü antrenmanınız için ideal bir ortam sağlıyoruz." },
      { text: "Beylikdüzü fitness salonu arayanlar için Swiss Fit Club, kaliteli ekipman, profesyonel kadro ve premium ortamıyla en doğru tercihtir. Ücretsiz deneme dersimize katılarak Beylikdüzü'nün en modern fitness deneyimini yaşayın." }
    ]
  },
  "beykent-grup-dersleri": {
    title: "Beykent'te Grup Dersleri ile Formda Kalmanın Yolları",
    seoTitle: "Beykent Grup Dersleri | HIIT, Yoga, Pilates ve Daha Fazlası",
    metaDesc: "Beykent'te grup dersleri ile motivasyonunuzu artırın. HIIT, Pilates, Yoga, Spinning programları.",
    image: heroServices, date: "1 Mart 2024", category: "Fitness", readTime: "5 dk",
    tags: ["Beykent grup dersleri", "HIIT Beykent", "Yoga Beylikdüzü", "Pilates Beykent"],
    relatedSlugs: ["beylikduzu-spor-salonu", "beykent-spor-salonu", "beykent-fonksiyonel-antrenman"],
    sections: [
      { text: "Grup dersleri, bireysel antrenmanın ötesinde sosyal bir ortamda spor yapma imkanı sunar. Beykent'te grup dersleri arayanlar için Swiss Fit Club geniş bir program yelpazesi sunmaktadır. Haftalık 50'den fazla ders seçeneğimizle her seviyeden sporcuya hitap ediyoruz." },
      { heading: "Beykent'te Sunulan Grup Dersleri", text: "Swiss Fit Club'da HIIT, Pilates, Yoga, Spinning, Zumba, Body Pump, Cross Training ve Functional Training gibi premium ders seçenekleri sunuyoruz. Her ders, alanında uzman eğitmenler tarafından yürütülmektedir. Beykent'te grup dersleri ile hem fiziksel hem de mental olarak güçlenebilirsiniz." },
      { heading: "Grup Derslerinin Faydaları", text: "Grup dersleri motivasyonunuzu artırmanın yanı sıra sosyal bağlar kurmanıza da yardımcı olur. Düzenli katılımcılarımız arasında güçlü bir topluluk ruhu oluşmuştur. Beykent fitness merkezi olarak Swiss Fit Club'da grup derslerine katılarak hem formda kalabilir hem de yeni arkadaşlıklar edinebilirsiniz." },
      { heading: "Ders Programı ve Saatler", text: "Beykent grup dersleri programımız hafta içi sabah 07:00'den akşam 21:00'e, hafta sonu ise 09:00'dan 19:00'a kadar farklı saatlerde düzenlenmektedir. Esnek saat seçenekleriyle çalışma hayatınıza uygun ders saatlerini kolayca bulabilirsiniz." },
      { text: "Beykent'te grup dersleri ile formda kalmak istiyorsanız, Swiss Fit Club'ın profesyonel eğitmen kadrosu ve geniş ders programıyla tanışın. Ücretsiz deneme dersimize katılarak farkı yaşayın." }
    ]
  },
  "beylikduzu-personal-trainer": {
    title: "Beylikdüzü'nde Personal Trainer Desteğinin Avantajları",
    seoTitle: "Beylikdüzü Personal Trainer | Kişisel Antrenör Desteği 2024",
    metaDesc: "Beylikdüzü'nde personal trainer desteği ile fitness hedeflerinize ulaşın. Profesyonel kişisel antrenör rehberi.",
    image: heroContact, date: "25 Şubat 2024", category: "Sağlık", readTime: "6 dk",
    tags: ["Beylikdüzü personal trainer", "kişisel antrenör", "Beylikdüzü fitness"],
    relatedSlugs: ["beylikduzu-spor-salonu", "beylikduzu-fitness-salonu", "beylikduzu-kilo-verme"],
    sections: [
      { text: "Beylikdüzü'nde personal trainer desteği almak, fitness hedeflerinize en hızlı şekilde ulaşmanın yollarından biridir. Kişisel antrenör, size özel bir program hazırlayarak her antrenmanınızı maksimum verimle geçirmenizi sağlar." },
      { heading: "Personal Trainer ile Çalışmanın Avantajları", text: "Beylikdüzü'de personal trainer desteği almanın birçok avantajı vardır. İlk olarak, kişisel antrenörünüz vücut analizinizi yaparak mevcut durumunuzu değerlendirir. Ardından hedeflerinize yönelik kişiye özel bir antrenman ve beslenme programı oluşturur. Her seansta doğru form ve teknik kontrolü sağlanır." },
      { heading: "Swiss Fit Club Personal Trainer Kadrosu", text: "Swiss Fit Club'daki sertifikalı personal trainerlarımız, uluslararası geçerliliğe sahip fitness eğitmenliği sertifikalarına sahiptir. Beylikdüzü personal trainer hizmetimizde her eğitmen, kendi uzmanlık alanına göre üyelerimize yönlendirilmektedir." },
      { heading: "Kişisel Antrenör ile Sonuç Odaklı Çalışma", text: "Doğru form ve teknik, sakatlanma riskini azaltır ve sonuçları hızlandırır. Beylikdüzü'nde personal trainer desteği ile her hareketi doğru teknikle yapmanız güvence altına alınır. Düzenli vücut analizi takibi ile ilerlemeniz ölçülebilir şekilde izlenir." },
      { heading: "Kimler İçin Uygundur?", text: "Personal trainer desteği, spora yeni başlayanlardan ileri seviye sporculara kadar herkes için faydalıdır. Özellikle belirli bir hedefe ulaşmak isteyenler, yaralanma sonrası spora dönüş yapanlar ve motivasyon desteğine ihtiyaç duyanlar için Beylikdüzü personal trainer hizmeti büyük avantaj sağlar." },
      { text: "Beylikdüzü'nde profesyonel personal trainer desteği için Swiss Fit Club'ı ziyaret edin. Sertifikalı eğitmenlerimizle ücretsiz değerlendirme seansınızı hemen ayırtın." }
    ]
  },
  "beykent-paradise-avm-spor": {
    title: "Beykent Paradise AVM Yakınında Premium Spor Salonu Deneyimi",
    seoTitle: "Beykent Paradise AVM Spor Salonu | Swiss Fit Club Premium",
    metaDesc: "Beykent Paradise AVM'deki premium spor salonu Swiss Fit Club'ı keşfedin. Modern ekipman ve profesyonel kadro.",
    image: heroClub, date: "20 Şubat 2024", category: "Deneyim", readTime: "4 dk",
    tags: ["Beykent Paradise AVM", "Beykent spor salonu", "premium fitness"],
    relatedSlugs: ["beykent-spor-salonu", "beykent-grup-dersleri", "beylikduzu-spor-salonu"],
    sections: [
      { text: "Beykent Paradise AVM, Beylikdüzü'nün en popüler alışveriş merkezlerinden biridir. Swiss Fit Club olarak bu prestijli lokasyonda premium bir fitness deneyimi sunuyoruz. AVM içindeki konumumuz, spor ve günlük yaşamınızı tek bir noktada birleştirmenize olanak sağlar." },
      { heading: "AVM İçinde Premium Fitness Deneyimi", text: "AVM içindeki konumumuz, üyelerimize spor öncesi ve sonrası alışveriş, yemek ve sosyal aktivite imkanı sunmaktadır. Bu da Beykent spor salonuna gelmeyi sadece bir antrenman değil, keyifli bir yaşam tarzına dönüştürür. Ücretsiz otopark, kolay ulaşım ve güvenli ortam avantajlarıyla antrenmanlarınıza sorunsuz devam edebilirsiniz." },
      { heading: "Swiss Fit Club Beykent Şubesi Özellikleri", text: "Modern ekipmanlarımız, geniş antrenman alanlarımız, profesyonel eğitmen kadromuz ve hijyenik tesislerimizle Beykent Paradise AVM'de premium bir fitness merkezi olmayı sürdürüyoruz. 2500 m²'lik alanımızda kardiyo, ağırlık, fonksiyonel antrenman ve grup dersleri alanları bulunmaktadır." },
      { text: "Beykent Paradise AVM'de premium spor salonu deneyimi için Swiss Fit Club'ı ziyaret edin. Ücretsiz deneme dersimize katılarak farkı yaşayın." }
    ]
  },
  "beylikduzu-kilo-verme": {
    title: "Beylikdüzü'de Spor Salonu ile Sağlıklı Kilo Verme Rehberi",
    seoTitle: "Beylikdüzü Kilo Verme | Spor Salonu ile Sağlıklı Zayıflama",
    metaDesc: "Beylikdüzü'de spor salonu ile sağlıklı kilo vermenin yolları. Egzersiz programı ve beslenme ipuçları.",
    image: heroHome, date: "15 Şubat 2024", category: "Sağlık", readTime: "6 dk",
    tags: ["Beylikdüzü kilo verme", "sağlıklı zayıflama", "fitness programı"],
    relatedSlugs: ["beylikduzu-personal-trainer", "beylikduzu-fitness-salonu", "beylikduzu-beslenme-danismanligi"],
    sections: [
      { text: "Sağlıklı kilo vermek, doğru egzersiz programı ve dengeli beslenmenin birleşimiyle mümkündür. Beylikdüzü'de spor salonu desteğiyle kilo verme hedeflerinize ulaşmak için Swiss Fit Club'ın sunduğu kapsamlı hizmetlerden yararlanabilirsiniz." },
      { heading: "Kilo Vermek İçin Doğru Antrenman Programı", text: "Kilo vermek için kardiyo egzersizleri, ağırlık antrenmanı ve HIIT (Yüksek Yoğunluklu Interval Antrenman) kombinasyonu en etkili yöntemdir. Beylikdüzü fitness salonu olarak Swiss Fit Club, bu antrenman türlerinin tamamını profesyonel eğitmen desteğiyle sunmaktadır." },
      { heading: "Beslenme Danışmanlığının Önemi", text: "Spor kadar beslenme de kilo vermede kritik bir rol oynar. Swiss Fit Club'da sunduğumuz beslenme danışmanlığı hizmetiyle, kişiye özel beslenme planları hazırlıyoruz. Beylikdüzü'de kilo vermek isteyenler için profesyonel diyet desteği sunuyoruz." },
      { heading: "Grup Dersleri ile Kilo Verme", text: "HIIT, Spinning ve Zumba gibi yüksek kalori yakan grup derslerimiz, kilo verme sürecinizi hızlandırır. Beykent'te grup dersleri ile hem sosyal bir ortamda spor yapabilir hem de etkili şekilde kalori yakabilirsiniz." },
      { text: "Beylikdüzü'de sağlıklı kilo verme hedefleriniz için Swiss Fit Club'ın profesyonel desteğinden yararlanın. Ücretsiz vücut analizi ve deneme dersinizi hemen ayırtın." }
    ]
  },
  "beykent-fonksiyonel-antrenman": {
    title: "Beykent'te Fonksiyonel Antrenman: Nedir, Nasıl Yapılır?",
    seoTitle: "Beykent Fonksiyonel Antrenman | Doğru Teknik ve Faydaları",
    metaDesc: "Fonksiyonel antrenmanın faydaları ve doğru teknikleri. Beykent fitness merkezinde profesyonel destekle antrenman.",
    image: heroClub, date: "10 Şubat 2024", category: "Eğitim", readTime: "5 dk",
    tags: ["fonksiyonel antrenman", "Beykent fitness", "functional training"],
    relatedSlugs: ["beykent-grup-dersleri", "beykent-spor-salonu", "beylikduzu-personal-trainer"],
    sections: [
      { text: "Fonksiyonel antrenman, günlük hayattaki hareketleri taklit eden ve tüm vücut kaslarını koordineli çalıştıran bir antrenman yöntemidir. Beykent fitness merkezi Swiss Fit Club'da profesyonel eğitmenler eşliğinde fonksiyonel antrenman yapabilirsiniz." },
      { heading: "Fonksiyonel Antrenman Nedir?", text: "Fonksiyonel antrenman, squat, deadlift, push-up, pull-up, lunge ve plank gibi çok eklemli hareketleri içerir. Bu hareketler, günlük yaşamda kullandığımız kas gruplarını güçlendirir. Beykent'te fonksiyonel antrenman arayanlar için Swiss Fit Club özel bir antrenman alanı sunmaktadır." },
      { heading: "Fonksiyonel Antrenmanın Faydaları", text: "Fonksiyonel antrenman, kas gücü, dayanıklılık, denge, koordinasyon ve esnekliği aynı anda geliştirir. Yaralanma riskini azaltır ve günlük aktivitelerde performansınızı artırır. Beykent fitness merkezinde fonksiyonel antrenman ile tüm vücudunuzu çalıştırabilirsiniz." },
      { heading: "Swiss Fit Club'da Fonksiyonel Antrenman", text: "Swiss Fit Club'ın fonksiyonel antrenman alanı, kettlebell, battle rope, TRX, medicine ball ve plyometric box gibi ekipmanlarla donatılmıştır. Profesyonel eğitmenlerimiz eşliğinde güvenli ve etkili fonksiyonel antrenman yapabilirsiniz." },
      { text: "Beykent'te fonksiyonel antrenman deneyimi için Swiss Fit Club'ı ziyaret edin. Ücretsiz deneme seansınızı hemen ayırtın." }
    ]
  },
  "beylikduzu-beslenme-danismanligi": {
    title: "Beylikdüzü Fitness Salonu Beslenme Danışmanlığı Hizmetleri",
    seoTitle: "Beylikdüzü Beslenme Danışmanlığı | Fitness & Diyet Desteği",
    metaDesc: "Beylikdüzü'de fitness ve beslenme danışmanlığı hizmeti. Kişiye özel diyet programları ve sağlıklı yaşam.",
    image: heroServices, date: "5 Şubat 2024", category: "Beslenme", readTime: "5 dk",
    tags: ["beslenme danışmanlığı", "Beylikdüzü diyet", "fitness beslenme"],
    relatedSlugs: ["beylikduzu-kilo-verme", "beylikduzu-personal-trainer", "beylikduzu-fitness-salonu"],
    sections: [
      { text: "Spor ve beslenme, sağlıklı bir yaşamın iki temel direğidir. Beylikdüzü fitness salonu Swiss Fit Club'da sunduğumuz beslenme danışmanlığı hizmeti ile antrenmanlarınızı doğru beslenme ile destekleyebilirsiniz." },
      { heading: "Kişiye Özel Beslenme Planları", text: "Swiss Fit Club'da uzman diyetisyenlerimiz, vücut analizi sonuçlarınıza ve fitness hedeflerinize göre kişiye özel beslenme planları hazırlamaktadır. Beylikdüzü'de beslenme danışmanlığı ile kas yapma, kilo verme veya genel sağlık hedeflerinize uygun programlar oluşturulur." },
      { heading: "Spor ve Beslenme Entegrasyonu", text: "Doğru beslenme, antrenman performansınızı artırır ve toparlanma sürenizi kısaltır. Beylikdüzü fitness salonu olarak Swiss Fit Club, personal trainer ve beslenme danışmanlığı hizmetlerini entegre bir şekilde sunarak en etkili sonuçları almanızı sağlar." },
      { heading: "Düzenli Takip ve Değerlendirme", text: "Beslenme programınız düzenli aralıklarla değerlendirilir ve ilerlemenize göre güncellenir. Vücut analizi ölçümleri ile kas-yağ oranınızdaki değişimler takip edilir." },
      { text: "Beylikdüzü'de profesyonel beslenme danışmanlığı için Swiss Fit Club'ı ziyaret edin. Sağlıklı yaşam yolculuğunuzda yanınızdayız." }
    ]
  }
};

const allSlugs = Object.keys(blogData);

const BlogDetail = () => {
  const { slug } = useParams();
  const post = slug ? blogData[slug] : null;

  if (!post) {
    return (
      <Layout>
        <div className="container py-40 text-center">
          <h1 className="font-heading text-4xl font-bold mb-4">Yazı Bulunamadı</h1>
          <Link to="/blog"><Button variant="cta">Blog'a Dön</Button></Link>
        </div>
      </Layout>
    );
  }

  const currentIndex = slug ? allSlugs.indexOf(slug) : -1;
  const prevSlug = currentIndex > 0 ? allSlugs[currentIndex - 1] : null;
  const nextSlug = currentIndex < allSlugs.length - 1 ? allSlugs[currentIndex + 1] : null;

  return (
    <Layout>
      <section className="relative h-[40vh] md:h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${post.image})` }} />
        <div className="absolute inset-0 hero-overlay" />
        <div className="container relative z-10 pb-12">
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-medium">{post.category}</span>
          <h1 className="font-heading text-3xl md:text-5xl font-bold uppercase mt-3 max-w-3xl">{post.title}</h1>
          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
            <span>·</span>
            <span>{post.readTime} okuma</span>
          </div>
        </div>
      </section>

      <article className="py-16 md:py-24">
        <div className="container max-w-3xl">
          {post.sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              {section.heading && (
                <h2 className="font-heading text-xl md:text-2xl font-bold mt-10 mb-4">{section.heading}</h2>
              )}
              <p className="text-muted-foreground leading-relaxed mb-6 text-base">{section.text}</p>
            </motion.div>
          ))}

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 mt-10 pt-8 border-t border-border">
            <Tag size={14} className="text-primary" />
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs bg-surface text-muted-foreground px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-8 border-t border-border">
            {prevSlug ? (
              <Link to={`/blog/${prevSlug}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft size={16} /> Önceki Yazı
              </Link>
            ) : <div />}
            {nextSlug ? (
              <Link to={`/blog/${nextSlug}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                Sonraki Yazı <ArrowRight size={16} />
              </Link>
            ) : <div />}
          </div>

          {/* Related */}
          {post.relatedSlugs.length > 0 && (
            <div className="mt-16">
              <h3 className="font-heading text-xl font-bold mb-6">İlgili Yazılar</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {post.relatedSlugs.map((rs) => {
                  const related = blogData[rs];
                  if (!related) return null;
                  return (
                    <Link key={rs} to={`/blog/${rs}`} className="bg-card border border-border rounded-lg p-4 hover:border-primary/30 transition-all group">
                      <span className="text-xs text-primary font-medium">{related.category}</span>
                      <h4 className="font-heading text-sm font-semibold mt-1 group-hover:text-primary transition-colors line-clamp-2">{related.title}</h4>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-border">
            <Link to="/blog"><Button variant="outline"><ArrowLeft size={14} className="mr-2" /> Tüm Blog Yazıları</Button></Link>
          </div>
        </div>
      </article>

      {/* CTA */}
      <section className="py-16 bg-surface text-center">
        <div className="container">
          <h2 className="font-heading text-2xl md:text-3xl font-bold uppercase mb-4">Ücretsiz Deneme Dersi</h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-6">Beylikdüzü'nün premium fitness deneyimi Swiss Fit Club'da ücretsiz deneme dersine katılın.</p>
          <Link to="/iletisim"><Button variant="cta">Hemen Başvur</Button></Link>
        </div>
      </section>
    </Layout>
  );
};

export default BlogDetail;
