const express = require('express');
const router = express.Router();
const { cloudinary } = require('../config/cloudinary');

router.post('/uploadPhoto', async (req, res) => {
  try {
    if (!req.file) {
      // Manejar el caso en que no se proporcionó un archivo
      return res.status(400).send('No se proporcionó ninguna foto.');
    }

    // Lógica para cargar la foto a Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    const cloudinaryImageUrl = result.secure_url;

    // Redirigir a la página principal con la nueva imagen
    res.redirect('/?cloudinaryImageUrl=' + encodeURIComponent(cloudinaryImageUrl));
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al procesar la carga de la foto.');
  }
});

module.exports = router;