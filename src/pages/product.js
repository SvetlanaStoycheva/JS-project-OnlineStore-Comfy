// global imports
import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';
// specific
import { addToCart } from '../cart/setupCart.js';
import { singleProductUrl, getElement, formatPrice } from '../utils.js';

// selections
const loading = getElement('.page-loading');
const centerDOM = getElement('.single-product-center');
const pageTitleDOM = getElement('.page-hero-title');

// cart product
// let productID;

// show product when page loads
window.addEventListener('DOMContentLoaded', async () => {
  loading.style.display = 'none';
  const urlId = location.search;

  try {
    const response = await fetch(`${singleProductUrl}${urlId}`);
    if (response.status >= 200 && response.status <= 299) {
      const data = await response.json();
      //   console.log(data.fields);
      displaySingleProduct(data, centerDOM);

      const cartBtn = getElement('.addToCartBtn');
      cartBtn.addEventListener('click', function () {
        const id = cartBtn.dataset.id;
        addToCart(id);
      });
    } else {
      console.log(response.status, response.statusText);
      centerDOM.innerHTML = `
        <div>
        <h3 class="error">sorry, something went wrong</h3>
        <a href="index.html" class="btn">back home</a>
        </div>
        `;
    }
  } catch (error) {
    //   handling the network error
    console.log(error);
  }
});

const displaySingleProduct = (product, domContainer) => {
  const { id } = product;
  const { name, price, image, colors, company, description } = product.fields;
  const { url } = image[0];

  document.title = `${name.toUpperCase()} | Comfy`;
  pageTitleDOM.textContent = `Home / ${name}`;

  domContainer.innerHTML = `
        <img
          src="${url}"
          class="img single-product-img"
          alt="${name}"
        />
        <article class="single-product-info">
          <div>
            <h2 class="single-product-title">${name}</h2>
            <p class="single-product-company text-slanted">By ${company}</p>
            <p class="single-product-price">${formatPrice(price)}</p>
            ${colors
              .map((color) => {
                return `
                 <div class="product-color" style="background: ${color}" ></div>
                `;
              })
              .join('')}
            <p class="single-product-desc">
              ${description}
            </p>
            <button class="btn addToCartBtn" data-id="${id}">add to cart</button>
          </div>
        </article>
  `;
};
