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
        console.log("Successfully connected to server");
        client.listMailboxes(function(error, mailboxes) {
            for (var i = 0,
                len = mailboxes.length; i < len; i++) {
                if (mailboxes[i].hasChildren) {
                    mailboxes[i].listChildren(function(error, children) {
                        console.log(children);
                    });
                }
            }
        });
        client.openMailbox("INBOX", function(error, info) {
            if (error) throw error;
            console.log("Message count in INBOX: " + info.count);
            // list newest 10 messages
            client.listMessages(-30, function(err, messages) {
                messages.forEach(function(message) {
                    var obj = new Object();
                    obj.from = message.from.address;
                    obj.date = message.date;
                    obj.subject = message.title;
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
    var theData = [];
    console.log("higmail");
    var client = inbox.createConnection(false, "imap.gmail.com", {
        secureConnection: true,
        auth: {
            user: "gbbtestmail@gmail.com",
            pass: "P@$$WORD1"
        }
    });
    client.connect();
    client.on("connect", function() {
        console.log("Successfully connected to server");
        client.listMailboxes(function(error, mailboxes) {
            for (var i = 0,
                len = mailboxes.length; i < len; i++) {
                if (mailboxes[i].hasChildren) {
                    mailboxes[i].listChildren(function(error, children) {
                        console.log(children);
                    });
                }
            }
        });
        client.openMailbox("INBOX", function(error, info) {
            if (error) throw error;
            console.log("Message count in INBOX: " + info.count);
            // list newest 10 messages
            client.listMessages(-30, function(err, messages) {
                messages.forEach(function(message) {
                    var obj = new Object();
                    obj.from = message.from.address;
                    obj.date = message.date;
                    obj.subject = message.title;
                    theData.push(obj);
                });
                console.log(theData);
                res.send(theData);
            });
        });
    });
});


var port = process.env.PORT || 3000;
    app.listen(port);
