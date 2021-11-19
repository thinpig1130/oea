let narrowNavIcon;
let narrowNavScreen;
let bulrTargetArr=[];


function openNavScreen(){
    narrowNavScreen.style.display="flex";
    narrowNavScreen.style.opacity="1";
    bulrTargetArr.forEach(e=>{
        e.classList.add("blur");
    });
    narrowNavIcon.classList.add("blur");
}

function closeNavScreen(){
    narrowNavScreen.style.opacity="0";
    narrowNavScreen.style.display="none";
    
    bulrTargetArr.forEach(e=>{
        e.classList.remove("blur");
    });
    narrowNavIcon.classList.remove("blur");
}

function initMoblieNav(){
    narrowNavIcon = document.querySelector(".narrow_nav_icon");
    narrowNavScreen = document.querySelector(".narrow_nav_screen");
    bulrTargetArr = document.querySelectorAll("section");

    narrowNavScreen.querySelector(".nav_close_icon").addEventListener("click", closeNavScreen);
    narrowNavIcon.addEventListener("click", openNavScreen);
}