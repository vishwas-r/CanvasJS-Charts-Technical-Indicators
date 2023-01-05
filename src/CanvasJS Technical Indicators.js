(function(){
    var CanvasJS = window.CanvasJS || CanvasJS ? window.CanvasJS : null;
    if (CanvasJS && CanvasJS.Chart) {
		CanvasJS.Chart.prototype.updateCustomOptions = function(options) {
			if(options && options.technicalIndicators) {
				if(options.technicalIndicators.sma) {
					this.technicalIndicators.sma = options.technicalIndicators.sma || {};
					this.technicalIndicators.sma.enabled = options.technicalIndicators.sma.enabled || false;
					this.technicalIndicators.sma.linkedDataSeriesIndex = options.technicalIndicators.sma.linkedDataSeriesIndex || 0;
					this.technicalIndicators.sma.period = options.technicalIndicators.sma.period || 5;
				}
				
				if(options.technicalIndicators.ema) {
					this.technicalIndicators.ema = options.technicalIndicators.ema || {};
					this.technicalIndicators.ema.enabled = options.technicalIndicators.ema.enabled || false;
					this.technicalIndicators.ema.linkedDataSeriesIndex = options.technicalIndicators.ema.linkedDataSeriesIndex || 0;
					this.technicalIndicators.ema.period = options.technicalIndicators.ema.period || 5;
				}
				
			}
		}
		CanvasJS.Chart.prototype.addTechnicalIndicators = function() {
			var chart = this;			
			this.technicalIndicators = {};
			this.updateCustomOptions(this.options);
			if(this.options.technicalIndicators && this.technicalIndicators.sma && this.technicalIndicators.sma.enabled) {				
				this.technicalIndicators.sma.dataPoints = calculateSMA(this.options.data[this.technicalIndicators.sma.linkedDataSeriesIndex].dataPoints, this.technicalIndicators.sma.period);
				if(!this.technicalIndicators.sma.added) {
					this.options.data.push({type: "line",
						dataPoints: this.technicalIndicators.sma.dataPoints,
						color: this.technicalIndicators.sma.color || null,
						showInLegend: this.technicalIndicators.sma.showInLegend || false,
						name: this.technicalIndicators.sma.name || ""
					});
					this.technicalIndicators.sma.added = true;
				}
			}
			
			if(this.options.technicalIndicators && this.technicalIndicators.ema && this.technicalIndicators.ema.enabled) {
				this.technicalIndicators.ema.dataPoints = calculateEMA(this.options.data[this.technicalIndicators.ema.linkedDataSeriesIndex].dataPoints, this.technicalIndicators.ema.period);
				if(!this.technicalIndicators.ema.added) {
					this.options.data.push({type: "line",
						dataPoints: this.technicalIndicators.ema.dataPoints,
						color: this.technicalIndicators.ema.color || null,
						showInLegend: this.technicalIndicators.ema.showInLegend || false,
						name: this.technicalIndicators.ema.name || ""
					});
					this.technicalIndicators.ema.added = true;
				}
			}

			
			function calculateSMA(dps, count){
				var avg = function(dps){
					var sum = 0, count = 0, val;
					for (var i = 0; i < dps.length; i++) {
						val = dps[i].y[3]; sum += val; count++;
					}
					return sum / count;
				};
				var result = [], val;
				count = count || 5;
				for (var i=0; i < count; i++)
					result.push({ x: dps[i].x , y: null});
					for (var i=count - 1, len=dps.length; i < len; i++){
						val = avg(dps.slice(i - count + 1, i));
						if (isNaN(val))
							result.push({ x: dps[i].x, y: null});
						else
							result.push({ x: dps[i].x, y: val});
					}
				return result;
			}
			
			function calculateEMA(dps,count) {
				var k = 2/(count + 1);
				var result = [{x: dps[0].x, y: dps[0].y.length ? dps[0].y[3] : dps[0].y}];
				for (var i = 1; i < dps.length; i++) {
				  result.push({x: dps[i].x, y: (dps[i].y.length ? dps[i].y[3] : dps[i].y) * k + result[i - 1].y * (1 - k)});
				}
				return result;
			}
		}
		
		var chartRender = CanvasJS.Chart.prototype.render;
		CanvasJS.Chart.prototype.render = function (options) {
			if(!this.stockChart);
				this.addTechnicalIndicators();

			var result = chartRender.apply(this, arguments);			
			return result ;
		}
    }

	if(CanvasJS && CanvasJS.StockChart) {
		CanvasJS.StockChart.prototype.updateCustomOptions = function() {
			if(this.options && this.options.technicalIndicators) {
				if(this.options.technicalIndicators.sma) {
					this.technicalIndicators.sma = this.options.technicalIndicators.sma || {};
					this.technicalIndicators.sma.linkedChartIndex = this.options.technicalIndicators.sma.linkedChartIndex || 0;
				}
				
				if(this.options.technicalIndicators.ema) {
					this.technicalIndicators.ema = this.options.technicalIndicators.ema || {};
					this.technicalIndicators.ema.linkedChartIndex = this.options.technicalIndicators.ema.linkedChartIndex || 0;
				}
			}
		}

		CanvasJS.StockChart.prototype.addTechnicalIndicators = function() {
			this.technicalIndicators = {};
			this.updateCustomOptions();

			for(var i = 0; i < this.charts.length; i++) {
				if(i === this.technicalIndicators.ema.linkedChartIndex) {
					this.charts[i].options.technicalIndicators = { ema: this.options.technicalIndicators.ema };
					this.charts[i].addTechnicalIndicators();
				}
				if(i === this.technicalIndicators.sma.linkedChartIndex) {
					this.charts[i].options.technicalIndicators = { sma: this.options.technicalIndicators.sma };
					this.charts[i].addTechnicalIndicators();
				}
			}
		}

		var StockChartRender = CanvasJS.StockChart.prototype.render;
		CanvasJS.StockChart.prototype.render = function (options) {
			var result = StockChartRender.apply(this, arguments);
			this.addTechnicalIndicators();
			for(var i = 0; i < this.charts.length; i++) {
				this.charts[i].render();
			}		
			return result ;
		}
	}
})();