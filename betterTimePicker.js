(function() {
  var module = this;

  module.directive('betterTimePicker', function() {
    return {
      restrict: 'AE',
      replace: true,
      templateUrl: 'better-time-picker.html',
      scope:{
        date: "=",
        hideAfterSelection: "="
      },
      bindToController: true,
      controllerAs: 'betterTimePicker',
      controller: function($scope) {
        var betterTimePicker = this;
        betterTimePicker.initializeTime = function(date) {
          betterTimePicker.PageState = {};
          betterTimePicker.PageState.times = [];
          var currentDate = date;
          if (!currentDate) {
            currentDate = new Date();
          } else if (typeof date == "string") {
            currentDate = new Date(date);
          }
          betterTimePicker.UserSelection = {
            selectedDate: currentDate
          };

          betterTimePicker.setSelectedHour(currentDate.getHours());
          betterTimePicker.setSelectedMinute(currentDate.getMinutes());
          betterTimePicker.setSelectedMinute(currentDate.getSeconds());
          betterTimePicker.selectHourPicker();
        };

        betterTimePicker.bindDate = function() {
          betterTimePicker.date = betterTimePicker.UserSelection.selectedDate;
        }

        betterTimePicker.clearTimeCircle = function() {
          betterTimePicker.PageState.times = [];
          betterTimePicker.PageState.hourPickerEnabled = false;
          betterTimePicker.PageState.minutePickerEnabled = false;
          betterTimePicker.PageState.secondPickerEnabled = false;
        };

        betterTimePicker.selectHourPicker = function() {
          betterTimePicker.clearTimeCircle();
          betterTimePicker.PageState.hourPickerEnabled = true;
          var items = 12;
          for(var i = 1; i <= items; i++) {
              var x = 60 + 104 * Math.cos(2 * Math.PI * i / items - (Math.PI/2) );
              var y = 60 + 104 * Math.sin(2 * Math.PI * i / items - (Math.PI/2) );
              betterTimePicker.PageState.times.push({x: x, y:y, value: i});
          }
        };

        betterTimePicker.selectMinutePicker = function() {
          betterTimePicker.clearTimeCircle();
          betterTimePicker.PageState.minutePickerEnabled = true;
          var items = 12;
          for(var i = 0; i < items; i++) {
            var x = 60 + 104 * Math.cos(2 * Math.PI * i / items - (Math.PI/2)),
            y = 60 - 12 + 104 * Math.sin(2 * Math.PI * i / items - (Math.PI/2)),
            value = i *5;
            betterTimePicker.PageState.times.push({x: x, y:y, value: value});
          }
        };

        betterTimePicker.toggleAmPm = function() {
          var hour = betterTimePicker.UserSelection.selectedDate.getHours() + 12;
          if (hour > 23) {
            hour = hour - 24;
          }
          betterTimePicker.UserSelection.selectedDate.setHours(hour);
        };

        betterTimePicker.setSelectedHour = function(hour) {
          betterTimePicker.UserSelection.selectedDate.setHours(hour);
        };

        betterTimePicker.setSelectedMinute = function(minute) {
          betterTimePicker.UserSelection.selectedDate.setMinutes(minute);
        };

        betterTimePicker.setSelectedSecond = function(second) {
          betterTimePicker.UserSelection.selectedDate.setSeconds(second);
        };

        betterTimePicker.setSelectedTime = function(time) {
          betterTimePicker.hideAfterSelection && betterTimePicker.clearTimeCircle();
          if (betterTimePicker.PageState.hourPickerEnabled) {
            betterTimePicker.setSelectedHour(time);
          } else if (betterTimePicker.PageState.minutePickerEnabled) {
            betterTimePicker.setSelectedMinute(time);
          } else if (betterTimePicker.PageState.secondPickerEnabled) {
            betterTimePicker.setSelectedSecond(time);
          }
        };
      },
      link: function(scope, element, attrs, betterTimePicker) {
        betterTimePicker.initializeTime();
        if (attrs.date) {
          betterTimePicker.bindDate();
        }
      }
    }
  })
}).call(angular.module('betterTimePicker', []));
