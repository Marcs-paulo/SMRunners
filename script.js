const navButtons = document.querySelectorAll(".nav-btn");

navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        navButtons.forEach((b) => b.classList.remove("ativo"));
        btn.classList.add("ativo");
    });
});

document.addEventListener("DOMContentLoaded", () => {
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
    animateScroll();

    let currentSlide = 0;
    const slides = document.querySelectorAll(".carrossel .slide");
    const prevBtn = document.querySelector(".carrossel .prev");
    const nextBtn = document.querySelector(".carrossel .next");

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle("ativo", i === index);
        });
    }

    if (prevBtn && nextBtn && slides.length > 0) {
        prevBtn.addEventListener("click", () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });

        nextBtn.addEventListener("click", () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });

        showSlide(currentSlide);
    }

    const loader = document.getElementById("loader");
    const container = document.getElementById("eventos-container");
    if (container) container.style.display = "none"; 

    async function carregarEventos() {
        try {
            if (loader) loader.style.display = "block";
            if (container) container.style.display = "none";

            const res = await fetch("https://script.google.com/macros/s/AKfycbwaxDiLwYlkA_9RKGOJjrgZz_780GF9dYL1OHehFDIcUYvNFf2Kqgp6OjnCIbYlFRGOjA/exec");
            const eventos = await res.json();

            if (container) {
                container.innerHTML = "";
                eventos.forEach(evt => {
                    const nome = evt.nome || "Nome não informado";
                    const data = evt.data || "";
                    const hora = evt.hora || "";
                    const local = evt.local || "";
                    const link = evt.link || "#";
                    const imagem = evt.imagem || "assets/default-event.png";

                    let dataFormatada = "";
                    if (data) {
                        const d = new Date(data);
                        dataFormatada = !isNaN(d) ? d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" }) : data;
                    }

                    const eventoHTML = `
            <article class="evento" tabindex="0">
              <img src="${imagem}" alt="Imagem da corrida ${nome}" />
              <h3>${nome}</h3>
              <p class="info"><strong>Data:</strong> ${dataFormatada} <br>
              <strong>Hora:</strong> ${hora} <br>
              <strong>Local:</strong> ${local}</p>
              <a href="${link}" target="_blank" class="link-inscricao" rel="noopener noreferrer">Inscreva-se</a>
            </article>
          `;

                    container.insertAdjacentHTML("beforeend", eventoHTML);
                });
            }
        } catch (error) {
            console.error("Erro ao carregar eventos do calendário:", error);
            if (container) container.innerHTML = "<p>Erro ao carregar eventos.</p>";
        } finally {
            if (loader) loader.style.display = "none";
            if (container) container.style.display = "grid"; 
        }
    }
    carregarEventos();
});
