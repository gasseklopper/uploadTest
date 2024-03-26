console.log('test')
async function handleUpload() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    console.log('file', file)
    console.log('fileName', file.name)
    // console.log('filePath', file.name)

    if (file) {
        const imageData = await readFileAsDataURL(file);
        // console.log(imageData)
        displayUploadedImg(imageData); // Display uploaded image
        const qrCodeData = await generateQRCode(`https://accenture.com/test/test/test/${file.name}`);
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

function displayUploadedImg(imageData) {
    const uploadedImageElement = document.getElementById('uploadedImage');
    uploadedImageElement.src = imageData;

    const uploadedImageContainer = document.getElementById('uploadedImageContainer');
    uploadedImageContainer.style.display = 'block';
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