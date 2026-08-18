import { depositProgram } from "../components/depositProgram.mts"
import { pageRedirect } from "../helpers/pageRedirect.mts"
import { safeFetchData } from "../modules/safeFetch.mts"
import { uploadedFilms } from "../components/uploadedFilms.mts"
document.addEventListener("DOMContentLoaded", async() => {
    const categoryPropContainer = document.querySelector(".category_propositions_container")

    const programContainer = document.querySelector(".program_container")
    programContainer.innerHTML = depositProgram({
        programIcon: "/assets/icons/love.svg",
        programName: "PHASE DE VOTE",
        programDescription: "Choisissez le film du samedi soir"
    })

    const filmsProp = await safeFetchData("api/films",{
        method: "GET"
    })
    if(categoryPropContainer === undefined){
       categoryPropContainer.innerHTML = `<span class="no_proposition">Aucun film déposé cette semaine — sois le premier !</span>`
    } else {
        console.log(filmsProp.result.films[0])
    const allFilms = filmsProp.result.films
    categoryPropContainer.innerHTML = (allFilms.map(film => uploadedFilms(film,false,true)))
    }
    
    pageRedirect("voteDayHomepage.html", ".back_btn")

}) 