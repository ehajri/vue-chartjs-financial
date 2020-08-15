'use strict';
import Chart from 'chart.js'
import FinancialLinear from './scale.financialLinear.js';
import Candlestick from './controller.candlestick.js';
import Ohlc from './controller.ohlc.js';

FinancialLinear(Chart);
Candlestick(Chart);
Ohlc(Chart);

export default Chart;
