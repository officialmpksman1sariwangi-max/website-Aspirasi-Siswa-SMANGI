// GANTI URL INI DENGAN URL APPS SCRIPT KAMU
const scriptURL = 'https://script.google.com/macros/s/AKfycbxuJP22pflvPoCltELCBJfvC1Ru6JhHuim3-uq-tuNdW19Wm1U3J2YmOGmBuWvtWsoK_g/exec';  

const form = document.getElementById('aspirasiForm');
const btnKirim = document.getElementById('btnKirim');
const statusMsg = document.getElementById('statusMessage');

// Logika Pengiriman Form
form.addEventListener('submit', e => {
    e.preventDefault();
    
    // Ubah tombol jadi loading
    btnKirim.disabled = true;
    btnKirim.innerHTML = "Sedang Mengirim...";
    statusMsg.style.display = 'none';

    // Kirim data ke Google Sheets
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            // Tampilkan pesan sukses
            statusMsg.className = 'alert alert-success';
            statusMsg.innerHTML = "✅ Terima kasih! Aspirasimu berhasil dikirim.";
            statusMsg.style.display = 'block';
            
            // Reset form dan tombol
            form.reset();
            btnKirim.disabled = false;
            btnKirim.innerHTML = "Kirim Aspirasi";

            // Hilangkan pesan setelah 5 detik
            setTimeout(() => {
                statusMsg.style.display = 'none';
            }, 5000);
        })
        .catch(error => {
            // Tampilkan pesan error
            statusMsg.className = 'alert alert-error';
            statusMsg.innerHTML = "❌ Gagal mengirim. Periksa koneksi internetmu.";
            statusMsg.style.display = 'block';
            
            console.error('Error!', error.message);
            btnKirim.disabled = false;
            btnKirim.innerHTML = "Kirim Aspirasi";
        });
});
