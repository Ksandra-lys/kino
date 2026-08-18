import { revelationPageMainLiveSubscription, themeRevelationPageMain } from "../components/revelationPageMain.mts"
import { pageRedirect } from "../helpers/pageRedirect.mts"

document.addEventListener("DOMContentLoaded",()=>{
    const themeRevelationContainer = document.querySelector(".theme_revelation_container")
    themeRevelationContainer.innerHTML = themeRevelationPageMain("THÈME DU DÉBAT","L'IA va-t-elle remplacer les développeurs ?","18")

    const liveReservation = document.querySelector(".live_reservation")
    liveReservation.innerHTML = revelationPageMainLiveSubscription("Débat · Samedi à 21h30","Notification 1h avant · rappel à 20h30",
        "/assets/icons/bell.svg"," Me notifier 1h avant le live")

    pageRedirect("revelationDayHomePage.html",".back_btn")
}) 