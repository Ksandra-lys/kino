import type { categoryPageOnDeposiDays } from "../types/categoryPageOnDepositDays.mts"
export function categoryPageOnDepositDays(data : categoryPageOnDeposiDays): string {
    return `
    <div class="category_proposition">
        <div class="category_icon_background">
            <img src=${data.categorypropositionIcon} alt="" class="category_prop_icon">
        </div>
        <div class="proposition">
            <span class="category_name">${data.categoryName}</span>
            <span class="scenarist_container">
                            ${data.scenaristName ? `<span class="scenarist_name">
                                    ${data.scenaristName} ·
                                </span>` : ""} 
                            ${data.releaseDate ? `<span class="release_date">
                                    ${data.releaseDate}
                                </span>` : ""}
            </span>
            ${data.comment ? `<span class="comment">"${data.comment}"</span>` : ""}
            <div class="proposition_bottom"> 
                <div class="proposition_user">
                    <span class="proposition_user_photo">${data.userPicture}</span>
                    <span class="proposition_user_name">par ${data.userName}</span>
                </div>    
                <div class="likes_container">
                    <div class="like_btn">
                    ${data.likeIcon ? `<img class="like_icon" src=${data.likeIcon}>` : ""}   
                    ${data.likesNumber ? `<span class="like_number">${data.likesNumber}</span>` : ""}  
                    </div>
                    <div class="thumb_up">
                        ${data.likeIcon ? `<img class="like_icon" src=${data.thumbIcon}>` : ""}   
                        ${data.thumbUpNumber ? `<span class="like_number">${data.thumbUpNumber}</span>` : ""} 
                    </div>
                </div>
            </div> 
        </div>
    </div>
    `
}