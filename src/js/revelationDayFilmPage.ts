import { revelationPageMainLiveSubscription, themeRevelationPageMain } from "../components/revelationPageMain.mts"
import { pageRedirect } from "../helpers/pageRedirect.mts"

document.addEventListener("DOMContentLoaded",()=>{
    const filmRevelationContainer= document.querySelector(".film_revelation_container")
    filmRevelationContainer.innerHTML = 
    themeRevelationPageMain("FILM DE LA SEMAINE", "Anora","18","Sean Baker · 2024")

    const liveRevelation = document.querySelector(".live_reservation")
    liveRevelation.innerHTML = revelationPageMainLiveSubscription("Live · Samedi à 20h00","124 inscrits · rappel à 19h45","/assets/icons/bell.svg"," Je participe samedi soir")

    pageRedirect("revelationDayHomePage.html",".back_btn")

})    