var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/views/';


app.use(express.static('public'));

var inbox = require("inbox");

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

app.use("/",router);

router.get('/getymails', function(req, res) {
    var theData = [];
    console.log("hiyahoo");
    var client = inbox.createConnection(false, "imap.mail.yahoo.com", {
        secureConnection: true,
        auth: {
            user: "gbbtestmail@yahoo.com",
            pass: "galaxybackbone"
        }
    });
    client.connect();
    client.on("connect", function() {
        console.log("Successfully connected to yahoo server");
        client.openMailbox("INBOX", function(error, info) {
            if (error) throw error;
            console.log("Message count in INBOX: " +
                info.count);
            // list newest 10 messages
            client.listMessages(-50, function(err,
                messages) {
                messages.forEach(function(
                    message) {
                    var obj = new Object();
                    obj.from = message.from
                        .address;
                    obj.date = message.date;
                    obj.subject =
                        message.title;
                    theData.push(obj);
                });
                console.log(theData);
                res.send(theData);
            });
        });
    });
});
///
router.get('/getgmails', function(req, res) {
    var theGmailData = [];
    console.log("higmail");
    var gmail_client = inbox.createConnection(false, "imap-mail.outlook.com", {
        secureConnection: true,
        auth: {
            user: "gbbtestmail@gmail.com",
            pass: "P@$$WORD1"
        }
    });
    gmail_client.connect();
    
    gmail_client.on("connect", function() {
        console.log("Successfully connected to gmail server");
        gmail_client.openMailbox("INBOX", function(error, info) {
            console.log("ERRORSADEEQ" + error);
            if (error) {
                console.log("ERRORSADEEQ" + error);
            }
            // list newest 10 messages
            gmail_client.listMessages(-50, function(err,messages) {
                messages.forEach(function(message) {
                    var obj = new Object();
                    obj.from = message.from.address;
                    obj.date = message.date;
                    obj.subject = message.title;
                    theGmailData.push(obj);
                });
                console.log(theGmailData);
                res.send(theGmailData);
            });
        });
    });
});


var port = process.env.PORT || 3000;
    app.listen(port);
