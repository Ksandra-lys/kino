import { depositProgram } from "../components/depositProgram.mts"
import { pageRedirect } from "../helpers/pageRedirect.mts"
import { issaProposition, yasmineProposition, rayanProposition, likes } from "../data/categoriesOnDepositDaysData.mts"
import { categoryPageOnDepositDays } from "../components/categoryPageOnDepositDays.mts"
document.addEventListener("DOMContentLoaded", () => {
    const programContainer = document.querySelector(".program_container")
    programContainer.innerHTML = depositProgram({
        programIcon: "/assets/icons/love.svg",
        programName: "PHASE DE VOTE",
        programDescription: "Votez pour le thème du débat samedi"
    })

    const categoryPropositionsContainer = document.querySelector(".category_propositions_container")
    categoryPropositionsContainer.innerHTML = categoryPageOnDepositDays({
        ...issaProposition,
        ...likes
    }) +
        categoryPageOnDepositDays({
            ...yasmineProposition,
            ...likes
        })
        +
        categoryPageOnDepositDays({
            ...rayanProposition,
            ...likes
        })

    pageRedirect("voteDayHomepage.html", ".back_btn")

}) 