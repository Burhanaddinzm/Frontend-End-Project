"use strict";

const cartContainer = document.querySelector(".cart-container");

const orderBtn = document.getElementById("order-btn");
const clearBtn = document.getElementById("clear-btn");

const fetchProducts = async (cartData) => {
  const response = await fetch(`http://localhost:3000/products`);
  const data = await response.json();

  modifyCart(cartData, data);
};

const fetchCart = async () => {
  try {
    const response = await fetch(`http://localhost:3000/cart`);
    const data = await response.json();
    console.log(data);

    fetchProducts(data);
    displayCart(data);
  } catch (error) {
    console.log("Failed to fetch cart data:" + error);
  }
};

fetchCart();

const displayCart = (cartData) => {
  cartContainer.innerHTML = "";

  if (cartData.length === 0) {
    orderBtn.setAttribute("disabled", "");
    orderBtn.classList.add("disabled");

    clearBtn.setAttribute("disabled", "");
    clearBtn.classList.add("disabled");

    return;
  }

  cartData.forEach((item) => {
    cartContainer.innerHTML += `<div class="cart-item">
    <div id="item-img">
      <img
        src="${item.image}"
        alt=""
      />
    </div>
    <a href="../productPage/product.html">
      <div data-name="${item.name}" class="item-info">
        <p id="brand">${item.brand}</p>
        <h4 id="name">${item.name}</h4>
        ${item.size ? `<span id="size">${item.size}</span>` : ""}
      </div>
    </a>
    <div data-id="${item.id}" class="count-control">
      <div class="wrapper">
        <button id="decrement">-</button>
        <input id="count" value="${
          item.count
        }" min="1" max="10" type="number" />
        <button id="increment">+</button>
      </div>
      <button id="remove">
        <img src="../assets/icons/trash.svg" alt="" />
      </button>
    </div>
  </div>`;
  });

  //   Clear Button
  clearBtn.addEventListener("click", () => {
    handleClear(cartData);
  });
};

const deleteProduct = async (id) => {
  const response = await fetch(`http://localhost:3000/cart/${id}`, {
    method: "DELETE",
  });
};

const putProduct = async (id, item) => {
  const response = await fetch(`http://localhost:3000/cart/${id}`, {
    method: "PUT",
    body: JSON.stringify(item),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
};

const modifyCart = (cartData, productData) => {
  window.addEventListener("click", (e) => {
    const clicked = e.target;
    let itemId;
    let item;
    let product;
    if (clicked.closest(".count-control")) {
      itemId = clicked.closest(".count-control").dataset.id;
    }
    if (clicked.id === "decrement") {
      item = cartData.find((item) => item.id === itemId);
      product = productData.find(
        (productItem) => productItem.name === item.name
      );
      if (item.count > 1) item.count -= 1;
      else return;

      putProduct(itemId, item);
    }
    if (clicked.id === "increment") {
      item = cartData.find((item) => item.id === itemId);
      product = productData.find(
        (productItem) => productItem.name === item.name
      );
      if (item.count < product.stock) item.count += 1;
      else return;

      putProduct(itemId, item);
    }

    if (clicked.id === "remove") {
      deleteProduct(itemId);
    }
  });
};

const handleClear = (cartData) => {
  cartData.forEach((item) => {
    deleteProduct(item.id);
  });
};

window.addEventListener("click", (e) => {
  const clicked = e.target;

  // Set localstorage product name
  if (clicked.closest(".item-info"))
    localStorage.setItem(
      "selectedProductName",
      JSON.stringify(clicked.closest(".item-info").dataset.name)
    );
});
