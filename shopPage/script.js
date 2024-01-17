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

// Datafetch
const fetchData = async () => {
  const response = await fetch("http://localhost:3000/products");
  const data = await response.json();
  console.log(data);
  displayProducts(data);
};

// Display Products
const displayProducts = (products) => {
  let mainImage;

  productsContainer.innerHTML = "";

  products.forEach((product) => {
    if (product.colors.length === 0) {
      mainImage = Object.values(product.images.default)[0];
    } else {
      mainImage = Object.values(product.images).flat()[0];
    }

    productsContainer.innerHTML += `
    <a href="../productPage/product.html">
    <div data-id="${product.id}" class="product">
      <div id="product-img">
        <img
          src="${mainImage}"
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

window.addEventListener("click", (e) => {
  // Sorting
  const clicked = e.target;

  if (!clicked.closest(".sorting-container")) {
    sortingContainer.style.borderRadius = "";
    sortingContainer.style.borderBottom = "";

    sortingBtn.style.borderBottom = "";

    sortingCategories.classList.add("display-none");
    isSortingOpen = false;
  }

  // productID
  if (clicked.closest(".product")) {
    const selectedProductId = clicked.closest(".product").dataset.id;
    localStorage.setItem(
      "selectedProductId",
      JSON.stringify(selectedProductId)
    );
  }
});

fetchData();
