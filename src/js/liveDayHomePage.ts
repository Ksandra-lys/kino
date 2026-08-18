import { pageRedirect } from "../helpers/pageRedirect.mts"
import { onboardingCategoriesMain } from "../components/categoriesOnboarding1.mts"
import { homepageCalendar } from "../components/homepageCalendar.mts"
import { homepageCalendarData } from "../data/homepageCalendarData.mts"
import { depositProgram } from "../components/depositProgram.mts"
import { filmCategory, infoCategory, loveCategory, musicCategory } from "../data/categoriesData.mts"
import { homePageHeader } from "../components/homepageHeader.mts"
import { toggleDropdownMenu } from "../helpers/toggleDropdownMenu.mts"
import { categoryPageFooter } from "../components/categoryPageFooter.mts"
document.addEventListener("DOMContentLoaded", () => {
    const headerContainer = document.querySelector(".header_container")
    headerContainer.innerHTML = homePageHeader()

    const scheduleText = document.querySelector(".schedule_text") as HTMLElement
    scheduleText.innerHTML = homepageCalendarData.map(data => homepageCalendar(data))
        .join("");

    const programContainer = document.querySelector(".program_container") as HTMLElement
    programContainer.innerHTML = depositProgram({
        programIcon: "/assets/icons/film.svg",
        programName: "CE SOIR À 20H",
        programDescription: "Anora",
        scenaristName: "Sean Baker · 15 votes",
        scenaristIcon: "/assets/icons/love.svg",
        rightChevron: "/assets/icons/chevron.svg"
    })

    const categoryContainer = document.querySelector(".category_container") as HTMLElement
    categoryContainer.innerHTML = onboardingCategoriesMain({
        ...filmCategory,
        status: "live"
    }) +
        onboardingCategoriesMain({
            ...infoCategory,
            status: "live"
        }) +
        onboardingCategoriesMain({
            ...loveCategory,
            status: "live"
        }) +
        onboardingCategoriesMain({
            ...musicCategory,
            status: "live"
        })


    pageRedirect("liveDayInfoPage.html", ".category_info")
    pageRedirect("liveDayFilmPage.html", ".category_film")
    pageRedirect("depositDaysHomePage.html", ".Lundi")
    pageRedirect("revelationDayHomePage.html", ".Vendredi")
    pageRedirect("voteDayHomePage.html", ".Jeudi")


    const userProfile = document.querySelector(".user_picture") as HTMLElement
    const dropdownMenuContainer = document.querySelector(".dropdown_menu") as HTMLElement
    toggleDropdownMenu(userProfile, dropdownMenuContainer)

    const footerContainer = document.querySelector("footer")
    footerContainer.innerHTML = categoryPageFooter()
})