import { depositProgram } from "../components/depositProgram.mts"
import { pageRedirect } from "../helpers/pageRedirect.mts"
import { categoryPageFooter } from "../components/categoryPageFooter.mts"
import { openAndCloseModal } from "../helpers/openAndCloseModal.mts"
// import { fillFilmsSuggestion } from "../modules/fillFilmsSuggestion.mts"
// import { depositFilms } from "../modules/depositFilms.mts"
import { safeFetchData } from "../modules/safeFetch.mts"
import { uploadedFilms } from "../components/uploadedFilms.mts"
//import { showSnackbar } from "../helpers/showSnackBar.mts"
document.addEventListener("DOMContentLoaded", async () => {
    // document.querySelector("body").addEventListener("click",()=>{
    //    showSnackbar("Film déposé")
    // })
    const categoryPropContainer = document.querySelector(".category_propositions_container")
    const programContainer = document.querySelector(".program_container")
    programContainer.innerHTML = depositProgram({
        programIcon: "/assets/icons/film.svg",
        programName: "DÉPÔT DE FILMS . LUN → MER",
        programDescription: "Les votes commencent jeudi."
    })

    const footerContainer = document.querySelector("footer")
    footerContainer.innerHTML = categoryPageFooter()

    pageRedirect("depositDaysHomepage.html", ".back_btn")
    pageRedirect("depositDaysInfoPage.html", "footer .category")

    const depositModal = document.querySelector(".depositfilm_modal_background") as HTMLElement
    openAndCloseModal(".deposit_btn", depositModal, "depositfilm_modal_background")

    // fillFilmsSuggestion()

    // depositFilms()

    const uploadFilmsContainer = document.querySelector(".upload_films_container") as HTMLElement

    try {
        const weekFilms = await safeFetchData("api/films", {
            method: "GET"
        })
        if (categoryPropContainer === undefined) {
            uploadFilmsContainer.innerHTML = `<span class="no_proposition">Aucun film déposé cette semaine — sois le premier !</span>`
        } else{
            console.log(weekFilms.result.films[0])
            const allFilms = weekFilms.result.films
            console.log(allFilms)
            console.log(allFilms.map(film => uploadedFilms(film, true)))
            pageRedirect("voteDayHomepage.html", ".back_btn")
            categoryPropContainer.innerHTML = (allFilms.map(film => uploadedFilms(film, true)))
        }   
    } catch (error) {
        console.error(error)
    }

    // const updateFilmBtn = document.querySelector(".updatefilm_btn")
    // updateFilmBtn.addEventListener("click", async () => {
    //     depositModal.style.display = "flex"
    //     const filmId = sessionStorage.getItem("filmId")
    //     try {
    //         const filmsUpdated = await safeFetchData(`api/films/${filmId}`, {
    //             method: "PUT",
    //         })
    //         console.log(filmsUpdated)
    //     } catch (error) {
    //         console.error(error)
    //     }
    // })

})
