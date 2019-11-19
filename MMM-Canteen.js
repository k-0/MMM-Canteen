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
    },  
   header: "test-canteen",
   getDom: function() {
	var request = require('request');
	var today;
	if ((new Date().toISOString().substr(11,2) < 16)) {
	 today = new Date().toISOString().substr(0,10);
	}
	else {
	 today = new Date();
	 today.setDate(today.getDate()+1);
	 today= today.toISOString().substr(0,10);
	}
   	var cnt = 0;
   	request({
    	url: 'https://openmensa.org/api/v2/canteens/838/days/'+today+'/meals',
    	json: true
 	}, function(error, response, body) {
	console.log('\nCAFETERIA EAH ' +  today.substring(8,10)+ '.'+today.substring(5,7) +'.'+today.substring(0,4)+':');
	if (body.length < 1){
	 console.log('Today closed!')
	// need html instead console output here... 
	}
	else {
	  while (body.length > cnt) {
		  // need html output here...
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
