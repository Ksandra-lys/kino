import { pageRedirect } from "../helpers/pageRedirect.mts"
import { homepageCalendarData } from "../data/homepageCalendarData.mts"
import { homepageCalendar } from "../components/homepageCalendar.mts"
import { depositProgram } from "../components/depositProgram.mts"
import { onboardingCategoriesMain } from "../components/categoriesOnboarding1.mts"
import { filmCategory, infoCategory, loveCategory, musicCategory } from "../data/categoriesData.mts"
import { homePageHeader } from "../components/homepageHeader.mts"
import { toggleDropdownMenu } from "../helpers/toggleDropdownMenu.mts"
import { categoryPageFooter } from "../components/categoryPageFooter.mts"
import { safeFetchData } from "../modules/safeFetch.mts"
document.addEventListener("DOMContentLoaded", async () => {
    const userInfo = await safeFetchData("api/auth/me", {
        method: "GET",

    });
    console.log(userInfo);

    const headerContainer = document.querySelector(".header_container")
    headerContainer.innerHTML = homePageHeader(userInfo.result.user);

    const scheduleText = document.querySelector(".schedule_text") as HTMLElement
    scheduleText.innerHTML = homepageCalendarData.map(data => homepageCalendar(data))
        .join("");

    const programContainer = document.querySelector(".program_container") as HTMLElement
    programContainer.innerHTML = depositProgram({
        programIcon: "/assets/icons/love.svg",
        programName: "JOUR DE VOTE",
        programDescription: "Votez pour votre thème préféré"
    })

    const categoryContainer = document.querySelector(".category_container") as HTMLElement
    categoryContainer.innerHTML = onboardingCategoriesMain({
        ...filmCategory,
        status: "vote"
    }) +
        onboardingCategoriesMain({
            ...infoCategory,
            status: "vote"
        }) +
        onboardingCategoriesMain({
            ...loveCategory,
            status: "vote"
        }) +
        onboardingCategoriesMain({
            ...musicCategory,
            status: "vote"
        })

    pageRedirect("voteDayFilmPage.html", ".category_film")
    pageRedirect("voteDayInfoPage.html", ".category_info")
    pageRedirect("depositDaysHomePage.html", ".Lundi")
    pageRedirect("revelationDayHomePage.html", ".Vendredi")

    const dropdownMenuContainer = document.querySelector(".dropdown_menu") as HTMLElement
    toggleDropdownMenu(".avatar_picture", dropdownMenuContainer)


    const footerContainer = document.querySelector("footer")
    footerContainer.innerHTML = categoryPageFooter()
}) 