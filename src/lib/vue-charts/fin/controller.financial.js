export default function (Chart) {
  Chart.defaults.financial = {
    label: '',
    hover: {
      mode: 'label',
    },
    scales: {
      xAxes: [{
        type: 'time',
        distribution: 'series',
        categoryPercentage: 0.8,
        barPercentage: 0.9,
        ticks: {
          source: 'data',
        },
      }],
      yAxes: [{
        type: 'financialLinear',
      }],
    },
    tooltips: {
      callbacks: {
        label: function label(tooltipItem, data) {
          let { o } = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
          let { h } = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
          let { l } = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
          let { c } = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
          let { fractionalDigitsCount } = data.datasets[tooltipItem.datasetIndex];

          if (fractionalDigitsCount !== undefined) {
            fractionalDigitsCount = Math.max(0, Math.min(100, fractionalDigitsCount));
            o = o.toFixed(fractionalDigitsCount);
            h = h.toFixed(fractionalDigitsCount);
            l = l.toFixed(fractionalDigitsCount);
            c = c.toFixed(fractionalDigitsCount);
          }

          return ` O: ${o}    H: ${h}    L: ${l}    C: ${c}`;
        },
      },
    },
  };
  Chart.controllers.financial = Chart.controllers.bar.extend({
    dataElementType: Chart.elements.Financial,
    updateElementGeometry: function updateElementGeometry(element, index, reset) {
      const me = this;
      const model = element._model;
      const vscale = me.getValueScale();
      const base = vscale.getBasePixel();
      const horizontal = vscale.isHorizontal();
      const ruler = me._ruler || me.getRuler();
      const vpixels = me.calculateBarValuePixels(me.index, index);
      const ipixels = me.calculateBarIndexPixels(me.index, index, ruler);
      const { chart } = me;
      const { datasets } = chart.data;
      const indexData = datasets[me.index].data[index];
      model.horizontal = horizontal;
      model.base = reset ? base : vpixels.base;
      model.x = horizontal ? reset ? base : vpixels.head : ipixels.center;
      model.y = horizontal ? ipixels.center : reset ? base : vpixels.head;
      model.height = horizontal ? ipixels.size : undefined;
      model.width = horizontal ? undefined : ipixels.size;
      model.candleOpen = vscale.getPixelForValue(Number(indexData.o));
      model.candleHigh = vscale.getPixelForValue(Number(indexData.h));
      model.candleLow = vscale.getPixelForValue(Number(indexData.l));
      model.candleClose = vscale.getPixelForValue(Number(indexData.c));
    },
    draw: function draw() {
      const { ctx } = this.chart.chart;
      const elements = this.getMeta().data;
      const dataset = this.getDataset();
      const ilen = elements.length;
      let i = 0;
      let d;
      Chart.canvasHelpers.clipArea(ctx, this.chart.chartArea);

      for (; i < ilen; ++i) {
        d = dataset.data[i].o;

        if (d !== null && d !== undefined && !isNaN(d)) {
          elements[i].draw();
        }
      }

      Chart.canvasHelpers.unclipArea(ctx);
    },
  });
};
