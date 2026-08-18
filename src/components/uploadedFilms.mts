import { apiBaseUrl } from "../services/baseUrl.mts"
export function uploadedFilms(filmInfo, updateBtn?:boolean,likeBtn?:boolean){
    return `<div class="upload_films_container">    
                <div class="upload_films">
                    ${filmInfo.poster ? ` <img src="${apiBaseUrl}${filmInfo.poster}" alt="" class="upload_films_pictures">` : ""}
                    <div class="upload_films_description">
                        <span class="film_title">${filmInfo.title}</span>
                        <div class="film_director_container">
                            <span class="director_name">${filmInfo.director}</span>
                            <span class="release_year"> · ${filmInfo.releaseYear} </span>
                            ${filmInfo.version ? `<span class="version"> · ${filmInfo.version.toUpperCase()}</span>` : ""}
                        </div>  
                        ${filmInfo.pitch ? `<span class="film_pitch">"${filmInfo.pitch}"</span>`:""}
                        <span class="film_user">par toi</span>
                        ${updateBtn ? `<button class="updatefilm_btn">Modifier mon film</button>`:""}
                    </div>
                    <div class="like_btn">
                        ${likeBtn ? `<img class="like_icon" src="/assets/icons/love.svg">` : ""}  
                    </div>
                </div>
            </div>    
    `
}

