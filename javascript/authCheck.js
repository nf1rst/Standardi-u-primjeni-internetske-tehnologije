// pokreni kad se stranica učita
document.addEventListener("DOMContentLoaded", function () {
    checkLoginStatus();
});


function checkLoginStatus() {

    var token = localStorage.getItem("token");
    //to je ono sto je u login bilo spremljeno kao localStorage.setItem("token", odgovor.data.token);
    var username = localStorage.getItem("username");

    var kolegijiLink = document.querySelector("#kolegijiLink");
    var kolegijiLinkPocetna = document.querySelector("#kolegijiLinkPocetna");
    var loginLink = document.querySelector("#loginLink");
    var linkPrijava = document.querySelector("#linkPrijava");

    // ako postoji token i username u local storage znaci da se korisnik logino
    if (token && username) {


        // za sve 
        if (kolegijiLink !== null) {
            kolegijiLink.style.display = "block";

        }

        //za pocetnu
        if (kolegijiLinkPocetna !== null) {
            kolegijiLinkPocetna.style.display = "block";
        }

        // promijeni login u odjava
        if (loginLink !== null) {
            loginLink.innerHTML = '<i class="fa fa-sign-out"></i> Odjava';
            loginLink.href = "#";//da ne ode nidgje nego s logout funkcijom

            loginLink.onclick = function (e) {
                //e.preventDefault();
                logout();
            };
        }

        if (linkPrijava) {
            linkPrijava.innerHTML = '<i class="fa fa-sign-out"></i> Odjava';
            linkPrijava.href = "#";

            linkPrijava.onclick = function () {

                logout();
            };
        }

    } else { //ako ne nades token i username
        // sakrij kolegije kao uopce postoji 
        if (kolegijiLink !== null) { //mozes i bez !==null
            kolegijiLink.style.display = "none";
        }

        if (kolegijiLinkPocetna !== null) {
            kolegijiLinkPocetna.style.display = "none";
        }

        // vrati na prijavu
        if (loginLink !== null) {
            loginLink.textContent = "Prijavi se";
            loginLink.href = "login.html";
        }

        if (linkPrijava !== null) {
            linkPrijava.textContent = "Prijavi se";
            linkPrijava.href = "login.html";
        }
    }
}


// odjavljivanje
function logout() {

    var potvrda = confirm("Jeste li sigurni da se želite odjaviti?");

    if (potvrda) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");

        pokaziNotifikaciju();
        var windowsShutdown=new Audio("audio/Success Sound Effect.mp3");
        windowsShutdown.play();
        setTimeout((e) => {
            window.location.href = "index.html";
        }, 2500);
    }
}

function pokaziNotifikaciju() {
    var notifikacijaCont = document.querySelector("#nofitikacijaContainer");

        notifikacijaCont.innerHTML = `
        <h4><i class="fa fa-sign-out"></i>Izlogiravam</h4>
        <p>Doviđenja</p>
        `;
        notifikacijaCont.classList.add("show");

        var body = document.querySelector("body");
        body.style.background ="rgb(34, 33, 33)";

}


