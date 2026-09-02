import type { FilmPayload } from "../types/filmPayload.mts"
import { fillFilmsSuggestion } from "./fillFilmsSuggestion.mts"
import { safeFetchData } from "../helpers/safeFetch.mts"
import { uploadedFilms } from "../components/uploadedFilms.mts"
import { showSnackbar } from "../helpers/showSnackBar.mts"
export async function editFilmChoice(): Promise<void> {
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


    const director = (document.getElementById("director") as HTMLInputElement)
    const releaseYear = (document.getElementById("release_year") as HTMLInputElement)
    const titleInput = document.getElementById("title") as HTMLInputElement
    const opinion = document.getElementById("opinion") as HTMLInputElement
    const depositModal = document.querySelector(".depositfilm_modal_background") as HTMLElement
    const poster = (document.getElementById("poster") as HTMLInputElement)
    const uploadBtn = document.querySelector(".upload_btn") as HTMLButtonElement
    const posterPath = sessionStorage.getItem("posterPath")
    const categoryPropContainer = document.querySelector(".category_propositions_container") as HTMLElement
    const snackbar = document.querySelector(".snackbar") as HTMLElement
    const updateFilmBtns = document.querySelectorAll(".updatefilm_btn") as NodeListOf<HTMLElement>
    updateFilmBtns.forEach(updateFilmBtn =>
        updateFilmBtn.addEventListener("click", () => {
            depositModal.style.display = "flex"
            const filmId = updateFilmBtn.dataset.filmId
            fillFilmsSuggestion()

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
                        const userInfo = await safeFetchData("api/auth/me", {
                            method: "GET",

                        });

                        const filmUpdated = await safeFetchData(`api/films/${filmId}`, {
                            method: "PUT",
                            data: payload

                        })
                        const filmInfo = filmUpdated.result.film

                        const updatedFilmId = filmUpdated.result.film.id

                        if (poster.files?.[0] && poster.files?.[0].size < 5 * 1024 * 1024) {
                            try {
                                const formData = new FormData()
                                formData.append("poster", poster.files?.[0])
                                await safeFetchData(`api/media/film-poster/${updatedFilmId}`, {
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
                                await safeFetchData(`api/media/film-poster/${updatedFilmId}/tmdb`, {
                                    method: "POST",
                                    data: {
                                        posterPath
                                    }
                                })
                                depositModal.style.display = "none"
                                categoryPropContainer.innerHTML = uploadedFilms(filmInfo, userInfo.result.user)
                            } catch (error) {
                                if (error instanceof Error) {
                                    console.error(error.message)

                                } else {
                                    showSnackbar(error.message)
                                    snackbar.style.backgroundColor = "red"
                                }
                            }

                        } else {
                            alert("Vous n'avez pas choisi de film")
                        }
                        showSnackbar("Film modifié")
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
        })
    )
}