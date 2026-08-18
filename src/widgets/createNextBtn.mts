export function createNextBtn(btnClass:string, nextBtn : string, icon:string){
    return `
    <button class="${btnClass}">
            <span>${nextBtn}</span>
            <img src="${icon}" alt="" />
    </button>
    `
} 
