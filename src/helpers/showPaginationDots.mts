export function showPaginationDots(url: string, dot:HTMLElement) : void{
    if(window.location.pathname.endsWith(url)){
        dot.classList.add("active")
    } else{
        dot.classList.remove("active")
    }  
}
