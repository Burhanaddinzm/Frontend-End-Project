"use strict";

const sortingContainer = document.querySelector(".sorting-container");
const sortingBtn = document.getElementById("sorting-btn");
const sortingCategories = document.getElementById("sorting-categories");

const sortDefaultBtn = document.getElementById("sort-default-btn");
const sortLowtHighBtn = document.getElementById("sort-lowt-high-btn");
const sortHightLowBtn = document.getElementById("sort-hight-low-btn");

//// Filter experimental
// const filterWrapper = document.querySelectorAll(".filter-wrapper");
// const filterBtn = document.querySelectorAll("#filter-btn");
// const categoriesFilterUl = document.getElementById("categories-filter-ul");
// const categoryBtn = document.querySelectorAll(".category-btn");
// const filtersPlusMinus = document.getElementById("filters-plus-minus");
//// Filter open for later
// filterWrapper.style.borderRadius = "12px";
// filterBtn.style.borderBottom = "1px solid var(--border-color)";
// filterBtn.style.backgroundColor = "var(--bg-color-3)";
// filtersPlusMinus.textContent = "-";
// categoriesFilterUl.classList.remove("display-none");
// isFilterOpen = true;

const filterCategoriesChevron = document.querySelectorAll(
  "#categories-filter-ul img"
);

const subcategoriesFilterUl = document.getElementById(
  "subcategories-filter-ul"
);

let isSortingOpen = false;

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
  // Sorting
  if (!e.target.closest(".sorting-container")) {
    sortingContainer.style.borderRadius = "";
    sortingContainer.style.borderBottom = "";

    sortingBtn.style.borderBottom = "";

    sortingCategories.classList.add("display-none");
    isSortingOpen = false;
  }
});
