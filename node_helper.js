var NodeHelper = require('node_helper');
var request = require('request');
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
    if (moment().hour() < 16) {
     today = moment().format("YYYY-MM-DD");
    } else {
     today = moment().add(1, "days").format("YYYY-MM-DD");
    }
    var requestURL = 'http://openmensa.org/api/v2/canteens/'+this.config.canteen+'/days/'+today+'/meals';
    console.log(requestURL);
    var self = this;
    request({
      url: requestURL,
      json: true
    }, function(error, response, body) {
      console.log('statusCode: ', response && response.statusCode);
      if (error) {
        console.log(error);
      } else if (response.statusCode == 404) {
        console.log("Kantine hat heut dicht!");
        self.sendSocketNotification("DICHT", null);
      } else {
        self.sendSocketNotification("MEALS", body);
      }
    });
  }
});
