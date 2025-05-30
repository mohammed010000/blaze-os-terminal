// 🔁 Temp Screen Logic
const tempCard = document.getElementById("blz-temp-card");
const tempScreen = document.getElementById("blz-temp-screen");
const appsScreen = document.getElementById("blz-apps-screen");
const backBtn = document.getElementById("blz-temp-back");

tempCard?.addEventListener("click", () => {
  appsScreen?.classList.add("hidden");
  tempScreen?.classList.remove("hidden");
  setTemperature(72); // You can replace this with live data later
});

backBtn?.addEventListener("click", () => {
  tempScreen?.classList.add("hidden");
  appsScreen?.classList.remove("hidden");
});

// 🔥 Set temperature and move marker
function setTemperature(temp) {
  const marker = document.getElementById("blz-temp-marker");
  const value = document.getElementById("blz-temp-value");
  const tip = document.getElementById("blz-temp-tip");

  const clamped = Math.max(0, Math.min(temp, 100));
  marker.style.left = `calc(${clamped}% - 6px)`;
  value.textContent = `${clamped}°C`;

  // Optional: Dynamic tip
  if (clamped < 15) tip.textContent = "Too cold for ideal hydration.";
  else if (clamped <= 25) tip.textContent = "Perfect hydration temperature.";
  else if (clamped <= 45) tip.textContent = "Still acceptable, but warm.";
  else if (clamped <= 65) tip.textContent = "Caution: Drink may be hot.";
  else tip.textContent = "Too hot. Let it cool before drinking.";
}

document.getElementById("blz-temp-back")?.addEventListener("click", () => {
  document.getElementById("blz-temp-screen")?.classList.add("hidden");
  document.getElementById("blz-apps-screen")?.classList.remove("hidden");
});
