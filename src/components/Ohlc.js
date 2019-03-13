// note: importing vue-charts from src/lib/vue-charts/index.js
import { Ohlc, mixins } from '@/lib/vue-charts';

const { reactiveProp } = mixins;

export default {
  extends: Ohlc,
  mixins: [reactiveProp],
  props: ['options'],
  mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options);
  },
};
