export function homePageSkeleton() : void{
    const container = document.getElementById("container") as HTMLElement;

    container.classList.add("loading")

    container.innerHTML = `
        <header>
            <div class="header_container skeleton_header_container">

                <div class="header_leftside">
                    <span class="skeleton skeleton_greetings"></span>

                    <div class="username_container">
                        <span class="skeleton skeleton_username"></span>
                        <span class="skeleton skeleton_wave"></span>
                    </div>
                </div>

                <div class="header_rightside">
                    <span class="skeleton skeleton_app_name"></span>
                    <span class="skeleton skeleton_avatar"></span>
                </div>

            </div>
        </header>

        <main>
            <div class="schedule_container">

                <div class="schedule_text">

                    <div class="skeleton skeleton_schedule"></div>

                    <div class="schedule">
                        <span class="skeleton skeleton_date"></span>
                        <span class="skeleton skeleton_plan"></span>
                    </div>

                    <div class="schedule">
                        <span class="skeleton skeleton_date"></span>
                        <span class="skeleton skeleton_plan"></span>
                    </div>

                    <div class="schedule">
                        <span class="skeleton skeleton_date"></span>
                        <span class="skeleton skeleton_plan"></span>
                    </div>

                    <div class="schedule">
                        <span class="skeleton skeleton_date"></span>
                        <span class="skeleton skeleton_plan"></span>
                    </div>

                    <div class="schedule">
                        <span class="skeleton skeleton_date"></span>
                        <span class="skeleton skeleton_plan"></span>
                    </div>

                </div>

                <div class="schedule_line skeleton"></div>

            </div>


            <!-- CONTENU PRINCIPAL -->
            <div class="main_background">

                <div class="program_container skeleton_program_container">

                    <div class="program">

                        <div class="program_leftside">

                            <div class="program_icon_background skeleton">
                                <span class="skeleton skeleton_program_icon"></span>
                            </div>

                            <div class="program">
                                <span class="skeleton skeleton_program_name"></span>
                                <span class="skeleton skeleton_program_description"></span>
                            </div>

                        </div>

                    </div>

                </div>

                <div class="category_container">

                    <div class="category skeleton_category">
                        <span class="skeleton skeleton_category_icon"></span>
                        <span class="skeleton skeleton_category_name"></span>
                        <span class="skeleton skeleton_category_line"></span>
                    </div>

                    <div class="category skeleton_category">
                        <span class="skeleton skeleton_category_icon"></span>
                        <span class="skeleton skeleton_category_name"></span>
                        <span class="skeleton skeleton_category_line"></span>
                    </div>

                    <div class="category skeleton_category">
                        <span class="skeleton skeleton_category_icon"></span>
                        <span class="skeleton skeleton_category_name"></span>
                        <span class="skeleton skeleton_category_line"></span>
                    </div>

                    <div class="category skeleton_category">
                        <span class="skeleton skeleton_category_icon"></span>
                        <span class="skeleton skeleton_category_name"></span>
                        <span class="skeleton skeleton_category_line"></span>
                    </div>

                </div>

            </div>

        </main>

        <footer>

            <div class="footer_category">
                <span class="skeleton skeleton_footer_icon"></span>
                <span class="skeleton skeleton_footer_text"></span>
            </div>

            <div class="footer_category">
                <span class="skeleton skeleton_footer_icon"></span>
                <span class="skeleton skeleton_footer_text"></span>
            </div>

            <div class="footer_category">
                <span class="skeleton skeleton_footer_icon"></span>
                <span class="skeleton skeleton_footer_text"></span>
            </div>

            <div class="footer_category">
                <span class="skeleton skeleton_footer_icon"></span>
                <span class="skeleton skeleton_footer_text"></span>
            </div>

        </footer>
    `;
}