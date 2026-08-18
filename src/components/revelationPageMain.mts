export function themeRevelationPageMain(title:string, themeName:string,
numberLikes:string,scenaristName?:string,):string{
    return `
         <img src="/assets/icons/trophy.svg" alt="" class="trophy_icon">
                <span class="title">${title}</span>
                <span class="theme_name">${themeName}</span>
                ${scenaristName ? `<span class="scenarist_name">${scenaristName}</span>`: ""}
                
                <div class="reactions_container">
                    <img src="/assets/icons/love.svg" alt="" class="like_icon">
                    <span class="number_likes">${numberLikes} votes</span>
                </div>    
    `
} 

export function revelationPageMainLiveSubscription(liveHour:string, liveSubscribers:string,
    reservationBtnIcon:string,reservationSpan:string
){
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