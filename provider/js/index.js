const loader = document.querySelector('.loader');
const loaderText = document.querySelector('#loaderText');
const domain = '';
//const domain = 'http://friedland';
function showLoader(text){

    loaderText.innerHTML = text;
    loader.style.display = 'flex';
}
function hideLoader(){

    loader.style.display = 'none';
}
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
  
if (!isMobileDevice()) {
  document.querySelector('.wrapper').style.display = 'none';
  document.querySelector('.text-error').style.display = 'block';
  document.querySelector('.text-error').innerHTML = 'Пожалуйста, посетите этот сайт с мобильного устройства.';
} else {
  document.querySelector('.wrapper').style.display = 'block';
}

function checkOrientation() {
  var orientation = window.innerWidth > window.innerHeight ? "landscape" : "portrait";

  if (orientation === "portrait") {
    document.querySelector('.wrapper').style.display = 'block';
    document.querySelector('.text-error').style.display = 'none';

  } else {
    document.querySelector('.wrapper').style.display = 'none';
    document.querySelector('.text-error').style.display = 'block';
    document.querySelector('.text-error').innerHTML = 'Переверните телефон!';

  }
}

window.addEventListener("resize", checkOrientation);