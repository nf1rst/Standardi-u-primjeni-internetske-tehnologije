/*
1. submit 
2. ne daj refresh odmah 
3. pokupi upisani username i password
4. provjeri jesu valjani podaci 
5. POSTom ih posalji serveru
6. server odgovara 
7. provjeri odgovor servera i ispisi ako ne valja, a valja spremi odgovor i preusmjeri nazad na pocetak
*/


function izvrsiLogin(event) {

    // bez ovoga se samo onda refresha i ne ovdene ngdje 
    if (event) {
        event.preventDefault();
    }

    var username = document.querySelector("#username").value;
    var password = document.querySelector("#password").value;
    var errorElement = document.querySelector("#error");


    // provjera jesu li polja prazna
    if (username === "" || password === "") {
        errorElement.textContent = "Molimo Vas da ispunite sva polja";
        errorElement.style.color = "red";
        return;
    }

    //https://youtu.be/tHRNuBf_8xg?si=AHn7X3-93SzvsER8
    //https://youtu.be/rjmtYkRK1nM?si=rNT6cqNRiBgUw9E8

    // kreiranje zahtjeva
    var xhr = new XMLHttpRequest();

    xhr.open("POST", "https://www.fulek.com/data/api/user/login", true);
    //true async da ne blokira stranicu

    xhr.setRequestHeader("Content-Type", "application/json");
    //da yna da oceluje JSON podatke 


    xhr.onreadystatechange = function () {

        if (xhr.readyState === 4) { 
            //1 - nije pokernutp, 2- otvoreno, 3- poslano, 4- gotovo

            if (xhr.status === 200) {
                //401 je unauthorized, 500 je server greška

                var odgovor = JSON.parse(xhr.responseText);
                //vraca json objekt kao string 

               // console.log(odgovor);

                if (odgovor.isSuccess && odgovor.data && odgovor.data.token) {
                    //ako postoje data i token nastavi 

                    //trajno spremi u browser
                    localStorage.setItem("token", odgovor.data.token);
                    localStorage.setItem("username", odgovor.data.username);

                    dobroDosliNotifikacija();
                    var welcomeAudio=new Audio("audio/Success Sound Effect.mp3");
                    welcomeAudio.play();

                    errorElement.textContent = "Prijava uspješna! Preusmjeravam...";
                    errorElement.style.color = "green";

                    setTimeout(function () {
                        window.location.href = "index.html";
                    }, 2500);

                } else {

                    var poruka = "Korisničko ime ili lozinka nisu točni";

                    errorElement.textContent = "Greška: " + poruka;
                    errorElement.style.color = "red";
                }

            } else {
                errorElement.textContent = "Greška na serveru (" + xhr.status + ")";
                errorElement.style.color = "red";
            }
        }
    };


    // slanje podataka
    var podaci = JSON.stringify({
        username: username,
        password: password
    });

    xhr.send(podaci);
}

function dobroDosliNotifikacija(){
        var notifikacijaCont = document.querySelector("#nofitikacijaContainer");

        notifikacijaCont.innerHTML = `
        <h4><i class="fa-solid fa-check"></i>Ulogiravam</h4>
        <p>DOBRODOŠLI</p>
        `;
        notifikacijaCont.classList.add("show");
        notifikacijaCont.style.background="linear-gradient(to right, green,rgb(182, 16, 228))";

}