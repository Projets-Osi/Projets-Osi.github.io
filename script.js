
const mirror = document.getElementById('mirror');
const mirrorZone = document.getElementById('mirror-zone');
const textBubble = document.getElementById('text-bubble');
const soundToggle = document.getElementById('sound-toggle');

const images = [
    { src: "reflet_chevre_noire.jpg", weight: 20 },
    { src: "reflet_chevre.jpg", weight: 20 },
    { src: "reflet_homme_habille.jpg", weight: 20 },
    { src: "reflet_torse_nu.jpg", weight: 20 },
    { src: "reflet_feu.jpg", weight: 20 },
    { src: "reflet_ombre.jpg", weight: 20 },
    { src: "reflet_sage.png", weight: 20 },
    { src: "reflet_sage_2.png", weight: 20 },
];

const punchlines = [
    "Trop de beauté détectée !",
    "Le miroir a fondu...",
    "Beau gosse niveau légendaire.",
    "Ce reflet a crashé le serveur.",
    "Impossible d'être aussi stylé.",
    "La beauté a franchi la réalité.",
    "Reflet validé par les dieux.",
    "OMG t'es un chef-d'œuvre.",
    "Même le miroir rougit.",
    "Beauté sur 100, noté 110.",
    "Ton reflet a fait buguer le miroir. Trop de charme détecté.",
  "Le miroir a dit \"Wow\"… et nous aussi.",
  "Même les fantômes font la queue pour te voir.",
  "Si la beauté était un sort, tu serais niveau 200.",
  "Est-ce que tu brilles naturellement ou c’est un filtre magique ?",
  "T'as déclenché l’alarme à éclat de charme.",
  "Les miroirs veulent ton autographe.",
  "Le miroir a crashé. Faut prévenir la maintenance céleste.",
  "Le reflet a cligné des yeux. Il est tombé amoureux.",
  "T’es dans le top 1% des miroirs qui laguent à cause de la beauté.",
  "Une chèvre t’a vu… elle s’est mise à rougir.",
  "Le miroir veut être payé pour te contempler.",
  "Tu viens de déclencher le sort *TropBô.exe*",
  "Même les reflets des autres personnages ont des complexes."
];

let ambientMusic;
let revealSound;
let soundOn = false;
let clickCount = 0;
let mirrorBroken = false;
const repairButton = document.getElementById("repair-button");

function loadAudio() {
    ambientMusic = new Audio("ambient.mp3");
    ambientMusic.loop = true;
    ambientMusic.volume = 0.5;

    revealSound = new Audio("reveal.mp3");
    revealSound.volume = 0.8;
}

function pickImage() {
    const totalWeight = images.reduce((acc, img) => acc + img.weight, 0);
    const rand = Math.random() * totalWeight;
    let cumulative = 0;
    for (let img of images) {
        cumulative += img.weight;
        if (rand < cumulative) return img.src;
    }
    return "mirror_empty.jpg";
}

function getRandomPunchline() {
    return punchlines[Math.floor(Math.random() * punchlines.length)];
}

function showReflection() {
    if (mirrorBroken) return;

    if (clickCount >= 1) {
        mirror.src = "mirror_broken.jpg";
        textBubble.textContent = "💥 Trop de beauté... Le miroir a explosé !";
        textBubble.style.display = "block";
        repairButton.style.display = "block";
        mirrorBroken = true;
        return;
    }
    
    const newSrc = pickImage();
    mirror.src = newSrc;
    textBubble.textContent = getRandomPunchline();
    textBubble.style.display = "block";
    if (soundOn && revealSound) {
        revealSound.currentTime = 0;
        revealSound.play().catch(() => {});
    }
}

function resetMirror() {
    
    textBubble.textContent = "";
    textBubble.style.display = "none";
    
    if(!mirrorBroken) {
        mirror.src = "mirror_empty.jpg";
    }
}

function toggleSound() {
    soundOn = !soundOn;
    if (soundOn) {
        soundToggle.src = "sound_on_flat.png";
        ambientMusic.play().catch(() => {});
    } else {
        soundToggle.src = "sound_off_flat.png";
        ambientMusic.pause();
    }
}

mirrorZone.addEventListener("mouseenter", showReflection);
mirrorZone.addEventListener("mouseleave", resetMirror);
mirrorZone.addEventListener("touchstart", showReflection);
mirrorZone.addEventListener("touchend", resetMirror);

document.addEventListener("DOMContentLoaded", () => {
    const startScreen = document.getElementById("start-screen");
    const startButton = document.getElementById("start-button");
    const gameContainer = document.querySelector(".mirror-container");

    loadAudio();

    startButton.addEventListener("click", () => {
        startScreen.style.display = "none";
        gameContainer.style.display = "block";
        clickCount = -1;
        if (soundOn && ambientMusic) ambientMusic.play().catch(() => {});
    });

    soundToggle.addEventListener("click", toggleSound);

    // Gestion du clic général
    document.body.addEventListener("click", () => {
        if (!mirrorBroken) clickCount++;
    });
});


repairButton.addEventListener("click", () => {
    clickCount = -1;
    mirrorBroken = false;
    mirror.src = "mirror_empty.jpg";
    textBubble.textContent = "";
    textBubble.style.display = "none";
    repairButton.style.display = "none";
});