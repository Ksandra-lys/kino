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
        programIcon: "/assets/icons/trophy.svg",
        programName: "RÉVÉLATION",
        programDescription: "Découvrez le thème choisi"
    })

    const categoryContainer = document.querySelector(".category_container") as HTMLElement
    categoryContainer.innerHTML = onboardingCategoriesMain({
        ...filmCategory,
        status: "revelation"
    }) +
        onboardingCategoriesMain({
            ...infoCategory,
            status: "revelation"
        }) +
        onboardingCategoriesMain({
            ...loveCategory,
            status: "revelation"
        }) +
        onboardingCategoriesMain({
            ...musicCategory,
            status: "revelation"
        })

    pageRedirect("revelationDayFilmPage.html", ".category_film")
    pageRedirect("revelationDayInfoPage.html", ".category_info")
    pageRedirect("depositDaysHomePage.html", ".Lundi")
    pageRedirect("revelationDayHomePage.html", ".Vendredi")
    pageRedirect("voteDayHomePage.html", ".Jeudi")
    pageRedirect("liveDayHomePage.html", ".Samedi")

    const userProfile = document.querySelector(".user_picture") as HTMLElement
    const dropdownMenuContainer = document.querySelector(".dropdown_menu") as HTMLElement
    toggleDropdownMenu(userProfile, dropdownMenuContainer)

    const footerContainer = document.querySelector("footer")
    footerContainer.innerHTML = categoryPageFooter()
}) 