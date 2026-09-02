import type { mostVotedFilms } from "../types/mostVotedFilm.mts"
export function themeRevelationPageMain(filmResult: mostVotedFilms):string{
    return `
         <img src="/assets/icons/trophy.svg" alt="" class="trophy_icon"> 
                <span class="title">FILM DE LA SEMAINE</span>
                <span class="theme_name">${filmResult.title}</span>
                ${filmResult.director ? `<span class="scenarist_name">${filmResult.director}</span>`: ""}
                
                <div class="reactions_container">
                    <img src="/assets/icons/love.svg" alt="" class="like_icon">
                    ${filmResult.voteCount <= 1 ? `<span class="number_likes">${filmResult.voteCount} vote</span>`:
                `<span class="number_likes">${filmResult.voteCount} votes</span>`}
                </div>    
    ` 
} 

export function revelationPageMainLiveSubscription(liveHour:string, liveSubscribers:string,
    reservationBtnIcon:string,reservationSpan:string
):string{
    return `
        <div class="live_info_container">
                    <img src="/assets/icons/calendar.svg" alt="">
                    <div class="live_info">
                        <span class="live_hour">${liveHour}</span>
                        <span class="live_subscribers">${liveSubscribers}</span>
                    </div>
                </div>
                <div class="reservation_btn">
                    <img src=${reservationBtnIcon} alt="">
                    <span>${reservationSpan}</span>
                </div>
    `
}