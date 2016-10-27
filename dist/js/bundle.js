(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/toddqu/Dropbox/Projects/ontap/src/app.js":[function(require,module,exports){
debugger
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDMC7_SnUSS6qxi44iU6vFgjVFUub8iScw",
    // authDomain: "ontap-a835d.firebaseapp.com",
    databaseURL: "https://ontap-a835d.firebaseio.com",
    // storageBucket: "",
};
firebase.initializeApp(config);

var ExampleComponent = React.createClass({displayName: "ExampleComponent",
    mixins: [ReactFireMixin],
    // ...
    componentWillMount: function() {
        var ref = firebase.database().ref("items");
        this.bindAsArray(ref, "items");
    },
    render: function () {
        React.createElement("h1", null, "Hello, world!")
        // document.getElementById('example')
    }
});

ReactDOM.render(
  React.createElement(ExampleComponent, null),
  document.getElementById('example')
);

},{}]},{},["/Users/toddqu/Dropbox/Projects/ontap/src/app.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvdG9kZHF1L0Ryb3Bib3gvUHJvamVjdHMvb250YXAvc3JjL2FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFFBQVE7QUFDUixzQkFBc0I7QUFDdEIsSUFBSSxNQUFNLEdBQUc7QUFDYixJQUFJLE1BQU0sRUFBRSx5Q0FBeUM7O0FBRXJELElBQUksV0FBVyxFQUFFLG9DQUFvQzs7Q0FFcEQsQ0FBQztBQUNGLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRS9CLElBQUksc0NBQXNDLGdDQUFBO0FBQzFDLElBQUksTUFBTSxFQUFFLENBQUMsY0FBYyxDQUFDOztJQUV4QixrQkFBa0IsRUFBRSxXQUFXO1FBQzNCLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDbEM7SUFDRCxNQUFNLEVBQUUsWUFBWTtBQUN4QixRQUFRLG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUEsZUFBa0IsQ0FBQTs7S0FFekI7QUFDTCxDQUFDLENBQUMsQ0FBQzs7QUFFSCxRQUFRLENBQUMsTUFBTTtFQUNiLG9CQUFDLGdCQUFnQixFQUFBLElBQUEsQ0FBRyxDQUFBO0VBQ3BCLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDO0NBQ25DIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImRlYnVnZ2VyXG4vLyBJbml0aWFsaXplIEZpcmViYXNlXG52YXIgY29uZmlnID0ge1xuICAgIGFwaUtleTogXCJBSXphU3lETUM3X1NuVVNTNnF4aTQ0aVU2dkZnalZGVXViOGlTY3dcIixcbiAgICAvLyBhdXRoRG9tYWluOiBcIm9udGFwLWE4MzVkLmZpcmViYXNlYXBwLmNvbVwiLFxuICAgIGRhdGFiYXNlVVJMOiBcImh0dHBzOi8vb250YXAtYTgzNWQuZmlyZWJhc2Vpby5jb21cIixcbiAgICAvLyBzdG9yYWdlQnVja2V0OiBcIlwiLFxufTtcbmZpcmViYXNlLmluaXRpYWxpemVBcHAoY29uZmlnKTtcblxudmFyIEV4YW1wbGVDb21wb25lbnQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgbWl4aW5zOiBbUmVhY3RGaXJlTWl4aW5dLFxuICAgIC8vIC4uLlxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihcIml0ZW1zXCIpO1xuICAgICAgICB0aGlzLmJpbmRBc0FycmF5KHJlZiwgXCJpdGVtc1wiKTtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICA8aDE+SGVsbG8sIHdvcmxkITwvaDE+XG4gICAgICAgIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdleGFtcGxlJylcbiAgICB9XG59KTtcblxuUmVhY3RET00ucmVuZGVyKFxuICA8RXhhbXBsZUNvbXBvbmVudCAvPixcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2V4YW1wbGUnKVxuKTsiXX0=
