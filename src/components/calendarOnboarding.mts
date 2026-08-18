import type { calendarOnboarding } from "../types/calendarOnboarding.mts";

export function calendarOnboarding(data : calendarOnboarding): string {
    return `
    <div class="${data.calendarClass} calendar">
        <div class="${data.line} line"></div>
        <div class="calendar_bottom">
            <div class="calendar_icon">
                <img src="${data.calendarIcon}" alt="">
            </div>
            <span class="plan">${data.plan}</span>
            <span class="date">${data.date}</span>
        </div>
    </div>
    `
} 