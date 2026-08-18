import type { onboardingFooter } from "../types/onboardingFooter.mts"
import { createNextBtn } from "../widgets/createNextBtn.mts"
import { createPaginationDots } from "../widgets/createPaginationDots.mts"
export function onboardingFooter(data : onboardingFooter) : string{
    return `
    <div class="description">
        <div class="description_name">
            <div class="circle"></div> 
            <span>${data.descriptionStep}</span>
        </div>
        <span class="description_title">${data.descriptionTitle}</span>
        <span class="description_content">
            ${data.descriptionContent}
        </span>  
    </div>                                               
    <div class="navigation">
        ${createPaginationDots(["pagination_dot_categories","pagination_dot_calendar","pagination_dot_connect"])}
        
        ${createNextBtn("next_btn", `${data.nextBtn}`,"/assets/icons/back.svg")}
    </div> 
    `
}