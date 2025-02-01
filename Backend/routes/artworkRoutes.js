const express = require('express');
const multer = require('multer');
const artworkController = require('../controllers/artworkController');
const { authenticateUser } = require('../middlewares/auth');

const router = express.Router();

// Configure file upload storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

router.post('/create', authenticateUser, upload.single('file'), artworkController.createArtwork);
router.get('/all', authenticateUser, artworkController.getArtworks);
router.delete('/:id', authenticateUser, artworkController.deleteArtwork);

module.exports = router;
