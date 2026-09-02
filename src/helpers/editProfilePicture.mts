import { safeFetchData } from "../helpers/safeFetch.mts"
export function editProfilePicture() : void{
    const avatarPicture = document.querySelector(".avatar_picture") as HTMLElement
    const input = document.getElementById("avatarInput") as HTMLInputElement
    input.addEventListener("change", async () => {
        const file = input.files?.[0]
        if (file && file.size < 5 * 1024 * 1024) {
            const imageUrl = URL.createObjectURL(file);
            avatarPicture.innerHTML = `<div class="avatar_background">
                                    <img src= "${imageUrl}" alt="" />
                                </div>`

            const formData = new FormData()
            formData.append("avatar", file)

            try {
                await safeFetchData("api/media/avatar", {
                    method: "POST",
                    data: formData
                })

            } catch (error) {
                console.error(error)
            }
        }
    })
}