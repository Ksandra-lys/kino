import { apiBaseUrl } from "../services/baseUrl.mts"
export function homePageHeader(user) {
    return `
                <div class="header_leftside">
                    <span class="greetings">Bonjour,</span>
                    <div class="username_container">
                        <span class="username">${user.name}</span>
                        <img src="/assets/icons/hand-wave.svg" alt="">
                    </div>
                </div>  
                <div class="header_rightside">
                    <span class="app_name">KINO</span>
                    <div class="avatar_picture">
                    ${user.avatar ? `<div class="avatar_background">
                        <img src= "${apiBaseUrl}${user.avatar}" alt="" />
                    </div>` : `<div class="noAvatar_background">
                        <div class="noAvatar">${user.name[0]}</div>
                    </div>`}
                    </div>  
                    <div class="dropdown_menu">
                        <div class="dropdown_menu_header">
                        <div class="avatar_picture">
                    ${user.avatar ? `<div class="avatar_background">
                        <img src= "${apiBaseUrl}${user.avatar}" alt="" />
                    </div>` : `<div class="noAvatar_background">
                        <div class="noAvatar">${user.name[0]}</div>
                    </div>`}
                    </div>  
                            <div class="user_information">
                                <span class="username">${user.name}</span>
                                <span class="user_number">${user.phone}</span>
                            </div>
                        </div>
                        <div class="dropdown_line"></div>
                        <div class="edit_picture">
                            <img src="/assets/icons/camera.svg" alt="">
                            <span>Modifier la photo</span>
                        </div>
                        <div class="logout">
                            <img src="/assets/icons/exit.svg" alt="">
                            <span>Se déconnecter</span>
                        </div>
                    </div>
                </div> 
    `
}