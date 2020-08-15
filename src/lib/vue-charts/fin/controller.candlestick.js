'use strict';
import ControllerFinancial from './controller.financial';
import CandlestickElement from './element.candlestick';

export default function (Chart) {
	ControllerFinancial(Chart);
	CandlestickElement(Chart)

	Chart.defaults.candlestick = Chart.helpers.merge({}, Chart.defaults.financial);

	Chart.defaults._set('global', {
		datasets: {
			candlestick: Chart.defaults.global.datasets.bar
		}
	});

	Chart.controllers.candlestick = Chart.controllers.financial.extend({
		dataElementType: Chart.elements.Candlestick,
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
				// label: '', // to get label value please use dataset.data[index].label

				// Appearance
				color: dataset.color,
				borderColor: dataset.borderColor,
				borderWidth: dataset.borderWidth,
			};

			me._updateElementGeometry(element, index, reset, options);

			element.pivot();
		},
	});
};
