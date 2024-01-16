"use strict";

const sortingContainer = document.querySelector(".sorting-container");
const sortingBtn = document.getElementById("sorting-btn");
const sortingCategories = document.getElementById("sorting-categories");

const sortDefaultBtn = document.getElementById("sort-default-btn");
const sortLowtHighBtn = document.getElementById("sort-lowt-high-btn");
const sortHightLowBtn = document.getElementById("sort-hight-low-btn");

// Filter experimental
const categoriesFilterWrapper = document.querySelector(
  ".categories-filter-wrapper"
);
const categoriesFilterBtn = document.getElementById("categories-filter-btn");
const categoriesFilterUl = document.getElementById("categories-filter-ul");
const categoryBtn = document.querySelector(".category-btn");
const filtersBtnPlusMinus = document.getElementById("filters-btn-plus-minus");

const filterCategoriesChevron = document.querySelectorAll(
  "#categories-filter-ul img"
);

const subcategoriesFilterUl = document.getElementById(
  "subcategories-filter-ul"
);

let isSortingOpen = false;
let isFilterOpen = true;
let isFilterCategoryOpen = false;
let isFilterSubcategoryOpen = false;

// Sorting

sortingContainer.addEventListener("click", () => {
  if (!isSortingOpen) {
    sortingContainer.style.borderRadius = "12px 12px 0 0";
    sortingContainer.style.borderBottom = "none";

    sortingBtn.style.borderBottom = "1px solid var(--border-color)";

    sortingCategories.classList.remove("display-none");
    isSortingOpen = true;
  } else {
    sortingContainer.style.borderRadius = "";
    sortingContainer.style.borderBottom = "";

    sortingBtn.style.borderBottom = "";

    sortingCategories.classList.add("display-none");
    isSortingOpen = false;
  }
});

window.addEventListener("click", (e) => {
  if (!e.target.closest(".sorting-container")) {
    sortingContainer.style.borderRadius = "";
    sortingContainer.style.borderBottom = "";

    sortingBtn.style.borderBottom = "";

    sortingCategories.classList.add("display-none");
    isSortingOpen = false;
  }
});

// Filters Experimental

categoriesFilterBtn.addEventListener("click", () => {
  if (!isFilterOpen) {
    categoriesFilterWrapper.style.borderRadius = "12px";

    categoriesFilterBtn.style.borderBottom = "1px solid var(--border-color)";
    categoriesFilterBtn.style.backgroundColor = "var(--bg-color-3)";

    filtersBtnPlusMinus.textContent = "-";

    categoriesFilterUl.classList.remove("display-none");
    isFilterOpen = true;
  } else {
    categoriesFilterWrapper.style.borderRadius = "24px";

    categoriesFilterBtn.style.borderBottom = "";
    categoriesFilterBtn.style.backgroundColor = "var(--bg-color-2)";

    filtersBtnPlusMinus.textContent = "+";

    categoriesFilterUl.classList.add("display-none");
    isFilterOpen = false;
  }
});

categoryBtn.addEventListener("click", () => {
  if (!isFilterSubcategoryOpen) {
    subcategoriesFilterUl.classList.remove("display-none");

    categoryBtn.style.backgroundColor = "var(--bg-color-2)";
    categoryBtn.style.fontWeight = "700";
    filterCategoriesChevron.forEach((chevron) =>
      chevron.classList.add("inverted")
    );

    isFilterSubcategoryOpen = true;
  } else {
    subcategoriesFilterUl.classList.add("display-none");

    categoryBtn.style.backgroundColor = "";
    categoryBtn.style.fontWeight = "";
    filterCategoriesChevron.forEach((chevron) =>
      chevron.classList.remove("inverted")
    );

    isFilterSubcategoryOpen = false;
  }
});
