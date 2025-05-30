// Electrolyte AI card click
document.querySelectorAll(".blz-app-card").forEach((card) => {
  card.addEventListener("click", () => {
    const isCenter =
      card.style.opacity === "1" && card.textContent.includes("Electrolyte");
    if (isCenter) {
      document.getElementById("blz-apps-screen")?.classList.add("hidden");
      document
        .getElementById("electrolyte-ai-screen")
        ?.classList.remove("hidden");
    }
  });
});

// Back from Electrolyte AI
document.getElementById("electrolyte-back")?.addEventListener("click", () => {
  document.getElementById("electrolyte-ai-screen")?.classList.add("hidden");
  document.getElementById("blz-apps-screen")?.classList.remove("hidden");
});

// 🔁 Insight Stack Rotation
document.addEventListener("DOMContentLoaded", () => {
  const insightCards = document.querySelectorAll(".blz-insight-card");
  const prevBtn = document.getElementById("blz-insight-prev");
  const nextBtn = document.getElementById("blz-insight-next");
  let currentInsight = 0;
  let autoRotateInterval;

  function updateInsights() {
    insightCards.forEach((card, i) => {
      card.classList.remove("active", "above", "below");

      if (i === currentInsight) {
        card.classList.add("active");
      } else if (
        i ===
        (currentInsight - 1 + insightCards.length) % insightCards.length
      ) {
        card.classList.add("above");
      } else if (i === (currentInsight + 1) % insightCards.length) {
        card.classList.add("below");
      }
    });
  }

  function goToNextInsight() {
    currentInsight = (currentInsight + 1) % insightCards.length;
    updateInsights();
  }

  prevBtn?.addEventListener("click", () => {
    currentInsight =
      (currentInsight - 1 + insightCards.length) % insightCards.length;
    updateInsights();
  });

  nextBtn?.addEventListener("click", () => {
    goToNextInsight();
  });

  // 🔁 Auto-Rotate Every 2 Seconds
  autoRotateInterval = setInterval(goToNextInsight, 2000);

  updateInsights();
});
