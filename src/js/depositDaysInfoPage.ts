import { categoryPageFooter } from "../components/categoryPageFooter.mts"
import { depositProgram } from "../components/depositProgram.mts"
import { pageRedirect } from "../helpers/pageRedirect.mts"
//import { categoryPageOnDepositDays } from "../components/categoryPageOnDepositDays.mts"
//import { issaProposition, yasmineProposition, rayanProposition } from "../data/categoriesOnDepositDaysData.mts"
document.addEventListener("DOMContentLoaded", () => {
    const programContainer = document.querySelector(".program_container")
    programContainer.innerHTML = depositProgram({
        programIcon: "/assets/icons/download.svg",
        programName: "DÉPÔT DE THÈMES . LUN → MER",
        programDescription: "Proposez un sujet à débattre samedi."
    })

    const footerContainer = document.querySelector("footer")
    footerContainer.innerHTML = categoryPageFooter()
    // const categoryPropositionsContainer = document.querySelector(".category_propositions_container")
    // categoryPropositionsContainer.innerHTML = categoryPageOnDepositDays({
    //     ...issaProposition
    // }) +
    //     categoryPageOnDepositDays({
    //         ...yasmineProposition
    //     })
    //     +
    //     categoryPageOnDepositDays({
    //         ...rayanProposition
    //     })

    pageRedirect("depositDaysHomepage.html", ".back_btn")
    pageRedirect("depositDaysFilmPage.html", "footer .category")

}) 