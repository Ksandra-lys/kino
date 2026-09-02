import { pageRedirect } from "../helpers/pageRedirect.mjs"
import { validateInscriptionInformation } from "../modules/validateInscriptionInformation.mts";
import { safeFetchData } from "../helpers/safeFetch.mts";
import { showSnackbar } from "../helpers/showSnackBar.mts";
document.addEventListener("DOMContentLoaded", async () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then((reg) => console.log('Service Worker enregistré !', reg.scope))
            .catch((err) => console.error('Erreur :', err));
    }

    pageRedirect("onboardingConnect.html", ".back_btn")
    validateInscriptionInformation()

    const snackbar = document.querySelector(".snackbar") as HTMLElement
    const input = document.getElementById("photo") as HTMLInputElement
    const preview = document.querySelector(".profile_picture_icon img") as HTMLImageElement
    input.addEventListener("change", async () => {
        const file = input.files?.[0]
        if (file && file.size < 5 * 1024 * 1024) {
            preview.src = URL.createObjectURL(file)
            preview.classList.add("active")

            const formData = new FormData()
            formData.append("avatar", file)

            try {
                await safeFetchData("api/media/avatar", {
                    method: "POST",
                    data: formData
                })
            } catch (error) {
                if (error instanceof Error) {
                    console.error(error.message)

                } else {
                    showSnackbar(error.message)
                    snackbar.style.backgroundColor = "red"
                }
            }
        }
    })

    pageRedirect("loginPage.html", ".redirectToLoginPage")

    const phoneInput = document.querySelector('input[type="tel"]') as HTMLElement
    const selectedCountry = document.querySelector(".iti__selected-country") as HTMLElement
    const countrySelector = document.querySelector(".iti__country-selector") as HTMLElement
    selectedCountry.addEventListener("click", () => {
        phoneInput.classList.toggle("active")
        countrySelector.classList.toggle("active")
    })
})



