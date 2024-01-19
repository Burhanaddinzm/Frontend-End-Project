"use strict";

const nameInput = document.getElementById("name");
const surnameInput = document.getElementById("surname");
const emailInput = document.getElementById("email");
const contactNumberInput = document.getElementById("contact-number");

const locationInput = document.getElementById("location");
const locationSpan = document.querySelector(".location-span");

const checkboxInput = document.getElementById("checkbox");

const submitBtn = document.getElementById("submit-btn");

const subtotal = document.getElementById("subtotal");
const deliveryFee = document.getElementById("delivery-fee");
const total = document.getElementById("total");

let inputChecked = checkboxInput.checked;

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
