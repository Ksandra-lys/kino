import { homepageCalendar } from "../components/homepageCalendar.mts"
import { depositProgram } from "../components/depositProgram.mts"
import { pageRedirect } from "../helpers/pageRedirect.mts"
import { infoCategory, loveCategory, filmCategory, musicCategory } from "../data/categoriesData.mts"
import { onboardingCategoriesMain } from "../components/categoriesOnboarding1.mts"
import { homepageCalendarData } from "../data/homepageCalendarData.mts"
import { homePageHeader } from "../components/homepageHeader.mts"
import { toggleDropdownMenu } from "../helpers/toggleDropdownMenu.mts"
import { categoryPageFooter } from "../components/categoryPageFooter.mts"
import { safeFetchData } from "../helpers/safeFetch.mts"
import { editProfilePicture } from "../helpers/editProfilePicture.mts"
import { homePageSkeleton } from "../components/homePageSkeleton.mts"
import { showSnackbar } from "../helpers/showSnackBar.mts"
import { activeCalendarDay } from "../modules/activeCalendarDay.mts"
document.addEventListener("DOMContentLoaded", async () => { 
    homePageSkeleton()

    const snackbar = document.querySelector(".snackbar") as HTMLElement

    try {
        const userInfo = await safeFetchData("api/auth/me", {
            method: "GET",
        });

        const headerContainer = document.querySelector(".header_container") as HTMLElement
        headerContainer.innerHTML = homePageHeader(userInfo.result.user);
        headerContainer.classList.remove("skeleton_header_container");

    } catch (error: any) {
        showSnackbar(error.message)
        snackbar.style.backgroundColor = "red" 
    }

    const scheduleText = document.querySelector(".schedule_text") as HTMLElement
    scheduleText.innerHTML = homepageCalendarData.map(data => homepageCalendar(data))
        .join("");
    activeCalendarDay()

    const programContainer = document.querySelector(".program_container") as HTMLElement
    programContainer.innerHTML = depositProgram({
        programIcon: "/assets/icons/download.svg",
        programName: "DÉPÔT OUVERT",
        programDescription: "Déposez votre film ou thème — jusqu'à mercredi"
    })
    programContainer.classList.remove("skeleton_program_container");

    const categoryContainer = document.querySelector(".category_container") as HTMLElement
    categoryContainer.innerHTML = onboardingCategoriesMain({
        ...filmCategory,
        status: "deposit"
        
    }) +
        onboardingCategoriesMain({
            ...infoCategory,
            status: "soon"
        }) +
        onboardingCategoriesMain({
            ...loveCategory,
            status: "soon"
        }) +
        onboardingCategoriesMain({
            ...musicCategory,
            status: "soon"
        })

    const footerContainer = document.querySelector("footer") as HTMLElement
    footerContainer.innerHTML = categoryPageFooter()


    const message = sessionStorage.getItem("snackbar");
    if (message) {
        sessionStorage.removeItem("snackbar");
    }

    pageRedirect("depositDaysFilmPage.html", ".category_film")
    //pageRedirect("depositDaysInfoPage.html", ".category_info")
    //pageRedirect("depositDaysInfoPage.html", ".footer_category_info")
    pageRedirect("depositDaysFilmPage.html", ".footer_category_film")

    const dropdownMenuContainer = document.querySelector(".dropdown_menu") as HTMLElement
    toggleDropdownMenu(".avatar_picture", dropdownMenuContainer)

    pageRedirect("loginPage.html", ".logout")

    editProfilePicture()
    const container = document.getElementById("container") as HTMLElement
    if (container) {
        container.classList.remove("loading");
    }
}) 