(() => {
  "use strict";

  // 1) قاعدة بيانات الماركات //
  const CAR_BRANDS = [
    // فخمة
    {
      name: "مرسيدس بنز",
      category: "luxury",
      icon: "fa-car-side",
      origin: "ألماني",
      gradient: "from-slate-700 to-slate-900",
    },
    {
      name: "بي إم دبليو",
      category: "luxury",
      icon: "fa-car",
      origin: "ألماني",
      gradient: "from-blue-700 to-slate-900",
    },
    {
      name: "لكزس",
      category: "luxury",
      icon: "fa-crown",
      origin: "ياباني",
      gradient: "from-amber-600 to-amber-900",
    },
    {
      name: "أودي",
      category: "luxury",
      icon: "fa-ring",
      origin: "ألماني",
      gradient: "from-gray-500 to-gray-800",
    },
    {
      name: "بورش",
      category: "luxury",
      icon: "fa-circle-chevron-up",
      origin: "ألماني",
      gradient: "from-yellow-600 to-yellow-950",
    },
    {
      name: "رنج روفر",
      category: "luxury",
      icon: "fa-truck-monster",
      origin: "بريطاني",
      gradient: "from-emerald-800 to-slate-950",
    },
    // متوسطة
    {
      name: "تويوتا",
      category: "medium",
      icon: "fa-car-side",
      origin: "ياباني",
      gradient: "from-red-600 to-red-900",
    },
    {
      name: "هوندا",
      category: "medium",
      icon: "fa-car",
      origin: "ياباني",
      gradient: "from-blue-600 to-blue-800",
    },
    {
      name: "فورد",
      category: "medium",
      icon: "fa-truck-pickup",
      origin: "أمريكي",
      gradient: "from-sky-700 to-sky-950",
    },
    {
      name: "نيسان",
      category: "medium",
      icon: "fa-sun",
      origin: "ياباني",
      gradient: "from-red-700 to-slate-900",
    },
    {
      name: "مازدا",
      category: "medium",
      icon: "fa-dharmachakra",
      origin: "ياباني",
      gradient: "from-rose-800 to-rose-950",
    },
    {
      name: "جيب",
      category: "medium",
      icon: "fa-truck-field",
      origin: "أمريكي",
      gradient: "from-green-700 to-slate-900",
    },
    {
      name: "شيفروليه",
      category: "medium",
      icon: "fa-star-of-life",
      origin: "أمريكي",
      gradient: "from-amber-500 to-amber-800",
    },
    // اقتصادية
    {
      name: "هيونداي",
      category: "economic",
      icon: "fa-car-rear",
      origin: "كوري",
      gradient: "from-indigo-600 to-indigo-900",
    },
    {
      name: "كيا",
      category: "economic",
      icon: "fa-gauge-high",
      origin: "كوري",
      gradient: "from-rose-600 to-rose-800",
    },
    {
      name: "تويوتا يارس",
      category: "economic",
      icon: "fa-car-side",
      origin: "ياباني",
      gradient: "from-red-500 to-red-700",
    },
    {
      name: "ميتسوبيشي",
      category: "economic",
      icon: "fa-gem",
      origin: "ياباني",
      gradient: "from-red-800 to-gray-950",
    },
    {
      name: "إم جي",
      category: "economic",
      icon: "fa-shield-halved",
      origin: "صيني / بريطاني",
      gradient: "from-red-700 to-black",
    },
    {
      name: "جيلي",
      category: "economic",
      icon: "fa-globe",
      origin: "صيني",
      gradient: "from-blue-800 to-slate-950",
    },
    {
      name: "سوزوكي",
      category: "economic",
      icon: "fa-star",
      origin: "ياباني",
      gradient: "from-blue-500 to-cyan-700",
    },
  ];

  let swiperInstance = null;

  /** يهرّب أي نص قبل إدخاله في innerHTML لمنع XSS */
  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function buildBrandCard(brand) {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";
    slide.innerHTML = `
      <div class="car-card group relative w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md dark:shadow-none transition-all duration-300 p-5 flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br ${brand.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
        <div class="w-12 h-12 rounded-xl bg-orange-50 dark:bg-gray-700 text-accent-orange group-hover:bg-white/20 group-hover:text-white flex items-center justify-center mb-3 transition-colors duration-300 relative z-10">
          <i class="fa-solid ${brand.icon} text-xl" aria-hidden="true"></i>
        </div>
        <h4 class="font-bold text-gray-800 dark:text-gray-100 text-sm group-hover:text-white transition-colors duration-300 relative z-10">
          ${escapeHtml(brand.name)}
        </h4>
        <span class="text-[10px] text-gray-400 dark:text-gray-500 mt-1 group-hover:text-orange-200 transition-colors duration-300 relative z-10">
          قطع غيار ${escapeHtml(brand.origin)}
        </span>
      </div>`;
    return slide;
  }

  function renderBrands(filter = "all") {
    const container = document.getElementById("swiper-container-inner");
    if (!container) return;

    const brands =
      filter === "all"
        ? CAR_BRANDS
        : CAR_BRANDS.filter((b) => b.category === filter);

    container.innerHTML = "";
    const fragment = document.createDocumentFragment();
    brands.forEach((brand) => fragment.appendChild(buildBrandCard(brand)));
    container.appendChild(fragment);

    initSwiper();
  }

  function initSwiper() {
    if (swiperInstance) {
      swiperInstance.destroy(true, true);
      swiperInstance = null;
    }

    if (typeof Swiper === "undefined") return;

    swiperInstance = new Swiper(".carSwiper", {
      loop: true,
      grabCursor: true,
      spaceBetween: 16,
      speed: 4000,
      slidesPerView: 2,
      breakpoints: {
        480: { slidesPerView: 3, spaceBetween: 16 },
        768: { slidesPerView: 4, spaceBetween: 20 },
        1024: { slidesPerView: 5, spaceBetween: 24 },
        1280: { slidesPerView: 6, spaceBetween: 24 },
      },
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
    });
  }

  function filterCars(category) {
    document
      .querySelectorAll(".tab-btn")
      .forEach((btn) => btn.classList.remove("active"));
    const activeTab = document.getElementById(`tab-${category}`);
    if (activeTab) activeTab.classList.add("active");
    renderBrands(category);
  }

  function initBrandTabs() {
    document.querySelectorAll("[data-filter]").forEach((btn) => {
      btn.addEventListener("click", () => filterCars(btn.dataset.filter));
    });
  }

  // 2) قائمة الجوال (Mobile Menu) //
  function initMobileMenu() {
    const btn = document.getElementById("mobile-menu-btn");
    const menu = document.getElementById("mobile-menu");
    if (!btn || !menu) return;

    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", "mobile-menu");

    btn.addEventListener("click", () => {
      const isOpen = !menu.classList.contains("hidden");
      menu.classList.toggle("hidden");
      btn.setAttribute("aria-expanded", String(!isOpen));
      btn.querySelector("i").className = isOpen
        ? "fa-solid fa-bars text-2xl"
        : "fa-solid fa-xmark text-2xl";
    });

    // إغلاق القائمة تلقائياً عند الضغط على أي رابط بداخلها
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.add("hidden");
        btn.setAttribute("aria-expanded", "false");
        btn.querySelector("i").className = "fa-solid fa-bars text-2xl";
      });
    });
  }

  // 3) الأسئلة الشائعة (FAQ Accordion) //
  function initFaqAccordion() {
    const toggles = document.querySelectorAll(".faq-toggle");
    toggles.forEach((toggle) => {
      const content = toggle.nextElementSibling;
      const icon = toggle.querySelector("i");
      toggle.setAttribute("aria-expanded", "false");

      toggle.addEventListener("click", () => {
        const isOpen = !content.classList.contains("hidden");

        // إغلاق كل الأسئلة الأخرى المفتوحة (اختياري: سلوك أكورديون نظيف)
        toggles.forEach((otherToggle) => {
          if (otherToggle === toggle) return;
          otherToggle.nextElementSibling.classList.add("hidden");
          otherToggle.setAttribute("aria-expanded", "false");
          otherToggle.querySelector("i").style.transform = "rotate(0deg)";
        });

        content.classList.toggle("hidden", isOpen);
        toggle.setAttribute("aria-expanded", String(!isOpen));
        icon.style.transform = isOpen ? "rotate(0deg)" : "rotate(180deg)";
      });
    });
  }

  // 4) قوائم السنوات (سنة إصدار/انتهاء الرخصة) //
 
  function populateYearSelect(selectId, { fromYear, toYear }) {
    const select = document.getElementById(selectId);
    if (!select) return;

    for (let year = toYear; year >= fromYear; year--) {
      const option = document.createElement("option");
      option.value = String(year);
      option.textContent = String(year);
      select.appendChild(option);
    }
  }

  function initYearSelects() {
    const currentYear = new Date().getFullYear();
    populateYearSelect("issueYear", {
      fromYear: currentYear - 20,
      toYear: currentYear,
    });
    populateYearSelect("expiryYear", {
      fromYear: currentYear,
      toYear: currentYear + 10,
    });
  }

  // 5) نموذج طلب التسعير → إرسال واتساب //
  function initQuoteForm() {
    const form = document.getElementById("quote-form");
    const sendBtn = document.getElementById("send-whatsapp-btn");
    if (!form || !sendBtn) return;

    sendBtn.addEventListener("click", () => {
const name = document.getElementById("customer-name").value.trim();
const mobile = document.getElementById("customer-mobile").value.trim();
const carType = document.getElementById("car-type").value.trim();
const carYear = document.getElementById("car-year").value.trim();
const expiryYear = document.getElementById("expiryYear").value;
const details = document.getElementById("car-details").value.trim();
      if (!name || !mobile) {
        alert("الرجاء إدخال الاسم ورقم الجوال على الأقل قبل الإرسال.");
        return;
      }

      const saudiMobilePattern = /^0?5\d{8}$/;
      if (!saudiMobilePattern.test(mobile.replace(/\s/g, ""))) {
        alert("الرجاء إدخال رقم جوال سعودي صحيح (مثال: 05xxxxxxxx).");
        return;
      }

  const lines = [
  "أهلاً تشليح الرياض، أرغب بتسعير سيارتي:",
  `👤 الاسم: ${name}`,
  `📱 الجوال: ${mobile}`,
  carType && `🚗 نوع السيارة: ${carType}`,
  carYear && `📅 موديل السنة: ${carYear}`,
  expiryYear && `📄 سنة انتهاء الرخصة: ${expiryYear}`,
  details && `📝 التفاصيل: ${details}`,
].filter(Boolean);

      const message = encodeURIComponent(lines.join("\n"));
      const whatsappNumber =
        window.SITE_CONFIG?.phoneWhatsapp ?? "966559394214";
      window.open(
        `https://wa.me/${whatsappNumber}?text=${message}`,
        "_blank",
        "noopener,noreferrer",
      );
    });
  }

  // 6) الوضع الليلي (Dark Mode) //
  function updateThemeIcons(isDark) {
    document
      .querySelectorAll("#theme-toggle-btn i, #theme-toggle-btn-mobile i")
      .forEach((icon) => {
        icon.className = isDark
          ? "fa-solid fa-sun text-lg"
          : "fa-solid fa-moon text-lg";
      });
  }

  function setTheme(isDark) {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateThemeIcons(isDark);
  }

  function initDarkMode() {
 
    updateThemeIcons(document.documentElement.classList.contains("dark"));

    const toggleButtons = [
      document.getElementById("theme-toggle-btn"),
      document.getElementById("theme-toggle-btn-mobile"),
    ].filter(Boolean);

    toggleButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const isDark = !document.documentElement.classList.contains("dark");
        setTheme(isDark);
      });
    });

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) setTheme(e.matches);
      });
  }

  // 7) Scroll Reveal (IntersectionObserver)
  function initScrollReveal() {
    const revealEls = document.querySelectorAll(".reveal");
    if (!revealEls.length) return;

    if (!("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  // 8) نقطة البداية //
  document.addEventListener("DOMContentLoaded", () => {
    renderBrands("all");
    initBrandTabs();
    initMobileMenu();
    initFaqAccordion();
    initYearSelects();
    initQuoteForm();
    initDarkMode();
    initScrollReveal();
  });

  window.filterCars = filterCars;
})();

// إعدادات عامة للموقع — عدّل هنا فقط عند تغيير رقم الجوال //
const SITE_CONFIG = Object.freeze({
  phoneDisplay: "+966 55 939 4214",
  phoneTelHref: "tel:+966559394214",
  phoneWhatsapp: "966559394214", // بدون + وبدون مسافات (متطلب رابط wa.me) //
});


  // 1. منع الكليك يمين //
  document.addEventListener('contextmenu', e => e.preventDefault());

  // 2. منع تحديد النصوص واختصارات النسخ والقص //
  document.addEventListener('selectstart', e => e.preventDefault());
  document.addEventListener('keydown', e => {
    if (e.ctrlKey && (e.key === 'c' || e.key === 'x' || e.key === 'a' || e.key === 's')) {
      e.preventDefault();
    }
  });

  // 3. منع فتح الـ Inspect وأدوات المطورين وعرض السورس كود //
  document.addEventListener('keydown', e => {
    // منع F12
    if (e.key === 'F12') e.preventDefault();
    
    // منع Ctrl+Shift+I و Ctrl+Shift+J و Ctrl+Shift+C //
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C' || e.key === 'i' || e.key === 'j' || e.key === 'c')) {
      e.preventDefault();
    }
    
    // منع Ctrl+U (عرض سورس الصفحة) //
    if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
      e.preventDefault();
    }
  });
