// get our elements
document.querySelectorAll('.carousel__slider').forEach((slider) => {
  const slides = Array.from(slider.querySelectorAll('.carousel__container'));
  const rightArrow = document.querySelector('.just-dropped__arrow-right');
  const leftArrow = document.querySelector('.just-dropped__arrow-left');

    
  // set up our state

  let isDragging = false,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID,
  currentIndex = 0

  // add our event listeners
  slides.forEach((slide, index) => {
    const slideImage = slide.querySelector('img')
    // disable default image drag
    slideImage.addEventListener('dragstart', (e) => e.preventDefault())
    // touch events
    slide.addEventListener('touchstart', touchStart(index))
    slide.addEventListener('touchend', touchEnd)
    slide.addEventListener('touchmove', touchMove)
    // mouse events
    slide.addEventListener('mousedown', touchStart(index))
    slide.addEventListener('mouseup', touchEnd)
    slide.addEventListener('mousemove', touchMove)
    slide.addEventListener('mouseleave', touchEnd)
  });



  // make responsive to viewport changes
  window.addEventListener('resize', setPositionByIndex)


  function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
  }

  // use a HOF so we have index in a closure
  function touchStart(index) {
    return function (event) {
      currentIndex = index
      startPos = getPositionX(event)
      isDragging = true
      animationID = requestAnimationFrame(animation)
      slider.classList.add('grabbing')
    }
  }

  function touchMove(event) {
    if (isDragging) {
      const currentPosition = getPositionX(event)
      currentTranslate = prevTranslate + currentPosition - startPos
    }
  }

  function touchEnd() {
    cancelAnimationFrame(animationID)
    isDragging = false
    const movedBy = currentTranslate - prevTranslate;

    // if moved enough negative then snap to next slide if there is one
    if (movedBy < -100) {
        currentIndex += 1;
        slider.style.transform = `translateX(0)`
    } 
    // if moved enough positive then snap to previous slide if there is one
    if (movedBy > 100) currentIndex -= 1

    setPositionByIndex()

    slider.classList.remove('grabbing')
  }

  function animation() {
    setSliderPosition()
    if (isDragging) requestAnimationFrame(animation)
  }

  function setPositionByIndex() {
    if (currentIndex < 0) currentIndex = slides.length -1;
    if (currentIndex == slides.length) currentIndex = 0;
    currentTranslate = currentIndex * -window.innerWidth
    prevTranslate = currentTranslate;
    
    setSliderPosition()
  }

  function setSliderPosition() {
    slider.style.transform = `translateX(${currentTranslate}px)`;
  }

  

  if(rightArrow && leftArrow) {
    rightArrow.addEventListener('click', () => {
          currentIndex++;
          setPositionByIndex();      
  });

  if(rightArrow && leftArrow) {
  leftArrow.addEventListener('click', () => {
          currentIndex--;
          setPositionByIndex();      
  });
  }
  }

})

