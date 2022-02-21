const path = require('path');
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const models = require('./models');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });

const app = express();
const PORT = process.env.PORT || 3001;

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const SequelizeStore = require('connect-session-sequelize')(session.Store);
// setuo for use for cookies
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Turn on routes
app.use(routes);

// Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Socket.io
io.on ('connection', socket => {
  socket.on('new message', message => {
    io.emit('new message', message);
  });
});

// Turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
