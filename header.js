"use strict";

const burgerMenu = document.querySelector(".burger-menu");
const menu = document.querySelector(".menu");

const catalogBtn = document.querySelector(".catalog-btn");
const catalogContainer = document.querySelector(".catalog-container");
const categories = document.querySelectorAll(".category");
const presentationWrapper = document.querySelectorAll(".presentation-wrapper");
const chevron = document.querySelectorAll(".chevron");

const cartItemCount = document.getElementById("item-count");

let windowWidth = window.innerWidth;

let isMenuOpen = false;
let isCatalogOpen = false;

// Fetch Products
const fetchProductsHeader = async () => {
  try {
    const response = await fetch("http://localhost:3000/products");
    const data = await response.json();

    searchHandler(data);
  } catch (error) {
    alert("Failed to fetch products:" + error);
  }
};

// Fetch Cart
const fetchCartHeader = async () => {
  try {
    const response = await fetch("http://localhost:3000/cart");
    const data = await response.json();

    cartItemCount.textContent = data.length;
  } catch (error) {
    alert("Failed to fetch card:" + error);
  }
};

// Responsive Resize
window.addEventListener("resize", () => {
  windowWidth = window.innerWidth;
  if (windowWidth >= 768) {
    if (isCatalogOpen) catalogContainer.classList.remove("open-menu");
  } else {
    if (isCatalogOpen) catalogContainer.classList.add("open-menu");
  }
});

// Search
const searchHandler = (data) => {
  const searchForm = document.getElementById("search-form");
  const searchFormInput = document.getElementById("search-input");

  searchForm.addEventListener("submit", () => {
    const searchRequest = searchFormInput.value.trim();

    const searchedItems = data.filter((item) =>
      item.name.toLowerCase().includes(searchRequest.toLowerCase())
    );

    if (searchedItems.length > 0) {
      const searchedName = searchedItems[0].name;

      localStorage.setItem("selectedProductName", JSON.stringify(searchedName));
    }
  });
};

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

  // Catalog
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

  // Filter stuff
  if (clicked.dataset.subcategory) {
    localStorage.setItem(
      "filterSubcategory",
      JSON.stringify(clicked.dataset.subcategory)
    );
  }

  if (clicked.dataset.onsale) {
    localStorage.setItem("filterOnsale", clicked.dataset.onsale);
  }
});

fetchProductsHeader();
fetchCartHeader();
