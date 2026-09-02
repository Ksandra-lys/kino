import { pageRedirect } from "../helpers/pageRedirect.mts"
import { onboardingCategoriesMain } from "../components/categoriesOnboarding1.mts"
import { homepageCalendar } from "../components/homepageCalendar.mts"
import { homepageCalendarData } from "../data/homepageCalendarData.mts"
import { depositProgram } from "../components/depositProgram.mts"
import { filmCategory, infoCategory, loveCategory, musicCategory } from "../data/categoriesData.mts"
import { homePageHeader } from "../components/homepageHeader.mts"
import { toggleDropdownMenu } from "../helpers/toggleDropdownMenu.mts"
import { categoryPageFooter } from "../components/categoryPageFooter.mts"
import { safeFetchData } from "../helpers/safeFetch.mts"
import { showSnackbar } from "../helpers/showSnackBar.mts"
import { activeCalendarDay } from "../modules/activeCalendarDay.mts"
import { editProfilePicture } from "../helpers/editProfilePicture.mts"
import { homePageSkeleton } from "../components/homePageSkeleton.mts"
document.addEventListener("DOMContentLoaded", async () => {
    homePageSkeleton()
    try {
        const userInfo = await safeFetchData("api/auth/me", {
            method: "GET",

        });

        const headerContainer = document.querySelector(".header_container") as HTMLElement
        headerContainer.innerHTML = homePageHeader(userInfo.result.user);
        headerContainer.classList.remove("skeleton_header_container");

    } catch (error) {
        if(error instanceof Error){
          console.error(error.message)
        } else {
            console.error(error)
        }
       
    }

    const scheduleText = document.querySelector(".schedule_text") as HTMLElement
    scheduleText.innerHTML = homepageCalendarData.map(data => homepageCalendar(data))
        .join("");
    activeCalendarDay()

    const programContainer = document.querySelector(".program_container") as HTMLElement
    programContainer.innerHTML = depositProgram({
        programIcon: "/assets/icons/film.svg",
        programName: "CE SOIR À 20H",
        programDescription: "Anora",
        scenaristName: "Sean Baker · 15 votes",
        scenaristIcon: "/assets/icons/love.svg",
        rightChevron: "/assets/icons/chevron.svg"
    })
    programContainer.classList.remove("skeleton_program_container");

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


    const message = sessionStorage.getItem("snackbar");
    if (message) {
        showSnackbar(message);
        sessionStorage.removeItem("snackbar");
    }

    pageRedirect("liveDayInfoPage.html", ".category_info")
    pageRedirect("liveDayFilmPage.html", ".category_film")
    pageRedirect("liveDayInfoPage.html", ".footer_category_info")
    pageRedirect("liveDayFilmPage.html", ".footer_category_film")
    pageRedirect("depositDaysHomePage.html", ".Lundi")
    pageRedirect("revelationDayHomePage.html", ".Vendredi")
    pageRedirect("voteDayHomePage.html", ".Jeudi")


    const dropdownMenuContainer = document.querySelector(".dropdown_menu") as HTMLElement
    toggleDropdownMenu(".avatar_picture", dropdownMenuContainer)


    const footerContainer = document.querySelector("footer") as HTMLElement
    footerContainer.innerHTML = categoryPageFooter()

    pageRedirect("loginPage.html", ".logout")

    editProfilePicture()

    const container = document.getElementById("container") as HTMLElement;
    if (container) {
        container.classList.remove("loading");
    }
})