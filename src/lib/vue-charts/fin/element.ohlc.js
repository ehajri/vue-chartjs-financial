export default function (Chart) {
  const { helpers } = Chart;
  const globalOpts = Chart.defaults.global;
  globalOpts.elements.ohlc = Object.assign(globalOpts.elements.financial, {
    lineWidth: 2,
    armLength: null,
    armLengthRatio: 0.8,
  });
  Chart.elements.Ohlc = Chart.elements.Financial.extend({
    draw: function draw() {
      const { ctx } = this._chart;
      const vm = this._view;
      const { x } = vm;
      const o = vm.candleOpen;
      const h = vm.candleHigh;
      const l = vm.candleLow;
      const c = vm.candleClose;
      let armLength = helpers.getValueOrDefault(vm.armLength, globalOpts.elements.ohlc.armLength);
      const armLengthRatio = helpers.getValueOrDefault(vm.armLengthRatio, globalOpts.elements.ohlc.armLengthRatio);

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
    },
  });
};
