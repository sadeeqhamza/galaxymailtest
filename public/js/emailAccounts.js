function loadYahoo() {
        console.log("getYahoo");
        var temp = [];
        var tempSubject = $('#subject_input_yahoo').val();
        var ts = 'RE: ' + tempSubject;
        var tdate = new Date();
        $.get('/getymails', function(data, status) {
            if (status === "success") {
                console.log("success Getting yahoo mails");
                //bn= JSON.stringify(data);
                for (var i = 0; i < data.length; i++) {
                    //REMOVE || BELOW
                    if (data[i].subject === ts && moment(data[i].date).format('YYYY MM DD') === moment(tdate).format('YYYY MM DD'))
                    {
                    $('#yahoo-inbox tbody').append('<tr><td>' + moment(data[i].date).format('dd/MM/YY')+ '<br><b>' +moment(data[i].date).format('HH:mm:ss') +'</b></td>' + '<td>' + data[i].subject +'</td>' + '<td>' + data[i].from +'<td></tr>');

                        temp.push(data[i].from);
                        setStorageData("EmailFromYahoo", temp);
                    }
                }
            } else {
                console.log("unsuccessfull yahoo ajax request");
            }
        });
    }
    ///

function loadGmail() {
    console.log("Start getGmails");
    var temp = [];
    var tempSubject = $('#subject_input').val();
    var ts = 'RE: ' + tempSubject;
    var tdate = new Date();
    $.get('/getgmails', function(data, status) {
        if (status === "success") {
            console.log("success Getting gmails");
            //bn= JSON.stringify(data);
            for (var i = 0; i < data.length; i++) {
                if (data[i].subject === ts && moment(data[i].date).format('YYYY MM DD') === moment(tdate).format('YYYY MM DD')) {
               $('#gmail-inbox tbody').append('<tr><td>' + moment(data[i].date).format('dd MM YY')+ '<br><b>' +moment(data[i].date).format('HH:mm:ss') +'</td>' + '<td>' + data[i].subject +'</td>' + '<td>' + data[i].from +'<td></tr>');

                    temp.push(data[i].from);
                    setStorageData("EmailFromGmail", temp);
                }
            }
        } else {
            console.log("unsuccessfull gmail ajax request");
        }
    });
    console.log("Finish getGmails");
}
