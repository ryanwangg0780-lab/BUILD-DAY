const sparkButton = document.querySelector("#sparkButton");
const stage = document.querySelector(".builder-stage");
const timelineItems = document.querySelectorAll(".timeline-item");
const tabButtons = document.querySelectorAll(".tab-button");
const tabPanels = document.querySelectorAll(".tab-panel");
const countdownForm = document.querySelector("#countdownForm");
const eventDateTime = document.querySelector("#eventDateTime");
const countdownLabel = document.querySelector("#countdownLabel");
const saveMessage = document.querySelector("#saveMessage");
const countdownParts = {
  days: document.querySelector("#days"),
  hours: document.querySelector("#hours"),
  minutes: document.querySelector("#minutes"),
  seconds: document.querySelector("#seconds"),
};

let sparkCount = 0;
let eventDate = new Date(
  localStorage.getItem("buildDayDateTime") || "2026-09-01T15:00"
);

sparkButton.addEventListener("click", () => {
  sparkCount += 1;
  sparkButton.classList.toggle("is-active");
  sparkButton.textContent =
    sparkCount % 2 === 0 ? "Add build energy" : "Build energy added";

  const spark = document.createElement("span");
  spark.className = "spark";
  spark.style.left = `${24 + Math.random() * 52}%`;
  spark.style.top = `${22 + Math.random() * 48}%`;
  stage.appendChild(spark);

  window.setTimeout(() => {
    spark.remove();
  }, 900);
});

timelineItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    timelineItems.forEach((card) => card.classList.remove("active"));
    item.classList.add("active");
  });
});

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const panelId = button.getAttribute("aria-controls");

    tabButtons.forEach((tab) => {
      const isActive = tab === button;
      tab.classList.toggle("active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });

    tabPanels.forEach((panel) => {
      const isActive = panel.id === panelId;
      panel.classList.toggle("active", isActive);
      panel.hidden = !isActive;
    });
  });
});

function formatInputValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function formatDisplayDate(date) {
  return date.toLocaleString([], {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function updateCountdown() {
  const now = new Date();
  const distance = eventDate.getTime() - now.getTime();

  countdownLabel.textContent = `Countdown to ${formatDisplayDate(eventDate)}`;

  if (distance <= 0) {
    countdownParts.days.textContent = "0";
    countdownParts.hours.textContent = "0";
    countdownParts.minutes.textContent = "0";
    countdownParts.seconds.textContent = "0";
    saveMessage.textContent = "Build Day is here. Time to code your game.";
    return;
  }

  const totalSeconds = Math.floor(distance / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  countdownParts.days.textContent = days;
  countdownParts.hours.textContent = hours;
  countdownParts.minutes.textContent = minutes;
  countdownParts.seconds.textContent = seconds;
}

eventDateTime.value = formatInputValue(eventDate);
updateCountdown();
window.setInterval(updateCountdown, 1000);

countdownForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!eventDateTime.value) {
    saveMessage.textContent = "Pick a date and time first.";
    return;
  }

  eventDate = new Date(eventDateTime.value);
  localStorage.setItem("buildDayDateTime", eventDateTime.value);
  saveMessage.textContent = `Saved schedule: ${formatDisplayDate(eventDate)}.`;
  updateCountdown();
});

const style = document.createElement("style");
style.textContent = `
  .spark {
    position: absolute;
    z-index: 4;
    width: 18px;
    height: 18px;
    background: #ffd34d;
    border-radius: 6px;
    box-shadow:
      0 0 0 8px rgba(255, 211, 77, 0.24),
      0 0 26px rgba(255, 211, 77, 0.9);
    animation: popSpark 900ms ease forwards;
  }

  @keyframes popSpark {
    0% {
      transform: scale(0.35) rotate(0deg);
      opacity: 0;
    }

    35% {
      opacity: 1;
    }

    100% {
      transform: scale(1.8) rotate(24deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
