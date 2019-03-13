import Chart from 'chart.js';

import m1 from './scale.financialLinear.js';
m1(Chart);

import m2 from './element.financial.js';
m2(Chart);

import m3 from './element.candlestick.js';
m3(Chart);

import m4 from './element.ohlc.js';
m4(Chart);

import m5 from './controller.financial.js';
m5(Chart);

import m6 from './controller.candlestick.js';
m6(Chart);

import m7 from './controller.ohlc.js';
m7(Chart);

export default Chart;
