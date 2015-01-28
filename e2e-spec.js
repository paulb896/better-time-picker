describe('better-time-picker', function() {
  browser.get('better-time-picker');
  var currentDateTime = new Date();

  it('should have a title', function() {
    var title = browser.getTitle();
    expect(title).toEqual('Better Angular Time Picker');
  });

  it('should display current hour', function() {
    var expectedHour = currentDateTime.getHours();
    if (expectedHour > 12) {
      expectedHour -= 12;
    }
    if (expectedHour < 9) {
      expectedHour = '0' + expectedHour;
    }

    var hour = element(by.binding("betterTimePicker.UserSelection.selectedDate | date:'hh'")).getText();
    expect(hour).toEqual(expectedHour.toString());
  });

  it('should show hour options when chosing hour picker', function() {
    element(by.binding("betterTimePicker.UserSelection.selectedDate | date:'hh'")).click();

    expect(element.all(by.repeater("timeUnit in betterTimePicker.PageState.times")).first().getText()).toEqual('1');
    expect(element.all(by.repeater("timeUnit in betterTimePicker.PageState.times")).last().getText()).toEqual('12');
  });

  it('should show minute options when selecting minute picker', function() {
    element(by.binding("betterTimePicker.UserSelection.selectedDate | date:'mm'")).click();

    expect(element.all(by.repeater("timeUnit in betterTimePicker.PageState.times")).first().getText()).toEqual('0');
    expect(element.all(by.repeater("timeUnit in betterTimePicker.PageState.times")).last().getText()).toEqual('55');
  });

  it('should change selected hour when clicking on an hour choice', function() {
    // When selecting hour picker
    element(by.binding("betterTimePicker.UserSelection.selectedDate | date:'hh'")).click();

    // And selecting (by clicking) the first hour choice
    element.all(by.repeater("timeUnit in betterTimePicker.PageState.times")).first().click();
    expect(element(by.binding("betterTimePicker.UserSelection.selectedDate | date:'hh'")).getText()).toEqual('01');

    // And selecting (by clicking) the last hour choice
    element.all(by.repeater("timeUnit in betterTimePicker.PageState.times")).last().click();
    expect(element(by.binding("betterTimePicker.UserSelection.selectedDate | date:'hh'")).getText()).toEqual('12');
  });

  it('should change selected minute when clicking on an minute choice', function() {
    // When selecting hour picker
    element(by.binding("betterTimePicker.UserSelection.selectedDate | date:'mm'")).click();

    // And selecting (by clicking) the first minute choice
    element.all(by.repeater("timeUnit in betterTimePicker.PageState.times")).first().click();
    expect(element(by.binding("betterTimePicker.UserSelection.selectedDate | date:'mm'")).getText()).toEqual('00');

    // And selecting (by clicking) the last minute choice
    element.all(by.repeater("timeUnit in betterTimePicker.PageState.times")).last().click();
    expect(element(by.binding("betterTimePicker.UserSelection.selectedDate | date:'mm'")).getText()).toEqual('55');
  });
});
