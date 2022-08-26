try {
  var assert = require("assert");
  var webdriver = require("selenium-webdriver");
  var conf = require("../mocha.config");

  var capabilities = conf.capabilities;

  var buildDriver = function (caps) {
    return new webdriver.Builder()
      .usingServer(
        "http://" +
        LT_USERNAME +
        ":" +
        LT_ACCESS_KEY +
        "@hub.lambdatest.com/wd/hub"
      )
      .withCapabilities(caps)
      .build();
  };

  capabilities.forEach(function (caps) {

    describe("Mocha Todo Test " + caps.browserName, function () {
      var driver;
      this.timeout(0);

      beforeEach(function (done) {
        caps.name = this.currentTest.title;
        driver = buildDriver(caps);
        done();
      });

      it("can find search results" + caps.browserName, function (done) {
        driver.get("http://localhost:5000").then(function () {
          console.log("Successfully clicked first list item.");
        });
      });

      afterEach(function (done) {
        if (this.currentTest.isPassed()) {
          driver.executeScript("lambda-status=passed");
        } else {
          driver.executeScript("lambda-status=failed");
        }
        // driver.quit().then(function () {
        //   // done();
        // });
      });
    });
  });
} catch (error) {
  console.log(error, 'error')
}