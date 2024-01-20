"use strict";

const nameInput = document.getElementById("name");
const surnameInput = document.getElementById("surname");
const emailInput = document.getElementById("email");
const contactNumberInput = document.getElementById("contact-number");

const locationInput = document.getElementById("location");
const locationSpan = document.querySelector(".location-span");

const checkboxInput = document.getElementById("checkbox");

const submitBtn = document.getElementById("submit-btn");

const subtotalEl = document.getElementById("subtotal");
const deliveryFee = document.getElementById("delivery-fee");
const totalEl = document.getElementById("total");

const itemsContainer = document.querySelector(".items-container");

let inputChecked = checkboxInput.checked;

let subtotal = 0;

// Form functionality
const checkInputs = () => {
  if (
    nameInput.value.length > 0 &&
    surnameInput.value.length > 0 &&
    emailInput.value.length > 0 &&
    contactNumberInput.value.split(" ").join("").length === 13
  ) {
    if (inputChecked && locationInput.value.length > 0) {
      submitBtn.disabled = false;
      submitBtn.classList.remove("disabled");
    } else if (!inputChecked) {
      submitBtn.disabled = false;
      submitBtn.classList.remove("disabled");
    } else {
      submitBtn.disabled = true;
      submitBtn.classList.add("disabled");
    }
  } else {
    submitBtn.disabled = true;
    submitBtn.classList.add("disabled");
  }

  displayPrice();
};

checkboxInput.addEventListener("change", () => {
  if (checkboxInput.checked) inputChecked = true;
  else inputChecked = false;

  if (inputChecked) {
    deliveryFee.textContent = "AZN 5.00";
    locationSpan.textContent = "*";
    locationSpan.style.color = "red";
  } else {
    deliveryFee.textContent = "AZN 0.00";
    locationSpan.textContent = "(Seçimlik)";
    locationSpan.style.color = "";
  }
  checkInputs();
});

[
  locationInput,
  nameInput,
  surnameInput,
  emailInput,
  contactNumberInput,
].forEach((input) => {
  input.addEventListener("input", checkInputs);
});

const fetchCart = async () => {
  try {
    const response = await fetch("http://localhost:3000/cart");
    const data = await response.json();

    console.log(data);
    displayItems(data);
  } catch (error) {
    alert("Error fetching cart data:" + error);
  }
};

const displayItems = (cartData) => {
  itemsContainer.innerHTML = "";

  cartData.forEach((item) => {
    itemsContainer.innerHTML += `<div class="item">
    <div class="wrapper">
      <div id="item-img" class="img-container">
        <img
          src="${item.image}"
          alt=""
        />
      </div>
      <div class="name-size-container">
        <a href="../productPage/product.html" id="item-name"
          >${item.name}</a
        >
        ${item.size ? `<span id="size">${item.size}</span>` : ""}
      </div>
    </div>
    <div class="price-container">
      <p id="price-count">AZN ${item.price.toFixed(2)} x ${item.count}</p>
    </div>
  </div>`;

    subtotal += item.price * item.count;
  });

  displayPrice();
};

const displayPrice = () => {
  subtotalEl.textContent = `AZN ${subtotal.toFixed(2)}`;
  inputChecked
    ? (totalEl.textContent = `AZN ${(subtotal + 5).toFixed(2)}`)
    : (totalEl.textContent = `AZN ${subtotal.toFixed(2)}`);
};

window.addEventListener("click", (e) => {
  const clicked = e.target;

  // Set localstorage product name
  if (clicked.id === "item-name") {
    localStorage.setItem(
      "selectedProductName",
      JSON.stringify(clicked.textContent)
    );
  }
});

fetchCart();
