//import { homepageCalendarData } from "../data/homepageCalendarData.mts";
export function redirectAccordingToDay(): void {
    const day = new Date().getDay();
   
    // const schedules = document.querySelectorAll(".schedule");
    
    // const currentDay = day === 0 ? 6 : day - 1
    // const days = homepageCalendarData.map(data => data.day)
    
    // const today = days[currentDay]
    
    // schedules.forEach(schedule => {
    //     if (schedule.classList.contains(today)) {
    //         schedule.classList.add("active");
    //     }
    // })
   
    if (day >= 1 && day <= 3) {
        window.location.href = "depositDaysHomepage.html";
    }

    if (day === 4) {
        window.location.href = "voteDayHomepage.html";

    }

    if (day === 5) {
        window.location.href = "revelationDayHomepage.html";

    }

    if (day === 6) {
        window.location.href = "liveDayHomepage.html";
    }

    if (day === 0) {
        window.location.href = "depositDaysHomepage.html";

    }

}