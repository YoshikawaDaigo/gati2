"use strict";

const form = document.querySelector("#contact-form");
const formMessage = document.querySelector("#form-message");
const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (form && formMessage) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    formMessage.classList.remove("error");

    if (!form.checkValidity()) {
      formMessage.textContent = "未入力の項目、または入力形式をご確認ください。";
      formMessage.classList.add("error");
      form.reportValidity();
      return;
    }

    formMessage.textContent = "入力内容を確認しました（デモのため送信はされません）。";
  });
}

const homeMenuButton = document.querySelector(".home-menu-button");
const homeMenu = document.querySelector("#home-menu");

if (homeMenuButton && homeMenu) {
  const closeHomeMenu = () => {
    homeMenu.hidden = true;
    homeMenuButton.setAttribute("aria-expanded", "false");
  };
  homeMenuButton.addEventListener("click", () => {
    const willOpen = homeMenu.hidden;
    homeMenu.hidden = !willOpen;
    homeMenuButton.setAttribute("aria-expanded", String(willOpen));
  });
  homeMenu.addEventListener("click", closeHomeMenu);
  document.addEventListener("click", (event) => {
    if (!homeMenu.hidden && !homeMenu.contains(event.target) && !homeMenuButton.contains(event.target)) closeHomeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeHomeMenu();
  });
}

document.querySelectorAll("[data-slideshow]").forEach((slideshow) => {
  const slides = [...slideshow.querySelectorAll(".slideshow-slide")];
  if (slides.length < 2) return;
  let activeIndex = 0;
  let isPaused = false;
  let pressTimer;
  let longPressed = false;
  const interval = Number(slideshow.dataset.interval) || 4000;

  const showNextSlide = () => {
    slides[activeIndex].classList.remove("is-active");
    activeIndex = (activeIndex + 1) % slides.length;
    slides[activeIndex].classList.add("is-active");
  };

  slideshow.classList.add("is-interactive");
  slideshow.title = "タップで次の画像／長押しで一時停止";
  slideshow.addEventListener("pointerdown", () => {
    longPressed = false;
    pressTimer = window.setTimeout(() => {
      longPressed = true;
      isPaused = true;
      slideshow.classList.add("is-paused");
    }, 550);
  });
  slideshow.addEventListener("pointerup", (event) => {
    window.clearTimeout(pressTimer);
    if (longPressed) return;
    event.preventDefault();
    showNextSlide();
    isPaused = false;
    slideshow.classList.remove("is-paused");
  });
  slideshow.addEventListener("pointercancel", () => window.clearTimeout(pressTimer));
  slideshow.addEventListener("pointerleave", () => window.clearTimeout(pressTimer));
  slideshow.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
  });
  slideshow.addEventListener("contextmenu", (event) => event.preventDefault());

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  window.setInterval(() => {
    if (!isPaused) showNextSlide();
  }, interval);
});

const tenantDialog = document.querySelector("#tenant-dialog");

if (tenantDialog) {
  const dialogTitle = tenantDialog.querySelector("#tenant-dialog-title");
  const dialogFloor = tenantDialog.querySelector("#tenant-dialog-floor");
  const dialogDescription = tenantDialog.querySelector("#tenant-dialog-description");
  const dialogExterior = tenantDialog.querySelector("#tenant-dialog-exterior");
  const dialogInterior = tenantDialog.querySelector("#tenant-dialog-interior");
  const dialogLink = tenantDialog.querySelector("#tenant-dialog-link");
  const dialogCompany = tenantDialog.querySelector("#tenant-dialog-company");
  const dialogPhone = tenantDialog.querySelector("#tenant-dialog-phone");
  const dialogBusinessHours = tenantDialog.querySelector("#tenant-dialog-business-hours");
  const dialogClosed = tenantDialog.querySelector("#tenant-dialog-closed");
  const closeButton = tenantDialog.querySelector(".tenant-dialog-close");
  const tenantDescriptions = {
    "東急ストア": "日々の食卓を支える生鮮食品、惣菜、ベーカリーを扱う小規模なフードステーションを計画しています。",
    "河合塾マナビス": "映像授業と学習アドバイザーによるサポートを提供する大学受験予備校です。",
    "マツモトキヨシ": "医薬品、化粧品、日用品を扱い、健康と暮らしを身近に支えるドラッグストアです。",
    "らーめん Shigetomi": "木の温もりを感じる落ち着いた店内で一杯を楽しめる、地域に親しまれるラーメン店です。",
    "アクアトゥエンティワン": "住まい探しや不動産の相談に対応する、地域密着型の不動産仲介店舗です。",
    "健康堂整骨院": "日常の身体の悩みやコンディショニングに対応する、明るく清潔な整骨院です。",
    "かたぎり塾": "個別指導と機能的なトレーニング環境を備えたパーソナルジムです。",
    "横浜銀行": "各種手続きや資産に関する相談に対応する、落ち着きのある銀行店舗です。",
    "STARBUCKS": "コーヒーとともに仕事、会話、休憩の時間を過ごせる地域のサードプレイスです。",
    "御菓子司 大倉山青柳": "季節の生菓子や贈答品を揃える、現代的な設えの和菓子店です。",
    "FamilyMart": "食事、飲料、日用品、各種サービスを便利に利用できるコンビニエンスストアです。"
  };
  const tenantCompanies = {
    "東急ストア": "https://www.tokyu-store.co.jp/", "河合塾マナビス": "https://www.manavis.com/", "マツモトキヨシ": "https://www.matsukiyococokara.com/", "アクアトゥエンティワン": "https://www.acua21.com/", "健康堂整骨院": "https://kkd-ookurayama2.com/", "かたぎり塾": "https://katagirijuku.jp/", "横浜銀行": "https://www.boy.co.jp/", "STARBUCKS": "https://www.starbucks.co.jp/", "FamilyMart": "https://www.family.co.jp/"
  };
  const tenantsWithoutCompanyWebsite = new Set(["らーめん Shigetomi", "御菓子司 大倉山青柳"]);
  const tenantsWithoutTenantPage = new Set(["健康堂整骨院"]);
  const tenantPageLabels = {
    "らーめん Shigetomi": "店舗詳細ページへ",
    "御菓子司 大倉山青柳": "公式ホームページ"
  };
  const tenantPhones = {
    "東急ストア": "045-546-0109", "河合塾マナビス": "045-947-2211", "マツモトキヨシ": "045-531-3761", "らーめん Shigetomi": "045-543-9226", "アクアトゥエンティワン": "045-533-3330", "健康堂整骨院": "045-544-9944", "かたぎり塾": "03-6381-6269", "横浜銀行": "045-542-8181", "STARBUCKS": "045-533-0451", "御菓子司 大倉山青柳": "045-531-0407", "FamilyMart": "045-540-0271"
  };
  const tenantHours = {
    "東急ストア": ["7:00〜24:00", "無休（臨時休業を除く）"],
    "河合塾マナビス": ["平日・土曜 14:00〜22:00／日曜・祝日 10:00〜18:00", "年間休館日あり"],
    "マツモトキヨシ": ["9:00〜22:00", "無休（調剤は木・日・祝休）"],
    "らーめん Shigetomi": ["火〜金 11:30〜14:30・18:00〜22:00／土 11:30〜14:30", "日曜・月曜（完売時終了）"],
    "アクアトゥエンティワン": ["10:00〜18:30", "水曜（祝日は営業、1〜3月は無休）"],
    "健康堂整骨院": ["平日 11:00〜21:00／土日祝 10:00〜19:00", "年中無休（年末年始を除く）"],
    "かたぎり塾": ["平日 10:00〜22:00／土日 9:00〜20:00", "月曜・木曜"],
    "横浜銀行": ["窓口 平日 9:00〜15:00／ATM 平日 7:45〜21:00・土日祝 9:00〜21:00", "窓口は土日祝休業"],
    "STARBUCKS": ["7:00〜22:00", "不定休"],
    "御菓子司 大倉山青柳": ["平日 9:00〜19:00／土日祝 9:00〜18:00", "木曜（行事の場合は営業）"],
    "FamilyMart": ["24時間", "無休"]
  };
  const tenantEntrances = {
    "東急ストア": "tokyu-store.png", "河合塾マナビス": "manavis.png", "マツモトキヨシ": "matsukiyo.png", "らーめん Shigetomi": "shigetomi.png", "アクアトゥエンティワン": "acua.png", "健康堂整骨院": "kenkodo.png", "かたぎり塾": "katagiri.png", "横浜銀行": "yokohama-bank.png", "STARBUCKS": "starbucks-v2.png", "御菓子司 大倉山青柳": "aoyagi.png", "FamilyMart": "familymart-v2.png"
  };

  document.querySelectorAll(".tenant-card[href]").forEach((card) => {
    card.addEventListener("click", (event) => {
      event.preventDefault();
      const brand = card.querySelector(".tenant-brand b")?.textContent.trim() || "店舗情報";
      const shop = card.querySelector(":scope > strong")?.textContent.trim() || "";
      const floor = card.closest(".tenant-floor")?.querySelector(".tenant-floor-heading span")?.textContent.trim() || "";
      const interior = card.querySelector(".tenant-interior");

      dialogFloor.textContent = `${floor} TENANT INFORMATION`;
      dialogTitle.textContent = shop ? `${brand}｜${shop}` : brand;
      dialogDescription.textContent = tenantDescriptions[brand] || "施設内に計画している店舗の完成イメージと詳細情報です。";
      dialogExterior.src = `images/tenants/entrances/${tenantEntrances[brand]}`;
      dialogExterior.alt = `${brand}の店舗入口イメージ`;
      dialogInterior.src = interior?.getAttribute("src") || "";
      dialogInterior.alt = interior?.getAttribute("alt") || `${brand}の内装イメージ`;
      if (tenantsWithoutTenantPage.has(brand)) {
        dialogLink.hidden = true;
        dialogLink.removeAttribute("href");
      } else {
        dialogLink.hidden = false;
        dialogLink.href = card.href;
        dialogLink.textContent = tenantPageLabels[brand] || "大倉山店ページを見る ↗";
      }
      dialogPhone.textContent = tenantPhones[brand];
      dialogBusinessHours.textContent = tenantHours[brand][0];
      dialogClosed.textContent = tenantHours[brand][1];
      if (!tenantsWithoutCompanyWebsite.has(brand) && tenantCompanies[brand]) {
        dialogCompany.hidden = false;
        dialogCompany.href = tenantCompanies[brand];
      } else {
        dialogCompany.hidden = true;
        dialogCompany.removeAttribute("href");
      }
      tenantDialog.showModal();
    });
  });

  closeButton?.addEventListener("click", () => tenantDialog.close());
  tenantDialog.addEventListener("click", (event) => {
    if (event.target === tenantDialog) tenantDialog.close();
  });
}
