﻿'use strict';
import FinancialElement from './element.financial';

export default function (Chart) {
	FinancialElement(Chart);

	const helpers = Chart.helpers;
	const globalOpts = Chart.defaults.global;
	globalOpts.elements.ohlc = helpers.merge({}, [globalOpts.elements.financial, {
		lineWidth: 2,
		armLength: null,
		armLengthRatio: 0.8,
	}]);
	Chart.elements.Ohlc = Chart.elements.Financial.extend({
		draw() {
			const ctx = this._chart.ctx;
			const vm = this._view;
			const x = vm.x;
			const o = vm.candleOpen;
			const h = vm.candleHigh;
			const l = vm.candleLow;
			const c = vm.candleClose;
			const armLengthRatio = helpers.getValueOrDefault(vm.armLengthRatio, globalOpts.elements.ohlc.armLengthRatio);
			let armLength = helpers.getValueOrDefault(vm.armLength, globalOpts.elements.ohlc.armLength);
			if (armLength === null) {
				armLength = vm.width * armLengthRatio * 0.5;
			}

			if (c < o) {
				ctx.strokeStyle = helpers.getValueOrDefault(vm.color ? vm.color.up : undefined, globalOpts.elements.ohlc.color.up);
			} else if (c > o) {
				ctx.strokeStyle = helpers.getValueOrDefault(vm.color ? vm.color.down : undefined, globalOpts.elements.ohlc.color.down);
			} else {
				ctx.strokeStyle = helpers.getValueOrDefault(vm.color ? vm.color.unchanged : undefined, globalOpts.elements.ohlc.color.unchanged);
			}
			ctx.lineWidth = helpers.getValueOrDefault(vm.lineWidth, globalOpts.elements.ohlc.lineWidth);

			ctx.beginPath();
			ctx.moveTo(x, h);
			ctx.lineTo(x, l);
			ctx.moveTo(x - armLength, o);
			ctx.lineTo(x, o);
			ctx.moveTo(x + armLength, c);
			ctx.lineTo(x, c);
			ctx.stroke();
		}
	});
};
