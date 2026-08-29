// =========================================
// PIN
// =========================================

const correctPIN = "290426";


// =========================================
// ELEMENTS
// =========================================

const pinInput = document.getElementById("pinInput");
const unlockButton = document.getElementById("unlockButton");

const lockScreen = document.getElementById("lockScreen");
const mainContent = document.getElementById("mainContent");

const errorMessage = document.getElementById("errorMessage");

const bgMusic = document.getElementById("bgMusic");
const musicButton = document.getElementById("musicButton");

const yesButton = document.getElementById("yesButton");
const answer = document.getElementById("answer");


// =========================================
// MUSIC STATE
// =========================================

let musicPlaying = false;

const musicPlayer =
    document.getElementById("musicPlayer");


// =========================================
// PLAY MUSIC
// =========================================

function playMusic() {

    bgMusic.volume = 0.25;

    bgMusic.play()
        .then(() => {

            musicPlaying = true;

            musicButton.textContent = "Ⅱ";

            musicPlayer.classList.add("playing");

            musicButton.setAttribute(
                "aria-label",
                "Pause music"
            );

        })
        .catch((error) => {

            console.log(
                "Browser memblokir autoplay:",
                error
            );

        });

}


// =========================================
// PAUSE MUSIC
// =========================================

function pauseMusic() {

    bgMusic.pause();

    musicPlaying = false;

    musicButton.textContent = "▶";

    musicPlayer.classList.remove("playing");

    musicButton.setAttribute(
        "aria-label",
        "Play music"
    );

}


// =========================================
// MUSIC BUTTON
// =========================================

musicButton.addEventListener("click", function() {

    if (musicPlaying) {

        pauseMusic();

    } else {

        playMusic();

    }

});


// =========================================
// UNLOCK WEBSITE
// =========================================

function unlockWebsite() {

    const enteredPIN = pinInput.value.trim();

    // PIN BENAR
    if (enteredPIN === correctPIN) {

        // Animasi lock screen
        lockScreen.style.transition = "1s ease";
        lockScreen.style.opacity = "0";
        lockScreen.style.transform = "scale(1.05)";


        // Tampilkan website
        setTimeout(() => {

            lockScreen.classList.add("hidden");

            mainContent.classList.remove("hidden");

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            initScrollRevealAfterUnlock();

        }, 900);


        // =====================================
        // COBA PUTAR MUSIK
        // =====================================
playMusic();

        // Hati meledak kecil sebagai sambutan
        createHeartExplosion();


    } else {

        // =====================================
        // PIN SALAH
        // =====================================

        errorMessage.classList.remove("show");

        // Trigger ulang animasi
        void errorMessage.offsetWidth;

        errorMessage.classList.add("show");

        pinInput.value = "";

        pinInput.focus();

    }

}


// =========================================
// BUTTON UNLOCK
// =========================================

unlockButton.addEventListener("click", unlockWebsite);


// =========================================
// ENTER KEY
// =========================================

pinInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        unlockWebsite();

    }

});


// =========================================
// PIN ONLY NUMBERS
// =========================================

pinInput.addEventListener("input", function() {

    this.value = this.value.replace(/\D/g, "");

});


// =========================================
// YES BUTTON
// =========================================

yesButton.addEventListener("click", function() {

    answer.classList.remove("hidden");

    yesButton.style.display = "none";

    createHeartCelebration();

});


// =========================================
// AMBIENT FLOATING HEARTS
// =========================================

const floatingHeartsContainer =
    document.querySelector(".floating-hearts");

const ambientHearts = [
    "♥",
    "♡",
    "❤"
];

function spawnAmbientHeart() {

    if (!floatingHeartsContainer) return;

    // Jangan spawn kalau tab lagi disembunyikan
    if (document.hidden) return;

    const heart = document.createElement("div");

    heart.className = "floating-heart";

    heart.textContent =
        ambientHearts[
            Math.floor(Math.random() * ambientHearts.length)
        ];

    const startX = Math.random() * 100;
    const size = Math.random() * 14 + 12;
    const duration = Math.random() * 8 + 9;
    const drift = (Math.random() - 0.5) * 120;

    heart.style.left = `${startX}vw`;
    heart.style.fontSize = `${size}px`;
    heart.style.animationDuration = `${duration}s`;
    heart.style.setProperty("--drift", `${drift}px`);

    floatingHeartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, duration * 1000 + 200);

}

// Spawn satu heart baru tiap ~1.3 detik
setInterval(spawnAmbientHeart, 1300);

// Kasih beberapa heart langsung pas load,
// biar gak nunggu lama pas awal buka web
for (let i = 0; i < 6; i++) {
    setTimeout(spawnAmbientHeart, i * 400);
}


// =========================================
// SCROLL REVEAL
// =========================================

function setupScrollReveal() {

    const revealTargets = document.querySelectorAll(
        ".section, .hero-content, .envelope-wrap, " +
        ".question-heart, .question h2, #yesButton, " +
        ".photo-card, .timeline-item, .ending-content"
    );

    if (!revealTargets.length) return;

    revealTargets.forEach((el) => {
        el.classList.add("reveal-hidden");
    });

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "reveal-visible"
                    );

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -60px 0px"
        }
    );

    revealTargets.forEach((el) => {
        observer.observe(el);
    });

}

// Scroll reveal baru aktif setelah lock screen kebuka,
// supaya section pertama (hero) juga sempat ke-animasi
// dan gak ketahan langsung visible dari awal.
function initScrollRevealAfterUnlock() {
    // beri jeda kecil biar mainContent sempat ke-render dulu
    setTimeout(setupScrollReveal, 100);
}


// =========================================
// DAY COUNTER
// =========================================

// Tanggal mulai cerita kalian (sesuai PIN 29-04-2026).
// Ganti di sini kalau tanggalnya beda.
const storyStartDate = new Date(2026, 3, 29);

const dayCounterNumber =
    document.getElementById("dayCounterNumber");

function updateDayCounter() {

    if (!dayCounterNumber) return;

    const now = new Date();

    const diffMs = now - storyStartDate;

    const diffDays = Math.max(
        0,
        Math.floor(diffMs / (1000 * 60 * 60 * 24))
    );

    dayCounterNumber.textContent = diffDays;

}

updateDayCounter();

// Update tiap ganti hari, gak perlu tiap detik
setInterval(updateDayCounter, 60 * 60 * 1000);


// =========================================
// ENVELOPE OPEN
// =========================================

const envelopeWrap = document.getElementById("envelopeWrap");
const letterPaper = document.getElementById("letterPaper");

if (envelopeWrap && letterPaper) {

    envelopeWrap.addEventListener("click", function() {

        if (envelopeWrap.classList.contains("opened")) {
            return;
        }

        envelopeWrap.classList.add("opened");

        setTimeout(() => {

            letterPaper.classList.remove("letter-hidden");
            letterPaper.classList.add("letter-visible");

            letterPaper.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 550);

    });

}


// =========================================
// PHOTO HEART POP (double click / double tap)
// =========================================

function popHeartOnPhoto(card) {

    const pop = document.createElement("div");

    pop.className = "photo-pop-heart";
    pop.textContent = "♥";

    card.appendChild(pop);

    setTimeout(() => {
        pop.remove();
    }, 900);

}

document.querySelectorAll(".photo-card").forEach((card) => {

    // Desktop: double click
    card.addEventListener("dblclick", () => {
        popHeartOnPhoto(card);
    });

    // Mobile: double tap
    let lastTap = 0;

    card.addEventListener("touchend", () => {

        const now = Date.now();

        if (now - lastTap < 320) {
            popHeartOnPhoto(card);
        }

        lastTap = now;

    });

});


// =========================================
// HEART CELEBRATION (fills the whole screen)
// =========================================

function spawnCelebrationHeart() {

    const hearts = [
        "♥",
        "♡",
        "❤",
        "💕",
        "💗",
        "💖"
    ];

    const heart = document.createElement("div");

    heart.textContent =
        hearts[
            Math.floor(Math.random() * hearts.length)
        ];

    const startX = Math.random() * 100;
    const startY = 40 + Math.random() * 40;

    const size = Math.random() * 26 + 18;
    const duration = Math.random() * 1400 + 1400;

    const driftX = (Math.random() - 0.5) * 260;
    const riseY = -(Math.random() * 60 + 55);

    heart.style.position = "fixed";
    heart.style.left = `${startX}vw`;
    heart.style.top = `${startY}vh`;
    heart.style.fontSize = `${size}px`;
    heart.style.color =
        Math.random() > 0.5 ? "#ff668f" : "#ff9db4";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "999";
    heart.style.textShadow =
        "0 0 18px rgba(255, 90, 140, 0.5)";

    document.body.appendChild(heart);

    heart.animate(

        [
            {
                transform:
                    "translate(-50%, -50%) scale(0)",
                opacity: 0
            },
            {
                transform:
                    "translate(-50%, -50%) scale(1)",
                opacity: 1,
                offset: 0.15
            },
            {
                transform:
                    `translate(
                        calc(-50% + ${driftX}px),
                        calc(-50% + ${riseY}vh)
                    )
                    scale(1.1)`,
                opacity: 0
            }
        ],

        {
            duration: duration,
            easing: "cubic-bezier(.2,.8,.2,1)"
        }

    );

    setTimeout(() => {
        heart.remove();
    }, duration + 200);

}

function createHeartCelebration() {

    // Beberapa gelombang biar hati kerasa
    // terus "turun/naik" memenuhi layar,
    // bukan cuma satu ledakan sesaat.
    const waves = 5;
    const heartsPerWave = 22;

    for (let w = 0; w < waves; w++) {

        setTimeout(() => {

            for (let i = 0; i < heartsPerWave; i++) {
                setTimeout(
                    spawnCelebrationHeart,
                    i * 25
                );
            }

        }, w * 260);

    }

}


// =========================================
// HEART EXPLOSION
// =========================================

function createHeartExplosion() {

    const hearts = [
        "♥",
        "♡",
        "❤",
        "💕",
        "💗"
    ];

    for (let i = 0; i < 25; i++) {

        const heart = document.createElement("div");

        heart.textContent =
            hearts[
                Math.floor(
                    Math.random() * hearts.length
                )
            ];

        heart.style.position = "fixed";

        heart.style.left = "50%";
        heart.style.top = "55%";

        heart.style.fontSize =
            `${Math.random() * 20 + 12}px`;

        heart.style.color = "#ff668f";

        heart.style.pointerEvents = "none";

        heart.style.zIndex = "999";

        document.body.appendChild(heart);


        const x =
            (Math.random() - 0.5) * 500;

        const y =
            (Math.random() - 0.5) * 500;


        heart.animate(

            [
                {
                    transform:
                        "translate(-50%, -50%) scale(0)",

                    opacity: 1
                },

                {
                    transform:
                        `translate(
                            calc(-50% + ${x}px),
                            calc(-50% + ${y}px)
                        )
                        scale(1.2)`,

                    opacity: 0
                }
            ],

            {
                duration:
                    Math.random() * 1000 + 1000,

                easing:
                    "cubic-bezier(.2,.8,.2,1)"
            }

        );


        setTimeout(() => {

            heart.remove();

        }, 2200);

    }

}
