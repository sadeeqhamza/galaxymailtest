$(document).ready(function() {
    localStorage.removeItem("EmailFromGmail");
    localStorage.removeItem("EmailFromYahoo");
    localStorage.removeItem("tableData");
    console.log("01 Document Ready About To initiate main");
    main_load();
});

function main_load() {
    $.ajax({
        url: "servers.json",
        dataType: "text",
        success: function(data) {
            var json = $.parseJSON(data);
            localStorage.setItem('tableData', JSON.stringify(json));
            console.log("02 -Successfully set json data to localStorage");
        }
    });
}

function IndexByKeyValue(arraytosearch, valuetosearch) {
    for (var i = 0; i < arraytosearch.length; i++) {
        if (arraytosearch[i].Url == valuetosearch) {
            return i;
        }
    }
    return null;
}

function setDefaultYahooData() {
    var json = getStorageData("tableData");
    for (var i = 0; i < json.length; i++) {
        json[i].SentYahoo = true;
        json[i].RecievedYahoo = true;
    }
    localStorage.setItem('tableData', JSON.stringify(json));
    console.log("Reset Yahoo Data");
}

function setDefaultGmailData() {
    var json = getStorageData("tableData");
    for (var i = 0; i < json.length; i++) {
        json[i].SentGmail = true;
        json[i].RecievedGmail = true;
    }
    localStorage.setItem('tableData', JSON.stringify(json));
    console.log("Reset Gmail Data");
}

function updateOwaTable() {
    $('#table_owa tbody > tr').remove();
    var json = getStorageData("tableData");
    var data;
    for (var i = 0; i < json.length; i++) {
        data = '<tr><td id="' + json[i].id + 'server' + '"><a class="indigo-text darken-text-4" id="' + json[i].id + "url-label" + '" href="' + json[i].Url + '">' + (i + 1) +
            " - " + json[i].id + '</a></td><td><a id="' + json[i].id + '"rel="' + json[i].Url +
            '" class="red lighten-2 owa-test-btn waves-effect waves-light btn">Test</a></td><td><i class="material-icons"' + 'id="' + json[i].id + "owastatus" +
            '"style="width:30px;">assignment_late</i><td></tr>';
        $('#table_owa tbody').append(data);
    }
    $(".owa-test-btn").click(function() {
        sel = '#' + $(this).attr('id') + 'server';
        var mprogress = new Mprogress({
            parent: sel
        });
        mprogress.start();
        $(this).hide();
        the_test_url = $(this).attr('rel');
        $.get('/test_owa_url', the_test_url, function(data) {
            var json = getStorageData("tableData");
            indexv = IndexByKeyValue(json, the_test_url)
            console.log(json[indexv].id);
            if (data === "fail") {
                json[indexv].Owatest = false;
                $('#' + json[indexv].id + 'owastatus').text("cancel");
                $('#' + json[indexv].id + 'owastatus').addClass("red-text darken-text-4");
                $('#' + json[indexv].id + 'server').addClass("pad red lighten-2");
                $('#' + json[indexv].id + 'url-label').addClass("white-text");
                setStorageData("tableData", json);
            } else {
                json[indexv].Owatest = true;
                $('#' + json[indexv].id + 'owastatus').text("check_circle");
                $('#' + json[indexv].id + 'owastatus').addClass("green-text darken-text-4");
                $('#' + json[indexv].id + 'server').addClass("pad green lighten-2");
                $('#' + json[indexv].id + 'url-label').addClass("white-text");
                setStorageData("tableData", json);
            }
            $(".owa-test-btn").show();
            console.log(data);
            mprogress.end();
        });
    });
}

function updateOutboundTable() {
    $('#table_outbound tbody > tr').remove();
    var json = getStorageData("tableData");
    var data;
    for (var i = 0; i < json.length; i++) {
        data += '<tr> <td><a href="' + json[i].Url + '"">' + (i + 1) + " - " + json[i].id + '</a></td>';
        data += '<td><a id="runOutBoundYahoo_btn" rel="' + json[i].alt + '"class="run-out-bound-yahoo waves-effect waves-light indigo lighten-2 btn">Run</a></td>';
        data += '<td><p><i class="material-icons">cancel</i></p></td>';
        data += '<td><a id="runOutBoundGmail_btn" rel="' + json[i].alt + '"class="run-out-bound-gmail waves-effect waves-light red lighten-2 btn">Run</a></td>';
        data += '<td><i class="material-icons" style="width:30px;">check_circle</i></td></tr>';
    }
    $('#table_outbound tbody').append(data);
     $(".run-out-bound-yahoo").click(function() {
console.log($(this).attr('id') +$(this).attr('rel'));
         });
       $(".run-out-bound-gmail").click(function() {
console.log($(this).attr('id') +$(this).attr('rel') + "gmail");
         });
}

function updateInboundTable() {
    $('#table_inbound tbody > tr').remove();
    var json = getStorageData("tableData");
    var data;
    for (var i = 0; i < json.length; i++) {
        $('#table_inbound tbody').append('<tr><td id="' + json[i].id + 'server' + '"><a id="' + json[i].id + 'url-label' + '" href="' + json[i].Url + '"">' + (i + 1) + " - " + json[i].id + '</a></td>'+'<td><p><i id="' + json[i].id + 'YahooInboundTest' + '" class="material-icons">send</i></p></td>'+'<td><i id="' + json[i].id + 'GmailInboundTest' + '" class="material-icons" style="width:30px;">send</i></td></tr>');

            if (json[i].RecievedGmail === true) {
                $('#' + json[i].id + 'GmailInboundTest').text("check_circle");
                $('#' + json[i].id + 'GmailInboundTest').addClass("teal-text darken-text-4");
                $('#' + json[i].id + 'server').addClass("pad teal lighten-2");
                $('#' + json[i].id + 'url-label').addClass("white-text");
            } else if (json[i].RecievedGmail === false) {
                $('#' + json[i].id + 'GmailInboundTest').text("cancel");
                $('#' + json[i].id + 'GmailInboundTest').addClass("red-text lighten-text-4");
                $('#' + json[i].id + 'server').addClass("pad red lighten-2");
                $('#' + json[i].id + 'url-label').addClass("white-text");
            }
            if (json[i].RecievedYahoo === true) {
                $('#' + json[i].id + 'YahooInboundTest').text("check_circle");
                $('#' + json[i].id + 'YahooInboundTest').addClass("teal-text darken-text-4");
                $('#' + json[i].id + 'server').addClass("pad teal lighten-2");
                $('#' + json[i].id + 'url-label').addClass("white-text");
            } else if (json[i].RecievedYahoo === false) {
                $('#' + json[i].id + 'YahooInboundTest').text("cancel");
                $('#' + json[i].id + 'YahooInboundTest').addClass("red-text lighten-2-text-4");
                $('#' + json[i].id + 'server').addClass("pad red lighten-2");
                $('#' + json[i].id + 'url-label').addClass("white-text");
            }
    
    }
       

}
////here
function updatePreviewTable() {
      $('#mytable tbody > tr').remove();
    var json = getStorageData("tableData");
    for (var i = 0; i < json.length; i++) {
         $('#mytable tbody').append('<tr><td id="'+ json[i].id + 'server' +'"><a href="' + json[i].Url + '"">' + (i + 1) + " - " + json[i].id + '</a></td>'+ '<td><p><i id="' + json[i].id + 'owa' + '" class="material-icons">send</i></p></td>'+'<td><p><i id="' + json[i].id + 'outyahoo' + '" class="material-icons ">send</i></p></td>'+ '<td><p><i id="' + json[i].id + 'inyahoo' + '" class="material-icons">send</i></p></td>'+'<td><p><i id="' + json[i].id + 'outgmail' + '" class="material-icons">send</i></p></td>'+'<td><i id="'+ json[i].id + 'ingmail' +'" class="material-icons" style="width:30px;">send</i></td></tr>');

         if (json[i].Owatest === false) {

              $('#' + json[i].id + 'owa').text("cancel");
                $('#' + json[i].id + 'owa').addClass("red-text darken-text-4");
          
         }

            else if(json[i].Owatest === true){
                 $('#' + json[i].id + 'owa').text("check_circle");
                $('#' + json[i].id + 'owa').addClass("teal-text darken-text-4");
          

            }
            if (json[i].RecievedGmail === true) {
                console.log("hi");
                $('#' + json[i].id + 'ingmail').text("check_circle");
                $('#' + json[i].id + 'ingmail').addClass("teal-text darken-text-4");
                $('#' + json[i].id + 'server').addClass("pad teal lighten-2");
            } else if (json[i].RecievedGmail === false) {
                $('#' + json[i].id + 'ingmail').text("cancel");
                $('#' + json[i].id + 'ingmail').addClass("red-text darken-text-4");
                $('#' + json[i].id + 'server').addClass("pad red lighten-2");
              
            }
            if (json[i].SentGmail === true) {
                $('#' + json[i].id + 'outgmail').text("check_circle");
                $('#' + json[i].id + 'outgmail').addClass("teal-text darken-text-4");
                $('#' + json[i].id + 'server').addClass("pad teal lighten-2");
            } else if (json[i].SentGmail === false) {
                $('#' + json[i].id + 'outgmail').text("cancel");
                $('#' + json[i].id + 'outgmail').addClass("red-text darken-text-4");
                $('#' + json[i].id + 'server').addClass("pad red lighten-2");
              
            }
            if (json[i].RecievedYahoo === true) {
                $('#' + json[i].id + 'inyahoo').text("check_circle");
                $('#' + json[i].id + 'inyahoo').addClass("teal-text darken-text-4");
                $('#' + json[i].id + 'server').addClass("pad teal lighten-2");
            } else if (json[i].RecievedYahoo === false) {
                $('#' + json[i].id + 'inyahoo').text("cancel");
                $('#' + json[i].id + 'inyahoo').addClass("red-text darken-text-4");
                $('#' + json[i].id + 'server').addClass("pad red lighten-2");
            }
                if (json[i].SentYahoo === true) {
                $('#' + json[i].id + 'outyahoo').text("check_circle");
                $('#' + json[i].id + 'outyahoo').addClass("teal-text darken-text-4");
                $('#' + json[i].id + 'server').addClass("pad teal lighten-2");
            } else if (json[i].SentYahoo === false) {
                $('#' + json[i].id + 'outyahoo').text("cancel");
                $('#' + json[i].id + 'outyahoo').addClass("red-text darken-text-4");
                $('#' + json[i].id + 'server').addClass("pad red lighten-2");
            }
    }
      
}

function testGmail() {
    var mprogress = new Mprogress();
    mprogress.start();
    loadGmail();
    setTimeout(function() {
        removeSuccessMails("EmailFromGmail");
        mprogress.end();
    }, 6000);
}

function testYahoo() {
    loadYahoo();
    setTimeout(function() {
        removeSuccessMails("EmailFromYahoo");
    }, 6000);
}

function removeSuccessMails(key) {
    console.log("Start Remove Successfull Email Called()");
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
                }
            }
        }
        setStorageData("tableData", objOne);
        updateInboundTable();
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
                }
            }
        }
        setStorageData("tableData", objOne);
        updateInboundTable();
        console.log("complete Updating Yahoo");
    }
    console.log("Finish Remove Successfull Email Called()");
}

function getStorageData(key) {
    data = JSON.parse(localStorage.getItem(key));
    if (data !== "undefined") {
        console.log("VALID LOCAL STROGE REQUEST = " + key);
        console.log(data);
        return data;
    } else {
        console.log("inVALID LOCAL STROGE REQUEST = " + key);
    }
}

function setStorageData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}