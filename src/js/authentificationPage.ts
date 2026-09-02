import { pageRedirect } from "../helpers/pageRedirect.mjs";
import { safeFetchData } from "../helpers/safeFetch.mts";
import { showSnackbar } from "../helpers/showSnackBar.mts";
import { updateCountdown } from "../helpers/updateCountdown.mts";
import { redirectAccordingToDay } from "../modules/redirectAccordingToDay.mts";

document.addEventListener("DOMContentLoaded", async () => {
    pageRedirect("inscriptionPage.html", ".back_btn");

    const snackbar = document.querySelector(".snackbar") as HTMLElement
    const resendCode = document.querySelector(".resend") as HTMLElement;
    const timeLeft = Number(sessionStorage.getItem("timeleft"))

    updateCountdown(resendCode, timeLeft)
    showSnackbar("Code envoyé")

    const inputs = document.querySelectorAll(".verification_code") as NodeListOf<HTMLInputElement>;
    const button = document.querySelector(".receive_code") as HTMLButtonElement;
    const email = sessionStorage.getItem("email")
    const name = sessionStorage.getItem("name")
    const phone = sessionStorage.getItem("phone")
    const emailSpan = document.querySelector(".number") as HTMLElement
    emailSpan.textContent = email
    const otpInputs = (document.querySelectorAll(".verification_code") as NodeListOf<HTMLInputElement>)
    const otpError = document.querySelector(".otp_error_msg") as HTMLElement
    inputs.forEach((input, index) => {
        button.disabled = true
        input.addEventListener("input", async () => {
            const allFilled = Array.from(inputs).every(input => input.value.trim() !== "");
            if (allFilled) {
                button.disabled = false
                const otp = Array.from(otpInputs).map(input => input.value).join("")
                try {
                    await safeFetchData("api/auth/verify-otp", {
                        method: "POST",
                        data: {
                            email: email,
                            otp: otp
                        }
                    })
                    redirectAccordingToDay()
                } catch (error) {
                    if (error instanceof Error) {
                        console.error(error.message)
                    } else {
                        console.error(error)
                    }

                    otpError.textContent = "Code incorrect. Veuillez réessayez"
                }
            }

            if (input.value !== "" && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        })
        input.addEventListener("keydown", (e) => {
            if (e.key === "Backspace" && input.value === "") {
                inputs[index - 1].focus();
            }
        });
    });


    resendCode.addEventListener("click", async () => {
        try {
            const sendOtp = await safeFetchData("api/auth/send-otp", {
                method: "POST",
                data: {
                    email: email,
                    name: name,
                    phone: phone
                }
            })
            const timeLeft = sendOtp.result.expiresInSeconds
            updateCountdown(resendCode, timeLeft) 
            showSnackbar("Nouveau code envoyé")

        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message)
                showSnackbar(error.message)
                snackbar.style.backgroundColor = "red"
            } else {
                console.error(error)
            }

        }
    })
});
