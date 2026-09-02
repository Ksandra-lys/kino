import { homepageCalendarData } from "../data/homepageCalendarData.mts";
export function activeCalendarDay() : void{
    const schedules = document.querySelectorAll(".schedule");
    console.log(schedules)
    const today = new Date().getDay();
   
    const currentDay = today === 0 ? 6 : today - 1;
   
   
    const days = homepageCalendarData.map(data => data.day);

    
    const savedDay = sessionStorage.getItem("calendarDay");
    
    const activeDay = savedDay ?? days[currentDay];

   
    schedules.forEach(schedule => {
        if (schedule.classList.contains(activeDay)) {
            schedule.classList.add("active");
        }

        schedule.addEventListener("click", () => {
            schedules.forEach(day => {
                day.classList.remove("active");
            });

            schedule.classList.add("active");

            sessionStorage.setItem(
                "calendarDay",
                days.find(day => schedule.classList.contains(day))!
            );
        });
    });
}

