import { uploadedFilms } from "../components/uploadedFilms.mts"
import { safeFetchData } from "./safeFetch.mts"
import type { FilmPayload } from "../types/filmPayload.mts"
export function depositFilms() {
    const vf = document.querySelector(".vf") as HTMLButtonElement
    const vostfr = document.querySelector(".vostfr") as HTMLButtonElement
    let choice = ""
    vf.addEventListener("click", () => {
        choice = "vf"
        vf.classList.add("active")
        vostfr.classList.remove("active")
    })
    vostfr.addEventListener("click", () => {
        choice = "vostfr"
        vostfr.classList.add("active")
        vf.classList.remove("active")
    })

    const depositBtnText = document.querySelector(".deposit_btn_text") as HTMLElement
    const uploadFilmsContainer = document.querySelector(".upload_films_container") as HTMLElement
    const noProp = document.querySelector(".no_proposition") as HTMLElement
    const uploadBtn = document.querySelector(".upload_btn") as HTMLButtonElement
    const director = (document.getElementById("director") as HTMLInputElement)
    const releaseYear = (document.getElementById("release_year") as HTMLInputElement)
    const titleInput = document.getElementById("title") as HTMLInputElement
    const depositModal = document.querySelector(".depositfilm_modal_background") as HTMLElement
    const depositBtn = document.querySelector(".deposit_btn")
    const opinion = document.getElementById("opinion") as HTMLInputElement
    const posterPath = sessionStorage.getItem("posterPath")
    //const version = document.querySelector(".version") as HTMLElement
    const poster = (document.getElementById("poster") as HTMLInputElement)
    
    uploadBtn.addEventListener("click", async () => {
        if (titleInput.value !== "" && releaseYear.value !== "" && director.value !== "") {
            // const tmdbIndex = sessionStorage.getItem("tmdb")
            const tmdbIndex = titleInput.dataset.tmdbId
            console.log(tmdbIndex) 
            const payload: FilmPayload = {
                title: titleInput.value.trim(),
                releaseYear: Number(releaseYear.value),
                director: director.value.trim()
            }
            if (choice) {
                payload.version = choice
            }
            if (opinion.value) {
                payload.pitch = opinion.value.trim()
            }
            if (tmdbIndex) {
                payload.tmdbId = Number(tmdbIndex)
            }
            const filmResult = await safeFetchData("api/films", {
                method: "POST",
                data: payload
                // version: choice,
                // pitch: opinion.value,
                // tmdbId: Number(tmdbIndex)
            })
            console.log(filmResult)
            const filmInfo = filmResult.result.film
            console.log(filmResult.result.film.id)
            const filmId = filmResult.result.film.id

            if (poster.files?.[0] && poster.files?.[0].size < 5 * 1024 * 1024) {
                try{
                    const formData = new FormData()
                formData.append("poster", poster.files?.[0])
                await safeFetchData(`api/media/film-poster/${filmId}`, {
                    method: "POST",
                    data: formData
                })
                } catch(error){
                    console.error(error)
                }
                
            } else if (tmdbIndex) {
                try {
                    const filmPicture = await safeFetchData(`api/media/film-poster/${filmId}/tmdb`, {
                        method: "POST",
                        data: {
                            posterPath
                        }
                    })
                    console.log(filmPicture)
                } catch (error) {
                    console.error(error)
                }
            }

            depositModal.style.display = "none"
            uploadFilmsContainer.style.display = "flex"
            uploadFilmsContainer.innerHTML = uploadedFilms(filmInfo,true)
            noProp.style.display = "none"
            depositBtnText.innerText = "Film déjà déposé cette semaine"
            depositBtn.classList.add("active")
        } else {
            alert("Vous n'avez pas choisi de film")
        }
    })
}