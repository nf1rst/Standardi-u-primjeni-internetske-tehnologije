const slides=document.querySelectorAll('.slides img');
let slideIndex=0;
let intervalId=null;

initializeSlider();

function initializeSlider(){
    if(slides.length>0){ //ako ima slika
    slides[slideIndex].classList.add("displaySlide");
    intervalId=setInterval(nextSlide,5000);//vraca interval id
    //console.log(intervalId)
    }

}

function showSlide(index){
    if(index>=slides.length){
        slideIndex=0;
    } //ako dode do kraja odi na 0
    else if(index<0){
        slideIndex=slides.length -1;
    }// aio je manji odi na zadnju 

    slides.forEach(slide => {
    slide.classList.remove("displaySlide");        
    }); // kad ide na iducu da makne displySlide na trenutnoj

    slides[slideIndex].classList.add("displaySlide");
}


function prevSlide(){
    //clearInterval(intervalId); //da prestane ako netko krene rucno klikat
    slideIndex--;
    showSlide(slideIndex);
}

function nextSlide(){
    slideIndex++;
    showSlide(slideIndex);
}

