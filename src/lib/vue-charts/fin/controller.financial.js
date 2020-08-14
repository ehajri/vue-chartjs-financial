'use strict';

import Chart from 'chart.js';

const helpers = Chart.helpers;

Chart.defaults.financial = {
	label: '',

	parsing: false,

	hover: {
		mode: 'label'
	},

	datasets: {
		categoryPercentage: 0.8,
		barPercentage: 0.9,
		animation: {
			numbers: {
				type: 'number',
				properties: ['x', 'y', 'base', 'width', 'open', 'high', 'low', 'close']
			}
		}
	},

	scales: {
		x: {
			type: 'time',
			distribution: 'series',
			offset: true,
			ticks: {
				major: {
					enabled: true,
				},
				fontStyle: context => context.tick.major ? 'bold' : undefined,
				source: 'data',
				maxRotation: 0,
				autoSkip: true,
				autoSkipPadding: 75,
				sampleSize: 100
			},
			afterBuildTicks: scale => {
				const DateTime = window && window.luxon && window.luxon.DateTime;
				if (!DateTime) {
					return;
				}
				const majorUnit = scale._majorUnit;
				const ticks = scale.ticks;
				const firstTick = ticks[0];

				let val = DateTime.fromMillis(ticks[0].value);
				if ((majorUnit === 'minute' && val.second === 0)
						|| (majorUnit === 'hour' && val.minute === 0)
						|| (majorUnit === 'day' && val.hour === 9)
						|| (majorUnit === 'month' && val.day <= 3 && val.weekday === 1)
						|| (majorUnit === 'year' && val.month === 1)) {
					firstTick.major = true;
				} else {
					firstTick.major = false;
				}
				let lastMajor = val.get(majorUnit);

				for (let i = 1; i < ticks.length; i++) {
					const tick = ticks[i];
					val = DateTime.fromMillis(tick.value);
					const currMajor = val.get(majorUnit);
					tick.major = currMajor !== lastMajor;
					lastMajor = currMajor;
				}
				scale.ticks = ticks;
			}
		},
		y: {
			type: 'linear'
		}
	},

	tooltips: {
		intersect: false,
		mode: 'index',
		callbacks: {
			label(tooltipItem, data) {
				const dataset = data.datasets[tooltipItem.datasetIndex];
				const point = dataset.data[tooltipItem.index];

				if (!helpers.isNullOrUndef(point.y)) {
					return Chart.defaults.tooltips.callbacks.label(tooltipItem, data);
				}

				const {o, h, l, c} = point;

				return 'O: ' + o + '  H: ' + h + '  L: ' + l + '  C: ' + c;
			}
		}
	}
};

/**
 * This class is based off controller.bar.js from the upstream Chart.js library
 */
class FinancialController extends Chart.controllers.bar {

	getLabelAndValue(index) {
		const me = this;
		const parsed = me.getParsed(index);

		const {o, h, l, c} = parsed;
		const value = 'O: ' + o + '  H: ' + h + '  L: ' + l + '  C: ' + c;

		return {
			label: '' + me._cachedMeta.iScale.getLabelForValue(parsed.t),
			value
		};
	}

	getAllParsedValues() {
		const parsed = this._cachedMeta._parsed;
		const values = [];
		for (let i = 0; i < parsed.length; ++i) {
			values.push(parsed[i].t);
		}
		return values;
	}

	/**
	 * Implement this ourselves since it doesn't handle high and low values
	 * https://github.com/chartjs/Chart.js/issues/7328
	 * @protected
	 */
	getMinMax(scale) {
		const meta = this._cachedMeta;
		const _parsed = meta._parsed;

		if (_parsed.length < 2) {
			return {min: 0, max: 1};
		}

		if (scale === meta.iScale) {
			return {min: _parsed[0].t, max: _parsed[_parsed.length - 1].t};
		}

		let min = Number.POSITIVE_INFINITY;
		let max = Number.NEGATIVE_INFINITY;
		for (let i = 0; i < _parsed.length; i++) {
			const data = _parsed[i];
			min = Math.min(min, data.l);
			max = Math.max(max, data.h);
		}
		return {min, max};
	}

	_getRuler() {
		const me = this;
		const meta = me._cachedMeta;
		const iScale = meta.iScale;
		const pixels = [];
		for (let i = 0; i < meta.data.length; ++i) {
			pixels.push(iScale.getPixelForValue(me.getParsed(i).t));
		}
		return {
			pixels,
			start: iScale._startPixel,
			end: iScale._endPixel,
			stackCount: me._getStackCount(),
			scale: iScale
		};
	}

	/**
	 * @protected
	 */
	calculateElementProperties(index, ruler, reset, options) {
		const me = this;
		const vscale = me._getValueScale();
		const base = vscale.getBasePixel();
		const ipixels = me._calculateBarIndexPixels(index, ruler, options);
		const data = me.chart.data.datasets[me.index].data[index];
		const open = vscale.getPixelForValue(data.o);
		const high = vscale.getPixelForValue(data.h);
		const low = vscale.getPixelForValue(data.l);
		const close = vscale.getPixelForValue(data.c);

		return {
			base: reset ? base : low,
			x: ipixels.center,
			y: (low + high) / 2,
			width: ipixels.size,
			open,
			high,
			low,
			close
		};
	}

	draw() {
		const me = this;
		const chart = me.chart;
		const rects = me._cachedMeta.data;
		helpers.canvas.clipArea(chart.ctx, chart.chartArea);
		for (let i = 0; i < rects.length; ++i) {
			rects[i].draw(me._ctx);
		}
		helpers.canvas.unclipArea(chart.ctx);
	}

}

FinancialController.prototype.dataElementType = Chart.elements.Financial;

export default FinancialController;