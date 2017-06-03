// Include the React Dependencies
var React = require("react");
var ReactDOM = require("react-dom");

// Include the main Parent component
var Page = require("./components/Page");

// This code here allows us to render our main component (in this case Parent)
ReactDOM.render(<Page />, document.getElementById("app"));
