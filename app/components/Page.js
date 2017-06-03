// Include React
var React = require("react");

var ArticleCard = require("./ArticleCard");

var helpers = require("./utils/helpers");

var Page = React.createClass({


    getInitialState: function () {
        return { worldArticles: [], USArticles: [] };
    },

    componentDidMount: function () {
        // Get the latest history.
        helpers.getWorldArticles().then(function (response) {

            if (response !== this.state.newsArticles) {
                this.setState({ worldArticles: response.data });
            }
            helpers.getUSArticles().then(function (response) {

                if (response !== this.state.newsArticles) {
                    this.setState({ USArticles: response.data });
                }
            }.bind(this))

        }.bind(this));
    },

    componentDidUpdate: function () {

        // // Run the query for the address
        // helpers.runQuery(this.state.searchTerm).then(function (data) {
        //     if (data !== this.state.results) {
        //         this.setState({ results: data });

        //         // After we've received the result... then post the search term to our history.
        //         helpers.postHistory(this.state.searchTerm).then(function () {


        //             // After we've done the post... then get the updated history
        //             helpers.getHistory().then(function (response) {
        //                 console.log("Current History", response.data);

        //                 console.log("History", response.data);

        //                 this.setState({ history: response.data });

        //             }.bind(this));
        //         }.bind(this));
        //     }
        // }.bind(this));
    },

    render: function () {
        return (
            <div >

                {/*articles are displaed here*/}
                <div className="row">
                    <h3>World News</h3>
                    <hr />
                    <ArticleCard articles={this.state.worldArticles} />
                    <br />
                    <h3>US News</h3>
                    <hr />
                    <ArticleCard articles={this.state.USArticles} />
                    <br />

                </div>

            </div>
        );
    }
});

module.exports = Page;
