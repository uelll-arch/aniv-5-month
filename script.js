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

        }, 900);


        // =====================================
        // COBA PUTAR MUSIK
        // =====================================
playMusic();


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
// MUSIC BUTTON
// =========================================

musicButton.addEventListener("click", function() {

    if (musicPlaying) {

        // MATIKAN MUSIK

        bgMusic.pause();

        musicPlaying = false;

        musicButton.textContent = "♫";

    } else {

        // NYALAKAN MUSIK

        bgMusic.volume = 0.25;

        bgMusic.play()
            .then(() => {

                musicPlaying = true;

                musicButton.textContent = "Ⅱ";

            })
            .catch((error) => {

                console.log(
                    "Musik gagal dimainkan:",
                    error
                );

            });

    }

});


// =========================================
// YES BUTTON
// =========================================

yesButton.addEventListener("click", function() {

    answer.classList.remove("hidden");

    yesButton.style.display = "none";

    createHeartExplosion();

});


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