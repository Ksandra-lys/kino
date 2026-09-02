import { pageRedirect } from "../helpers/pageRedirect.mts"
import { safeFetchData } from "../helpers/safeFetch.mts"
document.addEventListener("DOMContentLoaded", () => {
    pageRedirect("inscriptionPage.html", ".back_btn")

    const button = document.querySelector(".receive_code") as HTMLButtonElement
    const input = document.querySelector("input") as HTMLInputElement
    button.disabled = true
    input.addEventListener("input", () => {
        if (input.value !== "") { 
            button.disabled = false
        }
    })

    document.addEventListener("click", async (e) => {
        const target = e.target as HTMLElement
        const email = (document.getElementById("email") as HTMLInputElement).value
        const emailErrorMsg = document.getElementById("emailErrorMsg") as HTMLElement
        let emailRegExp = new RegExp("^[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z]{2,}$", "i")
        if (target.closest(".receive_code")) {
            if (email === "") {
                emailErrorMsg.textContent =
                    "Veuillez entrer votre adresse e-mail";
            } else if (!emailRegExp.test(email)) {
                emailErrorMsg.textContent = "Veuillez entrer une adresse e-mail valide"
            } else {
                emailErrorMsg.textContent = ""
            }

            if (email !== "" && emailRegExp.test(email)) {
                try {
                    const sendOtp = await safeFetchData("api/auth/send-otp", {
                        method: "POST",
                        data: {
                            email: email
                        }
                    })
                    const timeLeft = sendOtp.result.expiresInSeconds
                    sessionStorage.removeItem("calendarDay")
                    sessionStorage.setItem("timeleft", timeLeft)
                    sessionStorage.setItem("email",email)
                    sessionStorage.setItem("snackbar", "Connexion réussie")
                    window.location.href = "authentificationPage.html"
                } catch (error) {
                    if (error instanceof Error) {
                        console.error(error.message)
                    } else {
                        console.error(error)
                    }

                }
            }
        }
    })

})