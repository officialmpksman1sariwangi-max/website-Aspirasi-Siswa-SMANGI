// ⚠️ PENTING: Ganti URL di bawah ini dengan URL Web App Google Apps Script milikmu nanti!
const scriptURL = 'https://script.google.com/macros/s/AKfycbxuJP22pflvPoCltELCBJfvC1Ru6JhHuim3-uq-tuNdW19Wm1U3J2YmOGmBuWvtWsoK_g/exec';  

// --- LOGIKA KIRIM ASPIRASI ---
const form = document.getElementById('formAspirasi');
const btnKirim = document.getElementById('btnKirim');
const statusKirim = document.getElementById('statusKirim');

form.addEventListener('submit', e => {
    e.preventDefault();
    btnKirim.disabled = true;
    btnKirim.innerHTML = "Mengirim...";
    statusKirim.style.display = 'none';

    // Buat Kode Tiket Acak (Contoh: ASP-84923)
    const ticketId = 'ASP-' + Math.floor(10000 + Math.random() * 90000);
    
    // Ambil data form dan tambahkan ID Tiket
    let formData = new FormData(form);
    formData.append('ticketId', ticketId);

    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => {
            form.reset();
            btnKirim.disabled = false;
            btnKirim.innerHTML = "Kirim Aspirasi";
            statusKirim.className = 'alert alert-success';
            statusKirim.innerHTML = `✅ Aspirasi terkirim!<hr style="border-top:1px solid #a7f3d0; margin:10px 0;">Simpan Kode Tiket ini untuk mengecek balasan Admin:<br><div class="ticket-code">${ticketId}</div>`;
            statusKirim.style.display = 'block';
        })
        .catch(error => {
            btnKirim.disabled = false;
            btnKirim.innerHTML = "Kirim Aspirasi";
            statusKirim.className = 'alert alert-error';
            statusKirim.innerHTML = "❌ Gagal mengirim. Periksa koneksi internetmu.";
            statusKirim.style.display = 'block';
        });
});

// --- LOGIKA CEK STATUS ---
const btnCek = document.getElementById('btnCek');
const inputTiket = document.getElementById('inputTiket');
const hasilCek = document.getElementById('hasilCek');

btnCek.addEventListener('click', () => {
    const noTiket = inputTiket.value.trim().toUpperCase();
    if (!noTiket) return alert("Harap masukkan Kode Tiket terlebih dahulu!");

    btnCek.innerHTML = "Mencari...";
    btnCek.disabled = true;
    hasilCek.style.display = 'none';

    fetch(`${scriptURL}?action=check&ticketId=${noTiket}`)
        .then(res => res.json())
        .then(data => {
            btnCek.innerHTML = "Cek Status";
            btnCek.disabled = false;
            hasilCek.style.display = 'block';

            if (data.error) {
                document.getElementById('lblStatus').innerHTML = `<span style="color:#dc2626;">❌ ${data.error}</span>`;
                document.getElementById('lblBalasan').innerHTML = "-";
            } else {
                let statusColor = '#d97706'; // Kuning (Proses)
                if(data.status.toLowerCase().includes('selesai') || data.status.toLowerCase().includes('tuntas')) statusColor = '#059669'; // Hijau (Selesai)
                
                document.getElementById('lblStatus').innerHTML = data.status;
                document.getElementById('lblStatus').style.color = statusColor;
                document.getElementById('lblBalasan').innerHTML = data.balasan || "<em>Admin belum memberikan balasan.</em>";
            }
        })
        .catch(err => {
            btnCek.innerHTML = "Cek Status";
            btnCek.disabled = false;
            alert("Gagal terhubung ke server.");
        });
});
