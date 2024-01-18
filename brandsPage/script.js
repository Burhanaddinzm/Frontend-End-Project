"use strict";

const cardContainer = document.querySelector(".card-container");

const fetchBrands = async () => {
  try {
    const response = await fetch("http://localhost:3000/brands");
    const data = await response.json();
    console.log(data);

    displayBrands(data);
  } catch (error) {
    console.error("Failed to fetch data" + error);
  }
};

const displayBrands = (brands) => {
  cardContainer.innerHTML = "";

  brands.forEach((brand) => {
    cardContainer.innerHTML += `<div data-brand="${Object.keys(
      brand
    )}" class="card">
  <a href="../shopPage/shop.html">
    <div class="img-container">
      <img src="${Object.values(brand)}" alt="" />
    </div>
  </a>
  <span>${Object.keys(brand)}</span>
  </div>`;
  });
};

window.addEventListener("click", (e) => {
  const clicked = e.target;

  if (clicked.closest(".card")) {
    const selectedBrand = clicked.closest(".card").dataset.brand;

    localStorage.setItem("selectedBrand", JSON.stringify(selectedBrand));
  }
});

fetchBrands();
