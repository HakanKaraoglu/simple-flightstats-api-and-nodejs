var app = app || new Object();
app.init = function(){
  this.dateTimePicker();
  this.getFlightInfo();
};

app.dateTimePicker = function(){
  $('#datetimepicker').datetimepicker({
    format : 'YYYY/MM/DD/HH',
    defaultDate : new Date()
  });
};

app.getFlightInfo = function(){
  $('#searchButton').on('click', function (e) {

    var dateTime = $("#datetimepicker #data").val();
    var direction = '';
    var url = '';

    if($("#arriving").is(":checked")){
      direction = 'arriving';
    }
    if($("#departing").is(":checked")){
      direction = 'departing';
    }

    url = '/getFlight/' + direction + '/' + dateTime;

    var tableBody = $('#flightList tbody');
    $.post(url , function( data ) {
      var body = '';
      for (var i = 0; i < data.airports.length; i++) {
        body += '<tr>';
        body += '<td>' + data.airports[i]['fs'] + '</td>';
        body += '<td>' + data.airports[i]['iata'] + '</td>';
        body += '<td>' + data.airports[i]['icao'] + '</td>';
        body += '<td>' + data.airports[i]['name'] + '</td>';
        body += '<td>' + data.airports[i]['city'] + '</td>';
        body += '<td>' + data.airports[i]['cityCode'] + '</td>';
        body += '<td>' + data.airports[i]['countryCode'] + '</td>';
        body += '<td>' + data.airports[i]['countryName'] + '</td>';
        body += '<td>' + data.airports[i]['regionName'] + '</td>';
        body += '</tr>';
      }
      tableBody.html(body);

    });

    });
}
