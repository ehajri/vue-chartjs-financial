export default function (Chart) {
  Chart.defaults.candlestick = Object.assign({}, Chart.defaults.financial);
  Chart.defaults.candlestick.scales = {
    xAxes: [Object.assign({}, Chart.defaults.financial.scales.xAxes[0])],
    yAxes: [Object.assign({}, Chart.defaults.financial.scales.yAxes[0])],
  };
  Chart.controllers.candlestick = Chart.controllers.financial.extend({
    dataElementType: Chart.elements.Candlestick,
    updateElement: function updateElement(element, index, reset) {
      const me = this;
      const meta = me.getMeta();
      const dataset = me.getDataset();
      element._xScale = me.getScaleForId(meta.xAxisID);
      element._yScale = me.getScaleForId(meta.yAxisID);
      element._datasetIndex = me.index;
      element._index = index;
      element._model = {
        datasetLabel: dataset.label || '',
        color: dataset.color,
        borderColor: dataset.borderColor,
        borderWidth: dataset.borderWidth,
      };
      me.updateElementGeometry(element, index, reset);
      element.pivot();
    },
  });
};
