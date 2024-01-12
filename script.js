"use strict";

const burgerMenu = document.querySelector(".burger-menu");
const menu = document.querySelector(".menu");

const catalogBtn = document.querySelector(".catalog-btn");
const catalogContainer = document.querySelector(".catalog-container");
const catageroy = document.querySelectorAll(".category");
const presentationWrapper = document.querySelectorAll(".presentation-wrapper");
const chevron = document.querySelectorAll(".chevron");

let isMenuOpen = false;
let isCatalogOpen = false;

// Will change because of responsive layout

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
  }
});

catalogBtn.addEventListener("click", () => {
  if (!isCatalogOpen) {
    burgerMenu.classList.add("open");
    catalogContainer.classList.add("open-menu");
    catalogContainer.classList.remove("hidden");
    isCatalogOpen = true;
  } else {
    burgerMenu.classList.remove("open");
    catalogContainer.classList.remove("open-menu");
    catalogContainer.classList.add("hidden");
    isCatalogOpen = false;
  }
});

presentationWrapper.forEach((wrapper, index) => {
  wrapper.addEventListener("click", () => {
    catageroy[index].classList.toggle("hidden");
    chevron[index].classList.toggle("inverted");
  });
});
