console.log('test')
async function handleUpload() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const imageData = await readFileAsDataURL(file);
        console.log(imageData)
        const qrCodeData = await generateQRCode('https://accenture.com/test/test/test');
        displayQRCode(qrCodeData);
    }
}

function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

async function generateQRCode(data) {
    const qr = qrcode(0, 'L'); // Use version 10 and error correction level 'L'
    qr.addData(data);
    qr.make();
    return qr.createDataURL(10, 0);
}

function displayQRCode(qrCodeData) {
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    const qrCodeElement = document.getElementById('qrCode');

    qrCodeElement.innerHTML = ''; // Clear previous QR code if any
    qrCodeContainer.style.display = 'block';

    // Display QR code image
    const img = document.createElement('img');
    img.src = qrCodeData;
    qrCodeElement.appendChild(img);
}