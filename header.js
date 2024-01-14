"use strict";

const burgerMenu = document.querySelector(".burger-menu");
const menu = document.querySelector(".menu");

const catalogBtn = document.querySelector(".catalog-btn");
const catalogContainer = document.querySelector(".catalog-container");
const categories = document.querySelectorAll(".category");
const presentationWrapper = document.querySelectorAll(".presentation-wrapper");
const chevron = document.querySelectorAll(".chevron");

let windowWidth = window.innerWidth;

let isMenuOpen = false;
let isCatalogOpen = false;

window.addEventListener("resize", () => {
  windowWidth = window.innerWidth;
  if (windowWidth >= 768) {
    if (isCatalogOpen) catalogContainer.classList.remove("open-menu");
  } else {
    if (isCatalogOpen) catalogContainer.classList.add("open-menu");
  }
});

burgerMenu.addEventListener("click", () => {
  if (!isMenuOpen && !isCatalogOpen) {
    burgerMenu.classList.add("open");
    menu.classList.add("open-menu");
    isMenuOpen = true;
  } else {
    burgerMenu.classList.remove("open");
    menu.classList.remove("open-menu");
    isMenuOpen = false;
  }

  if (isCatalogOpen) {
    burgerMenu.classList.remove("open");
    catalogContainer.classList.remove("open-menu");
    catalogContainer.classList.add("hidden");
    isCatalogOpen = false;

    categories.forEach((category, i) => {
      category.classList.add("hidden");
      chevron[i].classList.remove("inverted");
    });
  }
});

catalogBtn.addEventListener("click", () => {
  if (!isCatalogOpen) {
    burgerMenu.classList.add("open");
    if (windowWidth < 768) catalogContainer.classList.add("open-menu");
    catalogContainer.classList.remove("hidden");
    isCatalogOpen = true;
  } else {
    burgerMenu.classList.remove("open");
    catalogContainer.classList.remove("open-menu");
    catalogContainer.classList.add("hidden");
    isCatalogOpen = false;

    categories.forEach((category, i) => {
      category.classList.add("hidden");
      chevron[i].classList.remove("inverted");
    });
  }
});

presentationWrapper.forEach((wrapper, index) => {
  wrapper.addEventListener("click", () => {
    const isHidden = categories[index].classList.contains("hidden");

    categories.forEach((category, i) => {
      category.classList.add("hidden");
      chevron[i].classList.remove("inverted");
    });

    if (isHidden) {
      categories[index].classList.remove("hidden");
      chevron[index].classList.add("inverted");
    }
  });
});

window.addEventListener("click", (e) => {
  const clicked = e.target;
  if (
    !clicked.closest(".catalog-btn") &&
    !catalogContainer.contains(clicked) &&
    ![...categories].includes(clicked) &&
    ![...presentationWrapper].includes(clicked) &&
    ![...chevron].includes(clicked)
  ) {
    if (windowWidth >= 768) {
      burgerMenu.classList.remove("open");
      catalogContainer.classList.add("hidden");
      isCatalogOpen = false;

      categories.forEach((category, i) => {
        category.classList.add("hidden");
        chevron[i].classList.remove("inverted");
      });
    }
  }
});
