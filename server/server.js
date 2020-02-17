import http from 'http';
import debug from 'debug';
import app from './app';

const server = http.createServer(app);
/**
 * @fileoverview creates an http server and stabilizes port number issues in production
 * @requires - http module
 * @requires - './app'
 * @requires - debug
*/

// This function handles errors that might occur in production with regards to port number
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// This function handles errors that might occur in development with regards to port number
const errorHandler = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? `pipe ${address}` : `port: ${port}`;

  switch (error.code) {
    case 'EACCES':
      debug('app:startup');
      debug(`${bind} requires elevated privileges.`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      debug(`${bind} is already in use.`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// const address = server.address();

server.on('error', errorHandler);

server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? `pipe ${address}` : `port ${port}`;
  debug('app:startup')(`Listening on ${bind}`);
});

server.listen(port);
