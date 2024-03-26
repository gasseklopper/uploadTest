const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Adjusted route for handling file uploads
app.post('/upload', upload.single('image'), async (req, res) => {
    const imagePath = req.file.path;
    // Respond with the path to the uploaded image
    res.send(imagePath.replace('uploads/', '/uploads/'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});