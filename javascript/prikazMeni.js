document.addEventListener("DOMContentLoaded", function () {

    const token = localStorage.getItem("token");
    const nastavniPlan = document.getElementById("nastavniPlanLink");

    if (token && nastavniPlan) {
        nastavniPlan.style.display = "inline-block";
        //inline-block dopusta mijenjane weidth, height i sl i na istoj su liniji
        //inline napravi da sjede na istoj liniji o
        //block - da zauzme cijeli line
    }
});
