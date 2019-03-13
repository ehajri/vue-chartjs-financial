/* eslint-disable */
function dataHandler(newData, oldData) {
  if (oldData) {
    const chart = this.$data._chart;
    const newDatasetLabels = newData.datasets.map(dataset => dataset.label);
    const oldDatasetLabels = oldData.datasets.map(dataset => dataset.label);
    const oldLabels = JSON.stringify(oldDatasetLabels);
    const newLabels = JSON.stringify(newDatasetLabels);

    if (newLabels === oldLabels && oldData.datasets.length === newData.datasets.length) {
      newData.datasets.forEach((dataset, i) => {
        const oldDatasetKeys = Object.keys(oldData.datasets[i]);
        const newDatasetKeys = Object.keys(dataset);
        const deletionKeys = oldDatasetKeys.filter(key => key !== '_meta' && newDatasetKeys.indexOf(key) === -1);
        deletionKeys.forEach((deletionKey) => {
          delete chart.data.datasets[i][deletionKey];
        });

        for (const attribute in dataset) {
          if (dataset.hasOwnProperty(attribute)) {
            chart.data.datasets[i][attribute] = dataset[attribute];
          }
        }
      });

      if (newData.hasOwnProperty('labels')) {
        chart.data.labels = newData.labels;
        this.$emit('labels:update');
      }

      if (newData.hasOwnProperty('xLabels')) {
        chart.data.xLabels = newData.xLabels;
        this.$emit('xlabels:update');
      }

      if (newData.hasOwnProperty('yLabels')) {
        chart.data.yLabels = newData.yLabels;
        this.$emit('ylabels:update');
      }

      chart.update();
      this.$emit('chart:update');
    } else {
      if (chart) {
        chart.destroy();
        this.$emit('chart:destroy');
      }

      this.renderChart(this.chartData, this.options);
      this.$emit('chart:render');
    }
  } else {
    if (this.$data._chart) {
      this.$data._chart.destroy();

      this.$emit('chart:destroy');
    }

    this.renderChart(this.chartData, this.options);
    this.$emit('chart:render');
  }
}

export var reactiveData = {
  data: function data() {
    return {
      chartData: null,
    };
  },
  watch: {
    chartData: dataHandler,
  },
};
export var reactiveProp = {
  props: {
    chartData: {
      type: Object,
      required: true,
      default: function _default() {},
    },
  },
  watch: {
    chartData: dataHandler,
  },
};
export default {
  reactiveData,
  reactiveProp,
};
