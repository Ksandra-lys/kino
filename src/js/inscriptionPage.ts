import { pageRedirect } from "../helpers/pageRedirect.mjs"
import { validateInscriptionInformation } from "../modules/validateInscriptionInformation.mts";
import { fetchData } from "../helpers/fetchData.mts";
document.addEventListener("DOMContentLoaded", async () => {
    pageRedirect("onboardingConnect.html", ".back_btn")
    validateInscriptionInformation()

    const input = document.getElementById("photo") as HTMLInputElement
    const preview = document.querySelector(".profile_picture_icon img") as HTMLImageElement
    input.addEventListener("change", async () => {
        const file = input.files?.[0]
        if (file.size < 5 * 1024 * 1024) {
            preview.src = URL.createObjectURL(file)
            preview.classList.add("active")

            const formData = new FormData()
            formData.append("avatar", file)

            const avatarResult = await fetchData("api/media/avatar", {
                method: "POST",
                data: formData
            })
            console.log(avatarResult.result.avatar)
        }
    })

    pageRedirect("loginPage.html", ".redirectToLoginPage")

    const phoneInput = document.querySelector('input[type="tel"]')
    const selectedCountry = document.querySelector(".iti__selected-country")
    const countrySelector = document.querySelector(".iti__country-selector")
    selectedCountry.addEventListener("click", () => {
        phoneInput.classList.toggle("active")
        countrySelector.classList.toggle("active")
    })
})



