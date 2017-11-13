var loopback = require('loopback');
var boot = require('loopback-boot');
var loopdraw = require('loopdraw');

var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
    if (app.get('loopdraw')) {
      var explorerPath = app.get('loopdraw').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};
app.test = function(res){
  return  function(req, res) {
    loopdraw.loopdraw();
    /*{
      started: 'started',
      uptime: 'down' 
    }*/
    res.send('<html><head></head><body class="vsc-initialized"><h1>Start here</h1></body></html>');};
};
// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
