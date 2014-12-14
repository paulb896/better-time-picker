(function() {
  var module = this;

  module.directive('betterTimePicker', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'better-time-picker.html',
      scope: {
      },
      bindToController: true,
      controllerAs: 'betterTimePicker',
      controller: function($scope) {
        var betterTimePicker = this;
        betterTimePicker.initializeTime = function() {
          betterTimePicker.PageState = {};
          var currentDate = new Date();
          betterTimePicker.UserSelection = {
            selectedDate: currentDate
          };

          betterTimePicker.setSelectedHour(currentDate.getHours());
          betterTimePicker.setSelectedMinute(currentDate.getMinutes());
          betterTimePicker.setHourPicker();
        };

        betterTimePicker.clearTimeCircle = function() {
          betterTimePicker.PageState.times = [];
        };

        betterTimePicker.setHourPicker = function() {
          betterTimePicker.PageState.hourPickerEnabled = true;
          betterTimePicker.clearTimeCircle();
          var items = 12;
          for(var i = 1; i <= items; i++) {
              var x = 100 - 12 + 104 * Math.cos(2 * Math.PI * i / items - (Math.PI/2) );
              var y = 100 - 12 + 104 * Math.sin(2 * Math.PI * i / items - (Math.PI/2) );
              betterTimePicker.PageState.times.push({x: x, y:y, value: i});
          }
        };

        betterTimePicker.setMinutePicker = function() {
          betterTimePicker.PageState.hourPickerEnabled = false;
          betterTimePicker.clearTimeCircle();
          var items = 12;
          for(var i = 0; i < items; i++) {
            var x = 100 - 12 + 104 * Math.cos(2 * Math.PI * i / items - (Math.PI/2)),
            y = 100 - 12 + 104 * Math.sin(2 * Math.PI * i / items - (Math.PI/2)),
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

        betterTimePicker.setSelectedTime = function(time) {
          if (betterTimePicker.PageState.hourPickerEnabled) {
            betterTimePicker.setSelectedHour(time);
          } else {
            betterTimePicker.setSelectedMinute(time);
          }
          betterTimePicker.clearTimeCircle();
        };

        betterTimePicker.setSelectedHour = function(hour) {
          betterTimePicker.UserSelection.selectedDate.setHours(hour);
        };

        /**
         * Set hour/minute depending on time picker state.
         * @param int minute
         */
        betterTimePicker.setSelectedMinute = function(minute) {
          betterTimePicker.UserSelection.selectedDate.setMinutes(minute);
        };
      },
      link: function(scope, element, attrs, betterTimePicker) {
        betterTimePicker.initializeTime();
      }
    }
  })
}).call(angular.module('betterTimePicker', []));
