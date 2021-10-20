$(document).ready(function () {
  sliderContainer = {
    carouselMobileChildren: $(".carousel__slider--mobile"),
    carouselDesktopChildren: $(".carousel__slider--desktop"),
  };
  // Ajax request to get all the documents
  $.ajax({
    url: "assets/json/items.json",
    type: "GET",
    dataType: "json",
    success: function (result) {
      const carouselMarkup = '<div class="carousel__container"></div>';
      for (let i = 0; i < result.length; i++) {
        for (
          let j = 0;
          j < sliderContainer.carouselDesktopChildren.length;
          j++
        ) {
          if (i === 0) {
            sliderContainer.carouselDesktopChildren[j].innerHTML +=
              carouselMarkup;
          } else if (i % 4 === 0) {
            sliderContainer.carouselDesktopChildren[j].innerHTML +=
              carouselMarkup;
          }
          $(
            ".carousel__container",
            sliderContainer.carouselDesktopChildren[j]
          ).last()[0].innerHTML += returnCarouselItem(result[i]);
        }
        for (
          let k = 0;
          k < sliderContainer.carouselMobileChildren.length;
          k++
        ) {
          if (i === 0) {
            sliderContainer.carouselMobileChildren[k].innerHTML +=
              carouselMarkup;
          } else if (i % 2 === 0) {
            sliderContainer.carouselMobileChildren[k].innerHTML +=
              carouselMarkup;
          }
          $(
            ".carousel__container",
            sliderContainer.carouselMobileChildren[k]
          ).last()[0].innerHTML += returnCarouselItem(result[i]);
        }
      }
      // get our elements
      document.querySelectorAll(".carousel__slider").forEach((slider) => {
        const slides = Array.from(
          slider.querySelectorAll(".carousel__container")
        );
        const rightArrow = document.querySelector(".just-dropped__arrow-right");
        const leftArrow = document.querySelector(".just-dropped__arrow-left");

        // set up our state

        let isDragging = false,
          startPos = 0,
          currentTranslate = 0,
          prevTranslate = 0,
          animationID,
          currentIndex = 0;

        // add our event listeners
        slides.forEach((slide, index) => {
          const slideImage = slide.querySelector("img");

          // disable default image drag
          if (slideImage) {
            window.innerWidth > 767
              ? slideImage.addEventListener("dragstart", (e) =>
                  e.preventDefault()
                )
              : "";
          }

          // touch events
          slide.addEventListener("touchstart", touchStart(index));
          slide.addEventListener("touchend", touchEnd);
          slide.addEventListener("touchmove", touchMove);
          // mouse events
          slide.addEventListener("mousedown", touchStart(index));
          slide.addEventListener("mouseup", touchEnd);
          slide.addEventListener("mousemove", touchMove);
          slide.addEventListener("mouseleave", touchEnd);
        });

        // make responsive to viewport changes
        window.addEventListener("resize", setPositionByIndex);

        function getPositionX(event) {
          return event.type.includes("mouse")
            ? event.pageX
            : event.touches[0].clientX;
        }

        // use a HOF so we have index in a closure
        function touchStart(index) {
          return function (event) {
            currentIndex = index;
            startPos = getPositionX(event);
            isDragging = true;
            animationID = requestAnimationFrame(animation);
            slider.classList.add("grabbing");
          };
        }

        function touchMove(event) {
          if (isDragging) {
            const currentPosition = getPositionX(event);
            currentTranslate = prevTranslate + currentPosition - startPos;
          }
        }

        function touchEnd() {
          cancelAnimationFrame(animationID);
          isDragging = false;
          const movedBy = currentTranslate - prevTranslate;

          // if moved enough negative then snap to next slide if there is one
          if (movedBy < -100) {
            currentIndex += 1;
            slider.style.transform = `translateX(0)`;
          }
          // if moved enough positive then snap to previous slide if there is one
          if (movedBy > 100) currentIndex -= 1;

          setPositionByIndex();

          slider.classList.remove("grabbing");
        }

        function animation() {
          setSliderPosition();
          if (isDragging) requestAnimationFrame(animation);
        }

        function setPositionByIndex() {
          if (currentIndex < 0) currentIndex = slides.length - 1;
          if (currentIndex == slides.length) currentIndex = 0;
          currentTranslate = currentIndex * -window.innerWidth;
          prevTranslate = currentTranslate;

          setSliderPosition();
        }

        function setSliderPosition() {
          slider.style.transform = `translateX(${currentTranslate}px)`;
        }

        if (rightArrow && leftArrow) {
          rightArrow.addEventListener("click", () => {
            currentIndex++;
            setPositionByIndex();
          });

          if (rightArrow && leftArrow) {
            leftArrow.addEventListener("click", () => {
              currentIndex--;
              setPositionByIndex();
            });
          }
        }
      });
    },
  });
});

function returnCarouselItem(result) {
  const saleBadge =
    '<div class="just-dropped__badge just-dropped__badge--sale carousel__badge carousel__badge--sale">Sale</div>';
  const salePriceMarkup = `<span class="just-dropped__crossed carousel__crossed">${result.currency}${result.price_discount}</span>`;
  /*   ../../product-en.html/${
    result.id
  } */
  return `
  <a href="../../product-en.html/${
    result.id
  }" class="just-dropped__item carousel__item carousel__item--${result.id}">
  <div class="just-dropped__img-container carousel__img-container">
      ${result.price_discount ? saleBadge : ""}
      <img loading="lazy" class="just-dropped__img carousel__img" src="./assets/img/just_dropped/${
        result.id
      }/0.jpg" alt="${result.name} img">
      <div class="just-dropped__badge just-dropped__badge--plus carousel__badge--plus" onclick='addToCart(event, ${
        result.id
      })'>
           <img loading="lazy" src="./assets/img/icon/plus.svg" class="plusImg" alt="plus"> 
           <img src="./assets/img/icon/icons8-iphone-spinner.gif" class="spinnerGif" alt="iphone spinner">
      </div>
  </div>
  <h4 class="just-dropped__heading carousel__heading">
      ${result.name}
  </h4>
  <div class="just-dropped__price carousel__price">
      ${result.price_discount ? salePriceMarkup : ""}
      <span>${result.currency}${result.price}</span>
  </div>
</a>
`;
}

/* Saving Id to localStorage */

$(document).on("click", "a.carousel__item", function (e, id) {
  let arr = $(this).attr("href").toString().split("/");
  let productId = arr[arr.length - 1];
  localStorage.setItem("productId", productId);
  if ($(location).attr("href").split("-")[1].split(".")[0] === "ar") {
    $(this).attr("href", "../../product-ar.html");
  } else {
    $(this).attr("href", "../../product-en.html");
  }
});

/* animation of clicking on + button and adding a product */

function addToCart(e, result) {
  e.stopPropagation();
  e.preventDefault();
  //addElementToTheCart(result);
  // removing plus
  $(e.target.children[0]).hide("slow", function () {
    // showing 'loading'
    $(this.parentNode.children[1]).css({
      width: "100%",
      height: "100%",
      display: "block",
      transform: "scale(2)",
    });
    setTimeout(() => {
      // removing 'loading'
      $(this.parentNode.children[1]).css({
        width: "0%",
        height: "0%",
        display: "none",
        transform: "scale(2)",
      });
      $(this).hide();
      // showing overlay with items
      $(".overlay--right").toggleClass("overlay-active");
      // returning the plus icon
      $(this.parentNode.children[0]).show();
    }, 2000);
  });
}

$(document).on("mouseenter", "a.carousel__item", function () {
  setTimeout(() => {
    if (
      $($(this).children()[0]).children()[0] ||
      $($(this).children()[0]).children()[1]
    ) {
      if ($($(this).children()[0]).children()[0].src) {
        $($(this).children()[0]).children()[0].src =
          $($(this).children()[0]).children()[0].src.split("/0.jpg")[0] +
          "/1.jpg";
      } else if (
        $($(this).children()[0]).children()[1].src.split("/0.jpg")[0]
      ) {
        $($(this).children()[0]).children()[1].src =
          $($(this).children()[0]).children()[1].src.split("/0.jpg")[0] +
          "/1.jpg";
      }
    } else {
      return;
    }
  }, 300);
});

$(document).on("mouseleave", "a.carousel__item", function () {
  setTimeout(() => {
    if (
      $($(this).children()[0]).children()[0] ||
      $($(this).children()[0]).children()[0]
    ) {
      if ($($(this).children()[0]).children()[0].src) {
        $($(this).children()[0]).children()[0].src =
          $($(this).children()[0]).children()[0].src.split("/1.jpg")[0] +
          "/0.jpg";
      } else {
        $($(this).children()[0]).children()[1].src =
          $($(this).children()[0]).children()[1].src.split("/1.jpg")[0] +
          "/0.jpg";
      }
    }
  }, 300);
});
