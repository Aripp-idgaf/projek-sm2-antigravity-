// --- 1. Router Logic (Pindah File) ---
function prosesLogin() {
    const user = document.getElementById('loginUsername').value.toLowerCase().trim();
    
    if(user === 'pasien') {
        window.location.href = 'pages/pasien/pasien.html'; // <-- Diubah
    } else if(user === 'dokter') {
        window.location.href = 'pages/dokter/dokter.html'; // <-- Diubah
    } else if(user === 'admin') {
        window.location.href = 'pages/admin/admin.html'; // <-- Diubah
    } else {
        alert('Username salah! Harap ketik: pasien, dokter, atau admin');
    }
}

// --- 2. Logout (Kembali ke index) ---
function logout() {
    window.location.href = '../index.html'; 
}

// --- 3. Ashley Pasien: Ganti KK ---
function gantiAshley(nama, role, blood, height, weight, diag, drugs, dateActive, element) {
    document.getElementById('ashNameTitle').innerText = nama + "!";
    document.getElementById('ashNameProfile').innerText = nama + " Black";
    document.getElementById('ashEmail').innerText = nama.toLowerCase() + ".black@gmail.com";
    document.getElementById('ashBlood').innerText = blood;
    document.getElementById('ashHeight').innerText = height;
    document.getElementById('ashWeight').innerText = weight;
    document.getElementById('ashDiag').innerText = diag;
    document.getElementById('ashDrugs').innerText = drugs;
    document.getElementById('ashFoto').src = `https://ui-avatars.com/api/?name=${nama}&background=6cb7b7&color=fff`;

    document.querySelectorAll('.cal-day').forEach(day => {
        day.classList.remove('active');
        if (day.innerText === dateActive && !day.classList.contains('text-muted')) { day.classList.add('active'); }
    });

    document.querySelectorAll('.kk-tab').forEach(tab => tab.classList.remove('active'));
    element.classList.add('active');
}

// --- 4. Crextio Admin: Cek BPJS ---
function cekBpjsAdmin() {
    const input = document.getElementById('adminInput').value.toLowerCase().trim();
    const hasilBox = document.getElementById('hasilAdmin');
    const resNama = document.getElementById('resNamaAdmin');
    const resStatus = document.getElementById('resStatusAdmin');
    const btnAksi = document.getElementById('btnAksiAdmin');

    if(input === '') { alert('Nama tidak boleh kosong!'); return; }

    hasilBox.classList.remove('d-none');
    
    if(input.includes('john')) {
        resNama.innerText = "John Black (Ayah)";
        resStatus.innerHTML = "<span class='badge bg-danger fs-6 mb-2'>BPJS Menunggak</span><p class='small text-muted m-0 lh-sm'>Pasien belum membayar tagihan.</p>";
        btnAksi.innerHTML = `<button class="btn btn-warning w-100 fw-bold btn-sm mt-2" onclick="alert('Diubah ke PASIEN UMUM.')">Jadikan Pasien Umum</button>`;
    } else if (input.includes('jane') || input.includes('ashley')) {
        resNama.innerText = input.includes('jane') ? "Jane Black (Ibu)" : "Ashley Black (Anak)";
        resStatus.innerHTML = "<span class='badge bg-success fs-6 mb-2'>BPJS Aktif</span><p class='small text-muted m-0 lh-sm'>Data valid. Pasien berhak layanan penuh.</p>";
        btnAksi.innerHTML = `<button class="btn btn-primary w-100 fw-bold btn-sm mt-2" onclick="alert('Antrean dicetak!')">Cetak Antrean BPJS</button>`;
    } else {
        resNama.innerText = "Tidak Ditemukan";
        resStatus.innerHTML = "<span class='text-muted small'>Nama salah.</span>";
        btnAksi.innerHTML = "";
    }
}