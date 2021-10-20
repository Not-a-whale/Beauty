/* This pagination code created with an idea of being multifunctional and reusable. It is easily adjustable to different kinds of 
projects that still utilize jquery */

let dataCollection;
const paginator = $("#paginatorDropdown");
let container = $(".productsContainer");

$("#tilesByThree").addClass("pad-right-active");

$.ajax({
  url: "assets/json/items.json",
  type: "GET",
  dataType: "json",
  success: function (result) {
    let limit = returnPaginatorValue();
    renderCollectionItems(limit, result);
    renderPagination(result.length);
    hideRows();
  },
}).then((data) => (dataCollection = data));

function returnBanner() {
  const last = $(".last-one");
  const markup = `<a href="./collection" class="just-dropped__item carousel__item col-lg-6 col-md-6 col-sm-6 my-4 product-banner">
  <img loading="lazy" src="./assets/img/banner-collection.png" alt="banner collection img" class="h-100">
</a>`;
  last.before(last, markup);
}

function returnPaginatorValue() {
  return +$(".pagination__option--current", paginator)[0].innerHTML;
}

function renderCollectionItems(limit, result, chunks) {
  // 1) Splitting array into chunks based on the limit
  let contentChunks = chunks
    ? chunks
    : splitArrayIntoChunksOfLen(result, limit);
  // 2) Looping through each chunk, diplaying all it's contents
  contentChunks.forEach((chunk, countElements) => {
    // 3) If there is a overflow of the current block, create a new one and fill it with the next chunk of data
    if (countElements > 0) {
      $(".productsContainer")[
        $(".productsContainer").length - 1
      ].insertAdjacentHTML(
        "afterend",
        `<div class="row productsContainer" id="productsRowContainer-${
          countElements + 1
        }"></div>`
      );
    }
    // 4) We are filling every LAST row element with the LAST chunk of data
    let lastContainer =
      $(".productsContainer")[$(".productsContainer").length - 1];
    // 5) Actually looping through all the items and filling the cunks
    for (let i = 0; i < chunk.length; i++) {
      if (result[i]) {
        if (!lastContainer) {
          $("#collectionPagination").before(
            `<div class="row productsContainer" id="productsRowContainer-1"></div>`
          );
          lastContainer = $(".productsContainer")[0];
        }

        lastContainer.innerHTML += returnCarouselItem(chunk[i]);
        if (i === limit - 1) {
          if (i % 4 === 0) {
            $(".just-dropped__item", lastContainer)[i - 1].classList.add(
              "last-one"
            );
          } else {
            $(".just-dropped__item", lastContainer)[i].classList.add(
              "last-one"
            );
          }
        }
      } else {
        break;
      }
    }
  });
  // 6) adding approprite classes
  $(".just-dropped__item")
    .addClass("col-lg-3")
    .addClass("col-md-6")
    .addClass("col-sm-6")
    .addClass("my-4");
  returnBanner();
}

// Splits the whole array into chunks
function splitArrayIntoChunksOfLen(arr, len) {
  var chunks = [],
    i = 0,
    n = arr.length;
  while (i < n) {
    chunks.push(arr.slice(i, (i += len)));
  }
  return chunks;
}

// Returns pagination with the appropriate amount on pages
function renderPagination(count) {
  let pagesLimit = returnPagesLimit(count);
  hideOrShowPagination(pagesLimit);
  for (let i = 0; i < pagesLimit; i++) {
    $(".next__list-item").before(
      `<li class="pages__list-item"><a>${i + 1}</a></li>`
    );
    if (i < 5) {
      $($(".pages__list-item")[i]).show();
    } else {
      $($(".pages__list-item")[i]).hide();
    }
    if (i === 0) {
      $(".pages__list-item > a")[0].classList.add("active-pagination-button");
    }
  }
  $(".pages__list-item").on("click", (e) => {
    if (!$(e.target).hasClass("pages__list-item")) {
      switchPage(e);
    }
  });
}

// Returns a number of chunks or items that need to be paginated to
function returnPagesLimit(count) {
  let limit = returnPaginatorValue();
  let pagesLimit = Math.ceil(count / limit);
  return pagesLimit;
}

// Changing the on the limit of items dropdown
$(".pagination__option").on("click", function () {
  let limit = returnPaginatorValue();
  $(".productsContainer").remove();
  $(".pages__list-item").remove();
  container = $(".productsContainer");
  if ($(".pages__list-item > a").length === 0) {
    renderPagination(dataCollection.length);
  }
  hideOrShowPagination(returnPagesLimit(dataCollection.length));
  renderCollectionItems(limit, dataCollection);
  hideRows();
  Array.from($(".pages__list-item > a")).forEach((link) => {
    link.classList.remove("active-pagination-button");
  });
  $(".pages__list-item > a")[0].classList.add("active-pagination-button");
});

// Gets data from the paginator about the active chunk and hides all the other ones

function hideRows() {
  let activeElem = getCurrentPagination();
  Array.from($(".productsContainer")).forEach((container) => {
    if (!$(container).is("#productsRowContainer-1")) {
      $(container).hide();
    }
  });
}

// Gets data from Paginator

function getCurrentPagination() {
  return $(".active-pagination-button");
}

function switchPage(e, pageIndex) {
  let activePageIndex = pageIndex ? pageIndex : null;
  const containers = $(".productsContainer");
  if (e) {
    $(".pages__list-item > a").removeClass("active-pagination-button");
    e.target.classList.add("active-pagination-button");
  }
  activePageIndex = +getCurrentPagination()[0].innerHTML;
  Array.from(containers).forEach((container, index) => {
    $(container).hide();
    if (index + 1 === activePageIndex) {
      $(container).show();
    }
  });
}

function hideOrShowPagination(pagesLimit) {
  if (pagesLimit < 2) {
    $("#pagesList").hide();
  } else {
    $("#pagesList").show();
  }
}

$(".next__list-item").on("click", function (e) {
  let currentElement;
  const items = Array.from($(".pages__list-item > a"));
  items.forEach((link, index) => {
    if ($(link).hasClass("active-pagination-button")) {
      currentElement = index;
    }
  });
  if ($(".pages__list-item > a")[currentElement + 1]) {
    items.forEach((link, index) => {
      link.classList.remove("active-pagination-button");
    });
    $(".pages__list-item > a")[currentElement + 1].classList.add(
      "active-pagination-button"
    );
  }
  switchPage(null, +getCurrentPagination()[0].innerHTML);
  $($(".active-pagination-button")[0].parentNode).show();
  if ($(".pages__list-item")[+getCurrentPagination()[0].innerHTML - 6]) {
    $($(".pages__list-item")[+getCurrentPagination()[0].innerHTML - 6]).hide();
  }
});

$(".prev__list-item").on("click", function (e) {
  let currentElement;
  const items = Array.from($(".pages__list-item > a"));
  items.forEach((link, index) => {
    if ($(link).hasClass("active-pagination-button")) {
      currentElement = index;
    }
  });
  if ($(".pages__list-item > a")[currentElement - 1]) {
    items.forEach((link, index) => {
      link.classList.remove("active-pagination-button");
    });
    $(".pages__list-item > a")[currentElement - 1].classList.add(
      "active-pagination-button"
    );
  }
  switchPage(null, +getCurrentPagination()[0].innerHTML);
  if (
    $(".pages__list-item")[+getCurrentPagination()[0].innerHTML] &&
    +$(".pages__list-item > a")[+getCurrentPagination()[0].innerHTML]
      .innerHTML >= 6
  ) {
    $($(".pages__list-item")[+getCurrentPagination()[0].innerHTML]).hide();
  }
  if ($(".pages__list-item")[+getCurrentPagination()[0].innerHTML - 5]) {
    $($(".pages__list-item")[+getCurrentPagination()[0].innerHTML - 5]).show();
  }
});

/* Tiles switching */

$("#tilesByTwo").on("click", function () {
  $("#tilesByThree").removeClass("pad-right-active");
  $("#tilesByTwo").addClass("pad-left-active");
  Array.from($("#overallContainer .carousel__item")).forEach((item) => {
    if ($(item).hasClass("product-banner")) {
      item.classList.remove("col-lg-3");
      item.classList.remove("col-lg-5");
      item.classList.add("col-lg-7");
    } else {
      item.classList.remove("col-lg-3");
      item.classList.add("col-lg-5");
    }
  });
});

$("#tilesByThree").on("click", function () {
  $("#tilesByTwo").removeClass("pad-left-active");
  $("#tilesByThree").addClass("pad-right-active");
  Array.from($("#overallContainer .carousel__item")).forEach((item) => {
    if ($(item).hasClass("product-banner")) {
      item.classList.remove("col-lg-5");
      item.classList.remove("col-lg-7");
      item.classList.add("col-lg-3");
    } else {
      item.classList.remove("col-lg-3");
      item.classList.add("col-lg-5");
    }
    item.classList.remove("col-lg-5");
    item.classList.add("col-lg-3");
  });
});
