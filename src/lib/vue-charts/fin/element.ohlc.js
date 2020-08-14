'use strict';

import Chart from 'chart.js';
import FinancialElement from './element.financial';

const helpers = Chart.helpers;
const globalOpts = Chart.defaults;

globalOpts.elements.ohlc = helpers.merge({}, [globalOpts.elements.financial, {
	lineWidth: 2,
	armLength: null,
	armLengthRatio: 0.8,
}]);

class OhlcElement extends FinancialElement {
	draw(ctx) {
		const me = this;

		const {x, open, high, low, close} = me;

		const armLengthRatio = helpers.valueOrDefault(me.armLengthRatio, globalOpts.elements.ohlc.armLengthRatio);
		let armLength = helpers.valueOrDefault(me.armLength, globalOpts.elements.ohlc.armLength);
		if (armLength === null) {
			// The width of an ohlc is affected by barPercentage and categoryPercentage
			// This behavior is caused by extending controller.financial, which extends controller.bar
			// barPercentage and categoryPercentage are now set to 1.0 (see controller.ohlc)
			// and armLengthRatio is multipled by 0.5,
			// so that when armLengthRatio=1.0, the arms from neighbour ohcl touch,
			// and when armLengthRatio=0.0, ohcl are just vertical lines.
			armLength = me.width * armLengthRatio * 0.5;
		}

		if (close < open) {
			ctx.strokeStyle = helpers.valueOrDefault(me.color ? me.color.up : undefined, globalOpts.elements.ohlc.color.up);
		} else if (close > open) {
			ctx.strokeStyle = helpers.valueOrDefault(me.color ? me.color.down : undefined, globalOpts.elements.ohlc.color.down);
		} else {
			ctx.strokeStyle = helpers.valueOrDefault(me.color ? me.color.unchanged : undefined, globalOpts.elements.ohlc.color.unchanged);
		}
		ctx.lineWidth = helpers.valueOrDefault(me.lineWidth, globalOpts.elements.ohlc.lineWidth);

		ctx.beginPath();
		ctx.moveTo(x, high);
		ctx.lineTo(x, low);
		ctx.moveTo(x - armLength, open);
		ctx.lineTo(x, open);
		ctx.moveTo(x + armLength, close);
		ctx.lineTo(x, close);
		ctx.stroke();
	}
}

export default OhlcElement;