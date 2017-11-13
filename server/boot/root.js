module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/', server.loopback.status());
  console.log('instal base');
  //router.get('/diagram', server.test());
  server.use(router);
};
