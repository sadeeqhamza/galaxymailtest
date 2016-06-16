  function getReport() {
      var d = new Date();
      var Tdate = d.toDateString();
      var name = "SADEEQ";
      var email = "";
      var p350_gen = 0;
      var p400_gen = 0;
      var fail_count = 0;
      var failed_owa = [];
      var failed_sent_yahoo = [];
      var failed_recieved_yahoo = [];
      var failed_sent_gmail = [];
      var failed_recieved_gmail = [];
      name = $("#name_input").val();
      theEmail = $("#email_input").val();
      p350_gen = $("#350KVA").val();
      p400_gen = $("#400KVA").val();
      var json = getStorageData("tableData");
      for (var i = 0; i < json.length; i++) {
        if (json[i].Owatest === false) {
              failed_owa.push(json[i].Url + '<br>');
              console.log(failed_owa);
          }

          if (json[i].SentYahoo === false || json[i].RecievedYahoo === false) {
              failed_sent_yahoo.push(json[i].Url + '<br>');
              failed_recieved_yahoo.push(json[i].Url + '<br>');
          }
          if (json[i].SentGmail === false || json[i].RecievedGmail === false) {
              failed_sent_gmail.push(json[i].Url + '<br>');
              failed_recieved_gmail.push(json[i].Url + '<br>');
          }
      }
      fail_count = failed_owa.length + failed_sent_yahoo.length + failed_recieved_yahoo.length + failed_sent_gmail.length +
          failed_recieved_gmail.length;
      if (fail_count > 0) {
          var theEmail = 'Good ' + getShift().greeting + ',' + '<br>' + 'Kindly find attached the DCHS daily monitoring checks.' +
              '<br>' + 'Date of Monitoring : ' + Tdate + '<br>' + 'Time of Monitoring : ' + getShift().timeSpan + '<br>' +
              'The level of diesel for the Generators as of ' + getShift().dieselCheckTime + ':<br>' + '400KVA - ' + p400_gen +
              " litres" + '<br>' + '350KVA - ' + p350_gen + ' litres' + '<br>' + 'NOTE: Failed tests below <br>';
          if (failed_owa.length >= 1) {
               console.log(failed_owa);
              theEmail += '<b>Failed owa test:</b>' + '<br>' + failed_owa.toString();
          }
          if (failed_sent_yahoo.length >= 1) {
              theEmail += '<b>Failed outbound test on yahoo:</b>' + '<br>' + failed_sent_yahoo.toString();
          }
          if (failed_recieved_yahoo.length >= 1) {
              theEmail += '<b>Failed inbound test on yahoo:</b>' + '<br>' + failed_recieved_yahoo.toString();
          }
          if (failed_sent_gmail.length >= 1) {
              theEmail += '<b>Failed outbound test on gmail:</b><br>' + failed_sent_gmail.toString();
          }
          if (failed_recieved_gmail.length >= 1) {
              theEmail += '<b><br>Failed inbound test on gmail:</b><br>' + failed_recieved_gmail.toString();
          }
          $('#modal1').openModal();
          document.getElementById("print_report").innerHTML = theEmail + '<br> Regards,' + '<br>' + name;
          fail_count = 0;
          failed_owa = [];
          failed_sent_yahoo = [];
          failed_recieved_yahoo = [];
          failed_sent_gmail = [];
          failed_recieved_gmail = [];
      }

      function getShift() {
          var greeting = "Empty";
          var dieselCheckTime = "Empty";
          var timeSpan = "Empty";
          var MorningData = {
              Greeting: "Morning",
              DieselCheckTime: "8.30AM",
              TimeSpan: "6:30PM to 8.30AM (Night Shift)"
          };
          var AfteroonData = {
              Greeting: "Afternoon",
              DieselCheckTime: "6.00PM",
              TimeSpan: "8:30AM to 6:00PM (Day Shift)"
          };
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
  }