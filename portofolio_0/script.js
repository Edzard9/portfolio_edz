tailwind.config = {
  theme: {
    extend: {
      colors: {
        discord: {
          bg: "#313338",
          sidebar: "#2b2d31",
          blurple: "#5865F2",
          green: "#23a559",
          yellow: "#FEE75C",
          red: "#ED4245",
          text: "#dbdee1",
          header: "#f2f3f5",
        },
      },
    },
  },
};

function toggleMenu() {
  const sidebar = document.getElementById("sidebar");

  const classes = [
    "hidden",
    "fixed",
    "inset-0",
    "z-40",
    "bg-discord-sidebar",
    "pt-20",
  ];

  classes.forEach((cls) => sidebar.classList.toggle(cls));
}

function scrollSlider(direction) {
  const container = document.getElementById("slider-container");
  const scrollAmount = container.clientWidth;

  container.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth",
  });
}
