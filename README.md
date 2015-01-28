better-time-picker
==================


Demo page can be found [HERE](http://paulb896.github.io/better-time-picker/ "Title")


Install with bower

    > bower install better-time-picker


Html view

    <html>
    ...
    <link href="better-time-picker.css" rel="stylesheet" type="text/css" media="all">

    ...

    <better-time-picker date="dateModel.date"></better-time-picker>

    ...

    <script src="bower_components/angular/angular.js"></script>
    <script src="betterTimePicker.js"></script>

    ...

    angular.module('someApp', ['betterTimePicker']);

Run Protractor Tests

    > npm test
