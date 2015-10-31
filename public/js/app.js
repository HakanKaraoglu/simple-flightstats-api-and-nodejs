var app = app || new Object();
app.init = function () {
    this.dateTimePicker();
    this.getFlightInfo();
};

var dataSource = null;

app.dateTimePicker = function () {
    $('#datetimepicker').datetimepicker({
        format: 'YYYY/MM/DD/HH',
        defaultDate: new Date()
    });
};

app.getFlightInfo = function () {
    $('#searchButton').on('click', function (e) {

        var dateTime = $("#datetimepicker #data").val();
        var direction = '';
        var url = '';

        if ($("#arriving").is(":checked")) {
            direction = 'arriving';
        }
        if ($("#departing").is(":checked")) {
            direction = 'departing';
        }

        url = '/getFlight/' + direction + '/' + dateTime;


        $.post(url, function (data) {
            dataSource = data.airports;
            var source = $("#flightList-template").html();
            var template = Handlebars.compile(source);
            $('#airportsTemplate').append(template(data));
        });

    });
}

app.testFunc = function (id) {
    if (dataSource[id] == null) {
        return
    }
    else {
        $('#detailId').text(id);
        $('#detailFs').text(dataSource[id].fs);
        $('#detailIata').text(dataSource[id].iata);
        $('#detailIcao').text(dataSource[id].icao);
        $('#detailName').text(dataSource[id].name);
        $('#detailCity').text(dataSource[id].city);
        $('#detailCityCode').text(dataSource[id].cityCode);
        $('#detailCountryCode').text(dataSource[id].countryCode);
        $('#countryName').text(dataSource[id].countryName);
        $('#regionName').text(dataSource[id].regionName);
    }
    $('#detailModal').modal('show');
}
