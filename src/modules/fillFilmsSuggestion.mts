import { safeFetchData } from "./safeFetch.mts"
export function fillFilmsSuggestion() {
    const director = (document.getElementById("director") as HTMLInputElement)
    const releaseYear = (document.getElementById("release_year") as HTMLInputElement)
    const poster = (document.getElementById("poster") as HTMLInputElement)
    const posterPreview = document.querySelector(".poster_icon img") as HTMLImageElement
    const filmsSuggestions = document.querySelector(".films_suggestions") as HTMLElement
    const titleInput = document.getElementById("title") as HTMLInputElement
    const labelSpan = document.querySelector(".poster_icon span") as HTMLElement
    let tmdbIndex = ""
    titleInput.addEventListener("input", async () => {
        const titleValue = titleInput.value
        if (titleValue.length >= 2) {
            const response = await safeFetchData(`api/films/search?q=${titleValue}`, {
                method: "GET",
            })
            console.log(response.result.suggestions)
            filmsSuggestions.style.display = "flex"
            const filmsArray = response.result.suggestions
            filmsSuggestions.innerHTML = filmsArray.map(film => `<div class="film_option" data-index="${film.tmdbId}"><div class="filmoption_rightside"><img src="${film.posterUrl}" class="film_poster">
                </img><span>${film.title}</span></div>
                <span>${film.releaseYear}</span></div><div class="filmoption_line"></div>`).join("")
            const filmOptions = document.querySelectorAll(".film_option") as NodeListOf<HTMLElement>
            filmOptions.forEach(filmOption => {
                filmOption.addEventListener("click", async () => {
                    const tmdbId = filmOption.dataset.index
                    //if (!tmdbId) return
                    tmdbIndex = tmdbId
                    const filmInformation = await safeFetchData(`api/films/tmdb/${tmdbId}`, {
                        method: "GET"
                    })
                    console.log(filmInformation)
                    const tmdbValue = filmInformation.result.details.tmdbId
                    titleInput.dataset.tmdbId = String(tmdbValue)
                    const posterPath= filmInformation.result.details.posterPath
                    sessionStorage.setItem("posterPath", posterPath) 
                    // console.log(tmdbValue)
                    //sessionStorage.setItem("tmdb", tmdbValue)
                    titleInput.value = filmInformation.result.details.title
                    director.value = filmInformation.result.details.director
                    releaseYear.value = filmInformation.result.details.releaseYear
                    posterPreview.src = filmInformation.result.details.posterUrl
                    posterPreview.classList.add("active")
                    labelSpan.innerText = "Affiche officielle proposée — clique pour la remplacer"
                    poster.addEventListener("change", () => {
                        const file = poster.files?.[0]
                        if (file.size <= 5 * 1024 * 1024) {
                            posterPreview.src = URL.createObjectURL(file);
                            posterPreview.classList.add("active");
                            labelSpan.innerText = "Modifier"
                        } else {
                            alert("Photo trop lourde")
                        }
                    })
                    filmsSuggestions.style.display = "none"
                })
            })
        } else {
            filmsSuggestions.style.display = "none"
        }
    })
}