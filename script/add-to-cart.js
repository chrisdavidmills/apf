// basic setup

const cartBtns = document.querySelectorAll('.add-to-cart-btn');
const cartPopup = document.querySelector('#cart-popup');
const cartNavItem = document.querySelector('.cart');
let cartItemText = document.querySelector('.cart span');
let cartItemCount = 0;

for(let i = 0; i < cartBtns.length; i++) {
  cartBtns[i].addEventListener('click', addToCart);
}

function addToCart() {
  let popup = document.createElement('p');
  popup.setAttribute('id', 'cart-popup');
  popup.textContent = 'Item Added to cart';

  let popupRect = popup.getBoundingClientRect();

  if(!checkViewport()) {
    popup.style.top = '20px';
    popup.style.right = popupRect.width + 20 + 'px';
  } else {
    popup.style.position = 'fixed';
    popup.style.top = '40px';
    popup.style.right = '10px';
  }

  cartNavItem.appendChild(popup);

  popup.setAttribute('class', 'cart-appear');
  cartItemCount++;

  for(let i = 0; i < cartBtns.length; i++) {
    cartBtns[i].disabled = true;
  }

  if(cartItemCount < 10) {
    cartItemText.textContent = 'Cart [' + cartItemCount +']';
  } else {
    cartItemText.text.textContent = 'Cart [9+]';
  }

  setTimeout(function() {
    popup.setAttribute('class', 'cart-disappear');

    for(let i = 0; i < cartBtns.length; i++) {
      cartBtns[i].disabled = false;
    }

    setTimeout(function() {
      cartNavItem.removeChild(popup);
    }, 1000);
  }, 3000);
}
