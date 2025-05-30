// 🔁 Open Hydration Coach
document.querySelectorAll(".blz-app-card").forEach((card) => {
  card.addEventListener("click", () => {
    const isCenter =
      card.style.opacity === "1" &&
      card.textContent.includes("Hydration Coach");
    if (isCenter) {
      document.getElementById("blz-apps-screen")?.classList.add("hidden");
      document
        .getElementById("hydration-coach-screen")
        ?.classList.remove("hidden");
    }
  });
});

// 🔁 Back from Hydration Coach
document.getElementById("hydration-back")?.addEventListener("click", () => {
  document.getElementById("hydration-coach-screen")?.classList.add("hidden");
  document.getElementById("blz-apps-screen")?.classList.remove("hidden");
});

window.addEventListener("DOMContentLoaded", () => {
  const fill = document.querySelector(".hydration-bar-fill");
  if (fill) {
    fill.style.width = "0%";
    setTimeout(() => {
      fill.style.width = "82%";
    }, 100); // slight delay to trigger transition
  }
});

// 🔄 Insight Stack Rotation (Hydration Coach)
document.addEventListener("DOMContentLoaded", () => {
  const insightCards = document.querySelectorAll(".blz-insight-cardz");
  let currentIndex = 0;

  function updateHydrationStack() {
    insightCards.forEach((card, i) => {
      card.classList.remove("active", "above", "below");

      if (i === currentIndex) {
        card.classList.add("active");
      } else if (
        i ===
        (currentIndex - 1 + insightCards.length) % insightCards.length
      ) {
        card.classList.add("above");
      } else if (i === (currentIndex + 1) % insightCards.length) {
        card.classList.add("below");
      }
    });
  }

  // 🔁 Auto-rotate every 4 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % insightCards.length;
    updateHydrationStack();
  }, 4000);

  updateHydrationStack();
});
window.addEventListener("DOMContentLoaded", () => {
  const circle1 = document.querySelector(".ring-fill-1");
  const circle2 = document.querySelector(".ring-fill-2");

  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  const setProgress = (circle, percent) => {
    const offset = circumference - (percent / 100) * circumference;
    circle.style.setProperty("--fill-offset", offset);
    circle.style.strokeDashoffset = offset;
    circle.style.strokeDasharray = circumference;
  };

  setProgress(circle1, 82); // 82% progress
  setProgress(circle2, 18); // 18 oz left (can map this to % if needed)
});

// Open Hydration Coach from Water Tracker card
document
  .getElementById("blz-water-tracker-card")
  ?.addEventListener("click", () => {
    document.getElementById("blz-apps-screen")?.classList.add("hidden");
    document
      .getElementById("hydration-coach-screen")
      ?.classList.remove("hidden");
  });
