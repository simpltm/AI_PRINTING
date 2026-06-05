import { PrintFormat, PrintMaterial, UrgencyOption, SampleImage, PricingPlan, Language } from './types';

export const TRANSLATIONS: Record<string, Record<Language, string>> = {
  // Navigation & General
  navTitle: {
    uz: "AI Print",
    ru: "AI Print",
    en: "AI Print"
  },
  navSubtitle: {
    uz: "Avtomatlashtirish Platformasi",
    ru: "Автоматизация Печати",
    en: "Print Automation"
  },
  demoTab: {
    uz: "Mijoz Demoraduni (Mijoz Yo'li)",
    ru: "Клиент-Демо (Путь клиента)",
    en: "Customer Demo (Client Path)"
  },
  calcTab: {
    uz: "Moliyaviy Effekt (ROI Kalkulyator)",
    ru: "Экономика и Окупаемость",
    en: "ROI Calculator for Owners"
  },
  landingTab: {
    uz: "Loyiha Haqida",
    ru: "О Платформе",
    en: "About Platform"
  },
  heroBadge: {
    uz: "AI · PRINT · AUTOMATION · PLATFORM",
    ru: "A I · P R I N T · A U T O M A T I O N",
    en: "AI · PRINT · AUTOMATION · PLATFORM"
  },
  heroTitle: {
    uz: "AI Print Automation",
    ru: "AI Print Automation",
    en: "AI Print Automation"
  },
  heroSubtitle: {
    uz: "Buyurtmalarni qabul qilish, maket tayyorlash va chop etishni avtomatlashtirish",
    ru: "Автоматизация приёма заказов, подготовки макетов и печати",
    en: "Automated order intake, layout design preparation, and direct printing"
  },
  heroDesc: {
    uz: "Mijoz buyurtmalarini qabul qiluvchi menejer va dizayner o'rnini to'liq bosuvchi dastur — rasm yuklashdan tortib chop etish va yetkazib berishgacha bo'lgan butun yo'lni avtomatlashtiradi.",
    ru: "Платформа, которая заменяет менеджера по приёму заказов и автоматизирует весь путь клиента — от загрузки изображения до печати и доставки.",
    en: "A fully unified SaaS platform replacing order-intake managers and layout designers. It automates the entire customer journey from image upload to final print and delivery."
  },
  clientSteps: {
    uz: "Mijoz → AI (Sun'iy Intellekt) → To'lov → Chop etish → Yetkazib berish",
    ru: "К Л И Е Н Т  →  И И  →  О П Л А Т А  →  П Е Ч А Т Ь  →  Д О С Т А В К А",
    en: "CUSTOMER  →  AI  →  PAYMENT  →  PRINT  →  DELIVERY"
  },

  // Problem section
  problemTitle: {
    uz: "Bugungi kunda har qanday buyurtma qiyinchilik bilan keladi",
    ru: "Как устроен типичный заказ сегодня",
    en: "How a Typical Print Order Is Placed Today"
  },
  problemSub: {
    uz: "Bosmaxonadagi buyurtmalarning 80% gacha bo'lgan qismi bir xil turdagi vazifalar bo'lib, ularga nomutanosib ravishda ko'p vaqt va resurs sarflanadi.",
    ru: "До 80% заказов в типографии — это типовые задачи, на которые тратится непропорционально много времени и ручных усилий.",
    en: "Up to 80% of printing shop orders are standard, repetitive jobs that consume an excessive amount of manual customer support and design time."
  },
  currentProcess: {
    uz: "Hozirgi murakkab jarayon",
    ru: "Текущий ручной процесс",
    en: "Current Manual Process"
  },
  whatGoesWrong: {
    uz: "Nimalar noto'g'ri ishlashi mumkin?",
    ru: "Что идёт не так?",
    en: "What Goes Wrong?"
  },
  procStep1: {
    uz: "Mijoz menejerga yozadi",
    ru: "Клиент пишет менеджеру",
    en: "Client contacts the manager"
  },
  procStep2: {
    uz: "O'lchamlar va tafsilotlarni tushuntiradi",
    ru: "Объясняет размеры и детали",
    en: "Explains sizes and dimensions"
  },
  procStep3: {
    uz: "Rasmlarni yuboradi (odatda sifatsiz)",
    ru: "Отправляет изображения",
    en: "Sends image files"
  },
  procStep4: {
    uz: "Menejer aniqlashtiruvchi savollarni beradi",
    ru: "Менеджер задаёт уточняющие вопросы",
    en: "Manager asks clarifying questions"
  },
  procStep5: {
    uz: "Dizayner chop etish maketini tayyorlaydi",
    ru: "Дизайнер готовит макет",
    en: "Designer manually prepares mockup"
  },
  procStep6: {
    uz: "Mijoz yakuniy natijani tasdiqlaydi",
    ru: "Клиент согласует результат",
    en: "Client approves the proof preview"
  },
  procStep7: {
    uz: "To'lovni amalga oshiradi va chekini yuboradi",
    ru: "Отправляет оплату",
    en: "Sends manual payment"
  },
  procStep8: {
    uz: "Menejer buyurtmani ishlab chiqarishga o'tkazadi",
    ru: "Менеджер передаёт заказ в производство",
    en: "Manager hands order to production"
  },

  // Wrong items
  wrong1Title: {
    uz: "Haddan tashqari ko'p yozishmalar",
    ru: "Много переписки",
    en: "Infinite Chats"
  },
  wrong1Desc: {
    uz: "Har bir buyurtma bo'yicha ma'lumotlarni aniqlashtirish uchun soatlab vaqt ketadi.",
    ru: "Часы на уточнения и согласования по каждому стандартному заказу.",
    en: "Hours wasted explaining formats, trims, and details on messaging apps."
  },
  wrong2Title: {
    uz: "Mijozga sekin javob berish",
    ru: "Долгий ответ клиенту",
    en: "Slow Response Times"
  },
  wrong2Desc: {
    uz: "Menejer bandligi tufayli mijozlar raqobatchilarga ketib qoladi.",
    ru: "Клиенты уходят к более быстрым конкурентам во время ожидания расчёта.",
    en: "Customers abandon their orders and switch to faster competitors."
  },
  wrong3Title: {
    uz: "Inson omili sababli xatoliklar",
    ru: "Ошибки из-за человека",
    en: "Human Errors"
  },
  wrong3Desc: {
    uz: "Noto'g'ri tanlangan o'lcham, rang buzilishi, chetlar kesilib ketishi.",
    ru: "Неверный размер, искаженный цвет или неправильный формат файла.",
    en: "Wrong dimensions, color profiles, files or missing bleed safety zones."
  },
  wrong4Title: {
    uz: "Oddiy ishni qiyinlashtirish",
    ru: "Простой = сложный",
    en: "Simple acts, complex flows"
  },
  wrong4Desc: {
    uz: "Oddiy rasmni chop qilish murakkab buyurtmalar bilan bir xil vaqt oladi.",
    ru: "Типовой заказ тратит столько же рабочего времени, сколько и эксклюзивный.",
    en: "A standard photo print takes the same administrative overhead as a custom design."
  },

  // Dynamic Solution Overview
  solTitle: {
    uz: "To'liq avtomatlashtirilgan buyurtma qabul qilish",
    ru: "Полностью автоматизированный приём",
    en: "Fully Automated Order Processing"
  },
  solSub: {
    uz: "Platforma menejer va dizayner ishtirokisiz standart buyurtmalar bo'yicha to'liq jarayonni o'zi bajaradi.",
    ru: "Платформа выполняет весь цикл самостоятельно — без участия менеджера и дизайнера на типовых заказах.",
    en: "The system completes the entire cycle autonomously, freeing up managers and layout designers."
  },

  // Sandbox Text
  customText: {
    uz: "O'z rasmingizni yuklang yoki namunalardan birini tanlang:",
    ru: "Загрузите своё изображение или выберите пример:",
    en: "Upload your own design or choose a preset example below:"
  },
  formatText: {
    uz: "Chop etish o'lchami (Formati):",
    ru: "Формат печати:",
    en: "Print Format:"
  },
  materialText: {
    uz: "Material turi:",
    ru: "Материал:",
    en: "Material Type:"
  },
  urgencyText: {
    uz: "Chop etish tezligi (Shoshilinchligi):",
    ru: "Срочность выполнения:",
    en: "Fulfillment Urgency:"
  },
  quantityText: {
    uz: "Adadi (Soni):",
    ru: "Количество (Тираж):",
    en: "Print Quantity:"
  },
  costText: {
    uz: "Avtomatik hisoblangan narxi:",
    ru: "Расчёт стоимости:",
    en: "Calculated Price:"
  },
  startSimulate: {
    uz: "AI Chop etish Avtomatizatsiyasini Ishga Tushirish",
    ru: "Запустить ИИ-Автоматизацию",
    en: "Simulate AI Print Intake Sequence"
  },
  resetSimulate: {
    uz: "Yangi Buyurtma Simulyatsiyasi",
    ru: "Сбросить и начать заново",
    en: "Reset and Launch New Order"
  },
  aiVerification: {
    uz: "AI Rasm Analizi va DPI Nazorati",
    ru: "ИИ-Анализ изображения и проверка DPI",
    en: "AI Verification & Resolution DPI Check"
  },
  aiDpiSuccess: {
    uz: "Mukammal Sifat! 300 DPI aniqlandi. Chop etishga yaroqli.",
    ru: "Отличное качество! Обнаружено 300 DPI. Идеально для печати.",
    en: "Excellent Quality! 300 DPI detected. Ready for printing."
  },
  aiDpiLow: {
    uz: "Kamchilik mavjud: Rasm o'lchamlari kam (120 DPI). Sun'iy intellekt sifatni 4x marta oshiradi...",
    ru: "Предупреждение: Низкий DPI (120). Нейросеть увеличивает разрешение в 4 раза...",
    en: "Warning: Low resolution alert (120 DPI). Applying AI upscaler x4..."
  },
  aiBleedCheck: {
    uz: "Xavfsizlik chegaralari va kesish joylari tekshirildi (Bleed Control).",
    ru: "Разметка полей безопасности и обрезки (Блиды/Безопасные зоны) выполнена.",
    en: "Safety bleed line bounds & crop alignment successfully mapped."
  },
  aiColorsExtracted: {
    uz: "Rasm ranglari balansi va profili tahlil qilindi:",
    ru: "Цветовой профиль CMYK адаптирован. Извлечены доминирующие цвета:",
    en: "CMYK color profile calibrated. Main dominant palette extracted:"
  },

  // Payment text
  payPlaceholder: {
    uz: "API orqali xavfsiz to'lov tizimi (Click, Payme, Kartalar)",
    ru: "Интегрированная онлайн-оплата (Click, Payme, Карты)",
    en: "Integrated Secure API Payments (Click, Payme, Cards)"
  },
  mockPaid: {
    uz: "To'lov muvaffaqiyatli qabul qilindi! Buyurtma ID:",
    ru: "Оплата успешно прошла! ID Заказа:",
    en: "Payment Authorized Successfully! Order ID:"
  },
  sendToQueue: {
    uz: "Aqlli navbatga yuborildi. Uskunaga to'g'ridan-to'g'ri buyruq yuklandi.",
    ru: "Заказ отправлен в умную очередь. Файл готов на печатный станок.",
    en: "Sent to the Smart Printing Queue. Direct G-code/file delivery."
  },
  deliveryStatus: {
    uz: "Courier Delivery QR-kod:",
    ru: "QR-код для курьерской доставки:",
    en: "QR-Code Generated for Courier Shipping:"
  },
  deliveryDesc: {
    uz: "Kuryer buni skaner qilganda mijoz manzili, aloqa raqami va ruxsatnomasi avtomatik ko'rinadi.",
    ru: "При сканировании курьер сразу получает адрес, телефон клиента и маршрут.",
    en: "When scanned by the courier, it shows GPS routes, phone number, and delivery protocols."
  },

  // ROI Calculator UI
  roiTitle: {
    uz: "Sizning bosmaxonangiz uchun moliyaviy hisob-kitob",
    ru: "Финансовый эффект внедрения",
    en: "ROI & Interactive Financial Estimator"
  },
  roiDesc: {
    uz: "Platformani o'rnatish orqali qancha vaqt va mablag'ni tejab qolishingizni real vaqtda hisoblab ko'ring",
    ru: "На примере типографии со средним потоком заказов. Настройте слайдеры под свои показатели:",
    en: "Configure the parameters representing your current printing business to calculate immediate cost reductions."
  },
  ordersCount: {
    uz: "Kunlik o'rtacha buyurtmalar soni:",
    ru: "Объём заказов в день:",
    en: "Average orders per day:"
  },
  managerTime: {
    uz: "Bitta buyurtmani qabul qilishga sarflanadigan vaqt (daqiqa):",
    ru: "Минут на оформление/согласование одного заказа:",
    en: "Manager time per order (minutes):"
  },
  managerSalary: {
    uz: "Yordamchi/Menejerlar oylik maoshi (o'rtacha, so'm yoki $):",
    ru: "Средняя зарплата одного менеджера в месяц ($):",
    en: "Average manager monthly salary ($):"
  },
  manualTimeLabel: {
    uz: "Menejerlarning bir kundagi umumiy vaqti:",
    ru: "Общее время менеджеров в день:",
    en: "Total manager time per day:"
  },
  timeSavedLabel: {
    uz: "Soliq va vaqtdan tahrirlangan tejamkorlik (har kuni):",
    ru: "Экономия времени каждый день:",
    en: "Autopilot daily time savings:"
  },
  autoscaledJobs: {
    uz: "AI-ga o'tadigan buyurtmalar ulushi (80%):",
    ru: "Заказов уходит в полный автомат (80%):",
    en: "Orders placed on autopilot (80%):"
  },
  paybackPeriod: {
    uz: "Sarmoyaning o'zini oqlash muddati:",
    ru: "Окупаемость инвестиции:",
    en: "SaaS ROI Payback Period:"
  },
  paybackValue: {
    uz: "3 oydan kamroq muddat",
    ru: "Менее 3-х месяцев",
    en: "Less than 3 months"
  },
  roiSummaryLabel: {
    uz: "Menejerlar xizmatining qisqarishi",
    ru: "Менеджеров на приёмке сокращается",
    en: "Staff intake workload reduction"
  },
  errorDropLabel: {
    uz: "Texnik xatolar kamayishi",
    ru: "Процент ошибок снижается",
    en: "Print-file blueprint errors"
  },
  capacityGrowthLabel: {
    uz: "Ishlab chiqarish unumdorligi o'sishi",
    ru: "Рост производительности оборудования",
    en: "Equipment throughput capacity"
  },
  monthlySaaSRecommend: {
    uz: "Tavsiya etiladigan optimal SaaS tarifi:",
    ru: "Рекомендуемый тариф под вашу нагрузку:",
    en: "Recommended Optimal SaaS Tier:"
  },

  // Pricing Checklist & Options
  pricingTitle: {
    uz: "SaaS-platforma oylik obuna tariflari",
    ru: "SaaS-платформа с ежемесячной оплатой",
    en: "SaaS Premium Subscription Models"
  },
  pricingDesc: {
    uz: "Hech qanday murakkab litsenziya yoki o'rnatishlar yo'q. Bir kunda integratsiya qilinadi, yangilanishlar mutlaqo bepul.",
    ru: "Никаких лицензий и сложной установки. Подключение за 1 день, все обновления включены, масштабирование без ограничений.",
    en: "No expensive licenses or physical installations. Integrates within 1 day, automatic OTA updates, seamless hardware scaling."
  },
  popularText: {
    uz: "Eng ommabop",
    ru: "ПОПУЛЯРНО",
    en: "POPULAR"
  },
  perMonth: {
    uz: "oyiga",
    ru: "в месяц",
    en: "/ month"
  },

  // Future plans
  futureTitle: {
    uz: "Platformaning keyingi rivojlanish bosqichlari",
    ru: "Следующий этап развития платформы",
    en: "Platform Evolutionary Product Roadmap"
  },
  futureDesc: {
    uz: "Standart avtomatlashtirish — bu faqat boshlanishi. Keyinchalik platformani bosma biznes uchun to'liq AI-tizimga aylantiruvchi modullar qo'shiladi.",
    ru: "Базовая автоматизация — это только начало. Следом подключаются модули, превращающие платформу в полноценный AI-стек для печатного бизнеса.",
    en: "Standard ingestion is just step one. Up next are complex modules transforming the platform into a cohesive AI print engine cluster."
  },

  // Footer / CTA
  ctaText: {
    uz: "Menejerlarsiz va xatolarsiz ishlashni hoziroq boshlang",
    ru: "Начните работу без лишних переписок и ошибок",
    en: "Start operating without chat overhead and layout mistakes"
  },
  contactUs: {
    uz: "Hamkorlik va ulanish: ",
    ru: "Обсудить внедрение: ",
    en: "Discuss integration: "
  }
};

export const FORMATS: PrintFormat[] = [
  {
    id: 'business_card',
    name: {
      uz: "Tashrif qog'ozi (Vizitka) — 90×50 mm",
      ru: 'Визитка — 90×50 мм',
      en: 'Business Card — 90×50 mm'
    },
    dimensions: '90×50 mm',
    ratio: 1.8,
    basePrice: 500 // Sum
  },
  {
    id: 'photo_a4',
    name: {
      uz: 'A4 rasm chop etish — 210×297 mm',
      ru: 'Печать фотографии А4 — 210×297 мм',
      en: 'A4 Photo Print — 210×297 mm'
    },
    dimensions: '210×297 mm',
    ratio: 0.707,
    basePrice: 5000
  },
  {
    id: 'poster_a2',
    name: {
      uz: 'A2 Afisha/Poster — 420×594 mm',
      ru: 'Постер А2 — 420×594 мм',
      en: 'A2 Marketing Poster — 420×594 mm'
    },
    dimensions: '420×594 mm',
    ratio: 0.707,
    basePrice: 24000
  },
  {
    id: 'banner_stand',
    name: {
      uz: 'Roll-up Banner — 1000×2000 mm',
      ru: 'Баннер для стенда — 1×2 м',
      en: 'Roll-up Stand Banner — 1×2 m'
    },
    dimensions: '1000×2000 mm',
    ratio: 0.5,
    basePrice: 120000
  },
  {
    id: 'sticker_pack',
    name: {
      uz: "Stikerlar To'plami — A5 varaq",
      ru: 'Стикерпак — лист А5',
      en: 'Sticker Pack — A5 Sheet'
    },
    dimensions: '148×210 mm',
    ratio: 0.707,
    basePrice: 12000
  }
];

export const MATERIALS: PrintMaterial[] = [
  {
    id: 'paper_matte',
    name: {
      uz: "Matli Qog'oz (Standart)",
      ru: 'Матовая бумага (Стандарт)',
      en: 'Standard Matte Paper'
    },
    multiplier: 1.0
  },
  {
    id: 'paper_glossy',
    name: {
      uz: "Yaltiroq Fotoqog'oz (Premium)",
      ru: 'Глянцевая фотобумага (Премиум)',
      en: 'Premium Glossy Photo Paper'
    },
    multiplier: 1.3
  },
  {
    id: 'vinyl_sticker',
    name: {
      uz: "Vinil O'ziyopishqoq Plyonka",
      ru: 'Виниловая самоклейка',
      en: 'Adhesive Vinyl Foil'
    },
    multiplier: 1.6
  },
  {
    id: 'banner_canvas',
    name: {
      uz: 'Mustahkam Banner Matosi',
      ru: 'Баннерная ткань (ПВХ)',
      en: 'Heavy Duty PVC Banner Canvas'
    },
    multiplier: 2.0
  },
  {
    id: 'woodstock_card',
    name: {
      uz: 'Dizaynerlik Qalin Kartoni',
      ru: 'Дизайнерский плотный картон',
      en: 'Premium Textured Cardstock'
    },
    multiplier: 1.8
  }
];

export const URGENCY_OPTIONS: UrgencyOption[] = [
  {
    id: 'standard',
    name: {
      uz: 'Kutish tartibida (Standard)',
      ru: 'Обычный (Стандарт)',
      en: 'Standard Fulfillment'
    },
    multiplier: 1.0,
    timeframe: {
      uz: '24 soat ichida',
      ru: 'В течение 24 часов',
      en: 'Within 24 hours'
    }
  },
  {
    id: 'express',
    name: {
      uz: 'Tezkor (Express)',
      ru: 'Быстрый (Экспресс)',
      en: 'Express Booking'
    },
    multiplier: 1.4,
    timeframe: {
      uz: '2-3 soatda tayyor',
      ru: 'Готово через 2-3 часа',
      en: 'Ready within 2-3 hours'
    }
  },
  {
    id: 'flash',
    name: {
      uz: 'Shoshilinch (Maksimal tezlikda)',
      ru: 'Сверхсрочный (Вне очереди!)',
      en: 'Flash Queue (Top Priority)'
    },
    multiplier: 1.8,
    timeframe: {
      uz: '20-40 daqiqada tayyor',
      ru: 'Готово за 20-40 минут',
      en: 'Ready within 20-40 minutes'
    }
  }
];

export const SAMPLE_IMAGES: SampleImage[] = [
  {
    id: 'portrait',
    name: {
      uz: 'Oila Rasmi / Portret',
      ru: 'Семейное фото / Портрет',
      en: 'Family Portrait'
    },
    url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&auto=format&fit=crop&q=80',
    category: 'photo_a4'
  },
  {
    id: 'bizcard_mock',
    name: {
      uz: 'Zamonaviy Vizitka Maketi',
      ru: 'Минималистичная визитка',
      en: 'Minimal Card Template'
    },
    url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&auto=format&fit=crop&q=80',
    category: 'business_card'
  },
  {
    id: 'banner_promo',
    name: {
      uz: 'Do\'kon Bannerining Rasmi',
      ru: 'Рекламный постер / Баннер',
      en: 'Promotional Store Banner'
    },
    url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop&q=80',
    category: 'banner_stand'
  },
  {
    id: 'stickers_illust',
    name: {
      uz: 'Kreativ San\'at Asarlari',
      ru: 'Иллюстрации / Стикерпак',
      en: 'Illustrations Sticker Pack'
    },
    url: 'https://images.unsplash.com/photo-1572375995301-401894e82c4e?w=600&auto=format&fit=crop&q=80',
    category: 'sticker_pack'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'start',
    name: {
      uz: 'START',
      ru: 'START',
      en: 'START'
    },
    tagline: {
      uz: 'Kichik shaxsiy bosmaxonalar',
      ru: 'Небольшие типографии',
      en: 'Boutique local printing stores'
    },
    price: 99,
    features: {
      uz: [
        'Kuniga 100 tagacha buyurtma',
        'Boshlang\'ich AI-maket moslashtiruvi',
        'Oson to\'lov integratsiyalari (Click/Payme)',
        'Elektron pochta orqali yordam'
      ],
      ru: [
        'До 100 заказов в день',
        'Базовая ИИ-обработка макетов',
        'Интеграция платежных каналов Click/Payme',
        'Поддержка по эл. почте'
      ],
      en: [
        'Up to 100 automated orders / day',
        'Basic AI-layout verification',
        'Standard local payment API (Click, Payme)',
        'Standard Email support'
      ]
    },
    icon: 'Store'
  },
  {
    id: 'business',
    badge: {
      uz: 'ENG MASHHUR',
      ru: 'ПОПУЛЯРНО',
      en: 'POPULAR'
    },
    name: {
      uz: 'BUSINESS',
      ru: 'BUSINESS',
      en: 'BUSINESS'
    },
    tagline: {
      uz: 'Reklama agentliklari va faol korxonalar',
      ru: 'Рекламные агентства и студии',
      en: 'Fast-growing advertising houses'
    },
    price: 249,
    features: {
      uz: [
        'Kuniga 1000 tagacha buyurtma',
        'Kengaytirilgan professional AI tozalash',
        'Bannerlarni avtomatlashtirilgan vyorstkasi',
        'QR-yetkazib berish va CRM boshqaruvi',
        '2 soatlik tezkor yordam xizmati'
      ],
      ru: [
        'До 1000 заказов в день',
        'Расширенный профессиональный ИИ-движок',
        'Автоматизация вёрстки баннеров по сетке',
        'QR-доставка курьерам и CRM трекинг',
        'Приоритетная техподдержка'
      ],
      en: [
        'Up to 1000 automated orders / day',
        'Advanced professional AI processing engine',
        'Grid-based auto-layout of banner templates',
        'QR-fulfillment dispatch & CRM syncing',
        'Priority technical support line'
      ]
    },
    icon: 'Cpu'
  },
  {
    id: 'enterprise',
    name: {
      uz: 'ENTERPRISE',
      ru: 'ENTERPRISE',
      en: 'ENTERPRISE'
    },
    tagline: {
      uz: 'Yirik tarmoqli bosmaxonalar va franchayzilar',
      ru: 'Крупные сети и франшизы',
      en: 'Enterprise networks & franchises'
    },
    price: 699,
    features: {
      uz: [
        'Cheksiz avtomatlashtirilgan buyurtmalar',
        'Maxsus xususiy integratsiyalar (API/ERP)',
        'Siz uchun ajratilgan alohida server',
        'SLA va Shaxsiy hisob-menejeri',
        'Uskunalar bilan to\'g\'ridan-to\'g\'ri moslashtirish'
      ],
      ru: [
        'Безлимитный автоматический приём',
        'Кастомные интеграции с вашим ERP/1С',
        'Выделенный облачный сервер',
        'Персональный менеджер и SLA техподдержки',
        'Прямая интеграция со станками'
      ],
      en: [
        'Unlimited orders automation',
        'Custom bespoke backend & ERP/1C APIs',
        'Dedicated secure host container',
        'Personal Account Director & strict SLA support',
        'Direct connection to hardware machines'
      ]
    },
    icon: 'Network'
  }
];

export const ROADMAP_ITEMS = [
  {
    id: 1,
    quarter: 'Q2 · 2026',
    title: {
      uz: 'AI Dizayn Generatsiyasi',
      ru: 'Генерация дизайнов',
      en: 'Generative AI Layout Designer'
    },
    desc: {
      uz: 'Sun\'iy intellekt mijozning matnli tavsifi bo\'yicha yangi bosma maketni noldan yaratib beradi.',
      ru: 'ИИ создаёт готовый макет для печати по текстовому описанию от клиента.',
      en: 'AI creates brand-new print layout blueprints solely based on client text prompts.'
    },
    status: 'planned'
  },
  {
    id: 2,
    quarter: 'Q2 · 2026',
    title: {
      uz: 'Mavzu Orqa Fonini O\'chirish',
      ru: 'Удаление фона',
      en: 'Auto Background Removal'
    },
    desc: {
      uz: 'Yuklangan rasmlarni bir lahzada shaffof holga keltirib, kesib joylashtirish.',
      ru: 'Автоматическая обтравка и мгновенное вырезание фона на фото.',
      en: 'Instant extraction of subjects and background elimination from uploaded image files.'
    },
    status: 'planned'
  },
  {
    id: 3,
    quarter: 'Q2 · 2026',
    title: {
      uz: 'Reklama Materiallari Paketlari',
      ru: 'Рекламные материалы',
      en: 'Ad Collateral Automation'
    },
    desc: {
      uz: 'Postlar, flayerlar, tashqi reklama bannerlarining o\'lchamlari bo\'yicha avtomatik guruhlash.',
      ru: 'Быстрая раскладка по форматам: посты, флаеры, наружная реклама.',
      en: 'Fanning output banners directly to multiple cross-channel flyers, posters, and prints.'
    },
    status: 'planned'
  },
  {
    id: 4,
    quarter: 'Q3 · 2026',
    title: {
      uz: 'CRM va ERP Integratsiyalari',
      ru: 'Интеграция с CRM',
      en: 'Deep CRM & ERP Integrations'
    },
    desc: {
      uz: 'AmoCRM, Bitrix24, HubSpot yoki 1C tizimlari bilan mijoz ma\'lumotlarining sinxronizatsiyasi.',
      ru: 'Полная связка с Bitrix24, AmoCRM, HubSpot и учётными системами.',
      en: 'Tight API webhooks into Bitrix24, AmoCRM, HubSpot, and local ERP ledger stacks.'
    },
    status: 'planned'
  },
  {
    id: 5,
    quarter: 'Q3 · 2026',
    title: {
      uz: 'Marketpleyslar Ulanishi',
      ru: 'Маркетплейсы',
      en: 'E-commerce Marketplaces'
    },
    desc: {
      uz: 'Etsy, Uzum, Wildberries, Ozon kabi maydonchalarda dillerlik buyurtmalarini avtomatik chop etishga yuborish.',
      ru: 'Автоматическая печать заказов напрямую из Wildberries, Ozon, Etsy.',
      en: 'Dropshipping automation direct-on-demand printing orders from Wildberries, Uzum, or Etsy.'
    },
    status: 'planned'
  },
  {
    id: 6,
    quarter: 'Q4 · 2026',
    title: {
      uz: 'Kuryerlik Optimal Yo\'nalishlari',
      ru: 'Маршруты доставки',
      en: 'Smart Dispatch & Logistics'
    },
    desc: {
      uz: 'GPS orqali kuryerlar uchun eng yaqin va arzon yetkazib berish yo\'llarini xaritada hisoblash.',
      ru: 'Оптимизация и выравнивание курьерских маршрутов через умный GPS алгоритм.',
      en: 'Synthesizing dispatch orders into optimized real-time navigation paths to cut logistics costs.'
    },
    status: 'planned'
  }
];
