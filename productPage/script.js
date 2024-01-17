"use strict";

const fetchedProductId = JSON.parse(localStorage.getItem("selectedProductId"));

const fetchProduct = async () => {
  const response = await fetch(
    `http://localhost:3000/products?id=${fetchedProductId}`
  );
  const data = await response.json();
  console.log(data);
};

fetchProduct();
