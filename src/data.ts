import { Instructor, Course, CanliDers, Testimonial } from './types';

export const INSTRUCTORS: Instructor[] = [
  {
    id: 'inst-1',
    name: 'Dr. Ömer Faruk',
    role: 'Tefsir ve İslami İlimler Kürsüsü Başkanı',
    bio: 'Marmara Üniversitesi İlahiyat Fakültesi mezunudur. Tefsir ve Hadis usulü alanında 15 yılı aşkın süredir akademik çalışmalar yürüten ve binlerce öğrenci yetiştiren Dr. Ömer Faruk, geleneksel ilimleri modern öğretim metodolojileriyle harmanlamaktadır.',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=300&auto=format&fit=crop',
    coursesCount: 4,
    rating: 4.9,
    reviewsCount: 342,
    expertise: ['Tefsir', 'Hadis Usulü', 'Fıkıh Tarihi']
  },
  {
    id: 'inst-2',
    name: 'Doç. Dr. Ayşe Yılmaz',
    role: 'Arap Dili ve Edebiyatı Kıdemli Öğretim Üyesi',
    bio: 'Kahire Üniversitesi Arap Dili Edebiyatı bölümünde doktorasını tamamlamıştır. Klasik Arapça (Fusha) dil bilgisi, Nahiv, Sarf ve Belağat konularında geliştirdiği özgün eğitim materyalleriyle tanınır.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop',
    coursesCount: 3,
    rating: 4.8,
    reviewsCount: 218,
    expertise: ['Klasik Arapça', 'Belağat', 'Nahiv ve Sarf']
  },
  {
    id: 'inst-3',
    name: 'Hafız Ahmet Kaya',
    role: 'Kıraat ve Tecvid Baş Eğitmeni',
    bio: 'Ezher Kıraat Enstitüsü mezunu ve icazetli kâri olan Ahmet Kaya, Kur\'an tilaveti, tecvid kuralları ve mahreç eğitimi konusunda yıllardır hem ulusal hem uluslararası mecralarda dersler vermektedir.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
    coursesCount: 2,
    rating: 5.0,
    reviewsCount: 512,
    expertise: ['Tecvid İlmi', 'Aşere Takrib', 'Kur\'an Ezber Teknikleri']
  },
  {
    id: 'inst-4',
    name: 'Dr. Yasir Doğan',
    role: 'İslam Tarihi ve Medeniyeti Uzmanı',
    bio: 'İslam Medeniyeti, Asr-ı Saadet dönemi ve Endülüs tarihi üzerine derinlemesine araştırmaları olan Dr. Yasir Doğan, platformumuzda tarih derslerini interaktif harita ve görsellerle zenginleştirerek anlatmaktadır.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop',
    coursesCount: 3,
    rating: 4.7,
    reviewsCount: 164,
    expertise: ['Siyer-i Nebi', 'İslam Medeniyet Tarihi', 'Endülüs Tarihi']
  }
];

export const COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'Kur\'an-ı Kerim Eğitimi: Tecvid ve Mahreç Sanatı',
    description: 'Kur\'an-ı Kerim\'i kurallarına uygun, doğru telaffuzla ve makamıyla okumayı öğrenin. Harflerin çıkış yerleri ve tecvid kuralları pratik uygulamalarla anlatılmaktadır.',
    longDescription: 'Bu kapsamlı eğitim programı, Kur\'an-ı Kerim tilavetini güzelleştirmek isteyen her seviyeden öğrenciye hitap etmektedir. Hafız Ahmet Kaya\'nın rehberliğinde harflerin doğru çıkış noktalarını (mahreçleri) kavrayacak, tecvid kurallarını hem teorik hem de bol pratik egzersizlerle öğreneceksiniz. Derslerde her öğrenciye özel geri bildirim verilerek telaffuz hataları adım adım düzeltilmektedir.',
    instructorId: 'inst-3',
    category: 'quran',
    duration: '12 Hafta (36 Saat)',
    level: 'Baslangic',
    lessonsCount: 24,
    rating: 5.0,
    reviewsCount: 284,
    price: 450,
    image: '/src/assets/images/regenerated_image_1784224907334.png',
    benefits: [
      'Harflerin mahreçlerini sıfırdan kusursuz şekilde öğreneceksiniz.',
      'Temel ve ileri düzey tecvid kurallarını (idgam, ihfa, izhar vb.) kavrayacaksınız.',
      'Kısa sureleri kurallarına uygun ezberleme tekniği kazanacaksınız.',
      'Ders içi pratiklerle tilavetinize akıcılık ve ahenk katacaksınız.',
      'Eğitmen ile doğrudan soru-cevap ve telaffuz kontrolü imkanına sahip olacaksınız.'
    ],
    audience: [
      'Kur\'an-ı Kerim tilavetini sıfırdan düzeltmek isteyenler.',
      'Tecvid kuralları hakkında derinleşmek isteyen kâriler.',
      'Harflerin telaffuzunda (mahreçlerinde) zorluk çeken her yaş grubundan öğrenci.'
    ],
    isLive: true,
    upcomingLiveDate: 'Her Cumartesi 14:00',
    syllabus: [
      { week: 1, title: 'Giriş ve Harflerin Mahreçleri (1)', topics: ['Harflerin çıkış yerleri', 'Boğaz ve dil harfleri', 'Kalın ve ince ses tonlaması'] },
      { week: 2, title: 'Harflerin Mahreçleri (2)', topics: ['Dudak harfleri', 'Geniz (Gurre) harfleri', 'Uygulamalı mahreç pratikleri'] },
      { week: 3, title: 'Sakin Nun ve Tenvin Kuralları', topics: ['İzhar kuralı ve örnekler', 'İhfa kuralı ve gizleme dereceleri', 'Uygulamalı ayet okumaları'] },
      { week: 4, title: 'İdgam Kuralları', topics: ['İdgam-ı Maal Gunne', 'İdgam-ı Bila Gunne', 'İdgam-ı Misleyn uygulamaları'] },
      { week: 5, title: 'Lâm-ı Tarif ve Sakin Mim Halleri', topics: ['İzhar-ı Kameriyye', 'İdgam-ı Şemsiyye', 'Sakin Mim kuralı'] },
      { week: 6, title: 'Med (Uzatma) Kuralları - Temel', topics: ['Asli Harf-i Medler', 'Sebeb-i Med kavramı', 'Medd-i Muttasıl ve Medd-i Munfasıl'] },
      { week: 7, title: 'Med Kuralları - İleri Seviye', topics: ['Medd-i Lazım', 'Medd-i Arız ve Medd-i Lin', 'Uzatma sürelerinin dengelenmesi'] },
      { week: 8, title: 'Râ Harfinin Hükümleri ve Kalkale', topics: ['Râ harfinin kalın ve ince okunduğu yerler', 'Kalkale harfleri ve uygulanışı'] },
      { week: 9, title: 'Vakıf (Duruş) ve İbtida Kuralları', topics: ['Ayet ortasında durma işaretleri', 'Durduktan sonra başlama kuralları', 'Secavendler'] },
      { week: 10, title: 'Hükmü Lafzatullah ve Zamir', topics: ['Allah lafzının kalın/ince okunuşu', 'Zamir olan He harfinin uzatılma şartları'] },
      { week: 11, title: 'Uygulamalı Amme Cüzü Okumaları', topics: ['Fatiha Suresi detaylı tahlili', 'Nâs, Felak, İhlas ve tecvid analizleri'] },
      { week: 12, title: 'Genel Değerlendirme ve İcazet Takdimi', topics: ['Baştan sona tilavet sınavı', 'Bireysel geri bildirimler', 'Kapanış duaları'] }
    ],
    videos: [
      { id: 'l-1', title: 'Derse Giriş & Mahreç Bilgisi', duration: '45:12', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { id: 'l-2', title: 'Boğaz Harflerinin Çıkış Yerleri', duration: '38:40', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { id: 'l-3', title: 'Dil Harfleri ve Uygulamalar', duration: '52:10', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { id: 'l-4', title: 'Dudak Harflerinin Pratik Eğitimi', duration: '41:15', url: 'https://www.w3schools.com/html/mov_bbb.mp4' }
    ]
  },
  {
    id: 'course-2',
    title: 'Sıfırdan Klasik Arapça: Nahiv ve Sarf Bilgisi',
    description: 'Kur\'an lisanını anlamak için ilk adımı atın. Sarf (kelime bilgisi) ve Nahiv (cümle bilgisi) konularını en basit ve anlaşılır haliyle sıfırdan öğrenin.',
    longDescription: 'Arapça, İslami ilimlerin anahtarıdır. Doç. Dr. Ayşe Yılmaz\'ın hazırladığı bu program, hiç Arapça bilmeyen veya temel kurallarda zorlanan öğrencilere yöneliktir. Sarf ilmi ile kelimelerin nasıl türetildiğini öğrenecek, Nahiv ilmi ile kelimelerin cümle içindeki rollerini ve harekeleme mantığını çözeceksiniz. Kapsamlı ödevler ve metin tahlilleriyle teorik bilgileri pratiğe döküyoruz.',
    instructorId: 'inst-2',
    category: 'arabic',
    duration: '16 Hafta (48 Saat)',
    level: 'Baslangic',
    lessonsCount: 32,
    rating: 4.8,
    reviewsCount: 198,
    price: 520,
    image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=600&auto=format&fit=crop',
    benefits: [
      'Arapça harfleri ve kelime türlerini ayırt edebileceksiniz.',
      'Sülasi fiil çekimlerini ve bablarını ezbere öğreneceksiniz.',
      'Temel isim ve fiil cümlelerini kurabilecek ve tahlil edebileceksiniz.',
      'Kur\'an-ı Kerim\'den seçme basit ayetleri kendi başınıza tercüme edebileceksiniz.',
      'Geniş bir kelime haznesi ve cümle tahlil (İrab) yeteneği kazanacaksınız.'
    ],
    audience: [
      'Hiç Arapça bilmeyen ve akademik olarak başlamak isteyenler.',
      'İlahiyat veya İslami ilimler öğrencileri olup derslerinde destek arayanlar.',
      'Kur\'an-ı Kerim ayetlerini doğrudan kendi dilinden okuyup anlamayı hedefleyenler.'
    ],
    isLive: true,
    upcomingLiveDate: 'Her Pazar 11:00',
    syllabus: [
      { week: 1, title: 'Arapça Kelime Yapısı ve Çeşitleri', topics: ['İsim, Fiil ve Harf kavramı', 'Marife ve Nekre farkı', 'Müzekker ve Müennes'] },
      { week: 2, title: 'İsim Tamlamaları ve Sıfat Tamlaması', topics: ['Muzaf ve Muzafun İleyh kuralları', 'Sıfat ve Mevsuf uyumu'] },
      { week: 3, title: 'Sarf Giriş: Fiil Çekimleri (Mazi)', topics: ['Mazi fiil çekim tablosu', 'Şahıs zamirleri ile mazi fiil uyumu'] },
      { week: 4, title: 'Muzari Fiil Çekimi ve Emir', topics: ['Muzari fiilin çekimi', 'Emr-i Hazır ve Nehy-i Hazır türetimi'] },
      { week: 5, title: 'Nahiv Giriş: Cümle Türleri (İsim Cümlesi)', topics: ['Mübteda ve Haber kuralları', 'İsim cümlesinde irab alametleri'] },
      { week: 6, title: 'Fiil Cümlesi ve Unsurları', topics: ['Fiil, Fail ve Mef\'ul dengesi', 'Failin açık isim veya gizli zamir olması'] },
      { week: 7, title: 'Harf-i Cerler ve Mecrur İsimler', topics: ['En yaygın Harf-i cerler (Bi, Fi, Min, Li, Ala)', 'Cer alametleri'] },
      { week: 8, title: 'Mansubât Grubu (Mef\'ulün Bihi)', topics: ['Fiil cümlesinde nesne bulma', 'Zahir ve muttasıl zamir mef\'uller'] },
      { week: 9, title: 'Sülasi Mücerred Babları', topics: ['Mazi ve Muzari vezin uyumları', '6 temel sülasi babı'] },
      { week: 10, title: 'Mezidün Fîh Masdarlar (İfal, Tefil, Müfaale)', topics: ['Türetilmiş fiil kalıpları', 'Mana katma özellikleri'] },
      { week: 11, title: 'İnne ve Kardeşleri - Kâne ve Kardeşleri', topics: ['İsim cümlesine gelen amiller', 'İsim ve haber üzerindeki etkiler'] },
      { week: 12, title: 'Uygulamalı Kısa Sure ve Hadis İrabı', topics: ['Fatiha Suresinin nahiv analizi', 'Seçme hadislerin tercüme ve irabı'] }
    ],
    videos: [
      { id: 'la-1', title: 'Kelime Türlerine Giriş', duration: '50:10', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { id: 'la-2', title: 'Müzekkerlik ve Müenneslik Kuralları', duration: '44:20', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { id: 'la-3', title: 'Mazi Fiil Çekim Yapısı', duration: '58:05', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { id: 'la-4', title: 'İsim Cümlesi Kurulum Esasları', duration: '47:30', url: 'https://www.w3schools.com/html/mov_bbb.mp4' }
    ]
  },
  {
    id: 'course-3',
    title: 'Hadis Usulü ve Seçme Hadis Okumaları',
    description: 'Peygamber Efendimiz (s.a.v.)\'in sünnetini koruyan muazzam sistem: Hadislerin geliş yolları, ravi kriterleri ve Riyazu\'s Salihin\'den ahlak hadisleri okumaları.',
    longDescription: 'Hadis ilmi, dinimizin ikinci asıl kaynağını anlama yöntemidir. Dr. Ömer Faruk\'un eşsiz anlatımıyla hadislerin günümüze nasıl ulaştığını, Sahih, Hasan ve Zayıf hadis ayrımının arkasındaki akıl almaz ilmî disiplini keşfedeceksiniz. Kursun ikinci kısmında ise bireysel ve toplumsal ahlakımızı imar edecek seçkin hadis-i şerifleri şerh edeceğiz.',
    instructorId: 'inst-1',
    category: 'islamic-sciences',
    duration: '8 Hafta (24 Saat)',
    level: 'Orta',
    lessonsCount: 16,
    rating: 4.9,
    reviewsCount: 142,
    price: 380,
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=600&auto=format&fit=crop',
    benefits: [
      'Hadis usulünün temel kavramlarını (Sened, Metin, Ravi, Rical) öğreneceksiniz.',
      'Hadis uydurma faaliyetlerine karşı müslüman alimlerin kurduğu tenkit süzgecini kavrayacaksınız.',
      'Kütüb-i Sitte müelliflerini ve eserlerinin özelliklerini tanıyacaksınız.',
      'Gündelik hayata dair en mühim ahlak ve amel hadislerini şerhleriyle kavrayacaksınız.',
      'Hadis inkarcılığı veya aşırı yorumlara karşı akademik duruş ve bilgi edineceksiniz.'
    ],
    audience: [
      'Peygamberimizin sünnetine ve hadislere ilgi duyan her müslüman.',
      'Hadislerin sıhhati ve korunma süreci hakkında bilimsel metotları merak edenler.',
      'Riyazu\'s Salihin gibi temel kaynaklardan düzenli hadis dersi takip etmek isteyenler.'
    ],
    isLive: false,
    syllabus: [
      { week: 1, title: 'Hadis Usulüne Giriş ve Sünnetin Değeri', topics: ['Hadis ve Sünnet ayrımı', 'Hadislerin yazılması ve ezberlenmesi', 'Sünnetin dindeki teşri değeri'] },
      { week: 2, title: 'Hadislerin Unsurları: Sened ve Metin', topics: ['Ravi zinciri (Sened)', 'Metin tenkidi esasları', 'Hadis ilminde Rical (Ravi inceleme) müessesesi'] },
      { week: 3, title: 'Kabul Yönünden Hadis Türleri', topics: ['Sahih hadis şartları', 'Hasan hadis', 'Zayıf hadis ve zayıflık nedenleri'] },
      { week: 4, title: 'Mevzu (Uydurma) Hadisler ve Korunma Çabaları', topics: ['Neden hadis uyduruldu?', 'Mevzu hadislerin tespit yöntemleri', 'Uydurma hadis literatürü'] },
      { week: 5, title: 'Klasik Hadis Kaynakları (Kütüb-i Sitte)', topics: ['Buhari ve Müslim Sahihleri', 'Dört Sünen (Ebu Davud, Tirmizi, Nesai, İbn Mace)', 'Müsnedler ve Muvattalar'] },
      { week: 6, title: 'Seçme Ahlak Hadisleri Şerhi (1)', topics: ['Niyet hadisi (Ameller niyetlere göredir)', 'Doğruluk ve Sıdk hadisleri', 'Güzel ahlak hadisi'] },
      { week: 7, title: 'Seçme Amel Hadisleri Şerhi (2)', topics: ['Kardeşlik ve gıybet hadisleri', 'Ana-baba hakkı ve sıla-i rahim', 'Yetim ve yoksullarla ilişkiler'] },
      { week: 8, title: 'Hadis İnceleme Metodolojisi Sınavı', topics: ['Öğrenci sunumları', 'Metin analizi değerlendirmesi', 'Hadis Okuma İcazet Töreni'] }
    ]
  },
  {
    id: 'course-4',
    title: 'İslam Tarihi: Asr-ı Saadet ve Hülafa-i Raşidin',
    description: 'Cahiliye karanlığından saadet asrına giden kutlu yolculuk. Peygamberimizin hayatı, hicret, savaşlar, devlet yapısı ve Dört Halife döneminin sosyopolitik tahlilleri.',
    longDescription: 'İslam Tarihi, sadece geçmiş olaylar silsilesi değil, günümüzü inşa eden dersler hazinesidir. Dr. Yasir Doğan ile birlikte İslam öncesi Hicaz bölgesinin durumundan başlayarak, Efendimiz (s.a.v.)\'in kutlu tebliğ sürecini, Medine Sözleşmesi ile kurulan ilk medeni anayasayı, fetihleri ve ardından gelen Hulefa-i Raşidin (Ebu Bekir, Ömer, Osman, Ali) dönemindeki adalet nizamını akademik bir ciddiyet ve eşsiz bir üslupla öğreneceksiniz.',
    instructorId: 'inst-4',
    category: 'history',
    duration: '10 Hafta (30 Saat)',
    level: 'Baslangic',
    lessonsCount: 20,
    rating: 4.7,
    reviewsCount: 112,
    price: 'Ucretsiz',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=600&auto=format&fit=crop',
    benefits: [
      'Peygamberimizin Mekke ve Medine hayatını kronolojik ve sosyolojik olarak kavrayacaksınız.',
      'İslam medeniyetinin ilk anayasası olan Medine Sözleşmesi\'ni tahlil edeceksiniz.',
      'Hicret rotasını, gazve ve seriyyelerin gerçek amaçlarını haritalarla göreceksiniz.',
      'Dört Halife dönemindeki kurumsallaşmayı ve adaletin tesisini öğreneceksiniz.',
      'İslam tarihinin erken döneminde yaşanan fırkalaşma sebeplerini objektif analizlerle tahlil edeceksiniz.'
    ],
    audience: [
      'Tarihe meraklı, İslam medeniyetinin köklerini arayan herkes.',
      'Siyer okumalarını derinleştirmek isteyen ve sosyolojik çıkarımlarla buluşmak isteyenler.',
      'İlahiyat veya tarih bilimleri öğrencileri.'
    ],
    isLive: false,
    syllabus: [
      { week: 1, title: 'İslam Öncesi Hicaz ve Mekke Toplumu', topics: ['Cahiliye kültürü ve inanç dünyası', 'Mekke\'nin ticari ve dini konumu', 'Sosyal tabakalaşma ve adalet anlayışı'] },
      { week: 2, title: 'Vahiy Öncesi Kutlu Doğum ve İlk Vahiy', topics: ['Efendimizin çocukluk ve gençliği', 'Hilful Fudul cemiyeti', 'Hira mağarası ve tebliğ görevi'] },
      { week: 3, title: 'Mekke Tebliğ Dönemi ve Ambargolar', topics: ['Açık davet ve ilk müslümanlar', 'Kureyş\'in tepkisi', 'Habeşistan hicretleri ve Şi\'b-i Ebi Talib boykotu'] },
      { week: 4, title: 'Hicret ve Medine İmar Çalışmaları', topics: ['Akabe Biatları', 'Yol arkadaşlığı ve Hicret mucizeleri', 'Mescid-i Nebevi inşası', 'Muahat (Ensar-Muhacir Kardeşliği)'] },
      { week: 5, title: 'Medine Sözleşmesi ve İlk Savunma Savaşları', topics: ['Anayasal devletleşme adımı', 'Bedir Gazvesi ve Uhud Gazvesinin askeri-sosyal tahlili'] },
      { week: 6, title: 'Hendek Gazvesi ve Hudeybiye Barışı', topics: ['Medine savunması', 'Antlaşma maddeleri ve diplomatik deha', 'İslam\'ın yayılışında barış ortamının rolü'] },
      { week: 7, title: 'Mekke\'nin Fethi ve Veda Haccı', topics: ['Feth-i Mübin', 'Genel af ilanı ve putların temizlenmesi', 'Veda Hutbesi\'nin insan hakları beyannamesi yönü'] },
      { week: 8, title: 'Hz. Ebu Bekir Dönemi (Sükunet ve Derleme)', topics: ['Hilafete seçilişi', 'Riddet (irtidat) olayları ile mücadele', 'Kur\'an-ı Kerim\'in mushaf haline getirilmesi'] },
      { week: 9, title: 'Hz. Ömer Dönemi (Adalet ve Devletleşme)', topics: ['Genişleyen sınırlar (Kudüs ve İran fethi)', 'Devlet müesseselerinin kurulması (Divan, Ordu, Hicri Takvim)'] },
      { week: 10, title: 'Hz. Osman ve Hz. Ali Dönemi (İstikrar ve Fitneler)', topics: ['Kur\'an\'ın çoğaltılması ve deniz fetihleri', 'Karışıklık dönemleri ve Cemel/Sıffin olayları', 'Dönemlerden alınacak dersler'] }
    ]
  }
];

export const CANLI_DERSLER: CanliDers[] = [
  {
    id: 'live-1',
    courseTitle: 'Kur\'an-ı Kerim Eğitimi: Tecvid ve Mahreç Sanatı',
    instructorName: 'Hafız Ahmet Kaya',
    date: '18 Temmuz 2026',
    time: '14:00 - 15:30',
    topic: 'Harflerin Sıfatları ve Dudak Mahreçleri Pratik Eğitimi',
    meetingLink: 'https://zoom.us/mock-meeting-alhikmah-1'
  },
  {
    id: 'live-2',
    courseTitle: 'Sıfırdan Klasik Arapça: Nahiv ve Sarf Bilgisi',
    instructorName: 'Doç. Dr. Ayşe Yılmaz',
    date: '19 Temmuz 2026',
    time: '11:00 - 12:30',
    topic: 'Mazi Fiil Çekimleri ve Muttasıl Zamirlerle Kullanımı',
    meetingLink: 'https://zoom.us/mock-meeting-alhikmah-2'
  },
  {
    id: 'live-3',
    courseTitle: 'Fıkıh Meclisi: Gündelik Soru ve Sorunlar',
    instructorName: 'Dr. Ömer Faruk',
    date: '22 Temmuz 2026',
    time: '20:30 - 22:00',
    topic: 'Modern Finansal İşlemler ve İslam Ticaret Hukuku Soru-Cevap',
    meetingLink: 'https://zoom.us/mock-meeting-alhikmah-3'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Mustafa Korkmaz',
    role: 'İlahiyat Hazırlık Sınıfı Öğrenci',
    text: 'Arapça derslerinde Nahiv konularını kavramakta çok zorlanıyordum. Ayşe Hoca\'nın anlatım tarzı ve ödev geri bildirimleri sayesinde hazırlık sınıfını birincilikle geçtim. Elhamdülillah, çok teşekkürler!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'test-2',
    name: 'Esra Bilgin',
    role: 'Ev Hanımı & Kursiyer',
    text: 'Kur\'an-ı Kerim tecvid derslerini takip ediyorum. Harfleri hep yanlış çıkardığımı Ahmet Kaya Hoca sayesinde fark ettim. Canlı yayınlarda bizzat telaffuzumuzu kontrol etmesi çok değerliydi. Kesinlikle tavsiye ederim.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'test-3',
    name: 'Yusuf Emre Tanrıöver',
    role: 'Yazılım Mühendisi',
    text: 'İslam Tarihi eğitimi benim için müthiş bir ufuk açıcı oldu. Tarih anlatımı kuru bir ezberden ziyade neden-sonuç tahlilleriyle anlatılıyor. İş saatlerime uyması için de panelden her an kayıtları izleyebilmek muhteşem bir kolaylık.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop'
  }
];
