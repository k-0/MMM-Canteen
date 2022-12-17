var NodeHelper = require('node_helper');
const https = require('https');
var moment = require('moment');


module.exports = NodeHelper.create({

  start: function() {
    console.log("Starting module helper: " + this.name);
  },


  socketNotificationReceived: function(notification, payload) {
    if (notification === 'CONFIG') {
      this.config = payload;
      this.collectData();
      self = this;
      setInterval(function () {
        self.collectData();
      }, 60 * 1000);
    }
  },

  collectData: function () {
    var today;
    if (moment() < moment(this.config.switchTime, "HH:mm")) {
     today = moment().format("YYYY-MM-DD");
    } else {
     today = moment().add(1, "days").format("YYYY-MM-DD");
    }
    var requestURL = 'https://openmensa.org/api/v2/canteens/'+this.config.canteen+'/days/'+today+'/meals';
    console.log(requestURL);
    var self = this;
    https.get(requestURL, (response) => {
      console.log('statusCode: ', response && response.statusCode);

      response.on('data', (chunk) => {
          if (response.statusCode == 404) {
              console.log("Kantine hat heut dicht!");
              self.sendSocketNotification("CLOSED", null);
          } else {
              console.log("Data: "+ JSON.parse(chunk));
              self.sendSocketNotification("MEALS", JSON.parse(chunk));
          }
      });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
  }
});
