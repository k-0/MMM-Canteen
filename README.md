# MMM-Canteen

MMM-Canteen is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror) project.

It shows the the menu including the prices of canteens from universities in germany and switzerland (based on openmensa.org).

## Screenshot

![Example of a canteen in Jena](img/example1.png)

## Installation

Clone the module into your MagicMirror² module folder.

```console
git clone https://github.com/k-0/MMM-Canteen.git
cd MMM-Canteen
npm install

```

## Using the module

### Configuration

To use this module, add it to the `config.js` file. Here is an example:

```javascript
{
    module: 'MMM-Canteen',
    position: 'bottom_center',
    config: {
        canteenName: 'Mensa am Park',
        canteen: 63,
        status: "employees",
        switchTime: "16:00"
    }
}
```

### Configuration options

| Option  | Description | Type | Default |
| ------- | --- | --- | --- |
| updateInterval | Interval to update data | Integer | 600000 (= 10 minutes) |
| canteen | ID from the openmensa.org url | Integer | 63 (= Mensa am Park, Uni Leipzig) |
| status | Your status ["employees", "students", "pupils", "others"] | String | "employees" |
| truncate | Truncate more than x letters   | Integer | 100 |
| debug | Debugging | Boolean | false |
| canteenName | Name of the canteen | String | "Mensa am Park" |
| switchTime | Shows the menu from next day, if switchTime < now | Timestamp (HH:mm) | "16:00" |
| animationSpeed | Speed of the update animation (in milliseconds).<br>If you don't want that the module blinks during an update, set the value to `0`. <br> **Possible values:** `0` - `5000` | Integer | `500` |
