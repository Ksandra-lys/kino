import { apiBaseUrl } from "../services/baseUrl.mts"
import type { filmsDeposit } from "../types/filmsDeposited.mts"
//import type { userInfo } from "../types/userInformation.mts"
export function uploadedFilms(filmInfo: filmsDeposit, likeBtn?: string,isVoted?:boolean):string{
    return `<div class="upload_films_container">    
                <div class="upload_films">
                ${isVoted ? `<div class="choose_icon">
                        <img src="/assets/icons/trophy.svg"> 
                        <span>Choisi</span>
                    </div>` : ""} 
                
                    <div class="filmsandpicture"> 
                        ${filmInfo.poster ? ` <img src="${apiBaseUrl}${filmInfo.poster}" alt="" class="upload_films_pictures">` : ""}
                        <div class="upload_films_description">
                            <span class="film_title">${filmInfo.title}</span>
                            <div class="film_director_container">
                                <span class="director_name">${filmInfo.director}</span>
                                <span class="release_year"> · ${filmInfo.releaseYear} </span>
                                ${filmInfo.version ? `<span class="version"> · ${filmInfo.version.toUpperCase()}</span>` : ""}
                            </div>    
                            ${filmInfo.pitch ? `<span class="film_pitch">"${filmInfo.pitch}"</span>`:""}
                            <div class="film_user_container">
                               
                                ${filmInfo.mine ? `<span class="film_user">par toi</span>` :
                                `<span class="film_user">par ${filmInfo.depositedBy}</span>`}
                            </div>
                            ${filmInfo.canEdit ? `<button class="updatefilm_btn" data-film-id="${filmInfo.id}">Modifier mon film</button>`:""}
                        </div>
                    </div>    
                    <div class="like_btn" data-index="${filmInfo.id}">
                          
                        ${likeBtn ? `<img class="like_icon" src="${likeBtn}">` : ""}

                    </div>
                </div>
            </div>  
    `
}



//  ${user.avatar ? `<div class="avatar_background">
//                                 <img src= "${apiBaseUrl}${user.avatar}" alt="" />
//                                 </div>` : `<div class="noAvatar_background">
//                                 <div class="noAvatar">${user.name[0]}</div>
//                                 </div>`}

