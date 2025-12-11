const qrText = document.getElementById("qr-text");
const size = document.getElementById("size");
const fgColor = document.getElementById("fgColor");
const bgColor = document.getElementById("bgColor");
const generateBtn = document.getElementById("generateBtn");
const qrContainer = document.querySelector(".qr-body");
const logoInput = document.getElementById("logoInput");

let qr;

generateBtn.addEventListener("click", generateQR);

// LIVE PREVIEW
qrText.addEventListener("input", generateQR);
size.addEventListener("change", generateQR);
fgColor.addEventListener("change", generateQR);
bgColor.addEventListener("change", generateQR);

function generateQR() {
    qrContainer.innerHTML = "";

    qr = new QRCode(qrContainer, {
        text: qrText.value || "Demo QR",
        width: parseInt(size.value),
        height: parseInt(size.value),
        colorDark: fgColor.value,
        colorLight: bgColor.value,
    });

    setTimeout(addLogo, 300); // Add logo after QR loads
}

function addLogo() {
    const img = qrContainer.querySelector("img");
    if (!img || !logoInput.files[0]) return;

    const canvas = document.createElement("canvas");
    const sizeValue = parseInt(size.value);
    canvas.width = sizeValue;
    canvas.height = sizeValue;
    const ctx = canvas.getContext("2d");

    const qrImg = new Image();
    qrImg.src = img.src;

    qrImg.onload = () => {
        ctx.drawImage(qrImg, 0, 0, sizeValue, sizeValue);

        const logo = new Image();
        logo.src = URL.createObjectURL(logoInput.files[0]);
        logo.onload = () => {
            const logoSize = sizeValue * 0.25;
            ctx.drawImage(
                logo,
                (sizeValue - logoSize) / 2,
                (sizeValue - logoSize) / 2,
                logoSize,
                logoSize
            );

            img.src = canvas.toDataURL();
        };
    };
}

// DOWNLOAD PNG
document.getElementById("downloadPngBtn").addEventListener("click", () => {
    downloadImage("image/png", "qr.png");
});

// DOWNLOAD JPG
document.getElementById("downloadJpgBtn").addEventListener("click", () => {
    downloadImage("image/jpeg", "qr.jpg");
});

function downloadImage(type, name) {
    const img = qrContainer.querySelector("img");
    if (!img) return alert("Generate QR first!");

    const a = document.createElement("a");
    a.href = img.src.replace("image/png", type);
    a.download = name;
    a.click();
}

// THEME TOGGLE
document.querySelector(".theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("light");
});
