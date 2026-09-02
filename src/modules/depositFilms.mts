import { uploadedFilms } from "../components/uploadedFilms.mts"
import { safeFetchData } from "../helpers/safeFetch.mts"
import type { FilmPayload } from "../types/filmPayload.mts"
import { showSnackbar } from "../helpers/showSnackBar.mts"
export async function depositFilms(): Promise<void> {
    const vf = document.querySelector(".vf") as HTMLButtonElement
    const vostfr = document.querySelector(".vostfr") as HTMLButtonElement
    let choice = ""
    if (!vf) return
    vf.addEventListener("click", () => {
        choice = "vf"
        vf.classList.add("active")
        vostfr.classList.remove("active")
    })
    if (!vostfr) return
    vostfr.addEventListener("click", () => {
        choice = "vostfr"
        vostfr.classList.add("active")
        vf.classList.remove("active")
    })

    const depositBtnText = document.querySelector(".deposit_btn_text") as HTMLElement
    const noProp = document.querySelector(".no_proposition") as HTMLElement
    const uploadBtn = document.querySelector(".upload_btn") as HTMLButtonElement
    const director = (document.getElementById("director") as HTMLInputElement)
    const releaseYear = (document.getElementById("release_year") as HTMLInputElement)
    const titleInput = document.getElementById("title") as HTMLInputElement
    const depositModal = document.querySelector(".depositfilm_modal_background") as HTMLElement
    const depositBtn = document.querySelector(".deposit_btn") as HTMLButtonElement
    const opinion = document.getElementById("opinion") as HTMLInputElement
    const posterPath = sessionStorage.getItem("posterPath")
    const categoryPropContainer = document.querySelector(".category_propositions_container") as HTMLElement
    const poster = (document.getElementById("poster") as HTMLInputElement)
    const snackbar = document.querySelector(".snackbar") as HTMLElement
    uploadBtn.addEventListener("click", async () => {
        if (titleInput.value !== "" && releaseYear.value !== "" && director.value !== "") {
            const tmdbIndex = titleInput.dataset.tmdbId
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
            try {
                const filmResult = await safeFetchData("api/films", {
                    method: "POST",
                    data: payload
                })
                const filmInfo = filmResult.result.film
                const filmId = filmResult.result.film.id

                if (poster.files?.[0] && poster.files?.[0].size < 5 * 1024 * 1024) {
                    try {
                        const formData = new FormData()
                        formData.append("poster", poster.files?.[0])
                        await safeFetchData(`api/media/film-poster/${filmId}`, {
                            method: "POST",
                            data: formData
                        })
                    } catch (error) {


                        if (error instanceof Error) {
                            console.error(error.message)

                        } else {
                            showSnackbar(error.message)
                            snackbar.style.backgroundColor = "red"
                        }

                    }

                } else if (tmdbIndex) {
                    try {
                        const tof = await safeFetchData(`api/media/film-poster/${filmId}/tmdb`, {
                            method: "POST",
                            data: {
                                posterPath
                            }
                        })
                        console.log(tof)
                    } catch (error) {

                        if (error instanceof Error) {
                            console.error(error.message)

                        } else {
                            showSnackbar(error.message)
                            snackbar.style.backgroundColor = "red"
                        }
                    }
                    depositModal.style.display = "none"
                    noProp.style.display = "none"
                    categoryPropContainer.innerHTML += uploadedFilms(filmInfo)
                    // userInfo.result.user
                    depositBtnText.innerText = "Film déjà déposé cette semaine"
                    depositBtn.disabled = true
                }
                showSnackbar("Film déposé")

            } catch (error) {

                if (error instanceof Error) {
                    console.error(error.message)

                } else {
                    showSnackbar(error.message)
                    snackbar.style.backgroundColor = "red"
                }

            }
        }
    })
}