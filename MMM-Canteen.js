/* global Log, Module, moment */

/* MagicMirror²
 * Module: MMM-Canteen
 */
Module.register("MMM-Canteen", {
  defaults: {
    updateInterval: 10 * 60 * 1000, // 10 minutes
    canteen: 838,
    status: "employees", // choose between ["employees", "students", "pupils", "others"]
    truncate: 100,
    switchTime: "16:00",
    debug: false,
    canteenName: "Kantine",
    animationSpeed: 500
  },

  loading: true,
  closed: false,
  meals: [],

  start() {
    Log.info(`Starting module: ${this.name}`);
    this.sendSocketNotification("CONFIG", this.config);
  },

  getStyles() {
    return ["MMM-Canteen.css"];
  },

  getTemplate() {
    return "MMM-Canteen.njk";
  },

  getTemplateData() {
    this.log("Updating template data");
    return {
      today:
        moment() < moment(this.config.switchTime, "HH:mm")
          ? moment().format("DD.MM.YYYY")
          : moment().add(1, "days").format("DD.MM.YYYY"),
      config: this.config,
      loading: this.loading,
      meals: this.meals,
      closed: this.closed
    };
  },

  socketNotificationReceived(notification, payload) {
    Log.info(`Socket Notification received: ${notification}`);
    this.loading = false;
    if (notification === "MEALS") {
      if (payload.length) {
        this.closed = false;
        this.meals = payload;
        this.log(this.meals);
      }
    } else if (notification === "CLOSED") {
      this.log("Mensa hat heute geschlossen!");
      this.closed = true;
    }
    this.updateDom(this.config.animationSpeed);
  },

  log(msg) {
    if (this.config && this.config.debug) {
      Log.info(`${this.name}: ${JSON.stringify(msg)}`);
    }
  }
});
