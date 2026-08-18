import { fetchData } from "../helpers/fetchData.mts"
import { pageRedirect } from "../helpers/pageRedirect.mts"

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

    document.addEventListener("click", async(e) => {
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
                await fetchData("api/auth/send-otp",{
                    method : "POST",
                    data: {
                        email: email
                    }
                })
           
                window.location.href = "authentificationPage.html"
            }
        }
    })

})