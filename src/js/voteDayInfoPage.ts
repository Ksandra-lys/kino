import { depositProgram } from "../components/depositProgram.mts"
import { pageRedirect } from "../helpers/pageRedirect.mts"
//import { issaProposition, yasmineProposition, rayanProposition, likes } from "../data/categoriesOnDepositDaysData.mts"
//import { categoryPageOnDepositDays } from "../components/categoryPageOnDepositDays.mts"
import { categoryPageFooter } from "../components/categoryPageFooter.mts"
document.addEventListener("DOMContentLoaded", () => {
    const programContainer = document.querySelector(".program_container") as HTMLElement
    programContainer.innerHTML = depositProgram({
        programIcon: "/assets/icons/love.svg",
        programName: "PHASE DE VOTE",
        programDescription: "Votez pour le thème du débat samedi"
    })

    
    // categoryPropositionsContainer.innerHTML = categoryPageOnDepositDays({
    //     ...issaProposition, 
    //     ...likes
    // }) +
    //     categoryPageOnDepositDays({
    //         ...yasmineProposition,
    //         ...likes
    //     })
    //     +
    //     categoryPageOnDepositDays({
    //         ...rayanProposition,
    //         ...likes
    //     })
    const categoryPropositionsContainer = document.querySelector(".category_propositions_container") as HTMLElement
    categoryPropositionsContainer.innerHTML = `<span class="no_proposition">Aucun thème proposé cette semaine</span>`

    const footerContainer = document.querySelector("footer") as HTMLElement
    footerContainer.innerHTML = categoryPageFooter()
    pageRedirect("voteDayHomepage.html", ".back_btn")
    pageRedirect("voteDayFilmPage.html",".footer_category_film")

}) 