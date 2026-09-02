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
//import { categoryPageSkeleton } from "../components/categoryPageSkeleton.mts";
document.addEventListener("DOMContentLoaded", async () => {
    //categoryPageSkeleton()

    const headerContainer = document.querySelector(".header_text")
    headerContainer.classList.remove("skeleton_header") 
    const backBtn = document.querySelector(".back_btn")
    console.log(backBtn)
    backBtn.classList.remove("skeleton_back")

    const categoryPropContainer = document.querySelector(".category_propositions_container") as HTMLElement;
    
    const programContainer = document.querySelector(".program_container") as HTMLElement;
    programContainer.innerHTML = depositProgram({
        programIcon: "/assets/icons/film.svg",
        programName: "DÉPÔT DE FILMS . LUN → MER",
        programDescription: "Les votes commencent jeudi.",
    });
    //programContainer.classList.remove("skeleton_program")


    pageRedirect("depositDaysHomepage.html", ".back_btn");
    pageRedirect("depositDaysInfoPage.html", "footer .category");
    pageRedirect("depositDaysInfoPage.html", ".footer_category_info");
    const depositModal = document.querySelector(".depositfilm_modal_background",) as HTMLElement;
    openAndCloseModal(".deposit_btn",depositModal,"depositfilm_modal_background",);

    const depositBtn = document.querySelector(".deposit_btn") as HTMLButtonElement 
    const depositBtnText = document.querySelector(".deposit_btn_text") as HTMLElement
    // if(depositBtn){
    //     depositBtn.classList.remove("skeleton_deposit_btn")
    // }
    
    try {
        // const userInfo = await safeFetchData("api/auth/me", {
        //     method: "GET",
        // });
        const weekFilms = await safeFetchData("api/films", {
            method: "GET",
        }); 
        const allFilms = weekFilms.result.films;
        console.log(allFilms);
        if (allFilms.length === 0) { 
            categoryPropContainer.innerHTML = `<span class="no_proposition">Aucun film déposé cette semaine — sois le premier !</span>`;
        } else {
            categoryPropContainer.innerHTML = allFilms.map((film:filmsDeposit) =>
                uploadedFilms(film),
            ).join("");
            if(depositBtnText){
                depositBtnText.innerText = "Film déjà déposé cette semaine"
            }
            
            if(depositBtn){
               depositBtn.disabled = true
            }
            
        }

    } catch (error) {
        
        if(error instanceof Error){
          console.error(error.message)
        } else {
            console.error(error)
        }
        
    }

    const footerContainer = document.querySelector("footer") as HTMLElement;
    footerContainer.innerHTML = categoryPageFooter();

    fillFilmsSuggestion();

    depositFilms();

    editFilmChoice()

    const container = document.getElementById("container") as HTMLElement
    if (container) {
        container.classList.remove("loading");
    }


})    