'use strict';
import ControllerFinancial from './controller.financial';
import OhlcElement from './element.ohlc';

export default function (Chart) {
	ControllerFinancial(Chart);
	OhlcElement(Chart);

	Chart.defaults.ohlc = Chart.helpers.merge({}, Chart.defaults.financial);

	Chart.defaults._set('global', {
		datasets: {
			ohlc: {
				barPercentage: 1.0,
				categoryPercentage: 1.0
			}
		}
	});

	Chart.controllers.ohlc = Chart.controllers.financial.extend({
		dataElementType: Chart.elements.Ohlc,
		updateElement(element, index, reset) {
			const me = this;
			const meta = me.getMeta();
			const dataset = me.getDataset();
			const options = me._resolveDataElementOptions(element, index);

			element._xScale = me.getScaleForId(meta.xAxisID);
			element._yScale = me.getScaleForId(meta.yAxisID);
			element._datasetIndex = me.index;
			element._index = index;
			element._model = {
				datasetLabel: dataset.label || '',
				lineWidth: dataset.lineWidth,
				armLength: dataset.armLength,
				armLengthRatio: dataset.armLengthRatio,
				color: dataset.color,
			};
			me._updateElementGeometry(element, index, reset, options);
			element.pivot();
		},

	});
};
