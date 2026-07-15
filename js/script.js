/*=============================
    COPY VOUCHER
==============================*/

const copyBtn = document.querySelector(".copy-btn");

if(copyBtn){

    copyBtn.addEventListener("click",()=>{

        navigator.clipboard.writeText("RZNANEW10");

        copyBtn.innerHTML="✓ Berhasil Disalin";

        setTimeout(()=>{

            copyBtn.innerHTML="Salin Kode";

        },2000);

    });

}

/*=====================================================
            RZNANSTORE
            script.js
=====================================================*/

/*==========================
        STICKY NAVBAR
===========================*/

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        header.classList.add("active");

    } else {

        header.classList.remove("active");

    }

});


/*==========================
      HAMBURGER MENU
===========================*/

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger) {

    hamburger.addEventListener("click", () => {

        hamburger.classList.toggle("active");

        navMenu.classList.toggle("active");

    });

}


/*==========================
      CLOSE MENU CLICK
===========================*/

document.querySelectorAll(".nav-menu a").forEach(link => {

    link.addEventListener("click", () => {

        hamburger.classList.remove("active");

        navMenu.classList.remove("active");

    });

});


/*==========================
      SMOOTH SCROLL
===========================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e){

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            e.preventDefault();

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});


/*==========================
        ACTIVE MENU
===========================*/

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-menu a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const top=section.offsetTop-120;
        const height=section.clientHeight;

        if(pageYOffset>=top){

            current=section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")=="#"+current){

            link.classList.add("active");

        }

    });

});


/*==========================
      COUNTER
===========================*/

const counters=document.querySelectorAll(".counter");

const startCounter=()=>{

counters.forEach(counter=>{

const target=+counter.dataset.target;

let count=0;

const speed=target/150;

const update=()=>{

count+=speed;

if(count<target){

counter.innerText=Math.floor(count).toLocaleString();

requestAnimationFrame(update);

}else{

counter.innerText=target.toLocaleString();

}

}

update();

});

}

let counterStarted=false;

window.addEventListener("scroll",()=>{

const stat=document.querySelector(".statistics");

if(!stat) return;

const top=stat.offsetTop-500;

if(window.scrollY>top && !counterStarted){

counterStarted=true;

startCounter();

}

});


/*==========================
      COPY VOUCHER
===========================*/

const copyBtn=document.querySelector(".copy-btn");

if(copyBtn){

copyBtn.addEventListener("click",()=>{

navigator.clipboard.writeText("RZNANEW10");

copyBtn.innerHTML="✓ Berhasil Disalin";

setTimeout(()=>{

copyBtn.innerHTML="Salin Kode";

},2000);

});

}


/*==========================
      BACK TO TOP
===========================*/

const backTop=document.querySelector(".back-to-top");

if(backTop){

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

backTop.style.opacity="1";
backTop.style.pointerEvents="auto";

}else{

backTop.style.opacity="0";
backTop.style.pointerEvents="none";

}

});

}


/*==========================
      REVEAL ANIMATION
===========================*/

const reveals=document.querySelectorAll(

".hero,.problem,.why-us,.cta,.testimonial,.statistics,.about,.video-section,.promo,.footer"

);

const reveal=()=>{

reveals.forEach(el=>{

const top=el.getBoundingClientRect().top;

const windowHeight=window.innerHeight;

if(top<windowHeight-120){

el.style.opacity="1";

el.style.transform="translateY(0)";

}

});

}

reveals.forEach(el=>{

el.style.opacity="0";
el.style.transform="translateY(60px)";
el.style.transition="all .8s ease";

});

window.addEventListener("scroll",reveal);

reveal();


/*==========================
      YEAR AUTO
===========================*/

const year=document.querySelector("#year");

if(year){

year.innerHTML=new Date().getFullYear();

}