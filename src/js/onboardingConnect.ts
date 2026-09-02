import { pageRedirect } from "../helpers/pageRedirect.mjs"
import { showPaginationDots } from "../helpers/showPaginationDots.mjs"
import { onboardingFooter } from "../components/onboardingFooter.mts"
document.addEventListener("DOMContentLoaded", () => {
    if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((reg) => console.log('Service Worker enregistré !', reg.scope))
        .catch((err) => console.error('Erreur :', err));
    });
  }
    const footerContainer = document.querySelector("footer") as HTMLElement
    footerContainer.innerHTML = onboardingFooter({
        descriptionStep: "Samedi Soir",
        descriptionTitle: "Vivez ensemble",
        descriptionContent: "Film en live, débat en direct. Commentez, réagissez. Le vrai club du samedi soir",
        nextBtn: "Commencer"
    })

    pageRedirect("inscriptionPage.html", ".next_btn")

    const connectDot = document.querySelector(".pagination_dot_connect") as HTMLElement
    showPaginationDots("onboardingConnect.html", connectDot)
}) 