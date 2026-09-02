import { safeFetchData } from "../helpers/safeFetch.mts"
import type { filmsSuggestions } from "../types/filmsSuggestions.mts"
export function fillFilmsSuggestion() : void{
    const director = (document.getElementById("director") as HTMLInputElement)
    const releaseYear = (document.getElementById("release_year") as HTMLInputElement)
    const poster = (document.getElementById("poster") as HTMLInputElement)
    const posterPreview = document.querySelector(".poster_icon img") as HTMLImageElement
    const filmsSuggestions = document.querySelector(".films_suggestions") as HTMLElement
    const titleInput = document.getElementById("title") as HTMLInputElement
    const labelSpan = document.querySelector(".poster_icon span") as HTMLElement
    if (!titleInput) return
    titleInput.addEventListener("input", async () => {
        const titleValue = titleInput.value
        if (titleValue.length >= 2) {
            try {
                const response = await safeFetchData(`api/films/search?q=${titleValue}`, {
                    method: "GET",
                })
                filmsSuggestions.style.display = "flex"
                const filmsArray:filmsSuggestions[] = response.result.suggestions
                filmsSuggestions.innerHTML = filmsArray.map(film => `<div class="film_option" data-tmdb-id="${film.tmdbId}" ><div class="filmoption_rightside"><img src="${film.posterUrl}" class="film_poster">
                </img><span>${film.title}</span></div> 
                <span>${film.releaseYear}</span></div><div class="filmoption_line"></div>`).join("")
                const filmOptions = document.querySelectorAll(".film_option") as NodeListOf<HTMLElement>
                filmOptions.forEach(filmOption => {
                    filmOption.addEventListener("click", async () => {
                        const tmdbId = filmOption.dataset.tmdbId
                        if (tmdbId) {
                            const filmInformation = await safeFetchData(`api/films/tmdb/${tmdbId}`, {
                                method: "GET"
                            })
                            const tmdbValue = filmInformation.result.details.tmdbId
                            titleInput.dataset.tmdbId = String(tmdbValue)
                            const posterPath = filmInformation.result.details.posterPath
                            console.log(posterPath)
                            sessionStorage.setItem("posterPath", posterPath) 
                            titleInput.value = filmInformation.result.details.title
                            director.value = filmInformation.result.details.director
                            releaseYear.value = filmInformation.result.details.releaseYear
                            posterPreview.src = filmInformation.result.details.posterUrl
                            posterPreview.classList.add("active")
                            labelSpan.innerText = "Affiche officielle proposée — clique pour la remplacer"
                            poster.addEventListener("change", () => { 
                                const file = poster.files?.[0]
                                if (file && file.size <= 5 * 1024 * 1024) {
                                    posterPreview.src = URL.createObjectURL(file);
                                    posterPreview.classList.add("active");
                                    labelSpan.innerText = "Modifier"
                                } else { 
                                    (document.querySelector(".posterErrorMsg") as HTMLElement).innerText = "Photo trop lourde"
                                }
                            })
                        }
                        filmsSuggestions.style.display = "none"
                    })
                })
            } catch (error) {
                if (error instanceof Error) {
                    console.error(error.message)
                } else {
                    console.error(error)
                }
            }

        } else {
            filmsSuggestions.style.display = "none"
        }
    })
}