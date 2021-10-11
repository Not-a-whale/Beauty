/* links to elements */

const mainMenuDropDownListItem = document.getElementById(
  "mainMenuDropDownListItem"
);
const headerDropdownNav = document.getElementById("headerDropdownNav");

/* Class name constants */

const display = "display";

/* Other constants */

const resolution = window.screen.availWidth;
isMenuOpen = false;

/* Functions */

function toggleDisplayElement(elem) {
  const classList = [...elem.classList];
  const parrentsArray = [];
  !classList.includes(display)
    ? elem.classList.add(display)
    : elem.classList.remove(display);
}

function DisplayElement(elem) {
  elem.classList.add(display);
}

/* Event listeners */

mainMenuDropDownListItem.addEventListener("click", (e) => {
  if (resolution > 768) {
    toggleDisplayElement(headerDropdownNav);
  }
});

mainMenuDropDownListItem.addEventListener("mouseenter", (e) => {
  if (resolution > 768) {
    DisplayElement(headerDropdownNav);
  }
});

$("body").on("mousedown", "img", function (e) {
  e.stopPropagation();
  e.preventDefault();
});

document.addEventListener("DOMContentLoaded", function () {
  $("#searchScreen").hide();
  let lazyBackgrounds = [].slice.call(
    document.querySelectorAll(".lazy-background")
  );

  if ("IntersectionObserver" in window) {
    let lazyBackgroundObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          lazyBackgroundObserver.unobserve(entry.target);
        }
      });
    });

    lazyBackgrounds.forEach(function (lazyBackground) {
      lazyBackgroundObserver.observe(lazyBackground);
    });
  }
});

/* Dropdown opening, closing, filling */

$(".disclosure").on("click", function () {
  this.children[1].classList.toggle("display-flex");
});

$(".disclosure__list-item").on("click", function () {
  $(".display-flex").parents()[0].children[0].children[0].innerHTML =
    this.children[0].innerHTML;
});

$("#searchBarClose").on("click", function () {
  setTimeout(() => {
    $("#searchScreen").hide();
  }, 300);
});

$(".search-bar__img").on("click", function () {
  setTimeout(() => {
    $("#searchScreen").show();
  }, 300);
});
