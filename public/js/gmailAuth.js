 var clientId =
   '1098559554267-kf22n62h8rajcqh6n407us3muvujd9aj.apps.googleusercontent.com';
 var apiKey = 'AIzaSyAWkJXId3jlLPa9ZgStuk1jdwlwQhQ_v8k8';
 var scopes = 'https://www.googleapis.com/auth/gmail.readonly';
 var JsonEmails = [];
 var EmailFromGmail = [];

 function handleClientLoad() {
   gapi.client.setApiKey(apiKey);
   window.setTimeout(checkAuth, 1);
 }

 function checkAuth() {
   gapi.auth.authorize({
     client_id: clientId,
     scope: scopes,
     immediate: true
   }, handleAuthResult);
 }

 function handleAuthClick() {
   gapi.auth.authorize({
     client_id: clientId,
     scope: scopes,
     immediate: false
   }, handleAuthResult);
   return false;
 }

 function handleAuthResult(authResult) {
        console.log("handleAuthResult()" + authResult.error);

   if (authResult && !authResult.error) {
    console.log("handleAuthResult(loadGmailApi())");
    loadGmailApi();
     $('#authorize-button').remove();
   }

   else {
     $('#authorize-button').removeClass("hidden");
     $('#authorize-button').on('click', function() {
       handleAuthClick();
     });
   }
 }

 function loadGmailApi() {
   gapi.client.setApiKey(""); //Added this line resolved the 400 error
   gapi.client.load('gmail', 'v1', loadGmails);
   console.log("loadGmailApi()");
 }


 

 // your code