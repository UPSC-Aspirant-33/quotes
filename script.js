const quoteBox = document.getElementById("quoteBox");
const meaningBox = document.getElementById("meaningBox");
const audio = document.getElementById("bgMusic");
const dateEl = document.getElementById("date");
const timeEl = document.getElementById("time");

const today = new Date();
const isBirthday = today.getDate() === 13 && today.getMonth() === 4; // May 13
const startDate = new Date("2025-01-01");

const dayIndex = Math.floor(
  (today - startDate) / (1000 * 60 * 60 * 24)
);

/* ---------------- DATE & TIME ---------------- */

function updateDateTime() {
  const now = new Date();

  dateEl.textContent = now.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  timeEl.textContent = now.toLocaleTimeString("en-IN");
}

updateDateTime();
setInterval(updateDateTime, 1000);

/* ---------------- QUOTES + MEANING ---------------- */

fetch("data/quotes.json")
  .then(res => res.json())
  .then(quotes => {
    if (isBirthday) {
      showBirthday();
    } else {
      const quote = quotes[dayIndex % quotes.length];
      quoteBox.textContent = quote.text;
      meaningBox.textContent = quote.meaning;
    }
  });

/* ---------------- MUSIC ---------------- */

fetch("data/music.json")
  .then(res => res.json())
  .then(music => {
    audio.src = isBirthday
      ? music.birthday
      : music.daily[dayIndex % music.daily.length];
  });

/* Auto-play AFTER first interaction */
let started = false;

function startMusicOnce() {
  if (!started) {
    audio.play().catch(() => {});
    started = true;
    document.querySelector(".hint").style.display = "none";
  }
}

document.addEventListener("click", startMusicOnce);
document.addEventListener("touchstart", startMusicOnce);
document.addEventListener("keydown", startMusicOnce);

/* ---------------- BIRTHDAY MODE ---------------- */

function showBirthday() {
  document.body.classList.add("birthday");

  quoteBox.innerHTML = `
    Today belongs only to you 🌷
  `;

  meaningBox.innerHTML = `
    No pressure. No expectations.<br>
    Just warmth, calm, and quiet joy.<br><br>
    May life meet you gently,<br>
    before it ever asks you to be strong.<br><br>
    <b>May today remind you how precious you truly are 🌼</b><br><br>
    <strong>Happy Birthday 🎂</strong>
  `;
}
