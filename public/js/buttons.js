$("#send-test-mail-btn").click(function() {
	console.log("send btn");
    $("#SendTest").show();
    $("#TestOwa").hide();
   $("#TestOutbound").hide();
   $("#TestInbound").hide();
   $("#GenEmail").hide();	
});
$("#owatest-btn").click(function() {

	console.log("outbound-btn");
	$("#SendTest").hide();
	$("#TestOwa").show();
   $("#TestOutbound").hide();
   $("#TestInbound").hide();
   $("#GenEmail").hide();	
	updateOwaTable();
});
$("#outbound-btn").click(function() {

	console.log("outbound-btn");
	$("#SendTest").hide();
	$("#TestOwa").hide();
   $("#TestOutbound").show();
   $("#TestInbound").hide();
   $("#GenEmail").hide();	
	updateOutboundTable();
});
$("#inbound-btn").click(function() {
	console.log("inbound-btn");
   $("#SendTest").hide();
   $("#TestOwa").hide();
   $("#TestOutbound").hide();
   $("#TestInbound").show();
   $("#GenEmail").hide();	
	
});
$("#gen-email-btn").click(function() {
	console.log("gen-btn");
   $("#SendTest").hide();
   $("#TestOwa").hide();
   $("#TestOutbound").hide();
   $("#TestInbound").hide();
   $("#GenEmail").show();
   updatePreviewTable();	
	
});

$("#gmail_test_btn").click(function() {
	setDefaultGmailData();
    localStorage.removeItem("EmailFromGmail");
      $('#myemails tbody > tr').remove();
 	$("#gmail_inbox").show();
	$("#yahoo_inbox").hide();
	 console.log("testGmail from buttons.js");
    testGmail();

});
$("#yahoo_test_btn").click(function() {
	setDefaultYahooData();
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

$("#add_server_btn").click(function() {
	$('#add_modal').openModal();
});


$("#submit_server").click(function() {
console.log("clicked")
var obj = new Object();
obj.id =	$("#server_name_input").val();
obj.Url =	$("#owa_url_input").val();
obj.from = $("#server_email_input").val();
obj.alt = $("#server_email_input").val();
obj.Owatest = false;
obj.SentYahoo = false;
obj.RecievedYahoo = false;
obj.SentGmail = false;
obj.RecievedGmail = false;
obj.OwaCell = $("#owa_cell_input").val();
obj.TestCell= $("#test_cell_input").val();
  var json = getStorageData("tableData");
  json.push(obj);
  setStorageData("tableData", json);

console.log(obj);

	
});

