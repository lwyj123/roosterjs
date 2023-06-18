var context = require.context('../packages/lwyj123-roosterjs-content-model', true, /test\/.+\.ts?$/);
var karmaTest = require('./karma.test');

module.exports = karmaTest(context);
