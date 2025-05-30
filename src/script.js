window.onload = () => {
  // Show the voice module screen after boot
  setTimeout(() => {
    const voiceScreen = document.querySelector(".voice-module-screen");
    if (voiceScreen) {
      voiceScreen.style.opacity = "1";
      voiceScreen.style.pointerEvents = "auto";
    }
  }, 2500);

  // Elements
  const orb = document.querySelector(".orb");
  const orbIcon = document.querySelector(".orb-icon");
  const glowBg = document.querySelector(".orb-glow-bg");
  const orbWaves = document.querySelectorAll(".orb-wave");
  const voiceScreen = document.querySelector(".voice-module-screen");
  const homeScreen = document.querySelector(".home-screen");

  if (!orb) {
    console.warn("Orb not found.");
    return;
  }

  // 🔁 Single or Double Click = Show Home + Speak
  orb.addEventListener("click", () => {
    showHomeScreen();
    triggerBlazeSpeech();
  });

  orb.addEventListener("dblclick", () => {
    showHomeScreen();
    triggerBlazeSpeech();
  });

  // ✅ Show Home Screen Function
  function showHomeScreen() {
    speechSynthesis.cancel(); // Stop any pending speech
    voiceScreen?.classList.add("hidden");
    homeScreen?.classList.remove("hidden");
    homeScreen?.classList.add("visible");
    animateHydrationRing();
  }

  // 🔵 Hydration Ring Fill Animation
  function animateHydrationRing() {
    const ring = document.querySelector(".ring .progress");
    if (!ring) return;

    ring.style.transition = "none";
    ring.style.strokeDashoffset = 339; // full empty
    void ring.offsetWidth; // reflow

    requestAnimationFrame(() => {
      ring.style.transition = "stroke-dashoffset 1.4s ease";
      ring.style.strokeDashoffset = 122; // 64% filled
    });
  }

  // 🗣️ Blaze Speech
  function triggerBlazeSpeech() {
    let voices = speechSynthesis.getVoices();

    if (!voices.length) {
      // Delay and retry once voices load
      speechSynthesis.onvoiceschanged = () => {
        voices = speechSynthesis.getVoices();
        runBlazeSpeech(voices);
      };
      return;
    }

    runBlazeSpeech(voices);
  }

  function runBlazeSpeech(voices) {
    const googleVoice =
      voices.find((v) => v.name === "Google US English") ||
      voices.find((v) => v.lang === "en-US");

    if (!googleVoice) {
      alert("Voice still not available. Try again in a few seconds.");
      return;
    }

    const msg = new SpeechSynthesisUtterance(
      "I’m Blaze — your A I hydration companion. Click Access All Features to see what I can do."
    );

    msg.voice = googleVoice;
    msg.pitch = 1.05;
    msg.rate = 0.92;

    msg.onstart = () => {
      orbIcon?.classList.add("speaking");
      glowBg?.classList.add("speaking");
      orbWaves.forEach((wave) => wave.classList.add("speaking"));
    };

    msg.onend = () => {
      orbIcon?.classList.remove("speaking");
      glowBg?.classList.remove("speaking");
      orbWaves.forEach((wave) => wave.classList.remove("speaking"));
      listenForCommand();
    };

    speechSynthesis.cancel();
    speechSynthesis.speak(msg);
  }

  // 🎙️ Voice Command Listener
  function listenForCommand() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log("🎤 Voice recognition started.");
    };

    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase();
      console.log("🗣️ Heard:", command);

      if (command.includes("home")) {
        showHomeScreen();
      } else {
        console.log("⚠️ Unrecognized command.");
      }
    };

    recognition.onerror = (event) => {
      console.error("🎙️ Recognition error:", event.error);
    };

    recognition.onend = () => {
      console.log("🎤 Voice recognition ended.");
    };

    try {
      recognition.start();
    } catch (err) {
      console.error("❌ Mic error:", err);
    }
  }
};
