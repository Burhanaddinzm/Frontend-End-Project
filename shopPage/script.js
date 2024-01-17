"use strict";
// Sorting
const sortingContainer = document.querySelector(".sorting-container");
const sortingBtn = document.getElementById("sorting-btn");
const sortingCategories = document.getElementById("sorting-categories");

const sortDefaultBtn = document.getElementById("sort-default-btn");
const sortLowtHighBtn = document.getElementById("sort-lowt-high-btn");
const sortHightLowBtn = document.getElementById("sort-hight-low-btn");

// Products
const productsContainer = document.querySelector(".products-container");

// Page Nav
const pageNavigation = document.querySelector(".page-navigation");

//// Filter open for later
// filterWrapper.classList.add("open-filter");
// filtersPlusMinus.textContent = "-";
// categoriesFilterUl.classList.remove("display-none");

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

// Datafetch
const fetchData = async () => {
  const response = await fetch("http://localhost:3000/products");
  const data = await response.json();
  console.log(data);
  displayProducts(data);
};

// Display Products
const displayProducts = (products) => {
  productsContainer.innerHTML = "";

  products.forEach((product) => {
    productsContainer.innerHTML += `
    <a href="../productPage/product.html">
    <div data-${product.id} class="product">
      <div id="product-img">
        <img
          src="${
            product.colors.length === 0
              ? Object.values(product.images.default)[0]
              : Object.values(product.images.white)[0]
          }"
          alt=""
        />
      </div>
      <p id="product-name">${product.name}</p>
      <span id="product-price">AZN ${product.price.toFixed(2)}</span>
    </div>
  </a>`;
  });
};

// Handle Pages
const handlePages = () => {};

fetchData();
