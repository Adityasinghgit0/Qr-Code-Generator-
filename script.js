const qrText = document.getElementById('qr-text');
const size = document.getElementById('size');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const qrContainer = document.querySelector('.qr-body');

let sizes = size.value;


generateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    isEmptyInput();
});


size.addEventListener('change', (e) => {
    sizes = e.target.value;
});


function isEmptyInput() {
    if (qrText.value.length > 0) {
        generateQRcode();
    } else {
        alert("Enter the text or URL to generate your QR code");
    }
}


function generateQRcode() {
    qrContainer.innerHTML = "";
    new QRCode(qrContainer, {
        text: qrText.value || "No Text Entered",
        height: parseInt(size.value),
        width: parseInt(size.value),
        colorLight: "#fff",
        colorDark: "#000",
    });
}
downloadBtn.addEventListener('click', () => {
    const img = qrContainer.querySelector('img');
    if (img) {
        const link = document.createElement('a');
        link.href = img.src;
        link.download = 'qrcode.png';
        link.click();
    } else {
        alert('Please generate a QR code first.');
    }
});
