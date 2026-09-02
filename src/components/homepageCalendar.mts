import type { homePageHeader } from "../types/homePageHeader.mts"
export function homepageCalendar(data:homePageHeader) :string{
    return `
        <div class="schedule ${data.day}" data-day="${data.day}">
            <span class="date">${data.date}</span>
            <span class="plan">${data.plan}</span>
        </div>
        `
}  