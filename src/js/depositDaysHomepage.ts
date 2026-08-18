import { homepageCalendar } from "../components/homepageCalendar.mts"
import { depositProgram } from "../components/depositProgram.mts"
import { pageRedirect } from "../helpers/pageRedirect.mts"
import { infoCategory, loveCategory, filmCategory, musicCategory } from "../data/categoriesData.mts"
import { onboardingCategoriesMain } from "../components/categoriesOnboarding1.mts"
import { homepageCalendarData } from "../data/homepageCalendarData.mts"
import { homePageHeader } from "../components/homepageHeader.mts"
import { toggleDropdownMenu } from "../helpers/toggleDropdownMenu.mts"
import { categoryPageFooter } from "../components/categoryPageFooter.mts"
import { safeFetchData } from "../modules/safeFetch.mts"
document.addEventListener("DOMContentLoaded", async () => {
    let selectedDate = new Date()
    console.log(selectedDate)
    const { result: user } = await safeFetchData("api/auth/me", {
        method: "GET",
    });

    const headerContainer = document.querySelector(".header_container")
    headerContainer.innerHTML = homePageHeader(user.user);

    const scheduleText = document.querySelector(".schedule_text") as HTMLElement
    scheduleText.innerHTML = homepageCalendarData.map(data => homepageCalendar(data))
        .join("");

    const programContainer = document.querySelector(".program_container") as HTMLElement
    programContainer.innerHTML = depositProgram({
        programIcon: "/assets/icons/download.svg",
        programName: "DÉPÔT OUVERT",
        programDescription: "Déposez votre film ou thème — jusqu'au mercredi"
    })

    const categoryContainer = document.querySelector(".category_container") as HTMLElement
    categoryContainer.innerHTML = onboardingCategoriesMain({
        ...filmCategory,
        status: "deposit"
    }) +
        onboardingCategoriesMain({
            ...infoCategory,
            status: "deposit"
        }) +
        onboardingCategoriesMain({
            ...loveCategory,
            status: "deposit"
        }) +
        onboardingCategoriesMain({
            ...musicCategory,
            status: "deposit"
        })

    pageRedirect("depositDaysFilmPage.html", ".category_film")
    pageRedirect("depositDaysInfoPage.html", ".category_info")
    pageRedirect("voteDayHomePage.html", ".Jeudi")

    const userProfile = document.querySelector(".user_picture") as HTMLElement
    const dropdownMenuContainer = document.querySelector(".dropdown_menu") as HTMLElement
    toggleDropdownMenu(userProfile, dropdownMenuContainer)

    const footerContainer = document.querySelector("footer")
    footerContainer.innerHTML = categoryPageFooter()

    pageRedirect("loginPage.html", ".logout")

    // const input = document.getElementById("photo") as HTMLInputElement;
    // const editPhoto = document.querySelector(".edit_picture") as HTMLElement
    // const preview = document.querySelector(".user_picture img") as HTMLImageElement
    // editPhoto.addEventListener("click", () => {
    //     const file = input.files?.[0];
    //     if (file) {
    //         preview.src = URL.createObjectURL(file);
    //         preview.classList.add("active");
    //     }
    // });
}) 