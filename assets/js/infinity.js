/* Element Refs */

let images = document.querySelectorAll('.main-slider__image');
const dots = Array.from(document.querySelectorAll('.carousel--dot'));

/* Variables */

let current = 0;
let dragStartPoint;
let dragEndPoint;

/* Functions */

function slider() {
    images.forEach(image => image.classList.add('opacity0'));
    images[current].classList.remove('opacity0');
}

function makeDotActive() {
    dots.forEach((dot, index) => {
        dot.classList.remove('dot-active');
    });
    dots[current].classList.add('dot-active');
}

function touchMove() {
    dragStartPoint = event.pageX;
}

function touchDownMove() {
    dragEndPoint = event.pageX;
    if (dragStartPoint !== dragEndPoint && (dragStartPoint - dragEndPoint) > 100) {
        console.log('current touchDownMove right', current)
        moveNext();
    } else if (dragStartPoint !== dragEndPoint && (dragStartPoint - dragEndPoint) < 0) {
        console.log('current touchDownMove left', current)
        movePrev();
    }
}

function moveNext() {
    if (current + 1 == images.length) {
        current = 0;
    } else {
        current++;
    }
    console.log('moveNext', current)
    slider();
    makeDotActive();
    dragEndPoint = 0;
    dragStartPoint = 0;
}

function movePrev() {
    if (current - 1 == -1) {
        current = images.length - 1;
    } else {
        current--;
    }
    slider();
    makeDotActive();
    dragEndPoint = 0;
    dragStartPoint = 0;
}


/* Event listeners */


/* images.forEach(image => image.addEventListener('mousedown', touchDownMove));
images.forEach(image => image.addEventListener('mouseleave', touchMove));
 */
document.querySelector('.carousel--next').onclick = function () {
    moveNext();
};

document.querySelector('.carousel--prev').onclick = function () {
    movePrev();
}


dots.forEach((dot, index) => dot.addEventListener('click', () => {
    current = index;
    makeDotActive();
    slider();
}));


setInterval(moveNext, 5000);