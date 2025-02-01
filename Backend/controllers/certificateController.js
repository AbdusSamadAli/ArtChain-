const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');
const Artwork = require('../models/artworkModel');

exports.createcertificate = async (req, res) => {
  try {
    const artworkId = req.params.id;
    const artwork = await Artwork.findById(artworkId).populate('owner', 'name');

    if (!artwork) {
      return res.status(404).json({ error: 'Artwork not found' });
    }

    const doc = new PDFDocument();
    const certificatePath = path.join(__dirname, '../uploads', `ownership_proof_${artworkId}.pdf`);
    doc.pipe(fs.createWriteStream(certificatePath));
    doc.fontSize(16).text('Certificate of Ownership Proof', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Artwork Title: ${artwork.title}`);
    doc.text(`Artwork Description: ${artwork.description}`);
    doc.text(`Blockchain ID: ${artwork.blockchainHash}`);
    doc.text(`Owner: ${artwork.owner.name}`); 
    doc.moveDown();
    doc.text('This certificate serves as proof of ownership for the artwork listed above.');
    doc.moveDown();
    doc.text('Blockchain ensures the immutability and authenticity of this record.');
    doc.end();

    res.status(200).json({
      message: 'Ownership proof generated successfully.',
      certificateUrl: `http://localhost:5000/uploads/ownership_proof_${artworkId}.pdf`
    });
  } catch (error) {
    console.error('Error generating ownership proof:', error);
    res.status(500).json({ error: 'Error generating ownership proof', details: error.message });
  }
};
