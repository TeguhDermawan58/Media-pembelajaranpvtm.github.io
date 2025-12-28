$(document).ready(function(){

    $("#details").click(function(){
        $("#bookDetails").toggle(900)
    })

    let view = 0;
    const viewBtn = document.querySelector("#viewMore")

    $("#viewMore").click(function(){
        $(".hidden").toggle(600)

        if (view){
            view = 0
            viewBtn.innerHTML = "Lihat lebih banyak"
        }

        else {
            view = 1
            viewBtn.innerHTML = "Lihat lebih sedikit"
        }
    })

    // --- KODE BARU UNTUK MODAL CP & TP ---
    
    // Ambil elemen
    var modal = document.getElementById("modalCPTP");
    var btn = document.getElementById("btnCPTP");
    var span = document.getElementsByClassName("close-cptp")[0];

    // Ketika tombol diklik, buka modal
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // Ketika tombol (x) diklik, tutup modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Ketika user klik di luar area modal, tutup modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});

// --- LOGIKA MODAL UNTUK KATUP ---
var modalKatup = document.getElementById("modalCPTPKatup");
var btnKatup = document.getElementById("btnCPTPKatup");
var spanKatup = document.getElementsByClassName("close-cptp-katup")[0];

if (btnKatup) { // Cek apakah tombol ada di halaman ini
    btnKatup.onclick = function() {
        modalKatup.style.display = "block";
    }
}

if (spanKatup) {
    spanKatup.onclick = function() {
        modalKatup.style.display = "none";
    }
}

// Menutup modal jika klik di luar area
window.onclick = function(event) {
    if (event.target == modalKatup) {
        modalKatup.style.display = "none";
    }
    // Tambahkan kondisi ini jika Anda menggabungkan script dengan modal Pendinginan sebelumnya
    var modalPendingin = document.getElementById("modalCPTP");
    if (event.target == modalPendingin) {
        modalPendingin.style.display = "none";
    }
}

// --- LOGIKA MODAL UNTUK PELUMASAN ---
var modalPelumasan = document.getElementById("modalCPTPPelumasan");
var btnPelumasan = document.getElementById("btnCPTPPelumasan");
var spanPelumasan = document.getElementsByClassName("close-cptp-pelumasan")[0];

if (btnPelumasan) {
    btnPelumasan.onclick = function() {
        modalPelumasan.style.display = "block";
    }
}

if (spanPelumasan) {
    spanPelumasan.onclick = function() {
        modalPelumasan.style.display = "none";
    }
}

// Update fungsi window.onclick agar bisa menutup semua jenis modal (Pendingin, Katup, Pelumasan)
window.onclick = function(event) {
    // Cek Pelumasan
    if (event.target == modalPelumasan) {
        modalPelumasan.style.display = "none";
    }
    // Cek Katup (jika ada di file yang sama)
    var modalKatup = document.getElementById("modalCPTPKatup");
    if (modalKatup && event.target == modalKatup) {
        modalKatup.style.display = "none";
    }
    // Cek Pendingin (jika ada di file yang sama)
    var modalPendingin = document.getElementById("modalCPTP");
    if (modalPendingin && event.target == modalPendingin) {
        modalPendingin.style.display = "none";
    }
}
