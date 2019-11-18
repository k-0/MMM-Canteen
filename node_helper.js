var NodeHelper = require("node_helper")

module.exports = NodeHelper.create({
  start: function() {
	      this.countDown = 10000
  },


socketNotificationReceived: function(notification, payload) {
    if (notification === 'CONFIG') {
        this.config = payload;
        this.collectData();
        self = this;
        setInterval(function () {
            self.collectData();
        },  10 * 60 * 1000);
    }
  },

  collectData: function () {
    request(url, function (error, response, body) {
      self.sendSocketNotification("DATA", response);
    });
  }
})
