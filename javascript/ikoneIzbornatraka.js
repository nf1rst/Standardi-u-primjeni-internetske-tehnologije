$(document).ready(function(){
     const icons = {
        "Prijavi se": "fa-solid fa-arrow-right-to-bracket",
        "Početna": "fa-solid fa-house",
        "O nama": "fa-solid fa-circle-info",
        "Novosti": "fa-solid fa-newspaper",
        "Galerija":"fa-solid fa-images",
        "Profili":"fa-solid fa-icons",
        "Nastavni sadržaj": "fa-solid fa-book",
    };

    $("#menu ul li a").each(function(){
        const text =$(this).text().trim(); //trenutni izabrani a 
        //nece radit ako je gore krivo napisano 
        if(icons[text]){ //kao indekser - ako ima u ikonama pod kljucem x postoji naziv ikone
             $(this).prepend(`<i class="${icons[text]}"></i> `);
        }
    });
    $("#kontakt").prepend('<i class="fa-solid fa-envelope"></i> ');
    //prepend ubacuje ispred necega ali unutar istog elementam, before ubacuje ispred cijelog elementa
    //
});

/*https://fontawesome.com/icons/book?f=classic&s=solid*/