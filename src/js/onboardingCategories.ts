import { pageRedirect } from "../helpers/pageRedirect.mjs"
import { showPaginationDots } from "../helpers/showPaginationDots.mjs"
import { onboardingCategoriesMain } from "../components/categoriesOnboarding1.mts"
import { onboardingFooter } from "../components/onboardingFooter.mjs"
import { filmCategory,infoCategory,loveCategory,musicCategory } from "../data/categoriesData.mts"
document.addEventListener("DOMContentLoaded", () => {
  pageRedirect("inscriptionPage.html", ".skip_btn")
  
  const categoriesContainer = document.querySelector(".categories") as HTMLElement
  categoriesContainer.innerHTML += onboardingCategoriesMain({
    ...filmCategory
  }) +
  onboardingCategoriesMain({
    ...infoCategory
  }) + 
  onboardingCategoriesMain({
    ...loveCategory
  }) +
  onboardingCategoriesMain({
    ...musicCategory
  })

  const footerContainer = document.querySelector("footer") as HTMLElement
  footerContainer.innerHTML = 
  onboardingFooter({
    descriptionStep: "4 CATÉGORIES",
    descriptionTitle: "Explorez",
    descriptionContent: "Film · Info · Love · Musique. Chaque semaine un nouveau rituel communautaire.",
    nextBtn: "Suivant"
  })

  const categoriesDot = document.querySelector(".pagination_dot_categories") as HTMLElement
  showPaginationDots("onboardingCategories.html", categoriesDot)

  pageRedirect("onboardingCalendar.html", ".next_btn")
})