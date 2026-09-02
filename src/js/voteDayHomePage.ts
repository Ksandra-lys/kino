import { pageRedirect } from "../helpers/pageRedirect.mts";
import { homepageCalendarData } from "../data/homepageCalendarData.mts";
import { homepageCalendar } from "../components/homepageCalendar.mts";
import { depositProgram } from "../components/depositProgram.mts";
import { onboardingCategoriesMain } from "../components/categoriesOnboarding1.mts";
import {filmCategory,infoCategory,loveCategory,musicCategory,} from "../data/categoriesData.mts";
import { homePageHeader } from "../components/homepageHeader.mts";
import { toggleDropdownMenu } from "../helpers/toggleDropdownMenu.mts";
import { categoryPageFooter } from "../components/categoryPageFooter.mts";
import { safeFetchData } from "../helpers/safeFetch.mts";
import { activeCalendarDay } from "../modules/activeCalendarDay.mts";
import { showSnackbar } from "../helpers/showSnackBar.mts";
import { editProfilePicture } from "../helpers/editProfilePicture.mts";
import { homePageSkeleton } from "../components/homePageSkeleton.mts";
document.addEventListener("DOMContentLoaded", async () => {
    homePageSkeleton();


    const snackbar = document.querySelector(".snackbar") as HTMLElement

    try {
        const userInfo = await safeFetchData("api/auth/me", {
            method: "GET",
        });

        const headerContainer = document.querySelector(".header_container") as HTMLElement;
        headerContainer.innerHTML = homePageHeader(userInfo.result.user);
        headerContainer.classList.remove("skeleton_header_container");
    } catch (error:any) {
        showSnackbar(error.message)
        snackbar.style.backgroundColor="red"
    }

    const scheduleText = document.querySelector(".schedule_text") as HTMLElement;
    scheduleText.innerHTML = homepageCalendarData
        .map((data) => homepageCalendar(data))
        .join("");
    activeCalendarDay();

    const programContainer = document.querySelector(".program_container",) as HTMLElement;
    programContainer.innerHTML = depositProgram({
        programIcon: "/assets/icons/love.svg", 
        programName: "JOUR DE VOTE",
        programDescription: "Votez pour votre thème préféré",
    });
    programContainer.classList.remove("skeleton_program_container");

    const categoryContainer = document.querySelector(
        ".category_container",
    ) as HTMLElement;
    categoryContainer.innerHTML =
        onboardingCategoriesMain({
            ...filmCategory,
            status: "vote",
        }) +
        onboardingCategoriesMain({
            ...infoCategory,
            status: "soon",
        }) +
        onboardingCategoriesMain({
            ...loveCategory,
            status: "soon",
        }) +
        onboardingCategoriesMain({
            ...musicCategory,
            status: "soon",
        });

    const message = sessionStorage.getItem("snackbar");
    if (message) {
        showSnackbar(message);
        sessionStorage.removeItem("snackbar");
    }

    pageRedirect("voteDayFilmPage.html", ".category_film");
    pageRedirect("voteDayInfoPage.html", ".category_info");
    pageRedirect("voteDayInfoPage.html", ".footer_category_info");
    pageRedirect("voteDayFilmPage.html", ".footer_category_film");
    // pageRedirect("depositDaysHomePage.html", ".Lundi");
    // pageRedirect("revelationDayHomePage.html", ".Vendredi");
    // pageRedirect("depositDaysHomePage.html", ".Mercredi");

    pageRedirect("loginPage.html", ".logout span");
    const dropdownMenuContainer = document.querySelector(".dropdown_menu") as HTMLElement;
    toggleDropdownMenu(".avatar_picture", dropdownMenuContainer);

    const footerContainer = document.querySelector("footer") as HTMLElement;
    footerContainer.innerHTML = categoryPageFooter();

    pageRedirect("loginPage.html", ".logout");

    editProfilePicture();
    const container = document.getElementById("container") as HTMLElement;
    if (container) {
        container.classList.remove("loading");
    }
});
