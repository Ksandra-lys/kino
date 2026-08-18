import { identifyCallingCode } from "./identifyCallingCode.mts";
import { fetchData } from "../helpers/fetchData.mts";
export async function validateInscriptionInformation() {
    const button = document.querySelector(".receive_code") as HTMLButtonElement
    button.disabled = true

    const inputs = document.querySelectorAll("input") as NodeListOf<HTMLInputElement>
    inputs.forEach(input => {
        input.addEventListener("input", () => {
            const allFilled = Array.from(inputs).every(input => input.value.trim() !== "")
            console.log(allFilled)
            if (allFilled) {
                button.disabled = false
            }
        })
    })
 
    const iti = identifyCallingCode()
    document.addEventListener("click", async (e) => {
        const target = e.target as HTMLElement
        let firstName = (document.getElementById("firstName") as HTMLInputElement).value;
        let firstNameErrorMsg = document.getElementById("firstNameErrorMsg") as HTMLElement
        let nameRegExp = new RegExp("^[a-zA-Z]");
        if (target.closest(".receive_code")) {
            if (firstName.length < 2) {
                firstNameErrorMsg.textContent =
                    "Veuillez entrer votre prénom (plus de 02 lettres)";
            } else if (!nameRegExp.test(firstName)) {
                firstNameErrorMsg.textContent =
                    "Veuillez écrire correctement votre prénom";
            } else {
                firstNameErrorMsg.textContent = "";
            }

            const email = (document.getElementById("email") as HTMLInputElement).value
            const emailErrorMsg = document.getElementById("emailErrorMsg") as HTMLElement
            let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
            if (email === "") {
                emailErrorMsg.textContent =
                    "Veuillez entrer votre adresse e-mail";
            } else if (!emailRegExp.test(email)) {
                emailErrorMsg.textContent = "Veuillez entrer une adresse e-mail valide"
            } else {
                emailErrorMsg.textContent = ""
            }

            const phoneInput = (document.getElementById("phone") as HTMLInputElement).value
            const phoneErrorMsg = document.getElementById("phoneErrorMsg")
            const country = iti.getSelectedCountry().iso2;
            const phoneNumber = iti.getNumber()
            const isPhoneNumberValid = country === "cm" && phoneInput.startsWith("6")
            
            if (!iti.isValidNumber() || !isPhoneNumberValid) {
                phoneErrorMsg.textContent = "Veuillez entrer un numéro de téléphone valide"
            } else {
                phoneErrorMsg.textContent = ""
            }

            if (firstName.length > 2 && nameRegExp.test(firstName) &&
                email !== "" && emailRegExp.test(email) && iti.isValidNumber() && isPhoneNumberValid) {
                
                const sendOtp = await fetchData("api/auth/send-otp",{
                    method: "POST",
                    data: {
                        email: email,
                        name: firstName,
                        phone: phoneNumber
                    }
                })    
                const countdown = sendOtp.result.expiresInSeconds
                console.log(countdown)
                //console.log(sendOtp.result.expiresInSeconds)
                //const picture = (document.getElementById("photo") as HTMLInputElement).value
                sessionStorage.setItem("countdown", countdown)      
                sessionStorage.setItem("email", email);
                sessionStorage.setItem("name", firstName);
                sessionStorage.setItem("phone", phoneNumber)
                window.location.href = "authentificationPage.html"
                
            }
        }
    })
}





