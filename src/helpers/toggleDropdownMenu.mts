export function toggleDropdownMenu(targetElement: string, menuElement: HTMLElement): void{
    document.addEventListener("click",(e)=>{
        const target = e.target as HTMLElement
        if(target.closest(targetElement)){
            menuElement.classList.toggle("active")
        }
    })

}