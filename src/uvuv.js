// 🌟 UV Sterilization card logic from Device tab
document.querySelectorAll(".blz-app-card").forEach((card) => {
  card.addEventListener("click", () => {
    const isCenter = card.style.opacity === "1";
    const isUVCard =
      card.querySelector("h3")?.textContent.trim() === "UV Sterilization";

    if (isCenter && isUVCard) {
      // Hide the apps screen
      document.getElementById("blz-apps-screen")?.classList.add("hidden");

      // Simulate clicking the Home screen UV button
      document.getElementById("activate-uv-btn")?.click();
    }
  });
});
