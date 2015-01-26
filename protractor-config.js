exports.config = {
  baseUrl: 'http://paulb896.github.io/',
  directConnect: true,
  chromeDriver: 'chromedriver',
  capabilities: {
    browserName: 'chrome'
  },
  specs: ['*spec.js']
}
