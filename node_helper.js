const NodeHelper = require("node_helper");
const request = require("request");
const moment = require("moment");
const Log = require("logger");

module.exports = NodeHelper.create({
  start: function () {
    Log.log("Starting module helper: " + this.name);
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === "CONFIG") {
      this.config = payload;
      this.collectData();
      let self = this;
      setInterval(function () {
        self.collectData();
      }, 60 * 1000);
    }
  },

  collectData: function () {
    let today;
    if (moment() < moment(this.config.switchTime, "HH:mm")) {
      today = moment().format("YYYY-MM-DD");
    } else {
      today = moment().add(1, "days").format("YYYY-MM-DD");
    }
    let requestURL =
      "https://openmensa.org/api/v2/canteens/" +
      this.config.canteen +
      "/days/" +
      today +
      "/meals";
    // Log.log(requestURL);
    let self = this;
    request(
      {
        url: requestURL,
        json: true
      },
      function (error, response, body) {
        Log.log("MMM-Canteen - statusCode: ", response && response.statusCode);
        if (error) {
          Log.error(error);
        } else if (response.statusCode === 404) {
          Log.info("Kantine hat heut dicht!");
          self.sendSocketNotification("CLOSED", null);
        } else {
          self.sendSocketNotification("MEALS", body);
        }
      }
    );
  }
});
