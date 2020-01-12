
const Hapi = require('@hapi/hapi');
const Vision = require('@hapi/vision');
const Inert = require('@hapi/inert');

const Path = require('path');
const pug = require('pug');

// handlers
const esHandler = require('./handlers/esHandler.js');
const hapiHandler = require('./handlers/hapiHandler.js');
const pugHandler = require('./handlers/pugHandler.js');
const rootHandler = require('./handlers/rootHandler.js');
const newsHandler = require('./handlers/newsHandler.js');

const { initES, createES } = require('./es.js');

const startServer = async () => {
  const server = Hapi.server({
    host: 'localhost',
    port: 8008
  });

  await server.register([Inert, Vision]);

  server.views({
    engines: {
      pug: require('pug')
    },
    relativeTo: __dirname,
    path: 'templates/pages/'
  });

  server.route({
    method: 'GET',
    path: '/index.css',
    handler: (request, h) => h.file('public/styles/index.css')
  });

  server.route({
    method: 'GET',
    path: '/pug.css',
    handler: (request, h) => h.file('public/styles/pug.css')
  });

  server.route({
    method: 'GET',
    path: '/ehp.svg',
    handler: (request, h) => h.file('public/svgs/ehp.svg')
  });

  server.route({
    method: 'GET',
    path: '/prism.js',
    handler: (request, h) => h.file('node_modules/prismjs/prism.js')
  });

  server.route({
    method: 'GET',
    path: '/prism-okaidia.css',
    handler: (request, h) => h.file('node_modules/prismjs/themes/prism-okaidia.css')
  });

  server.route({
    method: 'GET',
    path: '/elasticsearch',
    handler: esHandler
  });

  server.route({
    method: 'GET',
    path: '/hapi',
    handler: hapiHandler
  });

  server.route({
    method: 'GET',
    path: '/pug',
    handler: pugHandler
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: rootHandler
  });

  // console.log('table: ', server.table())

  await server.start();
  console.log('Server running on %s', server.info.uri);
};


startServer();