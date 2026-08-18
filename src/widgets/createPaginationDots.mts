export function createPaginationDots(dotClasses : string[]){
    let dots =""
    dotClasses.forEach((dotClass) =>{
    dots +=`
       <div class="pagination_dot ${dotClass}"></div>
    `
    })
    
    return `
      <div class="pagination_dots_container">
           ${dots}
       </div>
    `
}           