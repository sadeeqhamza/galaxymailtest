$("#gmail_test_btn").click(function() {
    localStorage.removeItem("EmailFromGmail");
      $('#myemails tbody > tr').remove();
    	$("#gmail_inbox").show();
	$("#yahoo_inbox").hide();
	 console.log("testGmail from buttons.js");
    testGmail();

});
$("#yahoo_test_btn").click(function() {
	 localStorage.removeItem("EmailFromYahoo");
	 $('#myemails tbody > tr').remove();
	$("#yahoo_inbox").show();
	$("#gmail_inbox").hide();

      console.log("testYahoo from buttons.js");
      testYahoo();
});
$("#report_btn").click(function() {
	 $('.modal-trigger').leanModal();
    getReport();
});