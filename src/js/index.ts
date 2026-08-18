document.addEventListener("DOMContentLoaded", () => {

  //Redirection automatique après 5 secondes
  const timer = setTimeout(() => {
    window.location.href = "onboardingCategories.html";
  }, 5000);

  // Redirection immédiate si l'utilisateur clique
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;

    if (target.classList.contains("slide_btn")) {
      clearTimeout(timer); // annule le timer
      window.location.href = "onboardingCategories.html";
    }
  });
 
})

