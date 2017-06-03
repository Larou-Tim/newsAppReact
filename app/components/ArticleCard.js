// Include React
var React = require("react");

var ArticleCard = React.createClass({

    getInitialState: function () {
        return {
            number: 0
        };
    },


    render: function () {

        return (
            <div className="row">

                {this.props.articles.map(function (search, i) {
                    return (

                        <div className="col s3">
                            <div className="card">
                                <div className="card-image">
                                {search.image ? <img src={search.image}/> : <img src="/images/nytLogo.jpg" />}
                                    
                                    <span className="card-title " key={i}>{search.category} - {search.date}</span>
                                </div>
                                <div className="card-content">
                                    <p key={i} >{search.title}</p>
                                </div>
                                <div className="card-action">
                                    <a href={search.link}>Read more</a>
                                </div>
                            </div>
                        </div >

                    );

                })}

            </div>
        );
    }
});

// Export the component back for use in other files
module.exports = ArticleCard;
