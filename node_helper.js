const NodeHelper = require("node_helper");
const moment = require("moment");
const Log = require("logger");

const fetch = (...args) =>
  import ("node-fetch").then(({ default: fetch }) => fetch(...args));

module.exports = NodeHelper.create({
  start: function() {
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

  collectData: async function () {
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

    try {
      const response = await fetch(requestURL);

      if (response.status === 404) {
        Log.info("Kantine hat heut dicht!");
        self.sendSocketNotification("CLOSED", null);
      } else {
        const data = await response.json();
        // Log.log(data);
        self.sendSocketNotification("MEALS", data);
      }
    } catch (error) {
      Log.error(error);
    }
  }
});
