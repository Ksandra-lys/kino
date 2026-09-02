export function categoryPageSkeleton():void {
    const container = document.getElementById("container") as HTMLElement;

    container.classList.add("loading");

    container.innerHTML = `
        <header>
            <div class="header_text skeleton_header">

                <span class="skeleton skeleton_back back_btn"></span>

                <span class="skeleton skeleton_title"></span>

                <span class="skeleton skeleton_date"></span>

            </div>

            <div class="header_line"></div>
        </header>


        <!-- MAIN -->
        <main>

            <!-- PROGRAMME -->
            <div class="program_container skeleton_program">

                <div class="program_leftside">

                    <div class="program_icon_background">
                        <span class="skeleton skeleton_program_icon"></span>
                    </div>

                    <div class="program">

                        <span class="skeleton skeleton_program_name"></span>

                        <span class="skeleton skeleton_program_description"></span>

                    </div>

                </div>

            </div>


            <!-- BOUTON -->
            <div class="skeleton skeleton_deposit_btn"></div>


            <!-- FILMS -->
            <div class="category_propositions_container skeleton_films">

                <div class="upload_films_container skeleton_film">

                    <div class="upload_films">

                        <div class="filmsandpicture">

                            <span class="skeleton skeleton_poster"></span>

                            <div class="upload_films_description">

                                <span class="skeleton skeleton_film_title"></span>

                                <span class="skeleton skeleton_film_director"></span>

                                <div class="film_user_container">

                                    <span class="skeleton skeleton_avatar"></span>

                                    <span class="skeleton skeleton_user"></span>

                                </div>

                            </div>

                        </div>

                        <span class="skeleton skeleton_update_btn"></span>

                    </div>

                </div>


                <div class="upload_films_container skeleton_film">

                    <div class="upload_films">

                        <div class="filmsandpicture">

                            <span class="skeleton skeleton_poster"></span>

                            <div class="upload_films_description">

                                <span class="skeleton skeleton_film_title"></span>

                                <span class="skeleton skeleton_film_director"></span>

                                <div class="film_user_container">

                                    <span class="skeleton skeleton_avatar"></span>

                                    <span class="skeleton skeleton_user"></span>

                                </div>

                            </div>

                        </div>

                        <span class="skeleton skeleton_update_btn"></span>

                    </div>

                </div>


                <div class="upload_films_container skeleton_film">

                    <div class="upload_films">

                        <div class="filmsandpicture">

                            <span class="skeleton skeleton_poster"></span>

                            <div class="upload_films_description">

                                <span class="skeleton skeleton_film_title"></span>

                                <span class="skeleton skeleton_film_director"></span>

                                <div class="film_user_container">

                                    <span class="skeleton skeleton_avatar"></span>

                                    <span class="skeleton skeleton_user"></span>

                                </div>

                            </div>

                        </div>

                        <span class="skeleton skeleton_update_btn"></span>

                    </div>

                </div>

            </div>

        </main>


        <!-- FOOTER -->
        <footer class="skeleton_footer">

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