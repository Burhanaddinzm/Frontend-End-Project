"use strict";

const fetchedProductId = JSON.parse(localStorage.getItem("selectedProductId"));
const fetchedProductName = JSON.parse(
  localStorage.getItem("selectedProductName")
);

const subcategory = document.getElementById("subcategory");
const name = document.getElementById("name");
const brand = document.getElementById("brand");
const price = document.getElementById("price");
const description = document.getElementById("description");

const sizeContainer = document.querySelector(".size-container");

const colorContainer = document.querySelector(".color-container");

const imgSlider = document.querySelector(".img-slider");

const mainImage = document.querySelector(".main-image img");

const stock = document.getElementById("stock");

const addToCartBtn = document.getElementById("add-btn");

const decrementBtn = document.getElementById("decrement-btn");
const incrementBtn = document.getElementById("increment-btn");
const countEl = document.getElementById("count");

let pickedSize;
let pickedColor;
let pickedCount;
let pickedName;
let pickedPrice;
let pickedImage;
let pickedBrand;

const fetchProduct = async () => {
  try {
    if (!fetchedProductName) {
      const response = await fetch(
        `http://localhost:3000/products?id=${fetchedProductId}`
      );
      const data = await response.json();
      console.log(...data);

      displayProduct(...data);
    } else {
      const response = await fetch(
        `http://localhost:3000/products?name=${fetchedProductName}`
      );
      const data = await response.json();
      console.log(...data);

      displayProduct(...data);
    }
    localStorage.setItem("selectedProductName", JSON.stringify(""));
  } catch (error) {
    console.log("Failed to fetch data:" + error);
  }
};

const displayProduct = (product) => {
  const discountedPrice = (
    product.price -
    product.price * (product.discount / 100)
  ).toFixed(2);

  subcategory.textContent = product.subcategory;
  name.textContent = product.name;
  brand.textContent = product.brand;
  description.textContent = product.description;

  if (!product.onsale) {
    price.innerHTML = `AZN ${product.price.toFixed(2)}`;
  } else {
    price.classList.add("discount");
    price.innerHTML = `<p>AZN ${product.price.toFixed(2)}</p>
    <span>AZN ${discountedPrice}</span>`;
  }

  // Size----------------------------------------------------
  sizeContainer.innerHTML = "";

  if (product.sizes.length > 0) {
    sizeContainer.innerHTML = `<span>Ölçü seç:</span>`;

    product.sizes.forEach((size) => {
      sizeContainer.innerHTML += `
      <button id="size-btn">${size}</button>
      `;
    });

    const sizeBtn = document.querySelectorAll("#size-btn");

    if (sizeBtn.length === 1) {
      sizeBtn[0].classList.add("active");
      pickedSize = sizeBtn[0].textContent;
    } else {
      sizeBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
          removeActiveSize(sizeBtn);
          btn.classList.add("active");
          pickedSize = btn.textContent;
        });
      });

      const removeActiveSize = (sizeBtn) => {
        sizeBtn.forEach((btn) => {
          btn.classList.remove("active");
        });
      };
    }
  } else pickedSize = "";

  // Color----------------------------------------------------
  let colorImage;

  colorContainer.innerHTML = ``;

  if (product.colors.length > 0) {
    pickedColor = product.colors[0];

    product.colors.forEach((color) => {
      // Object finding keys and values (i am going mad :))
      const matchingKey = Object.keys(product.images).find(
        (key) => key === color
      );
      const colorImage = product.images[matchingKey][0];

      colorContainer.innerHTML += `<button data-color="${color}" id="color">
      <img
      src="${colorImage}"
      alt="Color"
      />
    </button>`;
    });

    const colorBtn = document.querySelectorAll("#color");

    colorBtn[0].classList.add("active");

    colorBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        removeActiveColor(colorBtn);
        btn.classList.add("active");
        pickedColor = btn.dataset.color;
        handleImage();
      });
    });

    const removeActiveColor = (colorBtn) => {
      colorBtn.forEach((btn) => {
        btn.classList.remove("active");
      });
    };
  } else pickedColor = "";

  // Image------------------------------------------------
  imgSlider.innerHTML = "";

  // Slider Back Btn
  const sliderBackBtn = document.createElement("button");
  sliderBackBtn.setAttribute("disabled", "");
  sliderBackBtn.className = "display-none";
  sliderBackBtn.id = "slider-back-btn";
  sliderBackBtn.innerHTML = `<img src="../assets/icons/chevron.svg" alt="arrow left" />`;

  // Slider Next Btn
  const sliderNextBtn = document.createElement("button");
  sliderNextBtn.id = "slider-next-btn";
  sliderNextBtn.innerHTML = `<img src="../assets/icons/chevron.svg" alt="arrow right" />`;

  // Slider Wrapper
  const sliderWrapper = document.createElement("div");
  sliderWrapper.className = "slider-wrapper";

  // Slider Container
  const sliderContainer = document.createElement("div");
  sliderContainer.className = "slider-container";

  const handleImage = () => {
    if (!pickedColor) {
      mainImage.src = product.images.default[0];
      pickedImage = product.images.default[0];

      sliderContainer.innerHTML = ``;

      product.images.default.forEach((image) => {
        sliderContainer.innerHTML += `<img
      src="${image}"
      alt="product image"
      s/>`;
      });

      sliderWrapper.appendChild(sliderContainer);
      imgSlider.append(sliderWrapper);
    } else {
      mainImage.src = product.images[pickedColor][0];
      pickedImage = product.images[pickedColor][0];

      sliderContainer.innerHTML = ``;

      product.images[pickedColor].forEach((image) => {
        sliderContainer.innerHTML += `<img
      src="${image}"
      alt="product image"
      />`;
      });

      sliderWrapper.appendChild(sliderContainer);
      imgSlider.append(sliderWrapper);
    }

    // Image Slider
    const imageSlider = () => {
      sliderContainer.style.transform = `translateX(0)`;

      let index = 0;

      const images = document.querySelectorAll(".slider-container img");

      sliderBackBtn.addEventListener("click", () => {
        if (index === 0) {
          sliderBackBtn.setAttribute("disabled", "");
          sliderBackBtn.classList.add("display-none");
        } else {
          sliderBackBtn.removeAttribute("disabled");
          sliderBackBtn.classList.remove("display-none");
          index--;
        }
        sliderNextBtn.removeAttribute("disabled");
        sliderNextBtn.classList.remove("display-none");
        sliderContainer.style.transform = `translateX(-${index * 92}px)`;
      });

      if (windowWidth >= 1440) {
        sliderNextBtn.addEventListener("click", () => {
          if (index === images.length - 5) {
            sliderNextBtn.setAttribute("disabled", "");
            sliderNextBtn.classList.add("display-none");
          } else {
            sliderNextBtn.removeAttribute("disabled");
            sliderNextBtn.classList.remove("display-none");
            index++;
          }
          sliderBackBtn.removeAttribute("disabled");
          sliderBackBtn.classList.remove("display-none");
          sliderContainer.style.transform = `translateX(-${index * 92}px)`;
        });
      } else if (windowWidth >= 1024 && windowWidth < 1440) {
        sliderNextBtn.addEventListener("click", () => {
          if (index === images.length - 3) {
            sliderNextBtn.setAttribute("disabled", "");
            sliderNextBtn.classList.add("display-none");
          } else {
            sliderNextBtn.removeAttribute("disabled");
            sliderNextBtn.classList.remove("display-none");
            index++;
          }
          sliderBackBtn.removeAttribute("disabled");
          sliderBackBtn.classList.remove("display-none");
          sliderContainer.style.transform = `translateX(-${index * 92}px)`;
        });
      } else {
        sliderContainer.style.transform = `translateX(0)`;
      }

      images[0].style.borderColor = "rgb(255, 220, 220)";

      images.forEach((image) => {
        image.addEventListener("click", () => {
          removeActiveImage();
          image.style.borderColor = "rgb(255, 220, 220)";
          mainImage.src = image.src;
        });
      });

      const removeActiveImage = () => {
        images.forEach((image) => {
          image.style.borderColor = "";
        });
      };
    };

    window.addEventListener("resize", () => {
      handleSliderBtns();
      imageSlider();
    });
    imageSlider();
  };

  const handleSliderBtns = () => {
    if (!pickedColor) {
      if (windowWidth >= 1440 && product.images.default.length > 5) {
        imgSlider.insertAdjacentElement("afterbegin", sliderBackBtn);
        imgSlider.insertAdjacentElement("Beforeend", sliderNextBtn);
      } else if (
        windowWidth >= 1024 &&
        windowWidth < 1440 &&
        product.images.default.length > 3
      ) {
        imgSlider.insertAdjacentElement("afterbegin", sliderBackBtn);
        imgSlider.insertAdjacentElement("Beforeend", sliderNextBtn);
      } else {
        sliderBackBtn.remove();
        sliderNextBtn.remove();
      }
    } else {
      if (windowWidth >= 1440 && product.images[pickedColor].length > 5) {
        imgSlider.insertAdjacentElement("afterbegin", sliderBackBtn);
        imgSlider.insertAdjacentElement("Beforeend", sliderNextBtn);
      } else if (
        windowWidth >= 1024 &&
        windowWidth < 1440 &&
        product.images[pickedColor].length > 3
      ) {
        imgSlider.insertAdjacentElement("afterbegin", sliderBackBtn);
        imgSlider.insertAdjacentElement("Beforeend", sliderNextBtn);
      } else {
        sliderBackBtn.remove();
        sliderNextBtn.remove();
      }
    }
  };

  // Stock
  if (!product.stock) {
    stock.textContent = `Stokda yoxdur. Sifariş etmək üçün
    Whatsapp və ya Instagram adresimizlə əlaqə saxlayın.`;
    stock.style.color = "red";

    addToCartBtn.setAttribute("disabled", "");
    addToCartBtn.className = "disabled";
  } else if (product.stock === 1) {
    stock.textContent = `Yalnız bir ədəd qalıb`;
  } else {
    stock.textContent = `Stokda ${product.stock} ədəd var`;
  }

  const handleAddToCart = (product) => {
    pickedCount = 1;
    countEl.value = pickedCount;

    // Picked Stuff Asignment
    pickedBrand = product.brand;
    pickedName = product.name;
    if (!product.onsale) parseInt((pickedPrice = product.price));
    else
      pickedPrice = parseInt(
        product.price - product.price * (product.discount / 100)
      );

    // Input interactionions
    if (product.stock === 1) {
    } else if (product.stock > 1 && product.stock <= 10) {
      decrementBtn.addEventListener("click", () => {
        if (pickedCount > 1) {
          pickedCount--;
        }
        countEl.value = pickedCount;
      });
      incrementBtn.addEventListener("click", () => {
        if (pickedCount < product.stock) {
          pickedCount++;
        }
        countEl.value = pickedCount;
      });
    } else {
      decrementBtn.addEventListener("click", () => {
        if (pickedCount > 1) {
          pickedCount--;
        }
        countEl.value = pickedCount;
      });
      incrementBtn.addEventListener("click", () => {
        if (pickedCount < 10) {
          pickedCount++;
        }
        countEl.value = pickedCount;
      });
    }

    addToCartBtn.addEventListener("click", () => {
      const selectedProduct = {
        size: pickedSize,
        color: pickedColor,
        count: pickedCount,
        name: pickedName,
        price: pickedPrice,
        image: pickedImage,
        brand: pickedBrand,
      };

      if (product.sizes.length > 1 && !pickedSize) {
        alert("Please select a size before adding to cart!");
        return;
      }

      checkCart(selectedProduct, product);
    });
  };

  handleAddToCart(product);
  handleSliderBtns();
  handleImage();
};

const checkCart = async (selectedProduct, product) => {
  const response = await fetch("http://localhost:3000/cart");
  const data = await response.json();

  if (data.length > 0) {
    const matchingItem = data.find(
      (item) =>
        item.size === selectedProduct.size &&
        item.color === selectedProduct.color &&
        item.name === selectedProduct.name
    );

    if (matchingItem) {
      const countToCheck = selectedProduct.count + matchingItem.count;

      if (countToCheck > product.stock) {
        alert("This count exceeds stock!");
        return;
      } else {
        putToCart(selectedProduct, matchingItem);
      }
    } else {
      postToCart(selectedProduct);
    }
  } else {
    postToCart(selectedProduct);
  }
};

const postToCart = async (product) => {
  const response = await fetch("http://localhost:3000/cart", {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await response.json();
};

const putToCart = async (product, cartData) => {
  product.count += cartData.count;

  const response = await fetch(`http://localhost:3000/cart/${cartData.id}`, {
    method: "PUT",
    body: JSON.stringify(product),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });

  const data = await response.json();
};

window.addEventListener("click", (e) => {
  const clicked = e.target;

  // Subcategory
  if (clicked.id === "subcategory") {
    localStorage.setItem(
      "productPageSubcategory",
      JSON.stringify(clicked.textContent)
    );
  }
});

fetchProduct();
