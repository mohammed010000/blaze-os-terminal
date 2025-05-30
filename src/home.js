// === Step 1: Open Hydration Goal Setter screen ===
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

// === Step 1: Continue to Step 2 ===
document.getElementById("goal-continue-btn")?.addEventListener("click", () => {
  const step1 = document.getElementById("hydration-goal-screen");
  const step2 = document.getElementById("hydration-goal-step2");
  step1?.classList.add("hidden");
  step2?.classList.remove("hidden");
});

// === Step 2: Back to Step 1 ===
document.getElementById("goal-step2-back")?.addEventListener("click", () => {
  const step1 = document.getElementById("hydration-goal-screen");
  const step2 = document.getElementById("hydration-goal-step2");
  step2?.classList.add("hidden");
  step1?.classList.remove("hidden");
});

// === Step 2: Continue to Step 3 ===
document
  .getElementById("goal-step2-continue")
  ?.addEventListener("click", () => {
    const step2 = document.getElementById("hydration-goal-step2");
    const step3 = document.getElementById("hydration-goal-summary");
    step2?.classList.add("hidden");
    step3?.classList.remove("hidden");

    // OPTIONAL: Pull weight + sport + intensity values to update summary
    const weight = document.getElementById("weight-picker")?.value || "165";
    const sport = document.getElementById("goal-sport-select")?.value || "HIIT";
    const intensity =
      document.querySelector('input[name="goal-intensity"]:checked')?.value ||
      "Moderate";

    document.getElementById("summary-goal-value").textContent = `${weight} oz`;
    document.getElementById(
      "summary-goal-note"
    ).textContent = `Based on your profile (${weight} lbs, ${sport}, ${intensity} intensity)`;
  });

// === Step 3: Back to Home ===
document.getElementById("goal-summary-back")?.addEventListener("click", () => {
  document.getElementById("hydration-goal-summary")?.classList.add("hidden");
  document.getElementById("blz-apps-screen")?.classList.remove("hidden");
});
