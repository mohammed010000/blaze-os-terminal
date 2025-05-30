// ✅ Open Reminder Schedule → AI Drinking Reminder screen
document.querySelectorAll(".blz-app-card").forEach((card) => {
    card.addEventListener("click", () => {
      const isCenter = card.style.opacity === "1" && card.textContent.includes("Reminder Schedule");
      if (isCenter) {
        document.getElementById("blz-apps-screen")?.classList.add("hidden");
        document.getElementById("ai-reminder-screen")?.classList.remove("hidden");
      }
    });
  });
  
  // 🔙 Back from Reminder Schedule screen
  document.getElementById("ai-back-btn")?.addEventListener("click", () => {
    document.getElementById("ai-reminder-screen")?.classList.add("hidden");
    document.getElementById("blz-apps-screen")?.classList.remove("hidden");
  });
  