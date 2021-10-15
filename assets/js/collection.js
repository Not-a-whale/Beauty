$.ajax({
  url: "assets/json/items.json",
  type: "GET",
  dataType: "json",
  success: function (result) {
    const container = $("#productsRowContainer");
    console.log(container);
    for (let i = 0; i < result.length; i++) {
      container.append(returnCarouselItem(result[i]));
      if (i === result.length - 1) {
        if (i % 4 === 0) {
          $(".just-dropped__item")[i - 1].classList.add("last-one");
        } else {
          $(".just-dropped__item")[i].classList.add("last-one");
        }
      }
    }
    $(".just-dropped__item", container)
      .addClass("col-lg-3")
      .addClass("col-md-6")
      .addClass("col-sm-6")
      .addClass("my-4");
    returnBanner();
  },
});

function returnBanner() {
  const last = $(".last-one");
  console.log(last);
  const markup = `<a href="./collection" class="just-dropped__item carousel__item col-lg-6 col-md-6 col-sm-6 my-4 product-banner">
  <img loading="lazy" src="./assets/img/banner-collection.png" alt="banner collection img" class="h-100">
</a>`;
  last.before(last, markup);
}
