$(document).ready(function () {
  $(".overlay-cross--right").on("click", function () {
    $(".overlay--right").toggleClass("overlay-active");
  });
});

const itemsInCart = [];

function addElementToTheCart(e, result) {
  // 1) Making Ajax request
  // 2) Checking if it is already in the cart
  // 3) Adding the number if it is
  // 3) Drawing a new element in the cart if it isn't there
  // 4) Changing the sum
  // 5) Changing cart number
  // 6) Saving to the localstorage
}

function getFromLocalStorage() {
  // 1) Checking if there is anything in the localStorage
  // 2) Changing the cart number
  // 3) Drawing all the elements that are in a cart
}

function saveToLocalStorage() {}

function countSum() {}

function returnMarkupForACartItem(id) {}

function removingItem() {}

function increasingItemCount() {}

function decreasingItemCount() {}
