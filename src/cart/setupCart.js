// import
import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from '../utils.js';
import { openCart } from './toggleCart.js';
import { findProduct } from '../store.js';
import addToCartDOM from './addToCartDOM.js';
// set items

const cartItemCountDOM = getElement('.cart-item-count');
const cartItemsDOM = getElement('.cart-items');
const cartTotalDOM = getElement('.cart-total');

let cart = getStorageItem('cart');

export const addToCart = (id) => {
  let item = cart.find((cartItem) => cartItem.id === id);

  if (!item) {
    let product = findProduct(id);
    product = { ...product, amount: 1 };
    cart.push(product);
    addToCartDOM(product);
  } else {
    const amount = increaseAmount(id);
    const items = [...cartItemsDOM.querySelectorAll('.cart-item-amount')];

    const newAmount = items.find((value) => value.dataset.id === id);
    newAmount.textContent = amount;
  }
  // add one to the item count
  displayCartItemCount();
  // display cart totals
  displayCartTotal();
  // set stuff to locale storage
  setStorageItem('cart', cart);

  openCart();
};

function displayCartItemCount() {
  const amount = cart.reduce((acc, curr) => {
    acc += curr.amount;
    return acc;
  }, 0);
  cartItemCountDOM.textContent = amount;
}
function displayCartTotal() {
  const total = cart.reduce((acc, curr) => {
    acc += curr.price * curr.amount;
    return acc;
  }, 0);
  cartTotalDOM.textContent = `total: ${formatPrice(total)}`;
}

function displayCartItemsDOM() {
  cart.forEach((cartItem) => {
    addToCartDOM(cartItem);
  });
}

function removeItem(id) {
  cart = cart.filter((item) => item.id !== id);
}

function increaseAmount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount + 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;
}
function decreaseAmount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount - 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;
}

function setupCartFunctionality() {
  cartItemsDOM.addEventListener('click', function (e) {
    const id = e.target.dataset.id; //for removeBtn
    const parentId = e.target.parentElement.dataset.id; //for up and down buttons with icons; the id is on their parent
    const parent = e.target.parentElement;
    //remove
    if (e.target.classList.contains('cart-item-remove-btn')) {
      removeItem(id);
      e.target.parentElement.parentElement.remove();
    }
    //increase
    if (parent.classList.contains('cart-item-increase-btn')) {
      const newAmount = increaseAmount(parentId);
      parent.nextElementSibling.textContent = newAmount;
    }
    //decrease
    if (parent.classList.contains('cart-item-decrease-btn')) {
      const newAmount = decreaseAmount(parentId);
      if (newAmount > 0) {
        parent.previousElementSibling.textContent = newAmount;
      } else {
        removeItem(parentId);
        console.log(cart);

        parent.parentElement.parentElement.remove();
      }
    }

    displayCartItemCount();
    displayCartTotal();
    setStorageItem('cart', cart);
  });
}

const init = () => {
  displayCartItemCount();
  displayCartTotal();
  displayCartItemsDOM();
  setupCartFunctionality();
};
init();
