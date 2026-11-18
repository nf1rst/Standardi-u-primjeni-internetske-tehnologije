/*
1. sprijeci refresh da sve odmah ne nestane
2. provjera validnosti polja 
3. POST za registracijk
4. odgovor servera ako je ok sesstion stroge ako nije error
*/

function izvrsiRegistraciju(event) {

    // spriječi refresh stranice
    if (event) {
        event.preventDefault();
    }

    var username = document.querySelector("#username").value.trim();
    var password = document.querySelector("#password").value.trim();
    var errorElement = document.querySelector("#error");

    // provjera praznih polja
    if (username === "" || password === "") {
        errorElement.textContent = "Neka polja su ostala prazna, ipsunite ih";
        errorElement.style.color = "red";
        return;
    }

    /*
    if (password.length < 3) {
        errorElement.textContent = "Lozinka mora imati najmanje 3 znaka";
        errorElement.style.color = "red";
        return;
    }
    */

    errorElement.textContent = ""; // očisti prethodne greške

    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://www.fulek.com/data/api/user/register", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    // reakcija na server
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) { 
            if (xhr.status === 200) {
                var odgovor = JSON.parse(xhr.responseText);
                //string od servera convertaš u objekt
                console.log("Server:", odgovor);

                if (odgovor.isSuccess) {
                    // spremi privremeno podatke
                   // sessionStorage.setItem('registeredUsername', username);
                    //sessionStorage.setItem('registeredPassword', password);
                    // session storage se briše kad se tab zatvroi 
                    //local storage ostaje trajno

                    errorElement.textContent = "Registracija je uspješno odrađena!";
                    errorElement.style.color = "green";

                    setTimeout(function () {
                        window.location.href = "login.html";
                    }, 1500);
                } else {
                    var poruka =  "Korisnik već postoji";
                    errorElement.textContent = "Greška: " + poruka;
                    errorElement.style.color = "red";
                }
            } else {
                errorElement.textContent = "Greška na serveru (" + xhr.status + ")";
                errorElement.style.color = "red";
            }
        }
    };

    // slanje 
    var podaci = JSON.stringify({username: username, password: password});
    xhr.send(podaci);
}
