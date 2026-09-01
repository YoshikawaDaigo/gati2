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
