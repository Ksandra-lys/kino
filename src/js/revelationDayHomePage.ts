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


    const snackbar = document.querySelector(".snackbar") as HTMLElement
    try{
      const userInfo = await safeFetchData("api/auth/me", {
        method: "GET",

    });
    
    const headerContainer = document.querySelector(".header_container") as HTMLElement
    headerContainer.innerHTML = homePageHeader(userInfo.result.user);
    headerContainer.classList.remove("skeleton_header_container");

    } catch(error:any){
        showSnackbar(error.message)
        snackbar.style.backgroundColor="red"
       
    }
    
    const scheduleText = document.querySelector(".schedule_text") as HTMLElement
    scheduleText.innerHTML = homepageCalendarData.map(data => homepageCalendar(data))
        .join("");
    activeCalendarDay()

    const programContainer = document.querySelector(".program_container") as HTMLElement
    programContainer.innerHTML = depositProgram({
        programIcon: "/assets/icons/trophy.svg",
        programName: "RÉVÉLATION",
        programDescription: "Découvrez le thème choisi"
    })
    programContainer.classList.remove("skeleton_program_container");

    const categoryContainer = document.querySelector(".category_container") as HTMLElement
    categoryContainer.innerHTML = onboardingCategoriesMain({
        ...filmCategory,
        status: "revelation"
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


    const message = sessionStorage.getItem("snackbar");
    if (message) {
        showSnackbar(message);
        sessionStorage.removeItem("snackbar");
    }

    pageRedirect("revelationDayFilmPage.html", ".category_film")
    pageRedirect("revelationDayInfoPage.html", ".category_info")
    pageRedirect("revelationDayFilmPage.html", ".footer_category_film")
    pageRedirect("revelationDayInfoPage.html", ".footer_category_info")
    // pageRedirect("depositDaysHomePage.html", ".Lundi")
    // pageRedirect("revelationDayHomePage.html", ".Vendredi")
    // pageRedirect("voteDayHomePage.html", ".Jeudi")
    // pageRedirect("liveDayHomePage.html", ".Samedi")

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