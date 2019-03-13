/* eslint-disable */
import mixins from './mixins/index.js';
import {
  Candlestick, Ohlc, Bar, HorizontalBar, Doughnut, Line, Pie, PolarArea, Radar, Bubble, Scatter, generateChart,
} from './BaseCharts';

const VueCharts = {
  Candlestick,
  Ohlc,
  Bar,
  HorizontalBar,
  Doughnut,
  Line,
  Pie,
  PolarArea,
  Radar,
  Bubble,
  Scatter,
  mixins,
  generateChart,
  render: function render() {
    return console.error('[vue-chartjs]: This is not a vue component. It is the whole object containing all vue components. Please import the named export or access the components over the dot notation. For more info visit https://vue-chartjs.org/#/home?id=quick-start');
  },
};
export default VueCharts;
export {
  Candlestick, Ohlc, VueCharts, Bar, HorizontalBar, Doughnut, Line, Pie, PolarArea, Radar, Bubble, Scatter, mixins, generateChart,
};
