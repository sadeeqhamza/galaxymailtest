localStorage.removeItem("EmailFromGmail");
localStorage.removeItem("EmailFromYahoo");
localStorage.removeItem("tableData");
$("#yahoo_inbox").hide();
$("#gmail_inbox").hide();
console.log("01 Document Ready");

var failed_owa = [];
var failed_sent_yahoo = [];
var failed_recieved_yahoo = [];
var failed_sent_gmail = [];
var failed_recieved_gmail = [];
var MorningData = {
    Greeting: "Morning",
    DieselCheckTime: "8.3OAM",
    TimeSpan: "6:30PM to 8.30AM (Night Shift)"
};
var AfteroonData = {
    Greeting: "Afternoon",
    DieselCheckTime: "6.OOPM",
    TimeSpan: "8:30AM to 6:00PM (Day Shift)"
};

function main_load() {
    $.ajax({
        url: "servers.json",
        dataType: "text",
        success: function(data) {
            var json = $.parseJSON(data);
            localStorage.setItem('tableData', JSON.stringify(json));
            console.log("02 -Successfully set json data to localStorage");
            updateTable();
            console.log("03 -Finished Updating Table");
        }
    });
}

function updateTable() {
    $('#mytable tbody > tr').remove();
    var json = getStorageData("tableData");
    var data;
    for (var i = 0; i < json.length; i++) {
        //  console.log("appending data to table....");
        data = '<tr><td id="' + json[i].id + 'server' +'">' + json[i].Url + '</td><td><input id="' + json[i].id +'"type="checkbox"><label for="' + json[i].id + '"id="' +json[i].id + 'owatestlabel">' + json[i].Owatest +'</label></td>'+'<td><input id="' + json[i].id +'sent_yahoo"type="checkbox"><label for="' + json[i].id +'sent_yahoo"id="' + json[i].id + 'sent_yahoolabel">' + json[i].SentYahoo + '</label></td>' + '<td><input id="' + json[i].id + 'recieved_yahoo"type="checkbox"><label for="' +json[i].id + 'recieved_yaho"id="' + json[i].id +'recieved_yahoolabel">' + json[i].RecievedYahoo +'</label></td>'+'<td><input id="' + json[i].id +'sent_gmail"type="checkbox"><label for="' + json[i].id +'sent_gmail"id="' + json[i].id + 'sent_gmaillabel">' + json[i].SentGmail + '</label></td>' + '<td><input id="' +json[i].id + 'recieved_gmail"type="checkbox"><label for="' +json[i].id + 'recieved_gmail"id="' + json[i].id +'recieved_gmaillabel">' + json[i].RecievedGmail +'</label></td></tr>';
        $('#mytable tbody').append(data);
        //  console.log("checking checkboxes....");

        if (json[i].Owatest == true) {
              $('#' + json[i].id).prop("checked", true);
            $('#' + json[i].id + 'owatestlabel').text("Passed");
            $('#' + json[i].id + 'owatestlabel').addClass("black");
            $('#' + json[i].id + 'owatestlabel').addClass("white-text");
        }
     
        if (json[i].Owatest == false) {
            $('#' + json[i].id + 'owatestlabel').text("Failed");
            $('#' + json[i].id + 'owatestlabel').addClass("red");
            $('#' + json[i].id + 'owatestlabel').addClass("white-text");
            $('#' + json[i].id + 'server').addClass("red lighten-3");
            $('#' + json[i].id + 'server').addClass("white-text");
        }
        if (json[i].SentGmail == true) {
            $('#' + json[i].id + 'sent_gmail').prop("checked", true);
            $('#' + json[i].id + 'sent_gmaillabel').text("Passed");
            $('#' + json[i].id + 'sent_gmaillabel').addClass("black");
            $('#' + json[i].id + 'sent_gmaillabel').addClass("white-text");
        }
        if (json[i].SentGmail == false) {
            $('#' + json[i].id + 'sent_gmail').prop("checked", false);
            $('#' + json[i].id + 'sent_gmaillabel').addClass("red");    
            $('#' + json[i].id + 'sent_gmaillabel').addClass("white-text");
            $('#' + json[i].id + 'sent_gmaillabel').text("Failed");
        }
        if (json[i].RecievedGmail === true) {
            $('#' + json[i].id + 'recieved_gmail').prop("checked", true);
            $('#' + json[i].id + 'recieved_gmaillabel').text("Passed");
            $('#' + json[i].id + 'recieved_gmaillabel').addClass("black");
            $('#' + json[i].id + 'recieved_gmaillabel').addClass("white-text");
        }
        if (json[i].RecievedGmail === false) {
            $('#' + json[i].id + 'recieved_gmail').prop("checked", false);
            $('#' + json[i].id + 'recieved_gmaillabel').addClass("red");
            $('#' + json[i].id + 'recieved_gmaillabel').addClass("white-text");
            $('#' + json[i].id + 'recieved_gmaillabel').text("Failed");
        }
        if (json[i].RecievedYahoo === false) {
            $('#' + json[i].id + 'recieved_yahoo').prop("checked", false);
            $('#' + json[i].id + 'recieved_yahoolabel').addClass("red");
            $('#' + json[i].id + 'recieved_yahoolabel').addClass("white-text");
            $('#' + json[i].id + 'recieved_yahoolabel').text("Failed");
        }
        if (json[i].RecievedYahoo === true) {
            $('#' + json[i].id + 'recieved_yahoo').prop("checked", true);
            $('#' + json[i].id + 'recieved_yahoolabel').text("Passed");
            $('#' + json[i].id + 'recieved_yahoolabel').addClass("black");
            $('#' + json[i].id + 'recieved_yahoolabel').addClass("white-text");
        }
        if (json[i].SentYahoo === false) {
            $('#' + json[i].id + 'sent_yahoo').prop("checked", false);
            $('#' + json[i].id + 'sent_yahoolabel').addClass("red");
            $('#' + json[i].id + 'sent_yahoolabel').addClass("white-text");
            $('#' + json[i].id + 'sent_yahoolabel').text("Failed");
        }
        if (json[i].SentYahoo === true) {
            $('#' + json[i].id + 'sent_yahoo').prop("checked", true);
            $('#' + json[i].id + 'sent_yahoolabel').text("Passed");
            $('#' + json[i].id + 'sent_yahoolabel').addClass("black");
            $('#' + json[i].id + 'sent_yahoolabel').addClass("white-text");
        }
    }
}

function testGmail() {
   
        loadGmail();
         $('#modal2').openModal();
        setTimeout(function() {
           $('#modal2').closeModal();
            removeSuccessMails("EmailFromGmail");
             $('#modal2').closeModal();
        }, 6000);
    }


function testYahoo(){
 loadYahoo();

        $('#modal2').openModal();
        setTimeout(function() {
            removeSuccessMails("EmailFromYahoo");
             $('#modal2').closeModal();
        }, 6000);

}

function removeSuccessMails(key) {
    console.log("Remove Successfull Email Called()");
    fetchedEmails = [];
    table_emails = [];
    objOne = getStorageData("tableData");
    objTwo = getStorageData(key);
    for (var keyOne in objOne) {
        table_emails.push(objOne[keyOne].alt);
        console.log("pushing table data to table_emails[]");
    }
    for (var keyTwo in objTwo) {
        fetchedEmails.push(objTwo[keyTwo]);
        console.log("pushing" + key + " to fetchedEmails[]");
    }
    console.log("Finished pushing to arrays...checking key");
    if (key === "EmailFromGmail") {
        console.log("Testing..." + key);
        for (var i = 0; i < fetchedEmails.length; i++) {
            Index = table_emails.indexOf(fetchedEmails[i]);
            if (Index > -1) {
                table_emails.splice(Index, 1);
            }
        }
        for (var c = 0; c < objOne.length; c++) {
            for (var v = 0; v < table_emails.length; v++) {
                if (objOne[c].alt === table_emails[v]) {
                    objOne[c].RecievedGmail = false;
                    objOne[c].SentGmail = false;
                    failed_sent_gmail.push(objOne[c].Url + '<br>');
                    failed_recieved_gmail.push(objOne[c].Url + '<br>');
                }
            }
        }
        setStorageData("tableData", objOne);
        updateTable();
        console.log("complete Updating Gmail");
    }
    if (key === "EmailFromYahoo") {
        console.log("Testing..." + key);
        for (var y = table_emails.length - 1; y >= 0; y--) {
            for (var j = 0; j < fetchedEmails.length; j++) {
                if (table_emails[y] === fetchedEmails[j]) {
                    table_emails.splice(y, 1);
                }
            }
        }
        for (var b = 0; b < objOne.length; b++) {
            for (var z = 0; z < table_emails.length; z++) {
                if (objOne[b].alt === table_emails[z]) {
                    console.log(table_emails[z]);
                    objOne[b].RecievedYahoo = false;
                    objOne[b].SentYahoo = false;
                    failed_sent_yahoo.push(objOne[b].Url + '<br>');
                    failed_recieved_yahoo.push(objOne[b].Url + '<br>');
                }
            }
        }
        setStorageData("tableData", objOne);
        updateTable();
        console.log("complete Updating Yahoo");
    }
}

function getStorageData(key) {
    data = JSON.parse(localStorage.getItem(key));
    if (data !== "undefined") {
        console.log("VALID LOCAL STROGE REQUEST = " + key)
        return data
    } else {
        console.log("inVALID LOCAL STROGE REQUEST = " + key)
    }
}

function setStorageData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}


function getShift() {
    var greeting = "Empty";
    var dieselCheckTime = "Empty";
    var timeSpan = "Empty";
    if ($("#shift_input").is(':checked')) {
        greeting = AfteroonData.Greeting;
        dieselCheckTime = AfteroonData.DieselCheckTime;
        timeSpan = AfteroonData.TimeSpan;
    }
    if ($("#shift_input").is(':not(:checked)')) {
        greeting = MorningData.Greeting;
        dieselCheckTime = MorningData.DieselCheckTime;
        timeSpan = MorningData.TimeSpan;
    }
    return {
        greeting: greeting,
        dieselCheckTime: dieselCheckTime,
        timeSpan: timeSpan
    };
}
function getHeader(headers, index) {
        var header = '';
        $.each(headers, function() {
            if (this.name === index) {
                header = this.value;
            }
        });
        return header;
    }