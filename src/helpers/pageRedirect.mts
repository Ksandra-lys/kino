export function pageRedirect(url:string, classList: string) : void{
    document.addEventListener("click",(e)=>{
        const target = e.target as HTMLElement
        console.log(target)
        if(target.closest(classList)){
            window.location.href = url
        }
    })

    
}