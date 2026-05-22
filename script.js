const sparkButton = document.querySelector("#sparkButton");
const stage = document.querySelector(".builder-stage");
const timelineItems = document.querySelectorAll(".timeline-item");

let sparkCount = 0;

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
