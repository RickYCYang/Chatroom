const express = require('express');
const app = express();

/** Set static file path */
app.use(express.static('../public'));

/** parse cookies */
const cookieParser = require('cookie-parser');
app.use(cookieParser());

/** parse request body if needed */
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/** middlewares */
const middleware = require('./utils/middleware');
app.use(middleware.requestLogger);

/** Process cross origin request */
const cors = require('cors');
app.use(cors());

/** init user service */
const userService = require('./services/users');
const firebaseService = require('./services/firebase');
firebaseService.getUsers().then((users) => userService.addUsers(users));

/** Public routes */
const loginRouter = require('./routes/login');
app.use('/login', loginRouter);
const signupRouter = require('./routes/signup');
app.use('/signup', signupRouter);

/** secure routes */
app.use(middleware.tokenExtractor);
app.use(middleware.verifyToken);
const editRouter = require('./routes/edit');
app.use('/edit', editRouter);
const userRouter = require('./routes/user');
app.use('/user', userRouter);
app.get('/', (req, res) => {
  const users = userService.getUsers();
  res.json(users);
});

/** Add Socket io events */
const server = require('http').Server(app);
const io = require('socket.io')(server);
const socketEvents = require('./services/socket');
socketEvents(io);

/** Error handling of router */
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = server;
