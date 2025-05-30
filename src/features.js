document.addEventListener("DOMContentLoaded", () => {
  // 🔹 Screen toggles
  const accessAllBtn = document.querySelector(".home-screen .btn.gray");
  const appsScreen = document.getElementById("blz-apps-screen");
  const homeScreen = document.querySelector(".home-screen");
  const uvScreen = document.querySelector(".uv-screen");
  const bg = document.getElementById("blz-tab-bg");

  const tabs = document.querySelectorAll(".blz-tab");
  const allCards = document.querySelectorAll(".blz-app-card");

  const backHomeBtn = document.getElementById("blz-back-home");

  const track = document.querySelector(".blz-carousel-track");
  const cards = Array.from(document.querySelectorAll(".blz-app-card"));
  let currentIndex = 0;

  console.log("Features.js loaded");

  accessAllBtn?.addEventListener("click", () => {
    console.log("Access All Features clicked");

    homeScreen?.classList.add("hidden");
    uvScreen?.classList.add("hidden");

    // Show the apps screen with smooth fade-in
    appsScreen?.classList.remove("hidden");
    setTimeout(() => {
      appsScreen?.classList.add("visible");
    }, 10);

    // Show only AI cards
    allCards.forEach((card) => {
      const category = card.dataset.category;
      card.style.display = category === "ai" ? "block" : "none";
    });

    // Highlight AI tab
    tabs.forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.category === "ai");
    });

    // Set AI background
    bg.className = "blz-tab-bg ai-bg";

    currentIndex = 0;
    updateCarousel();
  });

  backHomeBtn?.addEventListener("click", () => {
    appsScreen?.classList.remove("visible");
    appsScreen?.classList.add("hidden");
    homeScreen?.classList.remove("hidden");
  });

  // 🔹 Tab switching logic
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const selectedCategory = tab.dataset.category;

      // Highlight active tab
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      // Show only matching cards
      allCards.forEach((card) => {
        const cardCategory = card.dataset.category;
        card.style.display =
          cardCategory === selectedCategory ? "block" : "none";
      });

      // Switch background class
      bg.className = `blz-tab-bg ${selectedCategory}-bg`;

      // Reset carousel
      currentIndex = 0;
      updateCarousel();
    });
  });

  // 🔁 3D Carousel logic
  function updateCarousel() {
    const visibleCards = cards.filter((card) => card.style.display !== "none");
    const total = visibleCards.length;

    visibleCards.forEach((card, i) => {
      let offset = i - currentIndex;

      // Wrap around
      if (offset > total / 2) offset -= total;
      if (offset < -total / 2) offset += total;

      const isCenter = offset === 0;

      const translateX = offset * 200;
      const translateZ = isCenter ? 0 : -200;
      const scale = isCenter ? 1 : 0.85;
      const opacity = isCenter ? 1 : 0.25;
      const zIndex = 100 - Math.abs(offset);

      card.style.transform = `
          translateX(${translateX}px)
          translateZ(${translateZ}px)
          scale(${scale})
        `;
      card.style.opacity = opacity;
      card.style.zIndex = zIndex;
      card.style.pointerEvents = isCenter ? "auto" : "none";

      // 🔥� Center card glow animation
      card.classList.toggle("glow-active", isCenter);
    });
  }

  document
    .querySelector(".blz-carousel-prev")
    ?.addEventListener("click", () => {
      const visibleCards = cards.filter(
        (card) => card.style.display !== "none"
      );
      currentIndex =
        (currentIndex - 1 + visibleCards.length) % visibleCards.length;
      updateCarousel();
    });

  document
    .querySelector(".blz-carousel-next")
    ?.addEventListener("click", () => {
      const visibleCards = cards.filter(
        (card) => card.style.display !== "none"
      );
      currentIndex = (currentIndex + 1) % visibleCards.length;
      updateCarousel();
    });

  u;
  // 🔗 Open Electrolyte AI feature page when center card is clicked
  cards.forEach((card) => {
    const h3 = card.querySelector("h3");
    if (h3 && h3.textContent.includes("Electrolyte")) {
      card.addEventListener("click", () => {
        const visibleCards = cards.filter((c) => c.style.display !== "none");
        const index = visibleCards.indexOf(card);

        // Open only if this card is centered
        if (index === currentIndex) {
          window.location.href = "electrolyte.html";
        }
      });
    }
  });
  pdateCarousel();
});
