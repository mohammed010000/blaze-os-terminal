window.addEventListener("DOMContentLoaded", () => {
  // 🚰 Liquid Calorie Detector navigation
  document.querySelectorAll(".blz-app-card").forEach((card) => {
    card.addEventListener("click", () => {
      const isCenter =
        card.style.opacity === "1" &&
        card.textContent.includes("Liquid Calorie Detector");

      if (isCenter) {
        document.getElementById("blz-apps-screen")?.classList.add("hidden");
        document
          .getElementById("liquid-calorie-screen")
          ?.classList.remove("hidden");

        // Default visual state
        setTimeout(() => setDropletState("water"), 200);
      }
    });
  });

  // 🔙 Back button
  // 🔙 Back button
  document.getElementById("liquid-back-btn")?.addEventListener("click", () => {
    document.getElementById("liquid-calorie-screen")?.classList.add("hidden");
    document.getElementById("blz-apps-screen")?.classList.remove("hidden");
  });

  // 🧪 Liquid type visual state
  function setDropletState(type) {
    const icon = document.getElementById("liquid-droplet-icon");
    const droplet = document.querySelector(".liquid-droplet");
    const pulse = document.querySelector(".scanning-pulse");

    if (!icon || !droplet || !pulse) return;

    if (type === "water") {
      icon.style.filter = "hue-rotate(180deg)";
      droplet.style.background = "radial-gradient(circle, #003366, #000c1a)";
      pulse.style.boxShadow = "0 0 40px #0077cc";
    } else if (type === "shake") {
      icon.style.filter = "hue-rotate(90deg)";
      droplet.style.background = "radial-gradient(circle, #40260a, #120a00)";
      pulse.style.boxShadow = "0 0 40px #663300";
    } else if (type === "electrolyte") {
      icon.style.filter = "hue-rotate(30deg)";
      droplet.style.background = "radial-gradient(circle, #665100, #1a1400)";
      pulse.style.boxShadow = "0 0 40px #ffaa00";
    }
  }

  // 🔄 Rescan Button Logic
  document
    .querySelector(".liquid-rescan-btn")
    ?.addEventListener("click", () => {
      document.getElementById("liquid-type").innerText = "Gatorade";
      document.getElementById("liquid-calories").innerText = "90 kcal";
      document.getElementById("liquid-confidence").innerText = "98%";

      setDropletState("electrolyte");
    });

  // 🔁 Auto-scroll AI insight cards horizontally + highlight active
  const cardStack = document.getElementById("liquid-insight-stack");
  const cards = document.querySelectorAll(".liquid-ai-card");
  let scrollIndex = 0;

  function rotateLiquidInsightCards() {
    if (!cardStack || cards.length === 0) return;

    const cardWidth = cards[0].offsetWidth;
    scrollIndex = (scrollIndex + 1) % cards.length;
    const scrollLeft = scrollIndex * (cardWidth + 18);
    cardStack.scrollTo({ left: scrollLeft, behavior: "smooth" });

    // Highlight active card
    cards.forEach((card, index) => {
      card.classList.toggle("active", index === scrollIndex);
    });
  }

  setInterval(rotateLiquidInsightCards, 2500);
  rotateLiquidInsightCards(); // initial

  // 🔄 Animated kcal loop logic
  const kcalNumber = document.getElementById("kcal-number");
  const kcalValues = [14, 19, 24, 20, 16, 22, 18];
  let kcalIndex = 0;

  setInterval(() => {
    if (kcalNumber) {
      kcalNumber.innerText = kcalValues[kcalIndex];
      kcalIndex = (kcalIndex + 1) % kcalValues.length;
    }
  }, 1200);
});
