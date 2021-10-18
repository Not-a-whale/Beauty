$(document).ready(function () {
  thisProductId = +localStorage.getItem("productId");
  $.ajax({
    url: "assets/json/items.json",
    type: "GET",
    dataType: "json",
    success: function (result) {
      currentItem = result.find((item) => item.id === thisProductId);
      $("#productHeading").text(currentItem.name);
      $("#productLink").text(currentItem.name);
      $("#priceText").text(
        currentItem.price.replace(".", ",") + " " + currentItem.currency
      );
      $(".textBlock1").text(currentItem.description.description_1);
      $(".textBlock2").text(currentItem.description.description_2);
      $(".textBlock3").text(currentItem.description.description_3);
      $(".product__selection").empty();
      currentItem.img_links.forEach((link, index) => {
        $(".product__selection").append(
          returnProductImageMarkup(link, currentItem.name, index)
        );
      });
      $("#mainProductImage")[0].src = $(".circled-gift-card img")[0].src;
    },
  });
});

function returnProductImageMarkup(link, name, index) {
  let isIndexZeroClass = index === 0 ? "circled-gift-card" : "";
  return `<div class="gift-card__selection-item ${isIndexZeroClass}">
    <img loading="lazy" src="${link}" alt="${name} small" class="gift-card__selection-image">
</div>`;
}

$(document).on("click", ".gift-card__selection-image", function (e) {
  const selectionItems = $(".gift-card__selection-item");
  selectionItems.removeClass("circled-gift-card");
  this.parentNode.classList.add("circled-gift-card");
  $("#mainProductImage")[0].src = $(".circled-gift-card img")[0].src;
});
