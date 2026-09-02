import { pageRedirect } from "../helpers/pageRedirect.mjs"
import { calendarOnboarding } from "../components/calendarOnboarding.mts"
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
        descriptionStep: "Lun → Sam ",
        descriptionTitle: "Le Rythme",
        descriptionContent: "Chaque semaine : déposez, votez, découvrez le résultat vendredi, vivez le live samedi.",
        nextBtn: "Suivant"
    })

    const calendarContainer = document.querySelector(".calendar_container") as HTMLElement
    calendarContainer.innerHTML = calendarOnboarding({
        calendarClass: "depot_calendar",
        calendarIcon: "/assets/icons/vote.svg",
        plan: "Dépôt",
        date: "Lun - Mer",
        line: "depot_line"
    }) +
        calendarOnboarding({
            calendarClass: "vote_calendar",
            calendarIcon: "/assets/icons/love.svg",
            plan: "Vote",
            date: "Jeudi",
            line: "vote_line"
        }) + calendarOnboarding({
            calendarClass: "result_calendar",
            calendarIcon: "/assets/icons/trophy.svg",
            plan: "Résultat",
            date: "Vendredi",
            line: "result_line"
        })
        + calendarOnboarding({
            calendarClass: "live_calendar",
            calendarIcon: "/assets/icons/circle.svg",
            plan: "Live",
            date: "Samedi",
            line: "live_line"
        })

    pageRedirect("onboardingConnect.html", ".next_btn")
    pageRedirect("inscriptionPage.html", ".skip_btn")

})  