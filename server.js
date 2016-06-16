var express = require("express");
var app = express();
var router = express.Router();
var inbox = require("inbox");
const async = require('async');
var request = require("request");
var nodemailer = require('nodemailer');


var path = __dirname + '/views/';
app.use(express.static('public'));
router.use(function(req, res, next) {
    console.log("/" + req.method);
    next();
});
router.get("/", function(req, res) {
    res.sendFile(path + "index.html");
});
app.use("/", router);

var out_client = inbox.createConnection(143, "mail.airforce.mil.ng", {
    secureConnection: false,
    auth: {
        user: "gb",
        pass: "Password1"
    }
});
 console.log("connect start outlook");
out_client.connect();
out_client.on("error", function(er) {
    ///return if error connecting
      console.log("error outlook");
    console.log(er);
});
out_client.on("connect", function() {
    console.log("Successfully connected to outlook server");
    ///vars
    var ToEmail = "gbbtestmail@gmail.com";
    var FromEmail = "gb@airforce.mil.ng";
    var replySubject = "Tester Gmail Node";
    ////
    var transporter = nodemailer.createTransport({
        host: 'mail.airforce.mil.ng',
        port:25,
        auth: {
            user: 'gb', // Your email id
            pass: 'Password1' // Your password
        },
        tls: {rejectUnauthorized: false} 
    });
    out_client.openMailbox("INBOX", function(error, info) {
        if (error) {
            console.log("outlook" + error);
        }
        //return if error connecting
      console.log("not error outlook");
        // list newest 10 messages
        out_client.listMessages(-60, function(err, messages) {
            messages.forEach(function(message) {
                console.log(message.title);
                if (message.title ==="Tester Gmail") ///&& date(now)
                {
                    var mailOptions = {
                        from: FromEmail, // sender address
                        to: ToEmail, // list of receivers
                        subject: replySubject, // Subject line
                        text: "Hello World" //, // plaintext body
                    };

                    transporter.sendMail(mailOptions, function(error, info) {
                        if (error) {
                            console.log("connecting");
                            console.log(error);
                           
                        } else {
                            console.log('Message sent: ' + info.response);
                           
                        };
                    });

                }

            });
        });
    });
});
///
function typeOf(obj) {
        return {}.toString.call(obj).split(' ')[1].slice(0, -1).toLowerCase();
    }
    ///Add Server///
app.get('/add_server_json', function(req, res) {});
///test owa
app.get('/test_owa_url', function(req, res) {
    console.log(req._parsedUrl.query);
    testUrl = req._parsedUrl.query;
    request.get({
        url: testUrl,
        rejectUnauthorized: false,
        timeout: 9000 // <---- THAT'S IT. AN OPTION.
    }, function(err) {
        console.log(testUrl);
        // handle errors
        if (err) {
            res.send("fail");
            console.log(err);
        } else {
            res.send("pass");
        }
        // process results
    });
});
///YahooMail
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
            console.log("Message count in INBOX: " + info.count);
            // list newest 10 messages
            client.listMessages(-50, function(err, messages) {
                messages.forEach(function(message) {
                    var obj = new Object();
                    obj.from = message.from.address;
                    obj.date = message.date;
                    obj.subject = message.title;
                    theData.push(obj);
                });
                res.send(theData);
            });
        });
    });
});
///Gmail
router.get('/getgmails', function(req, res) {
    var theGmailData = [];
    console.log("higmail");
    var gmail_client = inbox.createConnection(false, "imap.gmail.com", {
        secureConnection: true,
        auth: {
            user: "gbbtestmail@gmail.com",
            pass: "P@$$WORD1"
        }
    });
    gmail_client.connect();
    gmail_client.on("error", function(er) {
        console.log('Error @Gmail');
        console.log(er);
    });
    gmail_client.on("connect", function() {
        console.log("Successfully connected to gmail server");
        gmail_client.openMailbox("INBOX", function(error, info) {
            console.log("ERRORSADEEQ" + error);
            if (error) {
                console.log("ERRORSADEEQ" + error);
            }
            // list newest 10 messages
            gmail_client.listMessages(-50, function(err, messages) {
                messages.forEach(function(message) {
                    var obj = new Object();
                    obj.from = message.from.address;
                    obj.date = message.date;
                    obj.subject = message.title;
                    theGmailData.push(obj);
                });
                res.send(theGmailData);
            });
        });
    });
});///
/////workbook


///portt
var port = process.env.PORT || 3000;
app.listen(port);