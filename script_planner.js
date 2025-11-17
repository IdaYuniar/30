const modal = document.getElementById("uploadModal");
const modalTitle = document.getElementById("modalTitle");
const uploadForm = document.getElementById("uploadForm");
const targetCategoryInput = document.getElementById("targetCategory");
const contentNameInput = document.getElementById("contentName");
const contentFileInput = document.getElementById("contentFile");

// Fungsi untuk menampilkan modal
function openModal(categoryID) {
    const categoryName = categoryID.charAt(0).toUpperCase() + categoryID.slice(1);
    modalTitle.textContent = `Upload Konten ${categoryName}`;
    targetCategoryInput.value = categoryID + '-list'; 
    modal.style.display = "block";
}

// Fungsi untuk menutup modal dan mereset form
function closeModal() {
    modal.style.display = "none";
    uploadForm.reset();
}

// Tutup modal jika user mengklik area luar modal
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

// --- FUNGSI UTAMA: MENANGANI SUBMIT FORMULIR & MEMUAT FILE ---
uploadForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const contentName = contentNameInput.value;
    const targetListId = targetCategoryInput.value;
    const file = contentFileInput.files[0];
    
    if (!contentName.trim() || !file) {
        alert("Judul dan File harus diisi!");
        return;
    }

    const targetList = document.getElementById(targetListId);
    const newItem = document.createElement('div');
    newItem.classList.add('video-item', 'new');
    
    // 1. Buat elemen untuk Judul/Nama Konten
    const titleSpan = document.createElement('span');
    titleSpan.classList.add('item-title');
    titleSpan.textContent = contentName;
    
    // 2. Gunakan FileReader untuk memuat file secara lokal (Pratinjau)
    const reader = new FileReader();

    reader.onload = function(e) {
        let thumbnailElement;
        const fileType = file.type;

        if (fileType.startsWith('image/')) {
            // Jika file adalah GAMBAR
            thumbnailElement = document.createElement('img');
            thumbnailElement.src = e.target.result;
            thumbnailElement.alt = "Thumbnail";
            thumbnailElement.classList.add('item-thumbnail');
        } else if (fileType.startsWith('video/')) {
            // Jika file adalah VIDEO
            thumbnailElement = document.createElement('video');
            thumbnailElement.src = e.target.result;
            thumbnailElement.classList.add('item-thumbnail');
            thumbnailElement.setAttribute('poster', ''); 
        } else {
            // Jika file adalah DOKUMEN/File Lain
            thumbnailElement = document.createElement('i');
            thumbnailElement.className = 'fas fa-file item-thumbnail';
            thumbnailElement.style.color = '#6c757d';
        }
        
        // 3. Gabungkan Elemen Thumbnail dan Judul
        newItem.appendChild(thumbnailElement);
        newItem.appendChild(titleSpan);

        // 4. Tambahkan item baru ke daftar (paling atas)
        // Gunakan insertBefore untuk menambahkan di awal daftar
        targetList.insertBefore(newItem, targetList.firstChild);

        // Bersihkan dan tutup modal
        closeModal();

        // Opsional: Hapus class 'new' setelah beberapa saat
        setTimeout(() => {
            newItem.classList.remove('new');
        }, 3000); 
    };

    // Mulai membaca file sebagai Data URL
    reader.readAsDataURL(file);
});