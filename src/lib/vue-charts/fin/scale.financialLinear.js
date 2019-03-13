export default function (Chart) {
  const { helpers } = Chart;
  const defaultConfig = {
    position: 'left',
    ticks: {
      callback: Chart.Ticks.formatters.linear,
    },
  };
  const FinancialLinearScale = Chart.scaleService.getScaleConstructor('linear').extend({
    determineDataLimits: function determineDataLimits() {
      const me = this;
      const { chart } = me;
      const { data } = chart;
      const { datasets } = data;
      const isHorizontal = me.isHorizontal();

      function IDMatches(meta) {
        return isHorizontal ? meta.xAxisID === me.id : meta.yAxisID === me.id;
      }

      me.min = null;
      me.max = null;
      helpers.each(datasets, (dataset, datasetIndex) => {
        const meta = chart.getDatasetMeta(datasetIndex);

        if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta)) {
          helpers.each(dataset.data, (rawValue) => {
            const high = rawValue.h;
            const low = rawValue.l;

            if (me.min === null) {
              me.min = low;
            } else if (low < me.min) {
              me.min = low;
            }

            if (me.max === null) {
              me.max = high;
            } else if (high > me.max) {
              me.max = high;
            }
          });
        }
      });
      const space = (me.max - me.min) * 0.05;
      me.min -= space;
      me.max += space;
      this.handleTickRangeOptions();
    },
  });
  Chart.scaleService.registerScaleType('financialLinear', FinancialLinearScale, defaultConfig);
};
