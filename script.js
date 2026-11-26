
// ==========================================
// ELEMENTOS DAS TELAS
// ==========================================

const home = document.getElementById("home");
const letter = document.getElementById("letter");
const reasons = document.getElementById("reasons");
const final = document.getElementById("final");

const openBtn = document.getElementById("openBtn");
const nextBtn = document.getElementById("nextBtn");
const finalBtn = document.getElementById("finalBtn");

const screens = [home, letter, reasons, final];

// ==========================================
// POLAROIDS DECORATIVAS
// ==========================================

const photos = [
    "imagens/Gabi1.jpeg",
    "imagens/gabi2.jpeg",
    "imagens/gabi3.jpeg",
    "imagens/gabi4.jpeg",
    "imagens/gabi5.jpeg",
    "imagens/gabi6.jpeg",
    "imagens/gabi7.jpeg",
    "imagens/gabi8.jpeg",
    "imagens/gabi9.jpeg",
    "imagens/gabi10.jpeg",
    "imagens/gabi11.jpeg"
];

function createDecorations(screen, photoIndexes) {

    // Não adiciona decoração na tela inicial
    if (screen === home) return;

    const decorations = document.createElement("div");
    decorations.classList.add("memory-polaroids");

    // Polaroid esquerda
    const left = document.createElement("div");
    left.classList.add("polaroid", "polaroid-left");

    const leftImage = document.createElement("img");
    leftImage.src = photos[photoIndexes[0]];
    leftImage.alt = "Uma lembrança especial";

    left.appendChild(leftImage);

    // Polaroid direita
    const right = document.createElement("div");
    right.classList.add("polaroid", "polaroid-right");

    const rightImage = document.createElement("img");
    rightImage.src = photos[photoIndexes[1]];
    rightImage.alt = "Uma lembrança especial";

    right.appendChild(rightImage);

    // Flores
    const flowerLeft = document.createElement("span");
    flowerLeft.className = "decorative-flower flower-left";
    flowerLeft.textContent = "🌷";

    const flowerRight = document.createElement("span");
    flowerRight.className = "decorative-flower flower-right";
    flowerRight.textContent = "🌸";

    decorations.append(
        left,
        right,
        flowerLeft,
        flowerRight
    );

    screen.appendChild(decorations);
}

// Cada tela recebe duas fotos diferentes
createDecorations(letter, [0, 1]);
createDecorations(reasons, [2, 3]);
createDecorations(final, [4, 5]);

// ==========================================
// TROCA DE TELAS
// ==========================================

function showScreen(screen) {

    screens.forEach(section => {
        section.classList.add("hidden");
    });

    screen.classList.remove("hidden");

    // Reinicia animação do título
    const title = screen.querySelector(".animated-title");

    if (title) {
        title.style.animation = "none";
        void title.offsetWidth;
        title.style.animation = "";
    }

    // Reinicia animação da tela
    screen.style.animation = "none";
    void screen.offsetWidth;
    screen.style.animation = "";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Botões

openBtn.addEventListener("click", () => {
    showScreen(letter);
});

nextBtn.addEventListener("click", () => {
    showScreen(reasons);
});

finalBtn.addEventListener("click", () => {
    showScreen(final);
});

// ==========================================
// FUNDO ORIGINAL DE FOTOGRAFIAS
// ==========================================

const photoBackground = document.getElementById("photoBackground");

function createPhotoColumn(columnNumber) {

    const column = document.createElement("div");
    column.classList.add("photo-column");

    const columnPhotos = photos.filter((photo, index) => {
        return index % 4 === columnNumber;
    });

    // Duplica a sequência para manter o movimento contínuo
    for (let repeat = 0; repeat < 2; repeat++) {

        columnPhotos.forEach(photo => {

            const img = document.createElement("img");

            img.src = photo;
            img.alt = "Uma lembrança especial nossa ❤️";
            img.loading = "eager";
            img.draggable = false;

            img.onerror = () => {
                console.error("Erro ao carregar: " + photo);
            };

            column.appendChild(img);

        });

    }

    photoBackground.appendChild(column);
}

if (photoBackground) {

    photoBackground.innerHTML = "";

    for (let i = 0; i < 4; i++) {
        createPhotoColumn(i);
    }

}

// ==========================================
// CORAÇÕES FLUTUANTES
// ==========================================

const heartsContainer = document.getElementById("hearts");

const heartSymbols = [
    "❤️",
    "💕",
    "💗",
    "💖",
    "🌷",
    "💘"
];

function createHeart() {

    const heart = document.createElement("span");

    heart.classList.add("floating-heart");

    heart.innerText = heartSymbols[
        Math.floor(Math.random() * heartSymbols.length)
    ];

    heart.style.left = Math.random() * 100 + "%";

    heart.style.fontSize =
        (15 + Math.random() * 25) + "px";

    heart.style.animationDuration =
        (6 + Math.random() * 6) + "s";

    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 12000);

}

setInterval(createHeart, 800);
