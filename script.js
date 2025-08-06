const navButtons = document.querySelectorAll(".nav-btn");

navButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    navButtons.forEach((b) => b.classList.remove("ativo"));
    btn.classList.add("ativo");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.querySelector(".atleta .overlay");

  function animateScroll() {
    if (!overlay) return;

    const rect = overlay.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      const percentVisible = 1 - Math.min(Math.max(rect.top / windowHeight, 0), 1);

      overlay.style.opacity = percentVisible;
      overlay.style.transform = `translateX(${(1 - percentVisible) * 80}px)`;
    }
  }
  window.addEventListener("scroll", animateScroll);
  window.addEventListener("load", animateScroll);
});
