var { setDefaultTimeout, setWorldConstructor } = require('cucumber');
var { Builder } = require('selenium-webdriver');

var buildChromeDriver = function() {
    return new Builder().forBrowser("chrome").build();
};

setDefaultTimeout(20 * 1000);

var World = function World() {
    this.driver = buildChromeDriver();
    this.jsExecutor = this.driver;
};

setWorldConstructor(World);
