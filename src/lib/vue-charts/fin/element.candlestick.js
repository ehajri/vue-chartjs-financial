'use strict';

import Chart from 'chart.js';
import FinancialElement from './element.financial';

const helpers = Chart.helpers;
const globalOpts = Chart.defaults;

globalOpts.elements.candlestick = helpers.merge({}, [globalOpts.elements.financial, {
	borderColor: globalOpts.elements.financial.color.unchanged,
	borderWidth: 1,
}]);

class CandlestickElement extends FinancialElement {
	draw(ctx) {
		const me = this;

		const {x, open, high, low, close} = me;

		let borderColors = me.borderColor;
		if (typeof borderColors === 'string') {
			borderColors = {
				up: borderColors,
				down: borderColors,
				unchanged: borderColors
			};
		}

		let borderColor;
		if (close < open) {
			borderColor = helpers.valueOrDefault(borderColors ? borderColors.up : undefined, globalOpts.elements.candlestick.borderColor);
			ctx.fillStyle = helpers.valueOrDefault(me.color ? me.color.up : undefined, globalOpts.elements.candlestick.color.up);
		} else if (close > open) {
			borderColor = helpers.valueOrDefault(borderColors ? borderColors.down : undefined, globalOpts.elements.candlestick.borderColor);
			ctx.fillStyle = helpers.valueOrDefault(me.color ? me.color.down : undefined, globalOpts.elements.candlestick.color.down);
		} else {
			borderColor = helpers.valueOrDefault(borderColors ? borderColors.unchanged : undefined, globalOpts.elements.candlestick.borderColor);
			ctx.fillStyle = helpers.valueOrDefault(me.color ? me.color.unchanged : undefined, globalOpts.elements.candlestick.color.unchanged);
		}

		ctx.lineWidth = helpers.valueOrDefault(me.borderWidth, globalOpts.elements.candlestick.borderWidth);
		ctx.strokeStyle = helpers.valueOrDefault(borderColor, globalOpts.elements.candlestick.borderColor);

		ctx.beginPath();
		ctx.moveTo(x, high);
		ctx.lineTo(x, Math.min(open, close));
		ctx.moveTo(x, low);
		ctx.lineTo(x, Math.max(open, close));
		ctx.stroke();
		ctx.fillRect(x - me.width / 2, close, me.width, open - close);
		ctx.strokeRect(x - me.width / 2, close, me.width, open - close);
		ctx.closePath();
	}
}

export default CandlestickElement;