const port = 3000;
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('connect-flash');
const { create } = require('express-handlebars');
const session = require('express-session');
const methodOverride = require('method-override')
const passport = require('passport');

const swaggerDocs = require('./config/swagger').swaggerDocs;
const swaggerUi = require('./config/swagger').swaggerUi;

const hbs = create({
  extname: 'hbs',
  defaultLayout: 'main',
  partialsDir: 'views/partials',
  helpers: require('./utils/helpers')
});

require('dotenv').config();

const indexRouter = require('./routes/index');

const authRoutes = require('./routes/auth');

const boardRoutes = require('./routes/post');

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET || 'SECRET',
  resave: false,
  saveUninitialized: false,
}));

// view engine setup
app.engine("hbs", hbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(methodOverride('_method'));
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport');
require('./config/cloudinary');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/', indexRouter);

app.use('/', boardRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;

  app.use(express.urlencoded({ extended: true }));

  app.post('/saveProfileChanges', (req, res) => {
    const { universityStudies, professionalPath, school, leisureAreas } = req.body;
    // Aquí puedes hacer lo que necesites con los datos, como almacenarlos en una base de datos
    console.log('Datos recibidos:', { universityStudies, professionalPath, school, leisureAreas });
    res.redirect('/'); // Redirige a la página principal después de procesar los datos
});
  
  res.locals.error = req.app.get('env') === 'development' ? err : {}; 
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
