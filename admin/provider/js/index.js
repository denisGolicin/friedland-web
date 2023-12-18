const domain = 'https://friedland-audiogit.ru'
//const domain = 'https://friedland';
const loader = document.querySelector('.loader');
const loaderText = document.querySelector('#loaderText');
showLoader("Загрузка страницы");
function showLoader(text){

    loaderText.innerHTML = text;
    loader.style.display = 'flex';
}
function hideLoader(){
    loader.style.display = 'none';
}
