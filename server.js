// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Article = require("./app/models/Article.js");
var request = require("request");
var cheerio = require("cheerio");

mongoose.Promise = Promise;
var app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));
var PORT = process.env.PORT || 4500;

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Make public a static dir
app.use(express.static("./app/public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "app/public/index.html");
});

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/newsreact");

var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function (error) {
    console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function () {
    console.log("Mongoose connection successful.");
});


// Routes
// ======

//only set to world news right now, needs to add additional pulls, 
/*look to see if all of NYT articles follow same patterns as world news,
if they do then just create the below to a function and send it the link / category /ect */


app.get("/find/us", function (req, res) {
    //US news
    request("https://www.nytimes.com/section/us?WT.nav=page&action=click&contentCollection=U.S.&module=HPMiniNav&pgtype=Homepage&region=TopBar", function (error, response, html) {
        var $ = cheerio.load(html);
        var result = [];
        $(".story").each(function (i, element) {

            var image = $(element).find("img").attr("src");
            var link = $(element).find("div > h2 > a").attr("href") || $(element).find(".story-link").attr("href");
            var title = $(element).find("div > h2 > a").text() || $(element).find(".headline").text().trim();
            var summary = $(element).find(".summary").text();
            var utcDate = $(element).find("time").attr("data-utc-timestamp") || $(element).find("time").attr("datetime");
            // var isoDate = new Date(utcDate).toISOString();

            var article = {
                title: title,
                image: image,
                link: link,
                summary: summary,
                date: utcDate,
                category: "US",
                source: "NYT"
            }


            var query = { title: article.title },
                update = {
                    title: title,
                    image: image,
                    link: link,
                    summary: summary,
                    date: utcDate,
                    category: "US",
                    source: "NYT"
                },
                options = { upsert: false };


            Article.findOneAndUpdate(query, update, options, function (error, entry) {
                if (!error) {
                    // If the document doesn't exist
                    if (!entry) {
                        // Create it
                        entry = new Article(article);
                    }
                    // Save the document
                    entry.save(function (error) {
                        if (!error) {
                            // Do something with the document
                        } else {
                            throw error;
                        }
                    });
                }
            });

            console.log(article)

        });
    });
});


app.get("/find/world", function (req, res) {
    //world news
    request("https://www.nytimes.com/section/world?WT.nav=page&action=click&contentCollection=World&module=HPMiniNav&pgtype=Homepage&region=TopBar", function (error, response, html) {
        var $ = cheerio.load(html);
        var result = [];
        $(".story").each(function (i, element) {

            var image = $(element).find("img").attr("src");
            var link = $(element).find("div > h2 > a").attr("href") || $(element).find(".story-link").attr("href");
            var title = $(element).find("div > h2 > a").text() || $(element).find(".headline").text().trim();
            var summary = $(element).find(".summary").text();
            var utcDate = $(element).find("time").attr("data-utc-timestamp") || $(element).find("time").attr("datetime");

            var article = {
                title: title,
                image: image,
                link: link,
                summary: summary,
                date: utcDate,
                category: "World",
                source: "NYT"
            }


            var query = { title: article.title },
                update = {
                    title: title,
                    image: image,
                    link: link,
                    summary: summary,
                    date: utcDate,
                    category: "World",
                    source: "NYT"
                },
                options = { upsert: false };


            Article.findOneAndUpdate(query, update, options, function (error, entry) {
                if (!error) {
                    // If the document doesn't exist
                    if (!entry) {
                        // Create it
                        entry = new Article(article);
                    }
                    // Save the document
                    entry.save(function (error) {
                        if (!error) {
                            // Do something with the document
                        } else {
                            throw error;
                        }
                    });
                }
            });

            console.log(article)

        });
    });
});

app.get("/api/world", function (req, res) {
    Article.find({"category":"World"}).sort([
    ["date", "descending"]
    ]).limit(4).exec(function (err, doc) {

        if (err) {
            console.log(err);
        }
        else {
            res.send(doc);
        }
    });

});

app.get("/api/us", function (req, res) {
    Article.find({"category":"US"}).sort([
    ["date", "descending"]
    ]).limit(4).exec(function (err, doc) {

        if (err) {
            console.log(err);
        }
        else {
            res.send(doc);
        }
    });

});

app.get("/api", function (req, res) {
    Article.find({}).exec(function (err, doc) {

        if (err) {
            console.log(err);
        }
        else {
            res.send(doc);
        }
    });

});

app.listen(PORT, function () {
    console.log("App running on port" + PORT);
});


