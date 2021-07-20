import { getStorageItem, setStorageItem } from './utils.js';

const featuredContainer = document.querySelector('.featured-center');
let featuredProducts = [];

let store = [];
const setupStore = (products) => {
  store = products.map((product) => {
    const {
      id,
      fields: { company, colors, price, name, featured },
    } = product;
    const { url } = product.fields.image[0];

    if (featured) {
      featuredProducts.push(product);
    }
    return { id, featured, name, price, colors, company, image: url };
  });
  setStorageItem('store', store);
  //   displayFuturedProducts(featuredProducts);
};

// function displayFuturedProducts(arr) {
//   arr
//     .map((item) => {
//       const {
//         id,
//         fields: { company, colors, price, name, featured },
//       } = item;

//       const { url } = item.fields.image[0];
//       const article = document.createElement('article');
//       article.innerHTML = `
//     <article class="product">
//           <div class="product-container">
//             <img src="${url}" class="product-img img" alt="" />
//             <div class="product-icons">
//               <a href="product.html?id=${id}" class="product-icon"
//                 ><i class="fas fa-search"></i
//               ></a>
//               <button class="product-cart-btn product-icon" data-id="1">
//                 <i class="fas fa-shopping-cart"></i>
//               </button>
//             </div>
//           </div>
//           <footer>
//             <p class="product-name">${name}</p>
//             <h4 class="product-price">$${price}</h4>
//           </footer>
//         </article>
//     `;
//       featuredContainer.appendChild(article);
//     })
//     .join('');
// }

const findProduct = () => {};
export { store, setupStore, findProduct };
