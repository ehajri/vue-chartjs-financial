'use strict';
export default function(Chart) {
	const {helpers} = Chart;
	const defaultConfig = {
		position: 'left',
		ticks: {
			callback: Chart.Ticks.formatters.linear
		},
	};
	const FinancialLinearScale = Chart.scaleService.getScaleConstructor('linear').extend({
		_parseValue(value) {
			let start, end, min, max;

			if (typeof value.c !== 'undefined') {
				start = +this.getRightValue(value.l);
				end = +this.getRightValue(value.h);
				min = Math.min(start, end);
				max = Math.max(start, end);
			} else {
				value = +this.getRightValue(value.y);
				start = undefined;
				end = value;
				min = value;
				max = value;
			}
			return {min, max, start, end};
		},
		determineDataLimits() {
			const me = this;
			const {chart} = me;
			const {data} = chart;
			const {datasets} = data;
			const isHorizontal = me.isHorizontal();

			function IDMatches(meta) {
				return isHorizontal ? meta.xAxisID === me.id : meta.yAxisID === me.id;
			}

			me.min = null;
			me.max = null;
			helpers.each(datasets, (dataset, datasetIndex) => {
				const meta = chart.getDatasetMeta(datasetIndex);

				if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta)) {
					helpers.each(dataset.data, (rawValue, index) => {
						const value = me._parseValue(rawValue);

						if (isNaN(value.min) || isNaN(value.max) || meta.data[index].hidden) {
							return;
						}

						if (me.min === null || value.min < me.min) {
							me.min = value.min;
						}

						if (me.max === null || me.max < value.max) {
							me.max = value.max;
						}
					});
				}
			});
			const space = (me.max - me.min) * 0.05;
			me.min -= space;
			me.max += space;
			this.handleTickRangeOptions();
		},
	});
	Chart.scaleService.registerScaleType('financialLinear', FinancialLinearScale, defaultConfig);
};
