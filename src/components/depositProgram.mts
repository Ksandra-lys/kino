import type { depositProgram } from "../types/depositProgram.mts"
export function depositProgram(data : depositProgram) :string {
    return `
    <div class="program_leftside">
        <div class="program_icon_background">
            <img src="${data.programIcon}" alt="" class="program_leftside_icon">
        </div>
        <div class="program">
            <div class="program_name_container"> 
                <div class="circle"></div>
                <span class="program_name">${data.programName}</span>
            </div> 
            <span class="program_description">${data.programDescription}</span>
            <div class="scenarist_container"> 
                ${data.scenaristName ? `<span class="scenarist_name"> ${data.scenaristName}</span>`:""}
                ${data.scenaristIcon ? `<img src="${data.scenaristIcon}" class="loveIcon">`:""}
            </div> 
        </div>
    </div>    
        ${data.rightChevron ? ` <img src="${data.rightChevron}" class="right_chevron">` : ""}
       
    `
}