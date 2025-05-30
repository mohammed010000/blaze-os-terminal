// 🌊 Open Hydration Goal Setter screen
document.querySelectorAll(".blz-app-card").forEach((card) => {
  card.addEventListener("click", () => {
    const isCenter =
      card.style.opacity === "1" &&
      card.textContent.includes("Hydration Goal Setter");

    if (isCenter) {
      document.getElementById("blz-apps-screen")?.classList.add("hidden");
      document
        .getElementById("hydration-goal-screen")
        ?.classList.remove("hidden");
    }
  });
});

// 🔙 Back to Features from Step 1
document.getElementById("goal-back-btn")?.addEventListener("click", () => {
  document.getElementById("hydration-goal-screen")?.classList.add("hidden");
  document.getElementById("blz-apps-screen")?.classList.remove("hidden");
});

// 👉 Continue from Step 1 to Step 2
document.getElementById("goal-continue-btn")?.addEventListener("click", () => {
  const selectedWeight = localStorage.getItem("selectedWeight");
  if (!selectedWeight) {
    alert("Please select your weight.");
    return;
  }

  document.getElementById("hydration-goal-screen")?.classList.add("hidden");
  document.getElementById("hydration-goal-step2")?.classList.remove("hidden");
});

// 🔙 Back to Step 1 from Step 2
document.getElementById("goal-back-step2")?.addEventListener("click", () => {
  document.getElementById("hydration-goal-step2")?.classList.add("hidden");
  document.getElementById("hydration-goal-screen")?.classList.remove("hidden");
});

// 🔁 Sport Selection Logic
let selectedSport = null;
document.querySelectorAll(".sport-pill").forEach((pill) => {
  pill.addEventListener("click", () => {
    document
      .querySelectorAll(".sport-pill")
      .forEach((p) => p.classList.remove("selected"));
    pill.classList.add("selected");
    selectedSport = pill.textContent;
  });
});

// ✅ Final Step — Show Summary
document.getElementById("goal-finish-btn")?.addEventListener("click", () => {
  if (!selectedSport) {
    alert("Please select a sport.");
    return;
  }

  const weight = localStorage.getItem("selectedWeight") || "--";

  document.getElementById("hydration-goal-step2")?.classList.add("hidden");
  document.getElementById("hydration-goal-summary")?.classList.remove("hidden");

  // Set dynamic data in summary screen
  document.querySelector(".blz-goal-amount").textContent = "128 oz";
  document.querySelector(".blz-goal-stats").innerHTML = `
    <div><strong>Weight:</strong> ${weight} lbs</div>
    <div><strong>Sport:</strong> ${selectedSport}</div>
    <div><strong>Intensity:</strong> High</div>
    <div><strong>Weather:</strong> 84°F (Humid)</div>
  `;
});

// 🔙 Back from Summary to Step 2
document
  .getElementById("goal-summary-back-btn")
  ?.addEventListener("click", () => {
    document.getElementById("hydration-goal-summary")?.classList.add("hidden");
    document.getElementById("hydration-goal-step2")?.classList.remove("hidden");
  });

// 🚀 Optional: Start Hydration Plan button
document.getElementById("goal-start-btn")?.addEventListener("click", () => {
  alert("Hydration plan activated!");
  // Add logic to return to home or activate tracking here
});

// 🧡 Generate Weight Pills (Step 1)
document.addEventListener("DOMContentLoaded", () => {
  const weightTrack = document.querySelector(".scroll-track-weight");

  for (let i = 90; i <= 300; i++) {
    const pill = document.createElement("div");
    pill.className = "scroll-item-weight";
    pill.textContent = `${i} lbs`;

    if (i === 165) {
      pill.classList.add("active");
      localStorage.setItem("selectedWeight", i);
      setTimeout(() => {
        pill.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }, 100); // Wait for DOM to draw pills
    }

    pill.addEventListener("click", () => {
      document
        .querySelectorAll(".scroll-item-weight")
        .forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      localStorage.setItem("selectedWeight", i);
    });

    weightTrack.appendChild(pill);
  }
});
