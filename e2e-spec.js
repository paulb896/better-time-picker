describe('angularjs homepage', function() {
  browser.get('http://paulb896.github.io/better-time-picker/');
  var currentDateTime = new Date();

  it('should have a title', function() {
    var title = browser.getTitle();
    expect(title).toEqual('Better Angular Time Picker');
  });

  it('should display current hour', function() {
    var expectedHour = currentDateTime.getHours();
    if (expectedHour > 12) {
      expectedHour= '0' + (expectedHour - 12);
    }

    var hour = element(by.binding("betterTimePicker.UserSelection.selectedDate | date:'hh'")).getText();
    expect(hour).toEqual(expectedHour);
  });

  it('should show hour options when chosing hour picker', function() {
    element(by.binding("betterTimePicker.UserSelection.selectedDate | date:'hh'")).click();

    expect(element.all(by.repeater("timeUnit in betterTimePicker.PageState.times")).first().getText()).toEqual('1');
    expect(element.all(by.repeater("timeUnit in betterTimePicker.PageState.times")).last().getText()).toEqual('12');
  });

  it('should show minute options when chosing minute picker', function() {
    element(by.binding("betterTimePicker.UserSelection.selectedDate | date:'mm'")).click();

    expect(element.all(by.repeater("timeUnit in betterTimePicker.PageState.times")).first().getText()).toEqual('0');
    expect(element.all(by.repeater("timeUnit in betterTimePicker.PageState.times")).last().getText()).toEqual('55');
  });
});
