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

// Fetch Products
const fetchProducts = async () => {
  try {
    const response = await fetch("http://localhost:3000/products");
    const data = await response.json();
    console.log(data);

    const itemsPerPage = 12;
    const pages = paginate(data, itemsPerPage);
    console.log(pages);

    handlePage(pages);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// Pagination
const paginate = (data, itemsPerPage) => {
  const pages = [];
  for (let i = 0; i < data.length; i += itemsPerPage) {
    const pageArray = data.slice(i, i + itemsPerPage);
    pages.push(pageArray);
  }
  return pages;
};

// Page Handler
const handlePage = (pages) => {
  let pageIndex = 0;

  displayProducts(pages[pageIndex]);

  pageNavigation.innerHTML = "";

  for (let i = 0; i < pages.length; i++) {
    pageNavigation.innerHTML += `
    <button data-page="${i}" id="page-btn">${i + 1}</button>`;
  }

  const pageButtons = document.querySelectorAll("#page-btn");

  const previousBtn = document.createElement("button");
  previousBtn.id = "prev-page";
  previousBtn.textContent = "Əvvəlki";
  pageNavigation.insertAdjacentElement("afterbegin", previousBtn);

  const nextBtn = document.createElement("button");
  nextBtn.id = "next-page";
  nextBtn.textContent = "Növbəti";
  pageNavigation.insertAdjacentElement("beforeend", nextBtn);

  const disableButton = (pageIndex) => {
    if (pageIndex === 0) {
      previousBtn.classList.add("disabled");
      previousBtn.setAttribute("disabled", true);
      nextBtn.classList.remove("disabled");
      nextBtn.removeAttribute("disabled");
    }
    if (pageIndex === pages.length - 1) {
      previousBtn.classList.remove("disabled");
      previousBtn.removeAttribute("disabled");
      nextBtn.classList.add("disabled");
      nextBtn.setAttribute("disabled", true);
    }
  };

  previousBtn.addEventListener("click", () => {
    pageIndex--;
    activatePageButton(pageIndex);
    displayProducts(pages[pageIndex]);
    disableButton(pageIndex);
  });

  nextBtn.addEventListener("click", () => {
    pageIndex++;
    activatePageButton(pageIndex);
    displayProducts(pages[pageIndex]);
    disableButton(pageIndex);
  });

  const activatePageButton = (pageIndex) => {
    pageButtons.forEach((button) => {
      button.classList.remove("active-page");
    });

    const buttonToActivate = pageButtons[pageIndex];
    if (buttonToActivate) {
      buttonToActivate.classList.add("active-page");
    }
  };
  pageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      pageIndex = parseInt(button.dataset.page);

      activatePageButton(pageIndex);

      displayProducts(pages[pageIndex]);
      disableButton(pageIndex);
    });
  });

  activatePageButton(pageIndex);
  disableButton(pageIndex);
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

window.addEventListener("click", (e) => {
  const clicked = e.target;

  // Sorting
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

fetchProducts();
