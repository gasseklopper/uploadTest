const express = require('express');
const multer = require('multer');
const qrCode = require('qrcode');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Handle file upload route
app.post('/upload', upload.single('image'), async (req, res) => {
    const imagePath = req.file.path;
    const qrCodeData = await generateQRCode(imagePath);
    res.send(qrCodeData);
});

// Function to generate QR code
async function generateQRCode(data) {
    return new Promise((resolve, reject) => {
        qrCode.toDataURL(data, (err, url) => {
            if (err) reject(err);
            else resolve(url);
        });
    });
}

// Serve index.html for root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});