CanvasJS Technical Indicators
=====================================

This plugin allows you to add technical indicators to [CanvasJS](https://canvasjs.com/) Charts & StockCharts. Check out [Demo](https://vishwas-r.github.io/CanvasJS-Technical-Indicators/).

### Options

| #   | Option | Description | Options / Examples |
| --- | --- | --- | --- |
| 1   | enabled | Boolean Denoting if the indicator is enabled or not | true, false |
| 2   | linkedDataSeriesIndex | To which Series does the Indicator is linked to | 0, 1, etc. |
| 3   | period | Duration of Moving Average | 5, 7, etc. |
| 4   | color | Color of the Dataseries | "#000", "red", etc. |
| 5   | showInLegend | Boolean denoting if the indicator name should be shwon in legend or not | true, false |
| 6   | name | Name of the Dataseries | "SMA", "EMA", etc. |

### How to Use?

* Enable all the Technical Indicators under Chart-Options
* Render the chart
```
var chart = new CanvasJS.Chart("chartContainer", {
.
.
.
technicalIndicators: {
	sma: {
		enabled: true,
		linkedDataSeriesIndex: 0,
		period: 7,
		color: "green",
		showInLegend: true,
		name: "SMA"
	},
	ema: {
		enabled: true,
		linkedDataSeriesIndex: 0,
		period: 7,
		color: "red",
		showInLegend: true,
		name: "EMA"
	}
},
//Chart Options
.
.
.
});
chart.render();
```

[![BuyMeACoffee](https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png)](https://www.buymeacoffee.com/vishwas.r)
