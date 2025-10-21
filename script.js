function toggleTugas(id) {
    const el = document.getElementById(id);
    if (el.style.display === "block") {
        el.style.display = "none";
    } else {
        el.style.display = "block";
    }
}

document.getElementById('lamaranForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nama = document.getElementById('nama').value;
    const telepon = document.getElementById('telepon').value;
    const email = document.getElementById('email').value;

    const subject = encodeURIComponent("Lamaran dari " + nama);
    const body = encodeURIComponent(`Nama: ${nama}\nTelepon: ${telepon}\nEmail: ${email}`);

    // Ganti alamat email di bawah ini dengan alamat email pemilik web
    const tujuan = "pemilik@email.com";

    window.location.href = `mailto:${tujuan}?subject=${subject}&body=${body}`;
});
