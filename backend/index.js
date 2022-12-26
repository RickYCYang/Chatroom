const server = require('./app');

const { PORT } = require('./utils/config');
var port = PORT || 3000;

//app.listen(port);
server.listen(port, () => {
  console.log('Server Started on ', port);
});
