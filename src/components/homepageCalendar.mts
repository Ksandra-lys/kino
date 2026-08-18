import type { homePageHeader } from "../types/homePageHeader.mts"
export function homepageCalendar(data:homePageHeader) {
    return `
        <div class="schedule ${data.day}">
            <span class="date">${data.date}</span>
            <span class="plan">${data.plan}</span>
        </div>
        `
} 