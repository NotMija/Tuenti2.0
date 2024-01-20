const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ruta para renderizar el formulario en el index.hbs
app.get('/', async (req, res) => {
  const users = await prisma.user.findMany();
  res.render('index', { users });
});

// Ruta para procesar el formulario
app.post('/profile', async (req, res) => {
  try {
    // Lógica para actualizar la información del usuario en la base de datos
    const updatedUser = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        username: req.body.username,
        email: req.body.email,
        universityStudies: req.body.universityStudies,
        professionalPath: req.body.professionalPath,
        school: req.body.school,
        leisureAreas: req.body.leisureAreas,
      },
    });
    
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al procesar la actualización del perfil'); // Manejo de errores: envía una respuesta de error al cliente
  }
});
