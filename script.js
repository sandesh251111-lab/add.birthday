// ADDRINA'S BIRTHDAY — Nepal time (UTC+05:45)
const birthdayTime = new Date("2026-11-13T00:00:00+05:45").getTime();

const countdownScreen = document.getElementById("countdownScreen");
const birthdayScreen = document.getElementById("birthdayScreen");
const birthdayMusic = document.getElementById("birthdayMusic");
let birthdayHasStarted = false;

function startBirthday() {
  if (birthdayHasStarted) return;
  birthdayHasStarted = true;

  countdownScreen.classList.add("hidden");
  birthdayScreen.classList.remove("hidden");

  // Attempt automatic guitar playback at midnight.
  // Browsers may block audible autoplay until the visitor interacts with the page.
  birthdayMusic.play().catch(() => {
    console.info("Autoplay was blocked by the browser's media policy.");
  });

  launchConfetti(130);
}

function updateCountdown() {
  const remaining = birthdayTime - Date.now();

  if (remaining <= 0) {
    startBirthday();
    clearInterval(countdownInterval);
    return;
  }

  document.getElementById("days").textContent =
    String(Math.floor(remaining / 86400000)).padStart(2, "0");
  document.getElementById("hours").textContent =
    String(Math.floor((remaining % 86400000) / 3600000)).padStart(2, "0");
  document.getElementById("minutes").textContent =
    String(Math.floor((remaining % 3600000) / 60000)).padStart(2, "0");
  document.getElementById("seconds").textContent =
    String(Math.floor((remaining % 60000) / 1000)).padStart(2, "0");
}

function launchConfetti(amount) {
  const colors = ["#ffb8d0", "#f7d99e", "#ffffff", "#c9b5ff", "#f18ab6"];
  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("i");
    piece.className = "confetti";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = (3 + Math.random() * 4) + "s";
    piece.style.animationDelay = (Math.random() * 0.8) + "s";
    document.getElementById("confetti-layer").appendChild(piece);
    setTimeout(() => piece.remove(), 8000);
  }
}

document.getElementById("celebrateButton").addEventListener("click", () => {
  launchConfetti(160);
});

// Check immediately in case the site is opened after midnight.
if (Date.now() >= birthdayTime) {
  startBirthday();
} else {
  updateCountdown();
  const countdownInterval = setInterval(updateCountdown, 1000);
}
