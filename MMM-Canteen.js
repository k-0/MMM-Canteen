Module.register("MMM-Canteen", {
  defaults: {},
	start: function() {
        Log.info("Starting module: " + this.name);
        // Set locale.
        this.sendSocketNotification("CONFIG", this.config);
        var self = this;
        setInterval(() => {
          self.updateDom();
        }, self.config.updateInterval);
    },  header: "test-canteen",
	getDom: function() {
		var request = require('request');
var heute;
if ((new Date().toISOString().substr(11,2) < 16)) {
	 heute = new Date().toISOString().substr(0,10);
}
else
{
	 heute = new Date();
	 heute.setDate(heute.getDate()+1);
	 heute= heute.toISOString().substr(0,10);

}
var cnt = 0;
request({
  url: 'https://openmensa.org/api/v2/canteens/838/days/'+heute+'/meals',
  json: true
}, function(error, response, body) {
	 console.log('\nCAFETERIA EAH am ' +  heute.substring(8,10)+ '.'+heute.substring(5,7) +'.'+heute.substring(0,4)+':');
	if (body.length < 1){
		console.log('Heute geschlossen!')
	}
	else {
	  while (body.length > cnt) {
		console.log(body[cnt].name);
		console.log(body[cnt++].prices.employees.toFixed(2) +'€');
		}				
	}
});
		var wrapper = document.createElement("div");
		wrapper.innerHTML = this.config.text;
		return wrapper;
	}  notificationReceived: function() {},
  socketNotificationReceived: function() {},
})
