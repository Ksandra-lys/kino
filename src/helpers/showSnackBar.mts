export function showSnackbar(message: string) {
    const snackbar = document.querySelector(".snackbar") as HTMLElement;
    
    snackbar.textContent = message;
    snackbar.classList.add("active");

    setTimeout(() => {
        snackbar.classList.remove("active");
    }, 3000);
}
