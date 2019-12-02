# MMM-Canteen (Updated on 12/02/2019)

MMM-Canteen is a module for the [MagicMirror](https://github.com/MichMich/MagicMirror) project.

It shows the the menu including the prices of canteens from universities in germany and switzerland (based on openmensa.org).

## Screenshot
<img src="https://user-images.githubusercontent.com/9365668/69614485-7a552b80-1033-11ea-8885-54cd76336ca0.png"/>

## Installation
Clone the module into your MagicMirror module folder.
```
git clone https://github.com/k-0/MMM-Canteen.git

```

## Configuration
To display the module insert it in the config.js file. Here is an example:
```
{
    module: 'MMM-Canteen',
    position: 'bottom_center',
    config: {
        updateInterval: 600000,     
        canteen: 63,                        
        status: "employees",               
        truncate: 100,                                      
        switchTime: "16:00"                
}
}
```
<br>

| Option  | Description | Type | Default |
| ------- | --- | --- | --- |
| updateInterval | Interval to update data | Integer | 600000 (= 10 minutes) |
| canteen | ID from the openmensa.org url | Integer | 63 (= Mensa am Park, Uni Leipzig) |
| status | Your status ["employees", "students", "pupils", "others"] | String | "employees" |
| truncate | Truncate more than x letters   | Integer | 100 |
| debug | Debugging | Boolean | false |
| switchTime | Shows the menu from next day, if switchTime < now | Timestamp (HH:mm) | "16:00" |
