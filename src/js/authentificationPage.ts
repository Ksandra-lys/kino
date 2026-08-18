import { fetchData } from "../helpers/fetchData.mts";
import { pageRedirect } from "../helpers/pageRedirect.mjs";

document.addEventListener("DOMContentLoaded", async () => {
    pageRedirect("inscriptionPage.html", ".back_btn");

    const inputs = document.querySelectorAll(".verification_code") as NodeListOf<HTMLInputElement>;
    const button = document.querySelector(".receive_code") as HTMLButtonElement;

    const email = sessionStorage.getItem("email")
    const name = sessionStorage.getItem("name")
    const phone = sessionStorage.getItem("phone")
    const emailSpan = document.querySelector(".number") as HTMLElement
    console.log(email)
    emailSpan.textContent = email
    const otpInputs = (document.querySelectorAll(".verification_code") as NodeListOf<HTMLInputElement>)
    console.log(otpInputs)
    
    inputs.forEach((input, index) => {
        button.disabled = true
        input.addEventListener("input", async () => {
            const allFilled = Array.from(inputs).every(input => input.value.trim() !== "");
            if (allFilled) {
                button.disabled = false
                const otp = Array.from(otpInputs).map(input => input.value).join("")
                const {result} = await fetchData("api/auth/verify-otp", {
                    method: "POST",
                    data: {
                        email: email,
                        otp: otp
                    }
                })
                localStorage.setItem("accessToken", result.accessToken)
                window.location.href = "depositDaysHomePage.html"
            }

            if (input.value !== "" && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        })
    });
    const resendCode = document.querySelector(".resend") as HTMLElement;

    let timeLeft = 90;

    function updateCountdown() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        resendCode.textContent =
            `Le code expire dans: ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            resendCode.textContent = "Renvoyer le code"
        }

        timeLeft--;
    }
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    resendCode.addEventListener("click",async()=>{
        console.log("oooo")
        updateCountdown()
        await fetchData("api/auth/send-otp",{
            method:"POST",
            data :{
                email:email,
                name:name,
                phone : phone
            }
        })
    })
});
