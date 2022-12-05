(function(){
    var CanvasJS = window.CanvasJS || CanvasJS ? window.CanvasJS : null;
    if (CanvasJS && CanvasJS.Chart) {
		CanvasJS.Chart.prototype.updateCustomOptions = function() {
			if(this.options && this.options.technicalIndicators) {
				if(this.options.technicalIndicators.sma) {
					this.technicalIndicators.sma = this.options.technicalIndicators.sma || {};
					this.technicalIndicators.sma.enabled = this.options.technicalIndicators.sma.enabled || false;
					this.technicalIndicators.sma.linkedDataSeriesIndex = this.options.technicalIndicators.sma.linkedDataSeriesIndex || 0;
					this.technicalIndicators.sma.period = this.options.technicalIndicators.sma.period || 5;
				}
				
				if(this.options.technicalIndicators.ema) {
					this.technicalIndicators.ema = this.options.technicalIndicators.ema || {};
					this.technicalIndicators.ema.enabled = this.options.technicalIndicators.ema.enabled || false;
					this.technicalIndicators.ema.linkedDataSeriesIndex = this.options.technicalIndicators.ema.linkedDataSeriesIndex || 0;
					this.technicalIndicators.ema.period = this.options.technicalIndicators.ema.period || 5;
				}
				
			}
		}
		CanvasJS.Chart.prototype.addTechnicalIndicators = function() {
			var chart = this;			
			this.technicalIndicators = {};
			this.updateCustomOptions();
			if(this.options.technicalIndicators && this.technicalIndicators.sma.enabled) {
				this.technicalIndicators.sma.dataPoints = calculateSMA(this.options.data[this.technicalIndicators.sma.linkedDataSeriesIndex].dataPoints, this.technicalIndicators.sma.period);
				this.options.data.push({type: "line",
					dataPoints: this.technicalIndicators.sma.dataPoints,
					color: this.technicalIndicators.sma.color || null,
					showInLegend: this.technicalIndicators.sma.showInLegend || false,
					name: this.technicalIndicators.sma.name || ""
				});
			}
			
			if(this.options.technicalIndicators && this.technicalIndicators.ema.enabled) {
				this.technicalIndicators.ema.dataPoints = calculateEMA(this.options.data[this.technicalIndicators.ema.linkedDataSeriesIndex].dataPoints, this.technicalIndicators.ema.period);
				this.options.data.push({type: "line",
					dataPoints: this.technicalIndicators.ema.dataPoints,
					color: this.technicalIndicators.ema.color || null,
					showInLegend: this.technicalIndicators.ema.showInLegend || false,
					name: this.technicalIndicators.ema.name || ""
				});
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
			this.addTechnicalIndicators();
			var result = chartRender.apply(this, arguments);				
			return result ;
		}
		
    }
})();