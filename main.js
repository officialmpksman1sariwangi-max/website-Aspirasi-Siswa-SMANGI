<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kotak Aspirasi Siswa</title>
    <style>
        /* CSS Styling */
        :root {
            --primary-color: #2563eb;
            --bg-color: #f3f4f6;
            --card-bg: #ffffff;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: var(--bg-color);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
        }

        .container {
            background-color: var(--card-bg);
            padding: 2rem;
            border-radius: 15px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            width: 100%;
            max-width: 500px;
        }

        h2 {
            text-align: center;
            color: #333;
            margin-bottom: 1.5rem;
        }

        .form-group {
            margin-bottom: 1.5rem;
        }

        label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: #4b5563;
        }

        select, textarea {
            width: 100%;
            padding: 12px;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            font-size: 16px;
            box-sizing: border-box; /* Agar padding tidak merusak lebar */
            transition: border-color 0.3s;
        }

        select:focus, textarea:focus {
            border-color: var(--primary-color);
            outline: none;
        }

        textarea {
            resize: vertical;
            min-height: 120px;
        }

        button {
            width: 100%;
            background-color: var(--primary-color);
            color: white;
            padding: 14px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        button:hover {
            background-color: #1d4ed8;
        }

        button:disabled {
            background-color: #9ca3af;
            cursor: not-allowed;
        }

        .alert {
            margin-top: 1rem;
            padding: 1rem;
            border-radius: 8px;
            display: none;
            text-align: center;
        }

        .alert-success {
            background-color: #d1fae5;
            color: #065f46;
        }

        .alert-error {
            background-color: #fee2e2;
            color: #991b1b;
        }

        .privacy-note {
            text-align: center;
            font-size: 12px;
            color: #9ca3af;
            margin-top: 1rem;
        }
    </style>
</head>
<body>

<div class="container">
    <h2>🗳️ Kotak Aspirasi Siswa</h2>
    <form id="aspirasiForm">
        
        <div class="form-group">
            <label for="kategori">Kategori Aspirasi</label>
            <select id="kategori" name="kategori" required>
                <option value="" disabled selected>Pilih Kategori...</option>
                <option value="Fasilitas Sekolah">Fasilitas Sekolah</option>
                <option value="Kegiatan Belajar Mengajar">Kegiatan Belajar Mengajar</option>
                <option value="Ekstrakurikuler">Ekstrakurikuler</option>
                <option value="Kinerja OSIS MPK">Kinerja OSIS MPK</option>
            </select>
        </div>

        <div class="form-group">
            <label for="pesan">Pesan / Masukan</label>
            <textarea id="pesan" name="pesan" placeholder="Tulis aspirasimu secara detail di sini..." required></textarea>
        </div>

        <button type="submit" id="btnSubmit">Kirim Aspirasi</button>
        
        <div id="statusMessage" class="alert"></div>

        <p class="privacy-note">🔒 Identitasmu dirahasiakan (Anonim)</p>
    </form>
</div>

<script>
    // Javascript
    // GANTI URL DI BAWAH INI DENGAN URL DEPLOYMENT GOOGLE SCRIPT KAMU
    const SCRIPT_URL = 'URL_GOOGLE_SCRIPT_KAMU_DISINI';

    const form = document.getElementById('aspirasiForm');
    const btnSubmit = document.getElementById('btnSubmit');
    const statusMsg = document.getElementById('statusMessage');

    form.addEventListener('submit', e => {
        e.preventDefault();
        
        // UI Loading
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = "Mengirim...";
        statusMsg.style.display = 'none';

        // Ambil data
        const data = {
            kategori: form.kategori.value,
            pesan: form.pesan.value
        };

        // Kirim ke Google Script
        fetch(SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(data),
            mode: "no-cors", // Penting untuk bypass CORS Google
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(() => {
            // Sukses (karena mode no-cors, kita asumsikan sukses jika request terkirim)
            statusMsg.className = 'alert alert-success';
            statusMsg.innerText = '✅ Aspirasi berhasil dikirim! Terima kasih.';
            statusMsg.style.display = 'block';
            form.reset();
        })
        .catch(error => {
            console.error('Error!', error.message);
            statusMsg.className = 'alert alert-error';
            statusMsg.innerText = '❌ Terjadi kesalahan. Coba lagi nanti.';
            statusMsg.style.display = 'block';
        })
        .finally(() => {
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = "Kirim Aspirasi";
            
            // Hilangkan pesan sukses setelah 5 detik
            setTimeout(() => {
                statusMsg.style.display = 'none';
            }, 5000);
        });
    });
</script>

</body>
</html>

