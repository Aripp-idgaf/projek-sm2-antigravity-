// === VARIABEL GLOBAL CHART ===
let riwayatChartInstance = null;
// Variabel sparklineChartInstance telah dihapus karena tidak lagi dipakai

// === 1. FUNGSI PINDAH HALAMAN (SPA) & TRIGGER ANIMASI ===
function switchView(viewId, element) {
    // Sembunyikan semua konten
    document.querySelectorAll('.view-section').forEach(view => { 
        view.classList.add('d-none'); 
    });
    
    // Tampilkan konten yang dipilih
    document.getElementById(viewId).classList.remove('d-none');

    // Ubah warna hijau (active) di sidebar
    document.querySelectorAll('.ash-sidebar .nav-wrapper').forEach(nav => { 
        nav.classList.remove('active'); 
    });
    if(element) { 
        element.classList.add('active'); 
    }

    // 🔥 LOGIKA ANIMASI: Panggil grafik jika yang diklik adalah menu Riwayat
    if(viewId === 'view-riwayat') {
        // Beri jeda 100ms agar efek transisi CSS selesai dulu sebelum grafik digambar
        setTimeout(renderRiwayatChart, 100);
    }
}

// === 2. FUNGSI MENGGAMBAR GRAFIK GULA DARAH ===
function renderRiwayatChart() {
    const ctx = document.getElementById('riwayatChart').getContext('2d');
    
    // Jika grafik sudah pernah dibuat, hancurkan dulu (destroy) agar animasinya di-reset
    if(riwayatChartInstance) {
        riwayatChartInstance.destroy();
    }

    // Efek gradasi warna Teal di bawah garis
    let gradient = ctx.createLinearGradient(0, 0, 0, 220);
    gradient.addColorStop(0, 'rgba(108, 183, 183, 0.4)');
    gradient.addColorStop(1, 'rgba(108, 183, 183, 0)');

    riwayatChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep'],
            datasets: [{
                label: 'Gula Darah (mg/dL)',
                data: [115, 110, 120, 105, 95, 90],
                borderColor: '#6cb7b7',
                backgroundColor: gradient,
                borderWidth: 3,
                fill: true,
                tension: 0.4, // Membuat garis melengkung
                pointBackgroundColor: '#fff',
                pointBorderColor: '#6cb7b7',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            // 🔥 Pengaturan Animasi Diperbarui
            animation: {
                x: {
                    duration: 1500, // Waktu animasi garis mengalir dari kiri ke kanan
                    from: 0
                },
                y: {
                    duration: 1000, // Waktu animasi titik naik turun
                    from: 500
                }
            },
            plugins: { legend: { display: false } },
            scales: {
                y: { min: 70, max: 130, grid: { borderDash: [5, 5], color: '#f0f0f0' } },
                x: { grid: { display: false } }
            }
        }
    });
}

// === 3. FUNGSI MENGHITUNG BMI OTOMATIS ===
function updateBMI(tinggiStr, beratStr) {
    // 1. Hilangkan teks "cm" dan "kg" dari parameter, lalu ubah jadi angka desimal
    const tinggiCm = parseFloat(tinggiStr.replace('cm', ''));
    const beratKg = parseFloat(beratStr.replace('kg', ''));
    
    // 2. Rumus BMI: Berat (kg) dibagi kuadrat Tinggi (m)
    const tinggiM = tinggiCm / 100;
    const bmi = beratKg / (tinggiM * tinggiM);
    
    // 3. Ambil 1 angka di belakang koma untuk ditampilkan (contoh: 21.2)
    const bmiRounded = bmi.toFixed(1); 
    document.getElementById('bmiValueText').innerText = bmiRounded;
    
    // 4. Logika Status Medis & Penentuan Warna Progress Bar
    let status = "";
    let colorClass = "";
    let progressWidth = "0%";
    
    if (bmi < 18.5) {
        status = "Kurus";
        colorClass = "bg-warning"; // Kuning
        progressWidth = "25%";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        status = "Ideal";
        colorClass = "bg-success"; // Hijau
        progressWidth = "50%";
    } else if (bmi >= 25 && bmi <= 29.9) {
        status = "Berlebih";
        colorClass = "bg-warning"; // Kuning
        progressWidth = "75%";
    } else {
        status = "Obesitas";
        colorClass = "bg-danger";  // Merah
        progressWidth = "100%";
    }
    
    // 5. Eksekusi Perubahan Tampilan pada HTML (Badge Status)
    const badge = document.getElementById('bmiStatusBadge');
    badge.className = `badge bg-opacity-10 rounded-pill px-2 ${colorClass} text-${colorClass.replace('bg-', '')}`;
    badge.innerText = status;
    
    // 6. Eksekusi Perubahan Tampilan pada HTML (Progress Bar)
    const bar = document.getElementById('bmiProgressBar');
    bar.className = `progress-bar ${colorClass}`;
    bar.style.width = progressWidth;
}

// Menjalankan fungsi BMI saat halaman web pertama kali dimuat (Profil Default: Anak / Ashley)
document.addEventListener("DOMContentLoaded", function() {
    // Menggunakan data berat dan tinggi awal si "Anak"
    updateBMI('164cm', '57kg');
});


// === 4. FUNGSI GANTI PROFIL (ANAK, AYAH, IBU) ===
function gantiAshley(nama, role, blood, height, weight, element) {
    document.getElementById('ashNameTitle').innerText = nama + "!";
    document.getElementById('ashNameProfile').innerText = nama + " Black";
    document.getElementById('ashEmail').innerText = nama.toLowerCase() + ".black@gmail.com";
    document.getElementById('ashBlood').innerText = blood;
    document.getElementById('ashHeight').innerText = height;
    document.getElementById('ashWeight').innerText = weight;
    document.getElementById('ashFoto').src = `https://ui-avatars.com/api/?name=${nama}&background=6cb7b7&color=fff`;

    document.querySelectorAll('.kk-tab').forEach(tab => tab.classList.remove('active'));
    element.classList.add('active');

    // 🔥 PENTING: Memicu fungsi hitung ulang BMI berdasarkan data tinggi/berat profil yang baru diklik
    updateBMI(height, weight);
}

// === 5. FUNGSI LOGOUT ===
function logout() { 
    // Kembali ke index.html di root folder dari pages/pasien/pasien.html
    window.location.href = '../../index.html'; 
}

// === 6. FUNGSI PROSES LOGIN ===
function prosesLogin() {
    // Mengarahkan dari index.html (root) ke halaman pasien.html
    window.location.href = 'pages/pasien/pasien.html'; 
}