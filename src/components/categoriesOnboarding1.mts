import { categoriesStatus } from "../data/categoriesStatus.mts";
import type { categoriesOnboarding } from "../types/categoriesOnboarding.mts";

export function onboardingCategoriesMain(data: categoriesOnboarding): string {
    const status = categoriesStatus[data.status];
    return `<div class="${data.category} category">
                <img src="${data.img}" alt="">
                <span>${data.name}</span>
                <div class="${data.classLine}">
                ${status?.lineIcon ? `<img class="line_icon" src="${status?.lineIcon}">` : ""}
                ${status?.lineSpan ? `<span class="line_span">${status?.lineSpan}</span>` : ""}
                </div>
            </div>`;  
}
 