import React from 'react';
import { ShieldCheck, BookOpen, Heart, Globe, Award, Sparkles } from 'lucide-react';

export default function AboutView() {
  const values = [
    {
      icon: <ShieldCheck className="h-6 w-6 text-emerald-700" />,
      title: 'Güvenilirlik & Sahihiyet',
      desc: 'Tüm eğitim içeriklerimiz Kur\'an-ı Kerim sünneti çizgisine bağlı, muteber kaynaklar süzgecinden geçmiş ve akademik denetime tabidir.'
    },
    {
      icon: <Award className="h-6 w-6 text-emerald-700" />,
      title: 'Ehliyet & Liyakat',
      desc: 'Kürsülerimizde ders veren eğitmenlerimiz İslami ilimlerde derinleşmiş akademik unvana sahip veya icazetli seçkin hocalardır.'
    },
    {
      icon: <Heart className="h-6 w-6 text-emerald-700" />,
      title: 'Kolaylık & Esneklik',
      desc: 'Öğrenimi kolaylaştırma (Yessirû velâ tuassirû) hadisini düstur edinerek, her yaş grubuna ve yoğun çalışma programlarına uygun esnek modüller sunuyoruz.'
    },
    {
      icon: <Globe className="h-6 w-6 text-emerald-700" />,
      title: 'Küresel Erişim',
      desc: 'İnternetin ulaştığı her coğrafyadan öğrencilerimize kapılarımızı açıyor, ilim meclislerini dijital köprülerle evlerinize getiriyoruz.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20 text-left" id="about-view">
      
      {/* Page Header */}
      <div className="border-b border-stone-200 pb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 font-mono">BİZ KİMİZ?</span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-1.5">
          Hakkımızda
        </h1>
        <p className="text-stone-500 text-sm sm:text-base mt-2 max-w-2xl font-light">
          Al-Hikmah Ed, köklü İslami ilimler geleneğimizi çağın imkanlarıyla birleştiren lider uzaktan eğitim akademisidir.
        </p>
      </div>

      {/* Main Story & Image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Gelenekten Geleceğe Uzanan Bir İlim Köprüsü
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed font-light">
            Al-Hikmah Ed Platformu, İslami ilimlerin doğru, tahrif edilmemiş ve güvenilir kaynaklardan öğrenilmesinin her müslümanın hakkı olduğu inancıyla kurulmuştur. Günümüz dünyasındaki yoğun yaşam koşulları ve coğrafi engeller, klasik ilim meclislerine katılmayı zorlaştırırken, biz bu meclisleri ve yetkin hocalarımızı ekranlarınıza taşıyoruz.
          </p>
          <p className="text-stone-600 text-sm leading-relaxed font-light">
            Kur'an-ı Kerim tilavetinin inceliklerinden, derin fıkhi tahlillere; Arapça dil bilgisinin yapı taşlarından, İslam medeniyetinin tarihsel serüvenine kadar zengin bir eğitim yelpazesi sunuyoruz. Yapay zeka akademik asistanımız gibi modern teknolojik araçlarla öğrencilerimizin öğrenme deneyimini kişiselleştiriyor ve her an yanlarında olmaya gayret gösteriyoruz.
          </p>
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start space-x-3">
            <Sparkles className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" />
            <p className="text-emerald-950 text-xs leading-relaxed font-semibold italic">
              "İlim aramak üzere yola çıkan kimse, dönünceye kadar Allah yolundadır." — Hadis-i Şerif
            </p>
          </div>
        </div>

        {/* Visual card */}
        <div className="lg:col-span-5 relative">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-600 to-amber-500 rounded-2xl blur opacity-25"></div>
          <div className="relative bg-white p-4 rounded-2xl border border-stone-200 shadow-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=600"
              alt="Hakkımızda Görseli"
              className="w-full h-80 object-cover rounded-xl opacity-90"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      {/* Vision & Mission Bento */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-stone-50 border border-stone-200/80 p-8 rounded-2xl space-y-4">
          <span className="text-3xl">🎯</span>
          <h3 className="font-display text-xl font-bold text-stone-900 tracking-tight">Misyonumuz</h3>
          <p className="text-stone-600 text-sm leading-relaxed font-light">
            İslami ilimleri ve Kur'an lisanı Arapça'yı; aşırılıktan ve hurafelerden uzak, sahih ve bilimsel usullerle her yaştan, her kesimden insana sevdirmek. Öğrencilerimizin zihni ve manevi gelişimini destekleyerek, dinlerini bilinçli ve doğru bir biçimde yaşamalarına ve aktarmalarına katkı sunmak.
          </p>
        </div>
        
        <div className="bg-emerald-50/50 border border-emerald-100 p-8 rounded-2xl space-y-4">
          <span className="text-3xl">🔭</span>
          <h3 className="font-display text-xl font-bold text-emerald-900 tracking-tight">Vizyonumuz</h3>
          <p className="text-stone-600 text-sm leading-relaxed font-light">
            İslam eğitim teknolojileri alanında küresel düzeyde referans kabul edilen, geleneksel ilim disiplinini dijital çağın pedagojik standartlarıyla en üst düzeyde buluşturan, milyonlarca müslümanın gönül rahatlığıyla ilim tahsil ettiği öncü ve prestijli bir dünya markası olmak.
          </p>
        </div>
      </div>

      {/* Values section */}
      <div className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 font-mono">BİZİ BİZ YAPAN İLKELER</span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Temel Değerlerimiz
          </h2>
          <p className="text-stone-600 text-sm">
            Tüm eğitim tasarım süreçlerimizde ve öğrenci ilişkilerimizde ödün vermediğimiz mihenk taşlarımız.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm space-y-4 flex flex-col hover:shadow-md transition-shadow"
              id={`about-value-${idx}`}
            >
              <div className="bg-emerald-50 p-3 rounded-xl w-fit">
                {v.icon}
              </div>
              <h4 className="font-display font-bold text-base text-stone-900">{v.title}</h4>
              <p className="text-stone-500 text-xs leading-relaxed font-light">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
