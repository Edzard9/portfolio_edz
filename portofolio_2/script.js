class DatabaseManager {
  constructor() {
    this.initializeDatabase();
  }

  initializeDatabase() {
    if (!localStorage.getItem("toko_komputer")) {
      const initialData = {
        barang: [
          {
            id: 1,
            nama_barang: "Laptop Asus ROG Strix",
            id_kategori: 1,
            harga: 15000000,
            stok: 5,
            deskripsi:
              "Laptop gaming dengan processor Intel Core i7 dan RTX 3060",
          },
          {
            id: 2,
            nama_barang: "Keyboard Mechanical RGB",
            id_kategori: 4,
            harga: 850000,
            stok: 15,
            deskripsi: "Keyboard mechanical dengan backlight RGB",
          },
          {
            id: 3,
            nama_barang: "Mouse Gaming Wireless",
            id_kategori: 4,
            harga: 450000,
            stok: 20,
            deskripsi: "Mouse wireless dengan 6 tombol programmable",
          },
          {
            id: 4,
            nama_barang: "Monitor LG 24 Inch",
            id_kategori: 3,
            harga: 2200000,
            stok: 3,
            deskripsi: "Monitor Full HD 75Hz untuk gaming dan kerja",
          },
          {
            id: 5,
            nama_barang: "Printer Epson L3110",
            id_kategori: 5,
            harga: 2800000,
            stok: 7,
            deskripsi: "Printer all-in-one dengan sistem tangki tinta",
          },
          {
            id: 6,
            nama_barang: "PC Gaming Intel i5",
            id_kategori: 2,
            harga: 9500000,
            stok: 2,
            deskripsi: "Komputer gaming siap pakai dengan GTX 1660",
          },
          {
            id: 7,
            nama_barang: "Webcam Logitech C920",
            id_kategori: 4,
            harga: 1200000,
            stok: 8,
            deskripsi: "Webcam HD untuk streaming dan meeting online",
          },
          {
            id: 8,
            nama_barang: "Headset Gaming Sony",
            id_kategori: 4,
            harga: 750000,
            stok: 1,
            deskripsi: "Headset dengan mic noise cancellation",
          },
          {
            id: 9,
            nama_barang: "SSD Samsung 500GB",
            id_kategori: 4,
            harga: 650000,
            stok: 4,
            deskripsi: "SSD NVMe untuk upgrade laptop/PC",
          },
        ],
        kategori: [
          { id: 1, nama_kategori: "Laptop" },
          { id: 2, nama_kategori: "Komputer" },
          { id: 3, nama_kategori: "Monitor" },
          { id: 4, nama_kategori: "Accessories" },
          { id: 5, nama_kategori: "Printer" },
        ],
        transaksi: [
          {
            id: 1,
            tanggal_transaksi: new Date(Date.now() - 86400000).toISOString(),
            nama_pembeli: "Budi Santoso",
            metode_bayar: "Cash",
            admin: "Tony",
            total: 16500000,
          },
          {
            id: 2,
            tanggal_transaksi: new Date(Date.now() - 172800000).toISOString(),
            nama_pembeli: "Siti Aminah",
            metode_bayar: "Transfer Bank",
            admin: "Jesicca",
            total: 3200000,
          },
          {
            id: 3,
            tanggal_transaksi: new Date().toISOString(),
            nama_pembeli: "Andi Wijaya",
            metode_bayar: "QRIS",
            admin: "Tony",
            total: 850000,
          },
        ],
        detail_transaksi: [
          {
            id_transaksi: 1,
            id_barang: 1,
            qty: 1,
            harga: 15000000,
            subtotal: 15000000,
          },
          {
            id_transaksi: 1,
            id_barang: 2,
            qty: 1,
            harga: 850000,
            subtotal: 850000,
          },
          {
            id_transaksi: 1,
            id_barang: 3,
            qty: 1,
            harga: 450000,
            subtotal: 450000,
          },
          {
            id_transaksi: 1,
            id_barang: 9,
            qty: 1,
            harga: 650000,
            subtotal: 650000,
          },

          {
            id_transaksi: 2,
            id_barang: 4,
            qty: 1,
            harga: 2200000,
            subtotal: 2200000,
          },
          {
            id_transaksi: 2,
            id_barang: 7,
            qty: 1,
            harga: 1000000,
            subtotal: 1000000,
          },

          {
            id_transaksi: 3,
            id_barang: 2,
            qty: 1,
            harga: 850000,
            subtotal: 850000,
          },
        ],
        currentBarangId: 10,
        currentTransaksiId: 4,
      };
      localStorage.setItem("toko_komputer", JSON.stringify(initialData));
    }
  }

  getDatabase() {
    return JSON.parse(localStorage.getItem("toko_komputer"));
  }

  saveDatabase(data) {
    localStorage.setItem("toko_komputer", JSON.stringify(data));
  }

  getAllBarang() {
    const db = this.getDatabase();
    return db.barang;
  }

  getBarangById(id) {
    const db = this.getDatabase();
    return db.barang.find((item) => item.id === id);
  }

  addBarang(barang) {
    const db = this.getDatabase();
    barang.id = db.currentBarangId++;
    barang.created_at = new Date().toISOString();
    db.barang.push(barang);
    this.saveDatabase(db);
    return barang.id;
  }

  updateBarang(id, updates) {
    const db = this.getDatabase();
    const index = db.barang.findIndex((item) => item.id === id);
    if (index !== -1) {
      db.barang[index] = { ...db.barang[index], ...updates };
      this.saveDatabase(db);
      return true;
    }
    return false;
  }

  deleteBarang(id) {
    const db = this.getDatabase();
    const index = db.barang.findIndex((item) => item.id === id);
    if (index !== -1) {
      db.barang.splice(index, 1);
      this.saveDatabase(db);
      return true;
    }
    return false;
  }

  getAllKategori() {
    const db = this.getDatabase();
    return db.kategori;
  }

  getAllTransaksi() {
    const db = this.getDatabase();
    return db.transaksi;
  }

  addTransaksi(transaksi) {
    const db = this.getDatabase();
    transaksi.id = db.currentTransaksiId++;
    transaksi.tanggal_transaksi = new Date().toISOString();
    db.transaksi.push(transaksi);
    this.saveDatabase(db);
    return transaksi.id;
  }

  addDetailTransaksi(detail) {
    const db = this.getDatabase();
    db.detail_transaksi.push(detail);
    this.saveDatabase(db);
  }

  getTransaksiById(id) {
    const db = this.getDatabase();
    return db.transaksi.find((item) => item.id === id);
  }

  getDetailTransaksi(transaksiId) {
    const db = this.getDatabase();
    return db.detail_transaksi.filter(
      (item) => item.id_transaksi === transaksiId
    );
  }

  getTotalBarang() {
    const db = this.getDatabase();
    return db.barang.length;
  }

  getPenjualanHariIni() {
    const db = this.getDatabase();
    const today = new Date().toISOString().split("T")[0];
    const transaksiHariIni = db.transaksi.filter(
      (t) => t.tanggal_transaksi.split("T")[0] === today
    );
    return transaksiHariIni.reduce((total, t) => total + t.total, 0);
  }

  getStokKritis() {
    const db = this.getDatabase();
    return db.barang.filter((item) => item.stok < 5);
  }
}

class HaytechStoreApp {
  constructor() {
    this.db = new DatabaseManager();
    this.keranjang = [];
    this.currentAdmin = "Tony";
    this.init();
  }

  init() {
    this.bindEvents();
    this.loadDashboard();
    this.loadKategori();
    this.loadBarang();
    this.loadBarangForTransaksi();
    this.loadKategoriFilter();
    this.loadBarangForQR();
    this.setDefaultDates();
    this.loadLaporan();
  }

  bindEvents() {
    document.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.addEventListener("click", (e) =>
        this.switchPage(e.target.dataset.page)
      );
    });

    document
      .getElementById("refresh-barang-btn")
      ?.addEventListener("click", () => this.loadDashboard());

    document
      .getElementById("barang-form")
      ?.addEventListener("submit", (e) => this.simpanBarang(e));
    document
      .getElementById("reset-form-btn")
      ?.addEventListener("click", () => this.resetFormBarang());
    document
      .getElementById("scan-qr-btn")
      ?.addEventListener("click", () => this.scanQRCode());

    document
      .getElementById("filter-kategori")
      ?.addEventListener("change", () => this.filterBarangByKategori());
    document
      .getElementById("scan-transaksi-btn")
      ?.addEventListener("click", () => this.scanQRTransaksi());
    document
      .getElementById("refresh-transaksi-btn")
      ?.addEventListener("click", () => this.loadBarangForTransaksi());
    document
      .getElementById("tambah-keranjang-btn")
      ?.addEventListener("click", () => this.tambahKeKeranjang());
    document
      .getElementById("kosongkan-keranjang-btn")
      ?.addEventListener("click", () => this.kosongkanKeranjang());
    document
      .getElementById("proses-bayar-btn")
      ?.addEventListener("click", () => this.prosesPembayaran());

    document
      .getElementById("filter-laporan-btn")
      ?.addEventListener("click", () => this.filterLaporan());
    document
      .getElementById("refresh-laporan-btn")
      ?.addEventListener("click", () => this.loadLaporan());

    document
      .getElementById("generate-qr-btn")
      ?.addEventListener("click", () => this.generateQRFromBarang());
    document
      .getElementById("save-qr-btn")
      ?.addEventListener("click", () => this.saveQRCode());

    document
      .getElementById("payment-method")
      ?.addEventListener("change", (e) =>
        this.onPaymentMethodChange(e.target.value)
      );
    document
      .getElementById("dibayar")
      ?.addEventListener("input", () => this.hitungKembalian());
    document
      .getElementById("close-payment-modal")
      ?.addEventListener("click", () => this.hideModal("payment-modal"));
    document
      .getElementById("cancel-payment-btn")
      ?.addEventListener("click", () => this.hideModal("payment-modal"));
    document
      .getElementById("confirm-payment-btn")
      ?.addEventListener("click", () => this.confirmPayment());

    document
      .getElementById("close-qr-scanner")
      ?.addEventListener("click", () => this.stopQRScanner());
    document
      .getElementById("stop-scanner-btn")
      ?.addEventListener("click", () => this.stopQRScanner());
  }

  switchPage(pageName) {
    document.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.page === pageName);
    });

    document.querySelectorAll(".page").forEach((page) => {
      page.classList.toggle("active", page.id === `${pageName}-page`);
    });

    if (pageName === "dashboard") {
      this.loadDashboard();
    } else if (pageName === "input") {
      this.loadKategori();
      this.loadBarang();
    } else if (pageName === "transaksi") {
      this.loadBarangForTransaksi();
    } else if (pageName === "laporan") {
      this.loadLaporan();
    } else if (pageName === "qr") {
      this.loadBarangForQR();
    }
  }

  loadDashboard() {
    const totalBarang = this.db.getTotalBarang();
    const penjualanHariIni = this.db.getPenjualanHariIni();
    const stokKritis = this.db.getStokKritis();

    document.getElementById("total-barang").textContent = totalBarang;
    document.getElementById("penjualan-hari-ini").textContent =
      this.formatCurrency(penjualanHariIni);
    document.getElementById("stok-kritis").textContent = stokKritis.length;

    const warningContainer = document.getElementById("stok-kritis-warning");
    const tableBody = document.querySelector("#stok-kritis-table tbody");

    if (stokKritis.length > 0) {
      warningContainer.classList.remove("hidden");
      tableBody.innerHTML = "";

      stokKritis.forEach((barang) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${barang.nama_barang}</td>
                    <td>${this.getKategoriName(barang.id_kategori)}</td>
                    <td class="${
                      barang.stok < 3 ? "text-danger" : "text-warning"
                    }">${barang.stok}</td>
                    <td>${this.formatCurrency(barang.harga)}</td>
                `;
        tableBody.appendChild(row);
      });
    } else {
      warningContainer.classList.add("hidden");
    }
  }

  loadKategori() {
    const kategoriSelect = document.getElementById("kategori");
    const kategori = this.db.getAllKategori();

    kategoriSelect.innerHTML = '<option value="">Pilih Kategori</option>';
    kategori.forEach((k) => {
      const option = document.createElement("option");
      option.value = k.id;
      option.textContent = k.nama_kategori;
      kategoriSelect.appendChild(option);
    });
  }

  loadBarang() {
    const tableBody = document.querySelector("#barang-table tbody");
    const barang = this.db.getAllBarang();

    tableBody.innerHTML = "";

    barang.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.nama_barang}</td>
                <td>${this.getKategoriName(item.id_kategori)}</td>
                <td>${this.formatCurrency(item.harga)}</td>
                <td>${item.stok}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="app.hapusBarang(${
                      item.id
                    })">
                        <i class="fas fa-trash"></i> Hapus
                    </button>
                </td>
            `;
      tableBody.appendChild(row);
    });
  }

  simpanBarang(e) {
    e.preventDefault();

    const namaBarang = document.getElementById("nama-barang").value.trim();
    const kategoriId = parseInt(document.getElementById("kategori").value);
    const harga = parseInt(document.getElementById("harga").value);
    const stok = parseInt(document.getElementById("stok").value);
    const deskripsi = document.getElementById("deskripsi").value.trim();

    if (!namaBarang || !kategoriId || !harga) {
      this.showToast("Harap lengkapi semua field yang diperlukan!", "error");
      return;
    }

    const barang = {
      nama_barang: namaBarang,
      id_kategori: kategoriId,
      harga: harga,
      stok: stok,
      deskripsi: deskripsi,
    };

    const id = this.db.addBarang(barang);
    this.showToast(
      `Barang "${namaBarang}" berhasil disimpan dengan ID: ${id}`,
      "success"
    );
    this.resetFormBarang();
    this.loadBarang();
    this.loadDashboard();
    this.loadBarangForTransaksi();
    this.loadBarangForQR();
  }

  resetFormBarang() {
    document.getElementById("barang-form").reset();
    document.getElementById("stok").value = 0;
  }

  hapusBarang(id) {
    if (confirm("Apakah Anda yakin ingin menghapus barang ini?")) {
      if (this.db.deleteBarang(id)) {
        this.showToast("Barang berhasil dihapus!", "success");
        this.loadBarang();
        this.loadDashboard();
        this.loadBarangForTransaksi();
        this.loadBarangForQR();
      } else {
        this.showToast("Gagal menghapus barang!", "error");
      }
    }
  }

  loadKategoriFilter() {
    const filterSelect = document.getElementById("filter-kategori");
    const kategori = this.db.getAllKategori();

    filterSelect.innerHTML = '<option value="0">Semua Kategori</option>';
    kategori.forEach((k) => {
      const option = document.createElement("option");
      option.value = k.id;
      option.textContent = k.nama_kategori;
      filterSelect.appendChild(option);
    });
  }

  loadBarangForTransaksi() {
    const barangSelect = document.getElementById("barang-select");
    const barang = this.db.getAllBarang().filter((item) => item.stok > 0);

    barangSelect.innerHTML = '<option value="">Pilih Barang</option>';
    barang.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.id;
      option.textContent = `${item.nama_barang} - ${this.formatCurrency(
        item.harga
      )} (Stok: ${item.stok})`;
      option.dataset.harga = item.harga;
      option.dataset.stok = item.stok;
      barangSelect.appendChild(option);
    });
  }

  filterBarangByKategori() {
    const kategoriId = parseInt(
      document.getElementById("filter-kategori").value
    );
    const barangSelect = document.getElementById("barang-select");
    const allBarang = this.db.getAllBarang().filter((item) => item.stok > 0);

    const filteredBarang =
      kategoriId === 0
        ? allBarang
        : allBarang.filter((item) => item.id_kategori === kategoriId);

    barangSelect.innerHTML = '<option value="">Pilih Barang</option>';
    filteredBarang.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.id;
      option.textContent = `${item.nama_barang} - ${this.formatCurrency(
        item.harga
      )} (Stok: ${item.stok})`;
      option.dataset.harga = item.harga;
      option.dataset.stok = item.stok;
      barangSelect.appendChild(option);
    });
  }

  tambahKeKeranjang() {
    const barangSelect = document.getElementById("barang-select");
    const qtyInput = document.getElementById("qty");

    if (!barangSelect.value) {
      this.showToast("Pilih barang terlebih dahulu!", "warning");
      return;
    }

    const barangId = parseInt(barangSelect.value);
    const qty = parseInt(qtyInput.value);
    const selectedOption = barangSelect.options[barangSelect.selectedIndex];
    const harga = parseInt(selectedOption.dataset.harga);
    const stok = parseInt(selectedOption.dataset.stok);
    const namaBarang = selectedOption.textContent.split(" - ")[0];

    if (qty > stok) {
      this.showToast(`Stok tidak mencukupi! Stok tersedia: ${stok}`, "error");
      return;
    }

    const existingIndex = this.keranjang.findIndex(
      (item) => item.id_barang === barangId
    );
    if (existingIndex !== -1) {
      const newQty = this.keranjang[existingIndex].qty + qty;
      if (newQty > stok) {
        this.showToast(`Stok tidak mencukupi! Stok tersedia: ${stok}`, "error");
        return;
      }
      this.keranjang[existingIndex].qty = newQty;
    } else {
      this.keranjang.push({
        id_barang: barangId,
        nama: namaBarang,
        harga: harga,
        qty: qty,
      });
    }

    this.updateTampilanKeranjang();
    qtyInput.value = 1;
    this.showToast(`${namaBarang} ditambahkan ke keranjang`, "success");
  }

  updateTampilanKeranjang() {
    const tableBody = document.querySelector("#keranjang-table tbody");
    let total = 0;

    tableBody.innerHTML = "";

    this.keranjang.forEach((item, index) => {
      const subtotal = item.harga * item.qty;
      total += subtotal;

      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${item.nama}</td>
                <td>${this.formatCurrency(item.harga)}</td>
                <td>${item.qty}</td>
                <td>${this.formatCurrency(subtotal)}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="app.hapusDariKeranjang(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
      tableBody.appendChild(row);
    });

    document.getElementById(
      "total-keranjang"
    ).textContent = `Total: ${this.formatCurrency(total)}`;
  }

  hapusDariKeranjang(index) {
    this.keranjang.splice(index, 1);
    this.updateTampilanKeranjang();
  }

  kosongkanKeranjang() {
    if (this.keranjang.length === 0) {
      this.showToast("Keranjang sudah kosong!", "warning");
      return;
    }

    if (confirm("Apakah Anda yakin ingin mengosongkan keranjang?")) {
      this.keranjang = [];
      this.updateTampilanKeranjang();
      this.showToast("Keranjang berhasil dikosongkan", "success");
    }
  }

  prosesPembayaran() {
    if (this.keranjang.length === 0) {
      this.showToast("Keranjang belanja kosong!", "warning");
      return;
    }

    const namaPembeli = document.getElementById("nama-pembeli").value.trim();
    if (!namaPembeli) {
      this.showToast("Nama pembeli harus diisi!", "warning");
      document.getElementById("nama-pembeli").focus();
      return;
    }

    const total = this.keranjang.reduce(
      (sum, item) => sum + item.harga * item.qty,
      0
    );

    document.getElementById("modal-total").textContent =
      this.formatCurrency(total);
    this.showModal("payment-modal");
    document.getElementById("dibayar").value = total;
    this.hitungKembalian();
  }

  onPaymentMethodChange(method) {
    const cashSection = document.getElementById("cash-payment-section");
    const nonCashSection = document.getElementById("non-cash-payment-info");
    const infoContent = document.getElementById("payment-info-content");

    if (method === "Cash") {
      cashSection.classList.remove("hidden");
      nonCashSection.classList.add("hidden");
    } else {
      cashSection.classList.add("hidden");
      nonCashSection.classList.remove("hidden");

      if (method === "Transfer Bank") {
        infoContent.innerHTML = `
                    <p><strong>Transfer ke:</strong></p>
                    <p>BCA 123-456-7890</p>
                    <p>a.n Haytech Store</p>
                    <p>Upload bukti transfer setelah pembayaran.</p>
                `;
      } else if (method === "QRIS") {
        infoContent.innerHTML = `
                    <p>Scan QRIS yang tersedia di kasir.</p>
                    <p>Bukti pembayaran kirim melalui WhatsApp 081234567890.</p>
                `;
      }
    }
  }

  hitungKembalian() {
    const total = this.keranjang.reduce(
      (sum, item) => sum + item.harga * item.qty,
      0
    );
    const dibayar = parseInt(document.getElementById("dibayar").value) || 0;
    const kembalianEl = document.getElementById("kembalian-amount");
    const kurangInfo = document.getElementById("kurang-info");

    if (dibayar < total) {
      const kurang = total - dibayar;
      kembalianEl.textContent = "Rp 0";
      kembalianEl.style.color = "#ef4444";
      kurangInfo.textContent = `⚠️ Kurang: ${this.formatCurrency(kurang)}`;
      kurangInfo.classList.remove("hidden");
    } else {
      const kembalian = dibayar - total;
      kembalianEl.textContent = this.formatCurrency(kembalian);
      kembalianEl.style.color = "#28a745";
      kurangInfo.classList.add("hidden");
    }
  }

  confirmPayment() {
    const method = document.getElementById("payment-method").value;
    const admin = document.querySelector('input[name="admin"]:checked').value;
    const namaPembeli = document.getElementById("nama-pembeli").value.trim();
    const total = this.keranjang.reduce(
      (sum, item) => sum + item.harga * item.qty,
      0
    );

    if (method === "Cash") {
      const dibayar = parseInt(document.getElementById("dibayar").value) || 0;
      if (dibayar < total) {
        this.showToast("Jumlah yang dibayar kurang!", "error");
        return;
      }
    }

    try {
      const transaksi = {
        nama_pembeli: namaPembeli,
        total: total,
        metode_bayar: method,
        admin: admin,
      };

      const transaksiId = this.db.addTransaksi(transaksi);

      this.keranjang.forEach((item) => {
        const subtotal = item.harga * item.qty;

        this.db.addDetailTransaksi({
          id_transaksi: transaksiId,
          id_barang: item.id_barang,
          qty: item.qty,
          harga: item.harga,
          subtotal: subtotal,
        });

        const barang = this.db.getBarangById(item.id_barang);
        this.db.updateBarang(item.id_barang, {
          stok: barang.stok - item.qty,
        });
      });

      let successMsg = `Transaksi berhasil!\nID Transaksi: ${transaksiId}\nTotal: ${this.formatCurrency(
        total
      )}`;

      if (method === "Cash") {
        const dibayar = parseInt(document.getElementById("dibayar").value) || 0;
        const kembalian = dibayar - total;
        successMsg += `\nDibayar: ${this.formatCurrency(
          dibayar
        )}\nKembalian: ${this.formatCurrency(kembalian)}`;
      } else {
        successMsg += `\nMetode: ${method}`;
      }

      this.showToast(successMsg, "success");

      this.keranjang = [];
      this.updateTampilanKeranjang();
      document.getElementById("nama-pembeli").value = "";
      this.hideModal("payment-modal");

      this.loadDashboard();
      this.loadBarangForTransaksi();
      this.loadLaporan();
    } catch (error) {
      this.showToast(`Terjadi kesalahan: ${error.message}`, "error");
    }
  }

  setDefaultDates() {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    document.getElementById("date-from").value = this.formatDate(sevenDaysAgo);
    document.getElementById("date-to").value = this.formatDate(today);
  }

  loadLaporan() {
    const dateFrom = document.getElementById("date-from").value;
    const dateTo = document.getElementById("date-to").value;

    const tableBody = document.querySelector("#laporan-table tbody");
    const transaksi = this.db.getAllTransaksi();

    tableBody.innerHTML = "";

    transaksi.forEach((t) => {
      const transaksiDate = new Date(t.tanggal_transaksi)
        .toISOString()
        .split("T")[0];

      if (transaksiDate >= dateFrom && transaksiDate <= dateTo) {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${t.id}</td>
                    <td>${new Date(t.tanggal_transaksi).toLocaleString()}</td>
                    <td>${t.nama_pembeli}</td>
                    <td>${t.metode_bayar || "Cash"}</td>
                    <td>${t.admin || "-"}</td>
                    <td>${this.formatCurrency(t.total)}</td>
                    <td>
                        <button class="btn btn-primary btn-sm" onclick="app.lihatDetailTransaksi(${
                          t.id
                        })">
                            <i class="fas fa-eye"></i> Detail
                        </button>
                    </td>
                `;
        tableBody.appendChild(row);
      }
    });
  }

  filterLaporan() {
    this.loadLaporan();
  }

  lihatDetailTransaksi(id) {
    const transaksi = this.db.getTransaksiById(id);
    const details = this.db.getDetailTransaksi(id);

    let detailHtml = `
            <h4>Detail Transaksi #${id}</h4>
            <p><strong>Tanggal:</strong> ${new Date(
              transaksi.tanggal_transaksi
            ).toLocaleString()}</p>
            <p><strong>Pembeli:</strong> ${transaksi.nama_pembeli}</p>
            <p><strong>Metode Bayar:</strong> ${
              transaksi.metode_bayar || "Cash"
            }</p>
            <p><strong>Admin:</strong> ${transaksi.admin || "-"}</p>
            <p><strong>Total:</strong> ${this.formatCurrency(
              transaksi.total
            )}</p>
            
            <h5>Barang:</h5>
            <table class="detail-table">
                <thead>
                    <tr>
                        <th>Barang</th>
                        <th>Qty</th>
                        <th>Harga</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
        `;

    details.forEach((detail) => {
      const barang = this.db.getBarangById(detail.id_barang);
      detailHtml += `
                <tr>
                    <td>${barang.nama_barang}</td>
                    <td>${detail.qty}</td>
                    <td>${this.formatCurrency(detail.harga)}</td>
                    <td>${this.formatCurrency(detail.subtotal)}</td>
                </tr>
            `;
    });

    detailHtml += `
                </tbody>
            </table>
        `;

    document.getElementById("detail-content").innerHTML = detailHtml;
    this.showModal("detail-modal");
  }

  loadBarangForQR() {
    const qrSelect = document.getElementById("qr-barang-select");
    const barang = this.db.getAllBarang();

    qrSelect.innerHTML = '<option value="">Pilih Barang</option>';
    barang.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.id;
      option.textContent = `${item.nama_barang} - ${this.getKategoriName(
        item.id_kategori
      )} - ${this.formatCurrency(item.harga)}`;
      qrSelect.appendChild(option);
    });
  }

  generateQRFromBarang() {
    const qrSelect = document.getElementById("qr-barang-select");

    if (!qrSelect.value) {
      this.showToast("Pilih barang terlebih dahulu!", "warning");
      return;
    }

    const barangId = parseInt(qrSelect.value);
    const barang = this.db.getBarangById(barangId);
    const kategori = this.getKategoriName(barang.id_kategori);

    const qrData = `BARANG|${barang.id}|${barang.nama_barang}|${barang.harga}|${barang.id_kategori}`;
    this.generateAndDisplayQR(qrData, barang.nama_barang);
  }

  generateAndDisplayQR(data, label = "") {
    const qrPreview = document.getElementById("qr-preview");

    QRCode.toCanvas(
      data,
      {
        width: 256,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      },
      (err, canvas) => {
        if (err) {
          this.showToast("Gagal generate QR code!", "error");
          return;
        }

        qrPreview.innerHTML = "";
        qrPreview.appendChild(canvas);

        if (label) {
          const labelEl = document.createElement("p");
          labelEl.textContent = label;
          labelEl.style.marginTop = "10px";
          labelEl.style.fontWeight = "500";
          qrPreview.appendChild(labelEl);
        }

        this.currentQRData = data;
        this.currentQRCanvas = canvas;
      }
    );
  }

  saveQRCode() {
    if (!this.currentQRCanvas) {
      this.showToast("Generate QR code terlebih dahulu!", "warning");
      return;
    }

    const link = document.createElement("a");
    link.download = `qr_code_${new Date().getTime()}.png`;
    link.href = this.currentQRCanvas.toDataURL("image/png");
    link.click();

    this.showToast("QR code berhasil disimpan!", "success");
  }

  async scanQRCode() {
    this.showModal("qr-scanner-modal");
    await this.startQRScanner("input");
  }

  async scanQRTransaksi() {
    this.showModal("qr-scanner-modal");
    await this.startQRScanner("transaksi");
  }

  async startQRScanner(type) {
    const video = document.getElementById("qr-video");
    const scannerResult = document.getElementById("scanner-result");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      video.srcObject = stream;
      video.play();

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      const scanFrame = () => {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          canvas.height = video.videoHeight;
          canvas.width = video.videoWidth;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);

          const imageData = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
          const code = jsQR(imageData.data, canvas.width, canvas.height);

          if (code) {
            scannerResult.innerHTML = `<p>Data terdeteksi: ${code.data}</p>`;

            if (type === "input") {
              this.processQRData(code.data);
            } else {
              this.processQRTransaksi(code.data);
            }

            this.stopQRScanner();
          }
        }

        if (!this.isScannerStopped) {
          requestAnimationFrame(scanFrame);
        }
      };

      this.isScannerStopped = false;
      scanFrame();
    } catch (err) {
      scannerResult.innerHTML = `<p class="error">Tidak dapat mengakses kamera: ${err.message}</p>`;
    }
  }

  stopQRScanner() {
    this.isScannerStopped = true;
    const video = document.getElementById("qr-video");
    if (video.srcObject) {
      video.srcObject.getTracks().forEach((track) => track.stop());
    }
    this.hideModal("qr-scanner-modal");
  }

  processQRData(qrData) {
    try {
      if (qrData.startsWith("BARANG|")) {
        const parts = qrData.split("|");
        if (parts.length >= 5) {
          document.getElementById("nama-barang").value = parts[2];
          document.getElementById("harga").value = parts[3];

          const kategoriId = parseInt(parts[4]);
          const kategoriSelect = document.getElementById("kategori");
          for (let i = 0; i < kategoriSelect.options.length; i++) {
            if (parseInt(kategoriSelect.options[i].value) === kategoriId) {
              kategoriSelect.selectedIndex = i;
              break;
            }
          }

          this.showToast("Data barang berhasil diisi dari QR code!", "success");
          document.getElementById("scan-result").innerHTML = `
                        <p><strong>Data QR:</strong> ${qrData}</p>
                        <p>Nama: ${parts[2]}</p>
                        <p>Harga: ${this.formatCurrency(parts[3])}</p>
                    `;
          return true;
        }
      }

      document.getElementById("nama-barang").value = qrData;
      document.getElementById(
        "scan-result"
      ).innerHTML = `<p><strong>Data QR:</strong> ${qrData}</p>`;
      this.showToast(`Data QR: ${qrData}`, "info");
    } catch (err) {
      this.showToast(`Error processing QR data: ${err.message}`, "error");
    }
  }

  processQRTransaksi(qrData) {
    try {
      if (qrData.startsWith("BARANG|")) {
        const parts = qrData.split("|");
        if (parts.length >= 2) {
          const barangId = parseInt(parts[1]);
          const barangSelect = document.getElementById("barang-select");

          for (let i = 0; i < barangSelect.options.length; i++) {
            if (parseInt(barangSelect.options[i].value) === barangId) {
              barangSelect.selectedIndex = i;
              this.tambahKeKeranjang();
              this.showToast(
                "Barang berhasil ditambahkan dari QR code!",
                "success"
              );
              return true;
            }
          }
        }
      }

      this.showToast("QR code tidak valid untuk transaksi", "warning");
      return false;
    } catch (err) {
      this.showToast(`Error processing QR transaksi: ${err.message}`, "error");
      return false;
    }
  }

  getKategoriName(kategoriId) {
    const kategori = this.db.getAllKategori().find((k) => k.id === kategoriId);
    return kategori ? kategori.nama_kategori : "Unknown";
  }

  formatCurrency(amount) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  }

  formatDate(date) {
    return date.toISOString().split("T")[0];
  }

  showModal(modalId) {
    document.getElementById(modalId).classList.remove("hidden");
  }

  hideModal(modalId) {
    document.getElementById(modalId).classList.add("hidden");
  }

  showToast(message, type = "info") {
    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toast-message");

    toastMessage.textContent = message;
    toast.className = "toast";

    if (type === "success") {
      toast.classList.add("toast-success");
    } else if (type === "error") {
      toast.classList.add("toast-error");
    } else if (type === "warning") {
      toast.classList.add("toast-warning");
    }

    toast.classList.remove("hidden");

    setTimeout(() => {
      toast.classList.add("hidden");
    }, 5000);
  }
}

function initWarningBanner() {
  const closeBtn = document.getElementById("close-warning-btn");
  const banner = document.querySelector(".warning-banner");

  if (closeBtn && banner) {
    closeBtn.addEventListener("click", () => {
      banner.style.display = "none";
      document.querySelector(".app-container").style.marginTop = "0";

      localStorage.setItem("hideWarningBanner", "true");
    });
  }

  if (localStorage.getItem("hideWarningBanner") === "true") {
    if (banner) {
      banner.style.display = "none";
      document.querySelector(".app-container").style.marginTop = "0";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initWarningBanner();
});

let app;
document.addEventListener("DOMContentLoaded", () => {
  app = new HaytechStoreApp();
});

window.app = app;
