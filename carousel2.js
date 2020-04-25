var carousel2 = document.querySelector('.carousel2');
var carouselContent2 = document.querySelector('.carousel-content2');
var slides2 = document.querySelectorAll('.slide2');
var arrayOfSlides2 = Array.prototype.slice.call(slides2);
var carouselDisplaying2 = 1;
var screenSize;
setScreenSize2();
var lengthOfSlide2;

function addClone2() {
  var lastSlide2 = carouselContent2.lastElementChild.cloneNode(true);
  lastSlide2.style.left = -lengthOfSlide2 + 'px';
  carouselContent2.insertBefore(lastSlide2, carouselContent2.firstChild);
}
// addClone2();

function removeClone2() {
  var firstSlide2 = carouselContent2.firstElementChild;
  firstSlide2.parentNode.removeChild(firstSlide2);
}

function moveSlidesRight2() {
  var slides2 = document.querySelectorAll('.slide2');
  var slidesArray2 = Array.prototype.slice.call(slides2);
  var width2 = 0;

  slidesArray2.forEach(function (el, i) {
    el.style.left = width2 + 'px';
    width2 += lengthOfSlide2;
  });
  addClone2();
}
moveSlidesRight2();

function moveSlidesLeft2() {
  var slides2 = document.querySelectorAll('.slide2');
  var slidesArray2 = Array.prototype.slice.call(slides2);
  slidesArray2 = slidesArray2.reverse();
  var maxWidth2 = (slidesArray2.length - 1) * lengthOfSlide2;

  slidesArray2.forEach(function (el, i) {
    maxWidth2 -= lengthOfSlide2;
    el.style.left = maxWidth2 + 'px';
  });
}

window.addEventListener('resize', setScreenSize2);

function setScreenSize2() {
  if (window.innerWidth >= 500) {
    carouselDisplaying2 = 1;
  } else if (window.innerWidth >= 300) {
    carouselDisplaying2 = 1;
  } else {
    carouselDisplaying2 = 1;
  }
  getScreenSize2();
}

function getScreenSize2() {
  var slides2 = document.querySelectorAll('.slide2');
  var slidesArray2 = Array.prototype.slice.call(slides2);
  lengthOfSlide2 = carousel2.offsetWidth / carouselDisplaying2;
  var initialWidth2 = -lengthOfSlide2;
  slidesArray2.forEach(function (el) {
    el.style.width = lengthOfSlide2 + 'px';
    el.style.left = initialWidth2 + 'px';
    initialWidth2 += lengthOfSlide2;
  });
}

var rightNav2 = document.querySelector('.nav-right2');
rightNav2.addEventListener('click', moveLeft2);

var moving2 = true;
function moveRight2() {
  if (moving2) {
    moving2 = false;
    var lastSlide2 = carouselContent2.lastElementChild;
    lastSlide2.parentNode.removeChild(lastSlide2);
    carouselContent2.insertBefore(lastSlide2, carouselContent2.firstChild);
    removeClone2();
    var firstSlide2 = carouselContent2.firstElementChild;
    firstSlide2.addEventListener('transitionend', activateAgain2);
    moveSlidesRight2();
  }
}

function activateAgain2() {
  var firstSlide2 = carouselContent2.firstElementChild;
  moving2 = true;
  firstSlide2.removeEventListener('transitionend', activateAgain2);
}

var leftNav2 = document.querySelector('.nav-left2');
leftNav2.addEventListener('click', moveRight2);

// var moveLeftAgain = true;

function moveLeft2() {
  if (moving2) {
    moving2 = false;
    removeClone2();
    var firstSlide2 = carouselContent2.firstElementChild;
    firstSlide2.addEventListener('transitionend', replaceToEnd2);
    moveSlidesLeft2();
  }
}

function replaceToEnd2() {
  var firstSlide2 = carouselContent2.firstElementChild;
  firstSlide2.parentNode.removeChild(firstSlide2);
  carouselContent2.appendChild(firstSlide2);
  firstSlide2.style.left = (arrayOfSlides2.length - 1) * lengthOfSlide2 + 'px';
  addClone2();
  moving2 = true;
  firstSlide2.removeEventListener('transitionend', replaceToEnd2);
}

carouselContent2.addEventListener('mousedown', seeMovement2);

var initialX2;
var initialPos2;
function seeMovement2(e) {
  initialX2 = e.clientX;
  getInitialPos();
  carouselContent2.addEventListener('mousemove', slightMove2);
  document.addEventListener('mouseup', moveBasedOnMouse2);
}

function slightMove2(e) {
  if (moving2) {
    var moving2X = e.clientX;
    var difference2 = initialX2 - moving2X;
    if (Math.abs(difference2) < lengthOfSlide2 / 4) {
      slightMoveSlides2(difference2);
    }
  }
}

function getInitialPos() {
  var slides2 = document.querySelectorAll('.slide2');
  var slidesArray2 = Array.prototype.slice.call(slides2);
  initialPos2 = [];
  slidesArray2.forEach(function (el) {
    var left = Math.floor(parseInt(el.style.left.slice(0, -2)));
    initialPos2.push(left);
  });
}

function slightMoveSlides2(newX) {
  var slides2 = document.querySelectorAll('.slide2');
  var slidesArray2 = Array.prototype.slice.call(slides2);
  slidesArray2.forEach(function (el, i) {
    var oldLeft2 = initialPos2[i];
    el.style.left = oldLeft2 + newX + 'px';
  });
}

function moveBasedOnMouse2(e) {
  var finalX = e.clientX;
  if (initialX2 - finalX > 0) {
    moveRight2();
  } else if (initialX2 - finalX < 0) {
    moveLeft2();
  }
  document.removeEventListener('mouseup', moveBasedOnMouse2);
  carouselContent2.removeEventListener('mousemove', slightMove2);
}
