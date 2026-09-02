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
  if (slides.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let activeIndex = 0;
  const interval = Number(slideshow.dataset.interval) || 4000;
  window.setInterval(() => {
    slides[activeIndex].classList.remove("is-active");
    activeIndex = (activeIndex + 1) % slides.length;
    slides[activeIndex].classList.add("is-active");
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
      dialogExterior.src = "images/transport/public-side-station-v2.png";
      dialogExterior.alt = `${brand}が入る商業施設の外観イメージ`;
      dialogInterior.src = interior?.getAttribute("src") || "";
      dialogInterior.alt = interior?.getAttribute("alt") || `${brand}の内装イメージ`;
      dialogLink.href = card.href;
      tenantDialog.showModal();
    });
  });

  closeButton?.addEventListener("click", () => tenantDialog.close());
  tenantDialog.addEventListener("click", (event) => {
    if (event.target === tenantDialog) tenantDialog.close();
  });
}
