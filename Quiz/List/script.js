// --- DOM Elements ---
const body = document.body;
const firstPg = document.getElementById("firstPg");
const main = document.getElementById("main");
const resultPg = document.getElementById("resultPg");

// Audio
const audio = document.getElementById("audio");
const musicBtns = [document.getElementById("mode2"), document.getElementById("mode3")];
const themeBtns = [document.getElementById("mode"), document.getElementById("mode4")];

// Quiz Elements
const startBtn = document.getElementById("start");
const replayBtn = document.getElementById("replay");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("nxt");
const submitBtn = document.getElementById("submit");

const queText = document.getElementById("que");
const optContainer = document.getElementById("queWrap");
const qNumText = document.getElementById("QNum");
const progressBar = document.getElementById("prog");

// Result Elements
const scoreText = document.getElementById("score");
const crctText = document.getElementById("crct");
const incrctText = document.getElementById("incrct");
const atmptdText = document.getElementById("atmptd");

// --- Variables ---
let currentQuestionIndex = 0;
// Array untuk menyimpan jawaban user. Diisi " " (kosong) di awal.
let userSelections = new Array(ques.length).fill(" ");

// --- Audio Logic ---
let isPlaying = false;

function toggleMusic() {
    if (isPlaying) {
        audio.pause();
        musicBtns.forEach(btn => btn.style.background = "rgba(255,255,255,0.2)");
    } else {
        audio.play().catch(error => console.log("Audio play blocked:", error));
        musicBtns.forEach(btn => btn.style.background = "#00cec9"); // Accent color active
    }
    isPlaying = !isPlaying;
}

musicBtns.forEach(btn => btn.addEventListener("click", toggleMusic));

// --- Theme Logic (Dark/Light Mode) ---
themeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        body.classList.toggle("dark-mode-active");
        const icon = btn.querySelector("i");
        if(body.classList.contains("dark-mode-active")){
            icon.classList.replace("fa-moon", "fa-sun");
        } else {
            icon.classList.replace("fa-sun", "fa-moon");
        }
    });
});

// --- Navigation Logic ---
function switchSection(hideSection, showSection) {
    hideSection.classList.remove("active-section");
    // Sedikit delay untuk animasi fade out
    setTimeout(() => {
        showSection.classList.add("active-section");
    }, 100);
}

startBtn.addEventListener("click", () => {
    switchSection(firstPg, main);
    loadQuestion(0);
});

function home() {
    switchSection(resultPg, firstPg);
    resetQuiz();
}

// --- Quiz Logic ---

function loadQuestion(index) {
    // Update Nomor Soal & Progress Bar
    qNumText.innerText = index + 1;
    const progressPercent = ((index + 1) / ques.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // Tampilkan Pertanyaan
    queText.innerText = ques[index].question;

    // Tampilkan Opsi
    // Kita reset isi container dulu
    optContainer.innerHTML = "";
    
    // Ambil opsi dari object questions (asumsi keys: opt1, opt2, opt3, opt4)
    for (let i = 1; i <= 4; i++) {
        const btn = document.createElement("button");
        btn.classList.add("opt");
        btn.innerText = ques[index]["opt" + i];
        
        // Cek apakah user sudah memilih jawaban ini sebelumnya
        if (userSelections[index] === btn.innerText) {
            btn.classList.add("selected");
        }

        // Event Klik Opsi
        btn.addEventListener("click", function() {
            selectOption(this, index);
        });

        optContainer.appendChild(btn);
    }
    
    currentQuestionIndex = index;
    updateNavButtons();
}

function selectOption(selectedBtn, index) {
    // Hapus kelas selected dari semua tombol
    const allOpts = optContainer.querySelectorAll(".opt");
    allOpts.forEach(btn => btn.classList.remove("selected"));

    // Tambahkan ke tombol yang diklik
    selectedBtn.classList.add("selected");
    
    // Simpan jawaban
    userSelections[index] = selectedBtn.innerText;
    
    // Efek getar HP (jika didukung)
    if (navigator.vibrate) navigator.vibrate(50);
}

function updateNavButtons() {
    // Disable Prev button if first question
    if (currentQuestionIndex === 0) {
        prevBtn.style.opacity = "0.5";
        prevBtn.style.pointerEvents = "none";
    } else {
        prevBtn.style.opacity = "1";
        prevBtn.style.pointerEvents = "auto";
    }

    // Handle Next button logic
    if (currentQuestionIndex === ques.length - 1) {
        nextBtn.style.display = "none";
        submitBtn.style.display = "flex"; // Show submit on last question
    } else {
        nextBtn.style.display = "flex";
        submitBtn.style.display = "none";
    }
}

nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < ques.length - 1) {
        loadQuestion(currentQuestionIndex + 1);
    }
});

prevBtn.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        loadQuestion(currentQuestionIndex - 1);
    }
});

// --- Submit & Result ---

submitBtn.addEventListener("click", () => {
    calculateResult();
    switchSection(main, resultPg);
});

function calculateResult() {
    let correct = 0;
    let incorrect = 0;
    let attempted = 0;

    for (let i = 0; i < ques.length; i++) {
        if (userSelections[i] !== " ") {
            attempted++;
            if (userSelections[i] === ques[i].ans) {
                correct++;
            } else {
                incorrect++;
            }
        }
    }

    // Hitung skor (skala 0-100)
    let finalScore = 0;
    if (ques.length > 0) {
        finalScore = ((correct / ques.length) * 100).toFixed(0);
    }

    // Tampilkan ke UI
    scoreText.innerText = finalScore;
    crctText.innerText = correct;
    incrctText.innerText = incorrect;
    atmptdText.innerText = attempted;
}

// --- Replay ---

replayBtn.addEventListener("click", () => {
    resetQuiz();
    switchSection(resultPg, main);
    loadQuestion(0);
});

function resetQuiz() {
    currentQuestionIndex = 0;
    userSelections.fill(" ");
}

// Inisialisasi awal (jika diperlukan)
// loadQuestion(0); // Dipanggil saat tombol start ditekan

