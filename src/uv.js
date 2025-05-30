const uvBtn = document.querySelector("#activate-uv-btn");
const uvScreen = document.querySelector(".uv-screen");
const homeScreen = document.querySelector(".home-screen");
const pulseWrapper = document.getElementById("uv-pulse-wrapper");
const svg = document.getElementById("uv-core-svg");
const visualBlock = document.getElementById("uv-visual-block");
const progressText = document.getElementById("uv-progress-text");
const plusText = document.getElementById("uv-plus-text");
const checkmark = document.getElementById("uv-checkmark");
const subtext = document.getElementById("uv-subtext");

let resetTimer;

// 🌟 Activate UV screen
uvBtn?.addEventListener("click", () => {
  homeScreen?.classList.add("hidden");
  uvScreen?.classList.remove("hidden");
  uvScreen?.classList.add("visible");

  // Reset everything
  plusText.classList.remove("hidden");
  progressText.classList.add("hidden");
  checkmark.classList.add("hidden");
  svg.classList.remove("check");
  visualBlock.classList.remove("glow");
  pulseWrapper.style.opacity = "1";
  pulseWrapper.style.pointerEvents = "auto";
  subtext.textContent = "Press to activate sterilization";

  // Reset pulse ring animation
  document.querySelectorAll(".uv-pulse-ring").forEach((ring) => {
    ring.style.animation = "uvWavePulseInit 2.4s ease-out infinite";
  });

  clearTimeout(resetTimer);
});

// 💫 Start Sterilization
visualBlock?.addEventListener("click", () => {
  if (!plusText || plusText.classList.contains("hidden")) return;

  subtext.textContent = "Sterilizing.";

  // Hide + icon, show %
  plusText.classList.add("hidden");
  progressText.textContent = "0%";
  progressText.classList.remove("hidden");

  // Switch pulse rings to active
  document.querySelectorAll(".uv-pulse-ring").forEach((ring) => {
    ring.style.animation = "uvWavePulseActive 2.4s ease-out infinite";
  });

  let progress = 0;
  const interval = setInterval(() => {
    progress++;
    progressText.textContent = `${progress}%`;

    // Animate ellipsis
    const dots = ".".repeat((progress / 10) % 4);
    subtext.textContent = `Sterilizing${dots}`;

    if (progress >= 100) {
      clearInterval(interval);

      // Finish states
      pulseWrapper.style.opacity = "0";
      pulseWrapper.style.pointerEvents = "none";
      progressText.classList.add("hidden");

      svg.classList.add("check");
      visualBlock.classList.add("glow");

      checkmark.classList.remove("hidden");
      checkmark.style.transform = "scale(0)";
      setTimeout(() => {
        checkmark.style.transform = "scale(1.2)";
        setTimeout(() => {
          checkmark.style.transform = "scale(1)";
        }, 250);
      }, 10);

      subtext.textContent = "Sterilization Successful";

      resetTimer = setTimeout(() => {
        // Full reset
        plusText.classList.remove("hidden");
        progressText.classList.add("hidden");
        checkmark.classList.add("hidden");
        svg.classList.remove("check");
        visualBlock.classList.remove("glow");
        subtext.textContent = "Press to activate sterilization";
        pulseWrapper.style.opacity = "1";
        pulseWrapper.style.pointerEvents = "auto";

        document.querySelectorAll(".uv-pulse-ring").forEach((ring) => {
          ring.style.animation = "uvWavePulseInit 2.4s ease-out infinite";
        });
      }, 5000);
    }
  }, 35);
});

// 🔙 Back to home
document.getElementById("back-to-home-btn")?.addEventListener("click", () => {
  uvScreen?.classList.remove("visible");
  homeScreen?.classList.remove("hidden");
});
