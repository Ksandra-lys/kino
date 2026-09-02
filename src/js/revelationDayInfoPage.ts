import { revelationPageMainLiveSubscription} from "../components/revelationPageMain.mts"
import { pageRedirect } from "../helpers/pageRedirect.mts"
import { categoryPageFooter } from "../components/categoryPageFooter.mts"
document.addEventListener("DOMContentLoaded",()=>{
    // const themeRevelationContainer = document.querySelector(".theme_revelation_container")
    // themeRevelationContainer.innerHTML = themeRevelationPageMain("THÈME DU DÉBAT","L'IA va-t-elle remplacer les développeurs ?","18")

    const liveReservation = document.querySelector(".live_reservation") as HTMLElement
    liveReservation.innerHTML = revelationPageMainLiveSubscription("Débat · Samedi à 21h30","Notification 1h avant · rappel à 20h30",
        "/assets/icons/bell.svg"," Me notifier 1h avant le live")

        const footerContainer = document.querySelector("footer") as HTMLElement
        footerContainer.innerHTML = categoryPageFooter()

    pageRedirect("revelationDayHomePage.html",".back_btn")
    pageRedirect("revelationDayFilmPage.html",".footer_category_film")
}) 