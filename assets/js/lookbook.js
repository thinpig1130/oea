let mobileMenu;         // 모바일 메뉴보기 아이콘
let menuCloseIcon;      // 메뉴창 클로우즈 아이콘
let menuPage;           // 메뉴창
let moblieLink;         // 메뉴링크묶음
let moblieInstagram;    // 인스타그램 링크
let menuPageLinkWorks;  // 메뉴창>WORKS
let menuPageLinkShop;   // 메뉴창>SHOP
let menuPageLinkAbout;  // 메뉴창>ABOUT
let contentOuter;       // 스크롤 되어질 화면 테두리
let contentInner;       // 스크롤 안에 있는 컨텐츠
let nextTopIndex;       // 위쪽 컨텐츠 추가 인덱스
let nextBottomIndex;    // 아래쪽 컨텐츠 추가 인덱스
let setTimeoutIndex;    // 타임아웃제거를 위한 타임아웃 저장
let currentIndex;       // 현재 선택된 리스트의 인덱스 값
let preIndex;           // 이전 인덱스 값
let startY;             // 터치 시작 위치
let blockFlag;          // 스크롤 중복 실행 방지 Flag. 
let contentImgScreen;   // 스

// 들어갈 목록 (글자이미지의 png 이름)
// let itemList = [
//     "instrap",
//     "arktic_white",
//     "phantom_black"
// ];

let itemHeight;     // list 한개의 높이
let itemWidth;      // list 한개의 길이
let listItems;      // list 목록
let prev_scrollSize = 0;


// 메뉴 아이콘 눌렀을 때
function menuPageIn(){
    menuPage = document.querySelector(".mobile__menu_page");
    moblieLink = document.querySelector(".moblie__menu_link");
    moblieInstagram = document.querySelector(".mobile__menu_page>.web_bottom_instagram"); //////
    menuCloseIcon = document.querySelector(".mobile__menu_page>.moblie__menu_close_icon");

    menuPage.style.height="100vh";
    moblieLink.style.display="block";
    moblieInstagram.style.display="flex";
    menuCloseIcon.style.display="flex";

    setTimeout(()=>{
        moblieLink.style.opacity="1";
        moblieInstagram.style.opacity="1";
        moblieLink.style.left="40px";
        menuCloseIcon.style.opacity="1";
    },600);
}

// 메뉴 페이지에서 X를 눌렀을 때
function menuPageOut(){
    menuPage.style.top="0";
    menuPage.style.bottom="";
    menuPage.style.height="0vh";
    
    moblieLink.style.opacity="0";
    moblieInstagram.style.opacity="0";
    moblieLink.style.left="10px";
    menuCloseIcon.style.opacity="0";

    moblieInstagram.style.display="none";
    menuCloseIcon.style.display="none";

    setTimeout(()=>{
        menuPage.style.top="";
        menuPage.style.bottom="0";
    },600);
}

// 스크롤 발생시 무한 스크롤 점검
function scrollOverload(event){
    prepandList();
    appendList();
};

// 화면크기 조정시 무한 스크롤 점검
function resizeMoniter(){
    itemHeight = contentInner.querySelector(".item").clientHeight;
    itemWidth = contentInner.clientWidth;       // list 넓이


    // 상하 무한스크롤 셋팅
    prepandList();
    appendList();
}

// 아래 남은 데이터 길이 검사 후, 스크롤 컨텐츠 추가 
function appendList(){
    let outerSize = contentOuter.clientHeight+100;
    let innerSize = contentInner.clientHeight
    let scrollSize = contentOuter.scrollTop;

    if( innerSize-scrollSize-outerSize < 100 ){
        let list = document.createElement("div");
        // list.innerHTML=`
        //     <img src="/oea/list/${itemList[nextBottomIndex]}.png" value="${nextBottomIndex}">
        // `;
        list.classList.add("item");
        list.setAttribute("value", nextBottomIndex);
        list.innerHTML=`
            <div class="number">${itemList[nextBottomIndex].number}</div>
            <div class="name">${itemList[nextBottomIndex].name}</div>
        `;
        contentInner.appendChild(list);
        nextBottomIndex++;
        if(nextBottomIndex==itemList.length) nextBottomIndex=0;
    }
    listItems = contentInner.querySelectorAll(".item");
}

// 위에 남은 길이를 계산 후, 스크롤 컨텐츠 위에 추가
function prepandList(){
    let scrollSize = contentOuter.scrollTop;

    if( scrollSize < 100 ){
        let list = document.createElement("div");
        // list.innerHTML=`
        //     <img src="/oea/list/${itemList[nextTopIndex]}.png" value="${nextTopIndex}">
        // `;
        list.classList.add("item");
        list.setAttribute("value", nextTopIndex);
        list.innerHTML=`
            <div class="number">${itemList[nextTopIndex].number}</div>
            <div class="name">${itemList[nextTopIndex].name}</div>
        `;
        nextTopIndex--;
        if(nextTopIndex==-1) nextTopIndex = itemList.length-1;
        contentInner.prepend(list);
        preIndex++;
        currentIndex++;
    }

    listItems = contentInner.querySelectorAll(".item");
}

// 현재 인덱스 값을 이용하여 
function activeItem(){
    let activeDiv = document.querySelector(".active");

    if(activeDiv!=undefined) activeDiv.classList.remove("active");
    listItems[currentIndex].classList.add("active");
    
    // 선택된 목록에 맞는 이미지 셋팅
    // console.log(currentIndex);
    let imgIndex = listItems[currentIndex].getAttribute("value");
    changeImg(imgIndex);    
}

// 메뉴 아이콘 눌렀을 때
function changeImg(index){ 

    // 기존 이미지 제거
    let oldImg= contentImgScreen.querySelector("img:last-child");

    oldImg.remove();

    // if(oldImg != undefined){
    //     if(preIndex < currentIndex){
    //         oldImg.style.left = `-${itemWidth}px`;
    //     }else{
    //         oldImg.style.left = `${itemWidth}px`;
    //     }
    //     oldImg.style.opacity="0";
    //     setTimeout(()=>{
    //         oldImg.remove();
    //     },999);
    // }
    
    // // 새로운 이미지 생성
    // let newImg = document.createElement("a");
    // // newImg.href="/page";
    // newImg.href= itemList[index].link;
    // newImg.innerHTML=`
    //     <img src="/assets/images/items/${itemList[index].img}">
    // `;
    // if(preIndex < currentIndex){
    //     newImg.style.left = `${itemWidth}px`;
    // }else{
    //     newImg.style.left = `-${itemWidth}px`;
    // }
    // newImg.style.opacity="0";
    // // newImg.querySelector('img').style.width = `${itemWidth}px`;
    // contentImgScreen.querySelector("div").appendChild(newImg);

    // setTimeout(()=>{
    //     newImg.style.left = `0px`;
    //     newImg.style.opacity="1";
    // },100);

    // 새로운 이미지 생성
    let newImg = document.createElement("img");
    newImg.src=`/assets/images/items/${itemList[index].img}`;
    contentImgScreen.querySelector("div").appendChild(newImg);

    // if(preIndex < currentIndex){
    //     newImg.style.left = `${itemWidth}px`;
    // }else{
    //     newImg.style.left = `-${itemWidth}px`;
    // }
    // newImg.style.opacity="0";
    // // newImg.querySelector('img').style.width = `${itemWidth}px`;
    // contentImgScreen.querySelector("div").appendChild(newImg);

    // setTimeout(()=>{
    //     newImg.style.left = `0px`;
    //     newImg.style.opacity="1";
    // },100);
}

function init(){
    // mobileMenu = document.querySelector(".mobile__menu");
    // menuCloseIcon = document.querySelector(".mobile__menu_page>.moblie__menu_close_icon");
    // menuPage = document.querySelector(".mobile__menu_page");
    // moblieLink = document.querySelector(".moblie__menu_link");
    // moblieInstagram = document.querySelector(".mobile__menu_page>.bottom__link_instagram");
    // menuPageLinkWorks = document.querySelector(".mobile__menu_page .works");
    // menuPageLinkShop = document.querySelector(".mobile__menu_page .shop");
    // menuPageLinkAbout = document.querySelector(".mobile__menu_page .about");

    // contentOuter = document.querySelector(".main__content_outer");
    // contentInner = document.querySelector(".main__content");
    // contentImgScreen = document.querySelector(".main__img_screen");
    contentOuter = document.querySelector(".lookbook_contents");
    contentInner = document.querySelector(".item_list");
    contentImgScreen = document.querySelector(".main_images");

    nextTopIndex = itemList.length-1;
    nextBottomIndex = 0;
    blockFlag = false;

    // if(mobileMenu != undefined) mobileMenu.addEventListener("click", menuPageIn);
    // if(menuCloseIcon != undefined) menuCloseIcon.addEventListener("click", menuPageOut);
    // if(menuPageLinkWorks != undefined) menuPageLinkWorks.addEventListener("click", ()=>{ location.href="/" });
    // // if(menuPageLinkShop != undefined) menuPageLinkShop.addEventListener("click", ()=>{ location.href="" });
    // if(menuPageLinkAbout != undefined) menuPageLinkAbout.addEventListener("click", ()=>{ location.href="/about" });
    // if(linkWorks != undefined) linkWorks.addEventListener("click", ()=>{ location.href="/" });
    // // if(linkShop != undefined) linkShop.addEventListener("click", ()=>{ location.href="" });
    // if(linkAbout != undefined) linkAbout.addEventListener("click", ()=>{ location.href="/about" });

    let outerSize = contentOuter.clientHeight+100;
    let listSize = contentInner.clientHeight;

    let currentSize = 0;
    itemHeight = contentInner.querySelector("div").clientHeight;
    itemWidth = contentInner.clientWidth;

    contentInner.innerHTML="";

    do{
        for(let i=0; i < itemList.length; i++){
            let list = document.createElement("div");
            list.classList.add("item");
            list.setAttribute("value", i);
            list.innerHTML=`
                <div class="number">${itemList[i].number}</div>
                <div class="name">${itemList[i].name}</div>
            `;
            contentInner.appendChild(list);
            currentSize += listSize;
        }
    }while(outerSize > currentSize);

   

    // 초기 active 셋팅
    listItems = contentInner.querySelectorAll(".item");
    currentIndex = Math.ceil(listItems.length/itemList.length/2) * itemList.length;
    activeItem();
    
    // 이미지 포함 Div 크기 셋팅
    contentImgScreen.querySelector("div").style.width=`${itemWidth}px`;

    //휠 이벤트
    window.addEventListener("mousewheel",(event)=>{
        if(!blockFlag){
            preIndex = currentIndex;
            if(event.wheelDelta===-120){
                currentIndex++;                                                
            }else{
                currentIndex--;
            }
            blockFlag=true;
            activeItem();
            setTimeout(()=>{
                blockFlag = false;
            }, 1000);
        }
    });

    // // Pad 또는 Moblie 스크롤 시작 
    window.addEventListener("touchstart",(event)=>{
        startY = event.touches[0].clientY;
    });
    
    window.addEventListener("touchend",(event)=>{
        let delta = startY-event.changedTouches[0].clientY;
    
        preIndex = currentIndex;

        if(delta < 0){
            if(Math.abs(delta) >= itemHeight) currentIndex--;         
        }else{
            if(Math.abs(delta) >= itemHeight) currentIndex++;
        }

        // 인덱스에 변화가 있을 경우만 실행
        if(preIndex!=currentIndex){
            activeItem();
        }
    });

    window.addEventListener("resize", resizeMoniter);
    window.addEventListener("orientationchange", resizeMoniter);
    contentOuter.addEventListener("scroll", scrollOverload);
}

window.onload = ()=>{
    init();
    initMoblieNav();
}


