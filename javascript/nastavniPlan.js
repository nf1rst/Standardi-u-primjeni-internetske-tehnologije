// PROVJERA LOGIN-a samo na kolegiji.html
const token = localStorage.getItem("token");
const trenutnaStrana = window.location.pathname;

// Redirect na login samo ako je korisnik na kolegiji.html i nije ulogiran
if (trenutnaStrana.includes("kolegiji.html") && !token) {
    window.location.href = "login.html";
}


let sviKolegiji = [];

// ČEKAJ DOM
document.addEventListener("DOMContentLoaded", () => {
    inicijalizirajAutocomplete();
    inicijalizirajKolegije();
});

function inicijalizirajKolegije() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://www.fulek.com/data/api/supit/curriculum-list/hr", true);
    xhr.setRequestHeader("Authorization", "Bearer " + token);
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log(xhr.responseText);
            var data = JSON.parse(xhr.responseText);
            sviKolegiji = data.data;
        }
        else {
            alert("Sever trenutno nije u stanju")
        }
    }
    xhr.send();
}

function inicijalizirajAutocomplete() {
    const input = document.querySelector("#kolegijNaziv");
    const lista = document.querySelector("#preporuka");

    input.addEventListener("input", () => {
        lista.innerHTML = "";

        const tekst = input.value.toLowerCase();

        if (tekst.length < 2) {
            lista.innerHTML = "..."
            return;
        }
        lista.innerHTML = ""; /*da ne ostanu ... ako se izade van */

        const filtrirani = sviKolegiji.filter(k =>
            k.kolegij.toLowerCase().includes(tekst)
        );
        //prode kroz svaki kolegij i zadrzi samo one koji u sebi sadrze tekst koji je korisnik upisal

        filtrirani.forEach(k => {
            const li = document.createElement("li");
            li.textContent = k.kolegij; // da ih zapise kao preporuku jedan ispod drugog 

            li.onclick = () => {
                dodajUTablicu(k);
                input.focus();
                input.value = "";
                lista.innerHTML = "";
            };
            lista.appendChild(li);//prikaz u htmlu
        });
    });
}


function dodajUTablicu(k) {
    const tbody = document.querySelector("#tBody");

    for (let row of tbody.rows) {
        if (row.cells[0].textContent === k.kolegij) {

            kolegijNotifikacija(k.kolegij);
            return;
        }
    }

    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td>${k.kolegij}</td>
        <td>${k.ects}</td>
        <td>${k.sati}</td>
        <td>${k.predavanja}</td>
        <td>${k.vjezbe}</td>
        <td>${k.tip}</td>
        <td>${k.semestar}</td>
        <td><button onclick="obrisiRed(this)">&times;</button></td>
    `;

    tbody.appendChild(tr);
    izracunajUkupno();
}

function kolegijNotifikacija(k) {
    var notifikacijaCont = document.querySelector("#nofitikacijaContainer");
    var errorSound = new Audio("audio/errorSound.mp3");
    notifikacijaCont.innerHTML = `
        <h4><i class="fa-solid fa-xmark"></i>Greška</h4>
        <p>Kolegij [${k}] već postoji</p>
        `;
    notifikacijaCont.classList.add("show");
    errorSound.play();

    setInterval(() => {
    notifikacijaCont.classList.remove("show");
    }, 4000);

}


function obrisiRed(btn) {
    btn.parentElement.parentElement.remove(); /*button td tr  inace obrises samo button za brisat*/
    izracunajUkupno();
}

function izracunajUkupno() {
    let ects = 0;
    let sati = 0;
    let predavanja = 0;
    let vjezbe = 0;
    let brojObaveznih = 0;
    const redovi = document.querySelectorAll("#tBody tr");

    redovi.forEach(r => {
        ects += Number(r.cells[1].textContent);
        sati += Number(r.cells[2].textContent);
        predavanja += Number(r.cells[3].textContent);
        vjezbe += Number(r.cells[4].textContent);
        if (r.cells[5].textContent === "Obavezni") brojObaveznih++;
    });

    document.querySelector("#totalECTS").textContent = ects;
    document.querySelector("#totalSati").textContent = sati;
    document.querySelector("#totalPredavanja").innerHTML = predavanja;
    document.querySelector("#totalVjezbe").innerHTML = vjezbe;
    document.querySelector("#totalObavezni").innerHTML = brojObaveznih;
}