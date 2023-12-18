const audio = document.querySelector('.button-audio');
const img = document.querySelector('.button-img');
const next = document.querySelector('.button-next');
const logo = document.querySelector('.wrapper-logo');
const menu = document.querySelector('.wrapper-menu');
const menuBlock = document.querySelector('.wrapper-menu-block');
const menuItem = document.querySelectorAll('.menu-item');
const title = document.querySelector('h1');
const menuButtonImg = document.querySelector('.menu-button-img');
const descriptionButtonImg = document.querySelector('.description-button-img');
const descriptionMainImgJs = document.querySelector('.description-main-img-js');
const wrapperDescription = document.querySelector('.wrapper-description');
const descriptionClose = document.querySelector('.description-close');
const audioUse = document.querySelector('.audio-use');
const audioImg = document.querySelector('.audio-img');

map = document.querySelector('.map-img');
let point = 1;
let pos = 0;
let isPlay = false;

audio.addEventListener('click', function(){

    if(isPlay){
        audioImg.src = 'provider/src/play.svg';
        audioUse.pause();
    } 
    else {
        audioImg.src = 'provider/src/pause.svg';
        audioUse.play();
    }

    isPlay = !isPlay;

});
audioUse.addEventListener("ended", function() {
    updateGit(point);
});
next.addEventListener('click', function() {
    updateGit(point);

});
logo.addEventListener('click', function(){
    alert('Атмосферной прогулки!');
});
let menuFlag = false;
let descriptionFlag = false;
menu.addEventListener('click', function(){

    if(descriptionFlag){
        wrapperDescription.style.display = 'none';
        descriptionFlag = false;
    }

    menuBlock.style.width = (!menuFlag) ? '80%' : '0%';
    menuFlag = !menuFlag;

    if(menuFlag){
        menuButtonImg.src = 'provider/src/close.svg';
    } else {
        menuButtonImg.src = 'provider/src/menu.svg';
    }
});

//audioUse

for(let i = 0; i < menuItem.length; i++){
    menuItem[i].innerHTML = titleName[i];
    menuItem[i].addEventListener('click', function(){
    
        menuBlock.style.width = '0%';
        menuFlag = false;

        updateGit(i);

        if(menuFlag){
            menuButtonImg.src = 'provider/src/close.svg';
        } else {
            menuButtonImg.src = 'provider/src/menu.svg';
        }
    });
}

descriptionButtonImg.addEventListener('click', function(){
    wrapperDescription.style.display = 'flex';
    descriptionMainImgJs.src = `provider/src/content/${point}.jpg`;

    descriptionFlag = true;

    if(menuFlag){
        menuBlock.style.width = '0%';
        menuFlag = false;
        menuButtonImg.src = 'provider/src/menu.svg';
    }
});
descriptionClose.addEventListener('click', function(){
    wrapperDescription.style.display = 'none';
    descriptionFlag = false;
});

function updateGit(value = null){

    if(value != null) point = value;

    if(point >= 23) point = 1;
    else point++;

    map.src = `provider/src/map/${point - 1}.svg`;
    descriptionButtonImg.style.backgroundImage = `url('provider/src/content/${point}.jpg')`;
    descriptionMainImgJs.src = `provider/src/content/${point}.jpg`;
    audioUse.src = `provider/src/content/audio/${point}.mp3`;
    audioImg.src = 'provider/src/pause.svg';
    audioUse.play();
    isPlay = true;

    // if (!document.fullscreenElement) {
    //     document.documentElement.requestFullscreen();
    //   } else if (document.exitFullscreen) {
    //     document.exitFullscreen();
    //   }

    title.innerHTML = titleName[point - 1];
    map.style.transform = `translateX(${mapPosition[point - 1]})`;
}