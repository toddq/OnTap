// Initialize Firebase
var config = {
    apiKey: "AIzaSyDMC7_SnUSS6qxi44iU6vFgjVFUub8iScw",
    authDomain: "ontap-a835d.firebaseapp.com",
    databaseURL: "https://ontap-a835d.firebaseio.com",
    storageBucket: ""
};
firebase.initializeApp(config);


var ReactFireComponent = React.createClass({
    mixins: [ReactFireMixin],
    // ...
    componentWillMount: function() {
        var ref = firebase.database().ref("items");
        this.bindAsArray(ref, "items");
    },
    render: function () {
        return (
            <h1>Hello, world!</h1>
        );
    }
});