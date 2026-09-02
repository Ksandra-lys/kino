import { depositProgram } from "../components/depositProgram.mts"
import { pageRedirect } from "../helpers/pageRedirect.mts"
import { safeFetchData } from "../helpers/safeFetch.mts"
import { uploadedFilms } from "../components/uploadedFilms.mts"
import { showSnackbar } from "../helpers/showSnackBar.mts"
import { categoryPageFooter } from "../components/categoryPageFooter.mts"
import type { filmsDeposit } from "../types/filmsDeposited.mts"
document.addEventListener("DOMContentLoaded", async () => {
    const numberOfVotersContainer = document.querySelector(".numberOfVoters_container") as HTMLElement
    const snackbar = document.querySelector(".snackbar") as HTMLButtonElement
    const programContainer = document.querySelector(".program_container") as HTMLElement
    programContainer.innerHTML = depositProgram({
        programIcon: "/assets/icons/love.svg",
        programName: "PHASE DE VOTE",
        programDescription: "Choisissez le film du samedi soir"
    })

    try {
        const votesParticipation = await safeFetchData("api/votes/participation", {
            method: "GET",
        })

        const filmsProp = await safeFetchData("api/films", {
            method: "GET"
        })
        const myVote = await safeFetchData("api/votes/me", {
            method: "GET"
        })

        const allFilms: filmsDeposit[] = filmsProp.result.films
        let votedfilmId = myVote.result.filmId

        const categoryPropContainer = document.querySelector(".category_propositions_container") as HTMLElement

        if (allFilms.length === 0) {
            categoryPropContainer.innerHTML = `<span class="no_proposition">Aucun film déposé cette semaine</span>`
        } else {
            if (votesParticipation.result.voters === 0) {
                numberOfVotersContainer.innerHTML = `<span>Aucun vote pour le moment — votez pour votre film préféré</span>`
            } else if (votesParticipation.result.voters === 1) {
                numberOfVotersContainer.innerHTML = `<span>${votesParticipation.result.voters} membre sur ${votesParticipation.result.members} a déjà voté</span>`
            } else {
                numberOfVotersContainer.innerHTML = `<span>${votesParticipation.result.voters} membres sur ${votesParticipation.result.members} ont déjà voté</span>`
            }

            categoryPropContainer.innerHTML = (allFilms.map(film => { const isVoted = film.id === votedfilmId; return uploadedFilms(film, isVoted ? "/assets/icons/love.svg" : "/assets/icons/emptyheart.svg", isVoted) }).join(""))
        }

        document.addEventListener("click", async (e) => {
            const target = e.target as HTMLElement
            const likeBtn = target.closest(".like_btn") as HTMLElement
            if (likeBtn) {
                const filmId = likeBtn.dataset.index
                try {
                    await safeFetchData("api/votes", {
                        method: "POST",
                        data: {
                            filmId: Number(filmId)
                        }
                    })

                    const allFilms: filmsDeposit[] = filmsProp.result.films
                    const film = allFilms.find(film => film.id === Number(filmId))
                    if (film) {
                        votedfilmId =film.id
                        const filmName = film.title
                        showSnackbar(`Votre vote pour ${filmName} a été enregistré`)

                        categoryPropContainer.innerHTML = (allFilms.map(film => { const isVoted = film.id === votedfilmId; return uploadedFilms(film, isVoted ? "/assets/icons/love.svg" : "/assets/icons/emptyheart.svg", isVoted) }).join(""))

                    }
                    await safeFetchData("api/votes/participation", {
                        method: "GET",

                    })


                } catch (error: any) {

                    showSnackbar(error.message)
                    snackbar.style.backgroundColor = "red"

                }
            }
        })

    } catch (error: any) {
        showSnackbar(error.message)
        snackbar.style.backgroundColor = "red"

    }

    const footerContainer = document.querySelector("footer") as HTMLElement
    footerContainer.innerHTML = categoryPageFooter()

    pageRedirect("voteDayHomepage.html", ".back_btn")
    pageRedirect("voteDayInfoPage.html", ".footer_category_info")

}) 