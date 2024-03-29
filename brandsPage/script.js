"use strict";

const cardContainer = document.querySelector(".card-container");

const fetchBrands = async () => {
  try {
    const response = await fetch("http://localhost:3000/brands");
    const data = await response.json();

    displayBrands(data);
  } catch (error) {
    alert("Failed to fetch data" + error);
  }
};

const displayBrands = (brands) => {
  cardContainer.innerHTML = "";

  brands.forEach((brand) => {
    console.dir();
    cardContainer.innerHTML += `<div data-brand="${
      Object.getOwnPropertyNames(brand)[0]
    }" class="card">
  <a href="../shopPage/shop.html">
    <div class="img-container">
      <img src="${Object.values(brand)[0]}" alt="" />
    </div>
  </a>
  <span>${Object.getOwnPropertyNames(brand)[0]}</span>
  </div>`;
  });
};

window.addEventListener("click", (e) => {
  const clicked = e.target;

  if (clicked.closest(".card")) {
    const selectedBrand = clicked.closest(".card").dataset.brand;

    localStorage.setItem("filterBrand", JSON.stringify(selectedBrand));
  }
});

fetchBrands();
