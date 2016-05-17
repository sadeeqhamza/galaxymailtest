  function getReport() {
      var d = new Date();
      var Tdate = d.toDateString();
      var name = "SADEEQ";
      var email = "";
      var p350_gen = 0;
      var p400_gen = 0;
      var the_greeting;
      var the_DieselCheckTime;
      var the_TimeSpan;
      name = $("#name_input").val();
      theEmail = $("#email_input").val();
      p350_gen = $("#350KVA").val();
      p400_gen = $("#400KVA").val();
      var fail_count = failed_owa.length + failed_sent_yahoo.length +
          failed_recieved_yahoo.length + failed_sent_gmail.length +
          failed_recieved_gmail.length;
      if (fail_count > 0) {
          var theEmail = 'Good ' + getShift().greeting + ',' + '<br>' +
              'Kindly find attached the DCHS daily monitoring checks.' +
              '<br>' + 'Date of Monitoring : ' + Tdate + '<br>' +
              'Time of Monitoring : ' + getShift().timeSpan + '<br>' +
              'The level of diesel for the Generators as of ' + getShift().dieselCheckTime +
              ':<br>' + '400KVA - ' + p400_gen + " litres" + '<br>' +
              '350KVA - ' + p350_gen + ' litres' + '<br>' +
              'NOTE: Failed tests below <br>';
          if (failed_owa.length > 1) {
              theEmail += '<b>Failed owa test:</b>' + '<br>' + failed_owa.toString();
          }
          if (failed_sent_yahoo.length > 1) {
              theEmail += '<b>Failed outbound test on yahoo:</b>' + '<br>' +
                  failed_sent_yahoo.toString();
          }
          if (failed_recieved_yahoo.length > 1) {
              theEmail += '<b>Failed inbound test on yahoo:</b>' + '<br>' +
                  failed_recieved_yahoo.toString();
          }
          if (failed_sent_gmail.length > 1) {
              theEmail += '<b>Failed outbound test on gmail:</b><br>' +
                  failed_sent_gmail.toString();
          }
          if (failed_recieved_gmail.length > 1) {
              theEmail += '<b><br>Failed inbound test on gmail:</b><br>' +
                  failed_recieved_gmail.toString();
          }
          $('#modal1').openModal();
          document.getElementById("print_report").innerHTML = theEmail + '<br> Regards,' + '<br>' + name;
      }
  }