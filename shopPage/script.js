"use strict";

const sortingContainer = document.querySelector(".sorting-container");
const sortingBtn = document.getElementById("sorting-btn");
const sortingCategories = document.getElementById("sorting-categories");

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
