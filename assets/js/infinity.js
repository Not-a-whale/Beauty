/* Element Refs */

let images = document.querySelectorAll('.main-slider__image');
const dots = Array.from(document.querySelectorAll('.carousel--dot'));
const mainCarouselNext = document.querySelector('.carousel--next');
const mainCarouselPrev = document.querySelector('.carousel--prev');

/* Variables */

let current = 0;
let dragStartPoint;
let dragEndPoint;

/* Functions */

let timer;

function startTimer(){
    timer = setInterval(moveNext, 5000);
};

startTimer();

function sliderFunc() {
    images.forEach(image => image.classList.add('opacity0'));
    if(images[current]) {
        images[current].classList.remove('opacity0');
    }
}

function makeDotActive() {
    dots.forEach((dot, index) => {
        dot.classList.remove('dot-active');
    });
    if(dots[current]) {
        dots[current].classList.add('dot-active');
    }
}


function startMouseCapture(event) {
    clearInterval(timer);
    dragStartPoint = event.pageX;
}

function releaseMouseCapture(event) {
    dragEndPoint = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    let delta = dragEndPoint - dragStartPoint;

    if(event.type.includes('mouse')) {
        if (Math.abs(delta) > 100)
        {
            if (delta > 0) moveNext();
            else  movePrev();
        }    
        dragStartPoint = dragEndPoint;
        startTimer();
    } else {
        if (Math.abs(delta) > 10)
        {
            if (delta > 0) moveNext();
            else  movePrev();
        }    
        dragStartPoint = dragEndPoint;
        startTimer();
    }
    dragStartPoint = 0;
    dragEndPoint = 0;
}



function moveNext() {
    if (current + 1 == images.length) {
        current = 0;
    } else {
        current++;
    }
    sliderFunc();
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
    sliderFunc();
    makeDotActive();
    dragEndPoint = 0;
    dragStartPoint = 0;
}


/* Event listeners */

images.forEach(image => image.addEventListener('mousedown', startMouseCapture));
images.forEach(image => image.addEventListener('mouseup', releaseMouseCapture));

if(mainCarouselPrev && mainCarouselNext) {
    document.querySelector('.carousel--next').onclick = function () {
        clearInterval(timer);
        startTimer()
        moveNext();
    };
    
    document.querySelector('.carousel--prev').onclick = function () {
        clearInterval(timer);
        startTimer()
        movePrev();
    }
}


dots.forEach((dot, index) => dot.addEventListener('click', () => {
    current = index;
    makeDotActive();
    sliderFunc();
}));


