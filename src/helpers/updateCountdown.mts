export function updateCountdown(resendCode: HTMLElement, timeLeft: number):void {
    const timer = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        resendCode.textContent =
            `Le code expire dans: ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            resendCode.textContent = "Renvoyer le code"
        }

        timeLeft--;
    }, 2000)
}

