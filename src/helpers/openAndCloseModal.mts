export function openAndCloseModal(openModalBtn:string, modal:HTMLElement, closeModalBtn: string){
    document.addEventListener("click", (e) => {
        const target = e.target as HTMLElement
        if (target.closest(openModalBtn)) {
            modal.style.display = "flex"
        }
        else if (target.classList.contains(closeModalBtn)) {
            modal.style.display = "none"
        }
    })
}