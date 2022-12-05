<h1 id="togglefullscreen">CanvasJS Chart - Technical Indicators</h1>
	<p>This plugin allows you to add technical indicators to <a href="https://canvasjs.com/" target="_blank">CanvasJS</a> chart. Check out <a href="https://github.com/vishwas-r/CanvasJS-Technical-Indicators">Live Example</a>.</p>
	<h4 id="howtouse">How to Use?</h4>
	<ul>
		<li>Enable all the Technical Indicators under Chart-Options</li>
		<li>Render the chart</li>
	</ul>
	<pre><code>var chart = new CanvasJS.Chart("chartContainer", {
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
</code></pre>
