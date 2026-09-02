import { depositProgram } from "../components/depositProgram.mts";
import { pageRedirect } from "../helpers/pageRedirect.mts";
import { categoryPageFooter } from "../components/categoryPageFooter.mts";
import { openAndCloseModal } from "../helpers/openAndCloseModal.mts";
import { fillFilmsSuggestion } from "../modules/fillFilmsSuggestion.mts";
import { editFilmChoice } from "../modules/editFilmChoice.mts"
import { depositFilms } from "../modules/depositFilms.mts";
import { safeFetchData } from "../helpers/safeFetch.mts";
import { uploadedFilms } from "../components/uploadedFilms.mts";
import type { filmsDeposit } from "../types/filmsDeposited.mts";
document.addEventListener("DOMContentLoaded", async () => {
    const headerContainer = document.querySelector(".header_text")
    headerContainer.classList.remove("skeleton_header")
    const backBtn = document.querySelector(".back_btn")

    backBtn.classList.remove("skeleton_back")

    const categoryPropContainer = document.querySelector(".category_propositions_container") as HTMLElement;

    const programContainer = document.querySelector(".program_container") as HTMLElement;
    programContainer.innerHTML = depositProgram({
        programIcon: "/assets/icons/film.svg",
        programName: "DÉPÔT DE FILMS . LUN → MER",
        programDescription: "Les votes commencent jeudi.",
    });
    const footerContainer = document.querySelector("footer") as HTMLElement;
    footerContainer.innerHTML = categoryPageFooter();

    pageRedirect("depositDaysHomepage.html", ".back_btn");
    pageRedirect("depositDaysInfoPage.html", "footer .category");
    pageRedirect("depositDaysInfoPage.html", ".footer_category_info");
    const depositModal = document.querySelector(".depositfilm_modal_background") as HTMLElement;
    openAndCloseModal(".deposit_btn", depositModal, "depositfilm_modal_background");

    const depositBtn = document.querySelector(".deposit_btn") as HTMLButtonElement
    const depositBtnText = document.querySelector(".deposit_btn_text") as HTMLElement

    try {
        const weekFilms = await safeFetchData("api/films", {
            method: "GET",
        });
        const allFilms = weekFilms.result.films;
        console.log(allFilms);
        if (allFilms.length === 0) {
            categoryPropContainer.innerHTML = `<span class="no_proposition">Aucun film déposé cette semaine — sois le premier !</span>`;
        } else {
            categoryPropContainer.innerHTML = allFilms.map((film: filmsDeposit) =>
                uploadedFilms(film),
            ).join("");
            if (depositBtnText) {
                depositBtnText.innerText = "Film déjà déposé cette semaine"
            }

            if (depositBtn) {
                depositBtn.disabled = true
            }

        }

    } catch (error: any) {
        console.error(error.message)
        categoryPropContainer.innerHTML = `<div class="offline_notice_container"><span>Impossible de charger les films</span>
        <button class="retry_btn">Réessayer</button></div>`
        const retryBtn = document.querySelector(".retry_btn") as HTMLButtonElement
        if(!retryBtn) return
        retryBtn.addEventListener("click", () => {
            window.location.reload()
        })
    }


    const loader = document.querySelector(".loader") as HTMLElement;
    loader.style.display = "none";



    fillFilmsSuggestion();

    depositFilms();

    editFilmChoice()


})    