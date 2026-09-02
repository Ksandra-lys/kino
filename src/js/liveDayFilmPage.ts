import { pageRedirect } from "../helpers/pageRedirect.mts"

document.addEventListener("DOMContentLoaded", () => {
    pageRedirect("liveDayHomePage.html", ".back_btn")

    const publishBtn = document.querySelector(".publish_btn") as HTMLElement
    const commentsInput = document.getElementById("commentInput") as HTMLTextAreaElement
    const commentSectionBottom = document.querySelector(".comment_section_bottom_container") as HTMLElement
    publishBtn.addEventListener("click", () => {
        if (commentsInput.value) {
            commentSectionBottom.innerHTML = `
                        <div class="comment_section_bottom">
                            <span class="user_profile">T</span>
                            <div class="comments_container">
                                <div class="comments_info">
                                    <div class="name">Théo</div>
                                    <div class="hour">47:18</div>
                              </div>
                                <div class="comments">${commentsInput.value}</div>
                            </div>
                        </div> 
        `
            commentsInput.value = ""
        }
 
    })
})