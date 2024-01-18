"use strict";

const fetchedProductId = JSON.parse(localStorage.getItem("selectedProductId"));

const subcategory = document.getElementById("subcategory");
const name = document.getElementById("name");
const brand = document.getElementById("brand");
const price = document.getElementById("price");
const description = document.getElementById("description");

const fetchProduct = async () => {
  const response = await fetch(
    `http://localhost:3000/products?id=${fetchedProductId}`
  );
  const data = await response.json();
  console.log(...data);

  displayProduct(...data);
};

const displayProduct = (product) => {
  const discountedPrice = (
    product.price -
    product.price * (product.discount / 100)
  ).toFixed(2);
  subcategory.textContent = product.subcategory;
  name.textContent = product.name;
  brand.textContent = product.brand;
  if (!product.onsale) {
    price.innerHTML = `AZN ${product.price.toFixed(2)}`;
  } else {
    price.classList.add("discount");
    price.innerHTML = `<p>AZN ${product.price.toFixed(2)}</p>
    <span>AZN ${discountedPrice}</span>`;
  }
  description.textContent = product.description;
};

fetchProduct();
