document.addEventListener("DOMContentLoaded", () => {

  if ('serviceWorker' in navigator) {
    // window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((reg) => console.log('Service Worker enregistré !', reg.scope))
        .catch((err) => console.error('Erreur :', err));
    //});
  }

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

