"use strict";
// Sorting
const sortingContainer = document.querySelector(".sorting-container");
const sortingBtn = document.getElementById("sorting-btn");
const sortingCategories = document.getElementById("sorting-categories");

const sortDefaultBtn = document.getElementById("sort-default-btn");
const sortLowtHighBtn = document.getElementById("sort-lowt-high-btn");
const sortHightLowBtn = document.getElementById("sort-hight-low-btn");

// Filters
const clearFiltersBtn = document.getElementById("clear-filters-btn");

const fetchedFilterBrand = JSON.parse(localStorage.getItem("filterBrand"));
const fetchedFilterSubcategory = JSON.parse(
  localStorage.getItem("filterSubcategory")
);
const fetchedFilterSize = JSON.parse(localStorage.getItem("filterSize"));
const fetchedFilterColor = JSON.parse(localStorage.getItem("filterColor"));
const fetchedFilterOnsale = JSON.parse(localStorage.getItem("filterOnsale"));

// Products
const productsContainer = document.querySelector(".products-container");

// Page Nav
const pageNavigation = document.querySelector(".page-navigation");

let isSortingOpen = false;

// Sorting opening/colosing
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
    const itemsPerPage = 8;

    const response = await fetch("http://localhost:3000/products");
    const data = await response.json();

    const pages = paginate(filterData(data), itemsPerPage);

    handlePage(pages);
    sortData(filterData(data), itemsPerPage);
    resetFilters();
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
      previousBtn.setAttribute("disabled", "");
      nextBtn.classList.remove("disabled");
      nextBtn.removeAttribute("disabled");
    }
    if (pageIndex === pages.length - 1) {
      previousBtn.classList.remove("disabled");
      previousBtn.removeAttribute("disabled");
      nextBtn.classList.add("disabled");
      nextBtn.setAttribute("disabled", "");
    }
    if (pageIndex > 0 && pageIndex < pages.length - 1) {
      previousBtn.classList.remove("disabled");
      previousBtn.removeAttribute("disabled");
      nextBtn.classList.remove("disabled");
      nextBtn.removeAttribute("disabled");
    }
  };

  const activatePageButton = (pageIndex) => {
    pageButtons.forEach((button) => {
      button.classList.remove("active-page");
    });

    const buttonToActivate = pageButtons[pageIndex];
    if (buttonToActivate) {
      buttonToActivate.classList.add("active-page");
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
  pageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      pageIndex = parseInt(button.dataset.page);

      activatePageButton(pageIndex);

      displayProducts(pages[pageIndex]);
      disableButton(pageIndex);
    });
  });

  displayProducts(pages[pageIndex]);
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

// Sorting
const sortData = (data, itemsPerPage) => {
  window.addEventListener("click", (e) => {
    const clicked = e.target;

    if (clicked === sortDefaultBtn) {
      fetchProducts();
    }
    if (clicked === sortHightLowBtn) {
      data.sort((a, b) => b.price - a.price);
      const pages = paginate(data, itemsPerPage);
      handlePage(pages);
    }
    if (clicked === sortLowtHighBtn) {
      data.sort((a, b) => a.price - b.price);
      const pages = paginate(data, itemsPerPage);
      handlePage(pages);
    }
  });
};

// Brands
const fetchBrand = async () => {
  try {
    const response = await fetch(`http://localhost:3000/brands`);
    const data = await response.json();
    displayBrands(data);
  } catch (error) {
    console.log("Failed to fetch brands data:" + error);
  }
};

const displayBrands = (brandsData) => {
  const brandsFilterUl = document.getElementById("brands-filter-ul");

  brandsFilterUl.innerHTML = "";

  brandsData.forEach((data) => {
    brandsFilterUl.innerHTML += `<li>
    <button data-brand="${
      Object.getOwnPropertyNames(data)[0]
    }" class="category-btn">${Object.getOwnPropertyNames(data)[0]}</button>
  </li>`;
  });
};

// Filter
const filterData = (data) => {
  const oldData = data;

  if (fetchedFilterBrand) {
    data = data.filter((item) => item.brand === fetchedFilterBrand);
  }
  if (fetchedFilterSubcategory) {
    data = data.filter((item) => item.subcategory === fetchedFilterSubcategory);
  }

  if (fetchedFilterSize) {
    data = data.filter((item) => item.sizes.includes(fetchedFilterSize));
  }

  if (fetchedFilterColor) {
    data = data.filter((item) => item.colors.includes(fetchedFilterColor));
  }

  if (fetchedFilterOnsale) {
    data = data.filter((item) => item.onsale);
  }

  if (
    (!fetchedFilterBrand &&
      !fetchedFilterSubcategory &&
      !fetchedFilterSize &&
      !fetchedFilterColor &&
      !fetchedFilterOnsale) ||
    data.length === 0
  ) {
    return oldData;
  } else {
    return data;
  }
};

const resetFilters = () => {
  localStorage.setItem("filterBrand", JSON.stringify(""));
  localStorage.setItem("filterSubcategory", JSON.stringify(""));
  localStorage.setItem("filterSize", JSON.stringify(""));
  localStorage.setItem("filterColor", JSON.stringify(""));
  localStorage.setItem("filterOnsale", JSON.stringify(""));
};

const handleFilter = () => {
  window.addEventListener("click", (e) => {
    const clicked = e.target;
    if (clicked.dataset.subcategory) {
      window.location.reload();
    }

    if (clicked.dataset.brand) {
      localStorage.setItem(
        "filterBrand",
        JSON.stringify(clicked.dataset.brand)
      );
      window.location.reload();
    }

    if (clicked.dataset.size) {
      localStorage.setItem("filterSize", JSON.stringify(clicked.dataset.size));
      window.location.reload();
    }

    if (clicked.dataset.color) {
      localStorage.setItem(
        "filterColor",
        JSON.stringify(clicked.dataset.color)
      );
      window.location.reload();
    }
  });
};

// Last minute implementation
clearFiltersBtn.addEventListener("click", async () => {
  try {
    const itemsPerPage = 8;

    const response = await fetch("http://localhost:3000/products");
    const data = await response.json();

    const pages = paginate(data, itemsPerPage);

    handlePage(pages);
    sortData(data, itemsPerPage);
  } catch (error) {
    console.log("Failed to fetch products:" + error);
  }
});

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

  // Filters opening/colosing
  if (clicked.classList.contains("categories")) {
    const filterWrapper = clicked.closest(".filter-wrapper");
    const filterSpan = clicked.children[0];

    if (filterSpan.textContent === "-") {
      filterSpan.textContent = "+";
    } else {
      filterSpan.textContent = "-";
    }

    filterWrapper.classList.toggle("open-filter");
    const categoriesFilterUls = document.querySelectorAll(
      "#categories-filter-ul"
    );

    categoriesFilterUls.forEach((ul) => {
      ul.classList.toggle("display-none");
    });
  }

  if (
    clicked.classList.contains("category-btn") &&
    clicked.nextElementSibling
  ) {
    const chevron = clicked.children[0];
    const subcategoriesFilterUl = clicked.nextElementSibling;
    chevron.classList.toggle("inverted");

    if (!clicked.style.fontWeight) {
      clicked.style.fontWeight = "700";
    } else {
      clicked.style.fontWeight = "";
    }
    subcategoriesFilterUl.classList.toggle("display-none");
  }

  if (clicked.classList.contains("brands")) {
    const filterWrapper = clicked.closest(".filter-wrapper");
    const filterSpan = clicked.children[0];

    if (filterSpan.textContent === "-") {
      filterSpan.textContent = "+";
    } else {
      filterSpan.textContent = "-";
    }

    filterWrapper.classList.toggle("open-filter");
    const brandsFilterUls = document.querySelectorAll("#brands-filter-ul");

    brandsFilterUls.forEach((ul) => {
      ul.classList.toggle("display-none");
    });
  }

  if (clicked.classList.contains("sizes")) {
    const filterWrapper = clicked.closest(".filter-wrapper");
    const filterSpan = clicked.children[0];

    if (filterSpan.textContent === "-") {
      filterSpan.textContent = "+";
    } else {
      filterSpan.textContent = "-";
    }

    filterWrapper.classList.toggle("open-filter");
    const sizesFilterUls = document.querySelectorAll("#sizes-filter-ul");

    sizesFilterUls.forEach((ul) => {
      ul.classList.toggle("display-none");
    });
  }

  if (clicked.classList.contains("colors")) {
    const filterWrapper = clicked.closest(".filter-wrapper");
    const filterSpan = clicked.children[0];

    if (filterSpan.textContent === "-") {
      filterSpan.textContent = "+";
    } else {
      filterSpan.textContent = "-";
    }

    filterWrapper.classList.toggle("open-filter");
    const colorsFilterUls = document.querySelectorAll("#colors-filter-ul");

    colorsFilterUls.forEach((ul) => {
      ul.classList.toggle("display-none");
    });
  }
});

fetchBrand();
fetchProducts();
handleFilter();
