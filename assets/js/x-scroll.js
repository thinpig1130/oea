let imgSetDiv;
let bodyDom;
let screenType;
let nextLeft;

function init(){
    imgSetDiv = document.querySelector(".center_section .item_images");
    bodyDom = document.querySelector("body");
    screenType = bodyDom.clientWidth < 900?'wide':"narrow";
    nextLeft = 0;

    window.addEventListener("resize", resizeWindow);
    window.addEventListener("orientationchange", resizeWindow);
    window.addEventListener("mousewheel", horizontalWheel);

};

function horizontalWheel(event){
    let minLeft = -(imgSetDiv.clientWidth-bodyDom.clientWidth);
    if(event.deltaY > 0){
        if(nextLeft >= minLeft){
            if(nextLeft-100 < minLeft){
                nextLeft = minLeft;
                imgSetDiv.style.left =`${nextLeft}px`;
            }else{
                nextLeft = nextLeft-100;
                imgSetDiv.style.left =`${nextLeft}px`;
            }
        }
    }else{
        if(nextLeft < 0){
            nextLeft = nextLeft+100;
            imgSetDiv.style.left =`${nextLeft}px`;
        }
    }
}

function resizeWindow(){
    let screenTypeCheck = bodyDom.clientWidth < 900 ?'wide':"narrow";

    if( screenTypeCheck != screenType){
        imgSetDiv.style.left =`${0}px`;
        screenType = screenTypeCheck;
    }
}

window.onload = ()=>{
    init();
    initMoblieNav();
}
