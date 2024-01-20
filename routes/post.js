const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));


// Ruta para renderizar el formulario en el index.hbs
app.get('/', async (req, res) => {
  const users = await prisma.user.findMany();
  if(users){
    return users;
  }
  res.render('index', { users });
});

// Ruta para procesar el formulario
app.post('/profile', async (req, res) => {
  try {
    console.log('Datos del formulario:', req.body);

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

    console.log('Usuario actualizado:', updatedUser);

    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al procesar la actualización del perfil');
  }
});

module.exports = app;