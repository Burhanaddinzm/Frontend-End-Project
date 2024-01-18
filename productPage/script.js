"use strict";

const fetchedProductId = JSON.parse(localStorage.getItem("selectedProductId"));

const subcategory = document.getElementById("subcategory");
const name = document.getElementById("name");
const brand = document.getElementById("brand");
const price = document.getElementById("price");
const description = document.getElementById("description");

const sizeContainer = document.querySelector(".size-container");

const colorContainer = document.querySelector(".color-container");

const imgSlider = document.querySelector(".img-slider");

const mainImage = document.querySelector(".main-image img");

let pickedSize;
let pickedColor;
let pickedCount;
let pickedName;
let pickedPrice;
let pickedImage;

const fetchProduct = async () => {
  try {
    const response = await fetch(
      `http://localhost:3000/products?id=${fetchedProductId}`
    );
    const data = await response.json();
    console.log(...data);

    displayProduct(...data);
  } catch (error) {
    console.error("Failed to fetch data:" + error);
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

  handleSliderBtns();
  handleImage();
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
