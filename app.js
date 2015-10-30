var express = require('express'),
    app = express(),
    http = require('http'),
    https = require('https'),
    server = http.createServer(app),
    flightstatsConfig = {
      appId : '3058b823',
      appKey : 'dae3358c03150fd33c8858b8d07f39d7'
    };

app.use('/', express.static('public/'));
app.use('/components', express.static('bower_components/'));

app.post('/getFlight/:direction/:Y/:M/:D/:H',function(req, res){
  var direction = req.params.direction,
      year = req.params.Y,
      month = req.params.M,
      day = req.params.D,
      hour = req.params.H,
      toFrom = '';
  if (direction = 'arriving') {
    toFrom = 'to'
  }
  if (direction = 'departing') {
    toFrom = 'from'
  }
  var options = {
    host : 'api.flightstats.com',
    path : '',
    port : 443,
    method : 'GET'
  };
  options.path = '/flex/schedules/rest/v1/json/' + toFrom + '/IST/'
                + direction + '/' + year + '/' + month + '/' + day + '/' + hour
                + '?appId=' + flightstatsConfig.appId + '&appKey=' + flightstatsConfig.appKey;

   var request = https.request(options,function(response){
     var body = '';
     response.on('data',function(data){
       body += data;
     });
     response.on('end',function(){
       body = JSON.parse(body).appendix;
       res.send(body);

     });
   });
   request.on('error', function(e) {
     console.log('Problem with request: ' + e.message);
   });
   request.end();
});


server.listen(3000);
