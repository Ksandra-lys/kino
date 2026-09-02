export function redirectAccordingToDay() : void{
    const day = new Date().getDay();

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