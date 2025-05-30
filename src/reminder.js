window.addEventListener("DOMContentLoaded", () => {
  const reminderTarget = new Date();
  reminderTarget.setHours(reminderTarget.getHours() + 1);
  reminderTarget.setMinutes(reminderTarget.getMinutes() + 26);
  reminderTarget.setSeconds(0);

  // 🔁 Open AI Drinking Reminder screen from its feature card
  document.querySelectorAll(".blz-app-card").forEach((card) => {
    card.addEventListener("click", () => {
      const isCenter =
        card.style.opacity === "1" &&
        card.textContent.includes("Drinking Reminder");

      if (isCenter) {
        document.getElementById("blz-apps-screen")?.classList.add("hidden");
        document
          .getElementById("ai-reminder-screen")
          ?.classList.remove("hidden");

        // Wait for layout, then scroll and inject pulse
        setTimeout(() => {
          const container = document.querySelector(
            ".scroll-horizontal-container"
          );
          const items = document.querySelectorAll(".scroll-item");
          const middleIndex = Math.floor(items.length / 2);
          const item = items[middleIndex];

          const containerCenter = container.offsetWidth / 2;
          const itemCenter = item.offsetLeft + item.offsetWidth / 2;
          const scrollTo = itemCenter - containerCenter;

          container.scrollTo({ left: scrollTo, behavior: "smooth" });
          updateActiveScrollItem();

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              const orbWrapper = document.querySelector(".ai-orb-wrapper");
              if (orbWrapper && !document.querySelector(".ai-orb-ring.ring1")) {
                const ring1 = document.createElement("div");
                ring1.className = "ai-orb-ring ring1";
                const ring2 = document.createElement("div");
                ring2.className = "ai-orb-ring ring2";
                orbWrapper.appendChild(ring1);
                orbWrapper.appendChild(ring2);
              }
            });
          });
        }, 100);
      }
    });
  });

  // 🔙 Back
  document.getElementById("ai-back-btn")?.addEventListener("click", () => {
    document.getElementById("ai-reminder-screen")?.classList.add("hidden");
    document.getElementById("blz-apps-screen")?.classList.remove("hidden");
  });

  function moveOverlayToActiveItem() {
    const overlay = document.querySelector(".scroll-highlight-overlay");
    const activeItem = document.querySelector(
      ".scroll-item.active-scroll-item"
    );
    const track = document.querySelector(".scroll-track");
    if (!overlay || !activeItem || !track) return;

    const trackRect = track.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();
    const leftOffset = itemRect.left - trackRect.left;

    overlay.style.transition = "transform 0.3s ease";
    overlay.style.transform = `translateX(${leftOffset}px)`;
  }

  function updateActiveScrollItem() {
    const container = document.querySelector(".scroll-horizontal-container");
    const items = document.querySelectorAll(".scroll-item");

    const containerCenter = container.offsetWidth / 2;
    let closestItem = null;
    let minDistance = Infinity;

    items.forEach((item) => {
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const distance = Math.abs(
        itemCenter - container.scrollLeft - containerCenter
      );
      item.classList.remove("active-scroll-item");

      if (distance < minDistance) {
        minDistance = distance;
        closestItem = item;
      }
    });

    if (closestItem) {
      closestItem.classList.add("active-scroll-item");
      moveOverlayToActiveItem();
    }
  }

  const scrollContainer = document.querySelector(
    ".scroll-horizontal-container"
  );
  if (scrollContainer) {
    scrollContainer.addEventListener("scroll", () => {
      clearTimeout(scrollContainer._scrollTimer);
      scrollContainer._scrollTimer = setTimeout(updateActiveScrollItem, 80);
    });
  }

  // ⏱ Countdown logic
  setInterval(() => {
    const countdownText = document.querySelector(".countdown-text strong");
    if (!countdownText) return;

    const now = new Date();
    const remaining = reminderTarget - now;

    if (remaining <= 0) {
      countdownText.innerText = "Now";
      return;
    }

    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const hours = Math.floor(
      (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    countdownText.innerText = `${hours}h ${minutes}m`;
  }, 1000);

  // ♻️ Auto-rotate Reminder Card Stack
  const reminderCards = document.querySelectorAll(".blz-insight-card-reminder");
  let activeIndex = 1;

  function rotateReminderCards() {
    reminderCards.forEach((card, index) => {
      card.classList.remove("above", "active", "below");

      if (index === activeIndex) {
        card.classList.add("active");
      } else if (index === (activeIndex + 1) % reminderCards.length) {
        card.classList.add("below");
      } else if (
        index ===
        (activeIndex - 1 + reminderCards.length) % reminderCards.length
      ) {
        card.classList.add("above");
      }
    });

    activeIndex = (activeIndex + 1) % reminderCards.length;
  }

  setInterval(rotateReminderCards, 2000);
  rotateReminderCards(); // initialize once
});
