var notifikacijaCont =document.querySelector("#nofitikacijaContainer");

function NemaPrethodneNofitikacija(){
    notifikacijaCont.innerHTML=`
        <h4><i class="fa-solid fa-xmark"></i>Greška</h4>
        <p>Nema prethodne stranice</p>
    `;
    notifikacijaCont.classList.add("show");

        notifikacijaCont.style.background="linear-gradient(to left, orange,purple)";


    setInterval(() => {
    notifikacijaCont.classList.remove("show");
    }, 3000);


}

function NemaIduceNotifikacija(){
    notifikacijaCont.innerHTML=`
        <h4><i class="fa-solid fa-xmark"></i>Greška</h4>
        <p>Nema iduće stranice</p>
    `;
    notifikacijaCont.classList.add("show");

    notifikacijaCont.style.background="linear-gradient(to left, orange,purple)";

    setInterval(() => {
        notifikacijaCont.classList.remove("show");
    }, 3000);
}
