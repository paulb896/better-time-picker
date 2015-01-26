exports.config = {
  directConnect: true,
  chromeDriver: 'chromedriver',
  capabilities: {
    browserName: 'chrome'
  },
  specs: ['*spec.js']
}
