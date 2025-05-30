window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".blz-app-card").forEach((card) => {
    card.addEventListener("click", () => {
      const isCenter =
        card.style.opacity === "1" &&
        card.textContent.includes("Blaze Voice Assistant");

      if (isCenter) {
        document.getElementById("blz-apps-screen")?.classList.add("hidden");
        document
          .querySelector(".voice-module-screen")
          ?.classList.remove("hidden");
      }
    });
  });
});
