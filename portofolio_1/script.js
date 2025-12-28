document.addEventListener("DOMContentLoaded", () => {
  // 1. Efek Glow Sederhana pada Card Fitur
  const featureCards = document.querySelectorAll(".grid .card");
  featureCards.forEach((card) => {
    card.addEventListener("click", () => {
      card.style.borderColor = "#00bcd4";
      setTimeout(() => {
        card.style.borderColor = "#1e293b";
      }, 800);
    });
  });

  // 2. Logika Modal (Pop-up Galeri)
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("img01");
  const captionText = document.getElementById("caption");
  const closeBtn = document.getElementsByClassName("close")[0];

  // Ambil semua elemen wrapper gambar di galeri
  const imageWrappers = document.querySelectorAll(
    ".gallery-item .image-wrapper"
  );

  imageWrappers.forEach((wrapper) => {
    wrapper.addEventListener("click", function () {
      const imgTag = this.querySelector("img"); // Gambar asli
      const captionTag = this.parentElement.querySelector(".caption"); // Caption di bawahnya

      // Tampilkan modal dengan Flexbox agar gambar di tengah
      modal.style.display = "flex";
      modal.style.justifyContent = "center";
      modal.style.alignItems = "center";
      modal.style.flexDirection = "column"; // Agar caption ada di bawah gambar

      modalImg.src = imgTag.src; // Pindahkan source gambar ke modal

      if (captionTag) {
        captionText.innerHTML = captionTag.innerHTML; // Pindahkan teks caption
      }
    });
  });

  // Fungsi menutup modal (klik tombol X)
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  // Fungsi menutup modal (klik area gelap di luar gambar)
  modal.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  // Fungsi menutup modal (tekan tombol ESC di keyboard)
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal.style.display === "flex") {
      modal.style.display = "none";
    }
  });

  console.log("NetSentinel Gallery System Ready.");
});
