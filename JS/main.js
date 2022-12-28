//check if local storage color is empty or not
let checkColor = localStorage.getItem("colorOption");

if (checkColor !== null) {
    document.documentElement.style.setProperty("--main-color" , checkColor);


    //remove active class from all
    document.querySelectorAll(".list-color li").forEach( el =>{
        el.classList.remove("active");

    //if dataset color === color in localstorage
    if (el.dataset.color === checkColor) {
        //add active class
        el.classList.add("active")
    }
});


}

// random background option
let backgroundoption = true;

//variable to control interval
let theBackInterval;

let checkBackground = localStorage.getItem('background_option');

if (checkBackground !== null) {
    if (checkBackground === 'true') {
        backgroundoption = true;
    }else {
        backgroundoption = false;
    }

    //remove active class from all spans
    document.querySelectorAll(".randomBg span").forEach( el => {
        el.classList.remove("active");
    });

    if (checkBackground === 'true') {
        document.querySelector(".randomBg .yes").classList.add("active");
    }else {
        document.querySelector(".randomBg .no").classList.add("active");
    }

}




// toggle spin class on icon
let iconSet = document.querySelector(".toggle-settings .iconSet");
let settingBox = document.querySelector(".setting-box");

iconSet.addEventListener("click", setting);

function setting() {
    iconSet.classList.toggle("fa-spin");
    settingBox.classList.toggle("open");
}


//switch colors
const colorLi = document.querySelectorAll(".list-color li");
// console.log(colorLi);
colorLi.forEach(li => {
    // console.log(li)
    li.addEventListener("click" , (e)=>{
        // console.log(e.target.dataset.color)
        //set color on root 
        document.documentElement.style.setProperty("--main-color" , e.target.dataset.color);

        //set color on localstorage
        localStorage.setItem("colorOption", e.target.dataset.color);

        //remove active class from all
        e.target.parentElement.querySelectorAll(".active").forEach( el =>{
                el.classList.remove("active");
        });

        //add class active on target el
        e.target.classList.add("active");

        
    });
});


//switch random background options
const spans = document.querySelectorAll(".randomBg span");
// console.log(colorLi);
spans.forEach(span => {
    // console.log(li)
    span.addEventListener("click" , (e)=>{
        
        //remove active class from all
        e.target.parentElement.querySelectorAll(".active").forEach( el =>{
                el.classList.remove("active");
        });

        //add class active on target el
        e.target.classList.add("active");

        if (e.target.dataset.background === 'yes') {
            backgroundoption = true;
            randomizeImgs();
            localStorage.setItem('background_option', true);
        }else {
            backgroundoption = false;
            clearInterval(theBackInterval);
            localStorage.setItem('background_option', false);
        }
        
    });
});


//select background of main section
let bgMainSec = document.querySelector(".all-page");

//create array of images
let imgsArr = ["back2.jpg", "back3.jpg", "back4.jpg"];


// function to randomize imgs
function randomizeImgs() {
    if (backgroundoption === true) {
        theBackInterval = setInterval(() => {
            //get randome number
            let randomeNumber = Math.floor(Math.random()*imgsArr.length);
            //change background 
            bgMainSec.style.backgroundImage = 'url("../images/' + imgsArr[randomeNumber] +'")'
        }, 5000);
    }
}

randomizeImgs();

/*About section */

//select background of About section
let bgAboutSec = document.querySelector(".bgabout-sec img");

//create array of images
let imgsAboutArr = ["product-1.jpg", "product-2.jpg", "product-3.jpg"];

let backgroundAbout = true;
let theBackAboutInterval;

// function to randomize imgs
function randomizeImgsAbout() {
    if (backgroundAbout === true) {
        theBackAboutInterval = setInterval(() => {
            //get randome number
            let randomeNumberAbout = Math.floor(Math.random()*imgsAboutArr.length);
            //change background 
            bgAboutSec.src = "images/" + imgsAboutArr[randomeNumberAbout] ;
        }, 5000);
    }
}

randomizeImgsAbout();

/* end about section */

/* scroll event */

window.addEventListener('scroll', appear);

function appear() {
    var appears = document.querySelectorAll(".appear");
    var headbgColor = document.querySelector(".bg-color");

    var windowHeight;
    var appearTop;
    var appearPoint;

    appears.forEach(el => {
        windowHeight = window.innerHeight;
        appearTop = el.getBoundingClientRect().top;
        appearPoint = 100;
        var progressB = document.querySelectorAll(".progress-bar");

        if (appearTop < windowHeight - appearPoint) {
            el.classList.add("active");
            progressB.forEach( prog => {
                prog.style.transition = "2s"
                prog.style.width = prog.dataset.progress + "%";
            })

            
        }else {
            el.classList.remove("active");
            progressB.forEach( prog => {
                prog.style.width = "0%";
            })
        }
    });

var headTop = headbgColor.getBoundingClientRect().top;
    if (headTop < window.scrollY) {
        headbgColor.classList.add("scrolled");
    }else{
        headbgColor.classList.remove("scrolled");
    }

}


/* end scroll event */

/*create gallary*/
let imgArr = ["product-1.jpg","product-2.jpg","product-3.jpg","product-4.jpg","product-5.jpg","product-6.jpg","product-1.jpg","product-2.jpg","product-3.jpg"];

function createGallary() {

let imgsBox = document.querySelector(".imgsBox");

for (let i = 0; i < imgArr.length; i++) {
    let imgBox = document.createElement("div");
    imgBox.className= "imgBox col-lg-4 col-md-3 col-12 mb-4";
    imgsBox.appendChild(imgBox);
    let lightBox = document.createElement("a");
    lightBox.href = `images/${imgArr[i]}`;
    lightBox.setAttribute("data-lightbox","products");
    lightBox.setAttribute("data-title","product-1")
    imgBox.appendChild(lightBox)
    let img = document.createElement("img");
    img.src = `images/${imgArr[i]}`;
    img.className = "w-100";
    lightBox.appendChild(img);
}

}

createGallary();

/* load more btn */
let loadBtn = document.querySelector("#load-more");
let currentItem = 3;

loadBtn.addEventListener("click", loadMore);

function loadMore() {
    let imgBoxs = [...document.querySelectorAll(".imgBox")];
    for(let j = currentItem; j < currentItem+3; j++){
        imgBoxs[j].style.display = "block";
    }
    currentItem +=3;
    if(currentItem >= imgBoxs.length){
        loadBtn.style.display = "none";
    }
}

/*------------------------ */
/*----------------------------*/