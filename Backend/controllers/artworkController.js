const Artwork = require('../models/artworkModel');
const User = require('../models/user');
const Blockchain = require('../blockchain/blockchain');

const blockchain = new Blockchain();

exports.createArtwork = async (req, res) => {
  try {
    const { title, description } = req.body;
    const filePath = req.file.path; 
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const artworkData = {
      title,
      description,
      filePath,
      owner: user.name,  
      timestamp: new Date().toISOString(),
    };

    const newBlock = blockchain.addBlock(artworkData);
    const blockchainHash = newBlock.hash;  
    
    const artwork = new Artwork({
      title,
      description,
      filePath,
      blockchainHash,  
      owner: user._id,  
    });

    await artwork.save(); 

    res.status(201).json({
      message: 'Artwork created successfully',
      artwork,
      blockchainHash,  
      blockchainMessage: 'Metadata has been secured in a private blockchain. This record is immutable.',
    });
  } catch (error) {
    console.error('Error creating artwork:', error);
    res.status(500).json({ error: 'Error creating artwork', details: error.message });
  }
};

exports.getArtworks = async (req, res) => {
  try {
    const userId = req.user.id; 
    const artworks = await Artwork.find({ owner: userId })
      .populate('owner');  
    res.status(200).json({ artworks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching artworks' });
  }
};


exports.deleteArtwork = async (req, res) => {
  try {
    const artworkId = req.params.id; 
    const artwork = await Artwork.findByIdAndDelete(artworkId);
    if (!artwork) {
      return res.status(404).json({ error: 'Artwork not found' });
    }
    const fs = require('fs');
    const filePath = artwork.filePath;
    fs.unlinkSync(filePath); 
    res.status(200).json({ message: 'Artwork deleted successfully' });
  } catch (error) {
    console.error('Error deleting artwork:', error);
    res.status(500).json({ error: 'Error deleting artwork', details: error.message });
  }
};

