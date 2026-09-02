import { revelationPageMainLiveSubscription} from "../components/revelationPageMain.mts"
import { pageRedirect } from "../helpers/pageRedirect.mts"
import { themeRevelationPageMain } from "../components/revelationPageMain.mts"
import { safeFetchData } from "../helpers/safeFetch.mts"
import { categoryPageFooter } from "../components/categoryPageFooter.mts"
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const filmResult = await safeFetchData("api/votes/results", {
            method: "GET"
        })

        const filmRevelationContainer = document.querySelector(".film_revelation_container") as HTMLElement
        filmRevelationContainer.innerHTML = themeRevelationPageMain(filmResult.result.results[0])
    } catch (error) {
        if(error instanceof Error){
          console.error(error.message)
        } else {
            console.error(error)
        }
         
    }

    const liveRevelation = document.querySelector(".live_reservation") as HTMLElement
    liveRevelation.innerHTML = revelationPageMainLiveSubscription("Live · Samedi à 20h00","124 inscrits · rappel à 19h45","/assets/icons/bell.svg"," Je participe samedi soir")
    
    const footerContainer = document.querySelector("footer") as HTMLElement
    footerContainer.innerHTML = categoryPageFooter()

    pageRedirect("revelationDayHomePage.html", ".back_btn")
    pageRedirect("revelationDayInfoPage.html",".footer_category_info")

})    