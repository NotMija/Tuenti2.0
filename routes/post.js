const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para renderizar el formulario en el index.hbs
app.get('/', async (req, res) => {
  const users = await prisma.user.findMany();
  res.render('index', { users });
});

// Ruta para procesar el formulario
app.put('/profile', async (req, res) => {
  const { username, email, universityStudies, professionalPath, school, leisureAreas } = req.body;

  // Aquí deberías realizar la lógica para actualizar los datos en la base de datos
  // utilizando el ORM Prisma o la biblioteca que estés utilizando para interactuar con la base de datos

  // Ejemplo usando Prisma:
  const updatedUser = await prisma.user.update({
    where: { /* Condición para identificar al usuario */ },
    data: {
      username,
      email,
      universityStudies,
      professionalPath,
      school,
      leisureAreas,
    },
  });

  res.redirect('/');
});
