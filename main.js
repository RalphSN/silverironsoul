window.onload = function () {
  // ** Preloader**
  const preloader = document.querySelector(".preloader");
  const allElements = document.querySelectorAll(".navbar, .footer, .main");
  const coverImg = document.querySelector(".cover .cover-image-container img");

  // ** 漢堡選單功能**
  const menuButton = document.querySelector(".hamburger-menu");
  const menu = document.querySelector(".navbar-auth-slide");
  const overlay = document.querySelector(".menu-overlay");
  const closeButton = document.querySelector(".close-menu");
  const navbarLinks = document.querySelectorAll(".navbar-links a");

  // ** Service item => Hover-Lightbox
  const serviceItems = document.querySelectorAll(".service-item");

  // ** 計算滾軸寬度**
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  // ** 禁用滾動位置記憶，確保重新整理回到頂部**
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  // ** 強制滾動到頂部，確保 preloader 可見**
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 0);

  // ** Preloader**
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = `${scrollbarWidth}px`; // 避免頁面跳動
  const fixedElements = document.querySelectorAll(".navbar, .footer");
  fixedElements.forEach((el) => {
    el.style.paddingRight = `${scrollbarWidth}px`;
  });

  setTimeout(() => {
    preloader.classList.add("hidden");
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    allElements.forEach((el) => {
      el.classList.add("loaded");
    });
    fixedElements.forEach((el) => {
      el.style.paddingRight = "";
    });
    setTimeout(() => {
      allElements.forEach((el) => {
        el.style.display = "flex";
      }, 500);
    });
    coverImg.style.display = "block";
  }, 1500);

  // **攔截 a 不改變網址**
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (event) {
      event.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      const navbar = document.querySelector(".navbar");
      const navbarHeight = navbar ? navbar.offsetHeight : 0;

      if (targetElement) {
        requestAnimationFrame(() => {
          window.scrollTo({
            top: targetElement.offsetTop - navbarHeight,
            behavior: "smooth",
          });
        });
      }
    });
  });

  if (menuButton && menu && overlay && closeButton) {
    menuButton.addEventListener("click", function (event) {
      menu.classList.add("open");
      overlay.classList.add("open");
      event.stopPropagation();
    });

    closeButton.addEventListener("click", function () {
      menu.classList.remove("open");
      overlay.classList.remove("open");
    });

    overlay.addEventListener("click", function () {
      menu.classList.remove("open");
      overlay.classList.remove("open");
    });

    document.addEventListener("click", function (event) {
      if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
        menu.classList.remove("open");
        overlay.classList.remove("open");
      }
    });

    // ** 點擊選單內連結後關閉選單**
    navbarLinks.forEach((link) => {
      link.addEventListener("click", function () {
        menu.classList.remove("open");
        overlay.classList.remove("open");
      });
    });
  }

  // ** 語言切換**
  document.querySelectorAll(".dropdown-menu li").forEach((item) => {
    item.addEventListener("click", function () {
      const lang = item.getAttribute("data-lang");
      if (lang) {
        localStorage.setItem("language", lang);
        location.reload();
      }
    });
  });

  // ** Swiper.js 輪播功能**
  const worksSlider = document.querySelector(".works-slider");
  if (worksSlider) {
    new Swiper(".works-slider", {
      loop: true,
      spaceBetween: 20,
      slidesPerView: 1,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  } else {
    console.error("Swiper container not found!");
  }

  // ** Go Top 按鈕功能**
  const goTopButton = document.getElementById("goTopButton");

  if (goTopButton) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        goTopButton.classList.add("show");
      } else {
        goTopButton.classList.remove("show");
      }
    });

    goTopButton.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ** Service item => Hover-Lightbox**

  serviceItems.forEach((item) => {
    const inner = item.querySelector(".service-item-inner");
    const details = item.querySelector(".service-item-details");

    let isHovered = false;

    item.addEventListener("mouseenter", () => {
      isHovered = true;
      inner.style.transform = "scale(2)";
      inner.style.zIndex = "10";
      details.style.visibility = "visible";
      setTimeout(() => {
        if (isHovered) details.style.opacity = "1";
      }, 100);
    });

    item.addEventListener("mouseleave", () => {
      isHovered = false;

      setTimeout(() => {
        if (!isHovered) {
          details.style.opacity = "0";
          setTimeout(() => {
            if (!isHovered) {
              inner.style.transform = "scale(1)";
              details.style.visibility = "hidden";
              details.style.opacity = "0";
              setTimeout(() => {
                inner.style.zIndex = "5";
              }, 100);
            }
          }, 10);
        }
      }, 10);
    });
  });
};
