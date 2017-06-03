var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    link: {
        type: String,
        required: true
    },

    category: {
        type: String
    },

    image: {
        type: String
    },
    summary: {
        type: String
    },

    source: {
        type: String
    }

});

var Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;
