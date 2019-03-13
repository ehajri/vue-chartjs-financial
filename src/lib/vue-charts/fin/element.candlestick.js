export default function (Chart) {
  const { helpers } = Chart;
  const globalOpts = Chart.defaults.global;
  globalOpts.elements.candlestick = Object.assign(globalOpts.elements.financial, {
    borderColor: globalOpts.elements.financial.color.unchanged,
    borderWidth: 1,
  });
  Chart.elements.Candlestick = Chart.elements.Financial.extend({
    draw: function draw() {
      const { ctx } = this._chart;
      const vm = this._view;
      const { x } = vm;
      const o = vm.candleOpen;
      const h = vm.candleHigh;
      const l = vm.candleLow;
      const c = vm.candleClose;
      let borderColors = vm.borderColor;

      if (typeof borderColors === 'string') {
        borderColors = {
          up: borderColors,
          down: borderColors,
          unchanged: borderColors,
        };
      }

      let borderColor;

      if (c < o) {
        borderColor = helpers.getValueOrDefault(borderColors ? borderColors.up : undefined, globalOpts.elements.candlestick.color.up);
        ctx.fillStyle = helpers.getValueOrDefault(vm.color ? vm.color.up : undefined, globalOpts.elements.candlestick.color.up);
      } else if (c > o) {
        borderColor = helpers.getValueOrDefault(borderColors ? borderColors.down : undefined, globalOpts.elements.candlestick.color.down);
        ctx.fillStyle = helpers.getValueOrDefault(vm.color ? vm.color.down : undefined, globalOpts.elements.candlestick.color.down);
      } else {
        borderColor = helpers.getValueOrDefault(borderColors ? borderColors.unchanged : undefined, globalOpts.elements.candlestick.color.unchanged);
        ctx.fillStyle = helpers.getValueOrDefault(vm.color ? vm.color.unchanged : undefined, globalOpts.elements.candlestick.color.unchanged);
      }

      ctx.lineWidth = helpers.getValueOrDefault(vm.borderWidth, globalOpts.elements.candlestick.borderWidth);
      ctx.strokeStyle = helpers.getValueOrDefault(borderColor, globalOpts.elements.candlestick.borderColor);
      ctx.beginPath();
      ctx.moveTo(x, h);
      ctx.lineTo(x, Math.min(o, c));
      ctx.moveTo(x, l);
      ctx.lineTo(x, Math.max(o, c));
      ctx.stroke();
      ctx.fillRect(x - vm.width / 2, c, vm.width, o - c);
      ctx.strokeRect(x - vm.width / 2, c, vm.width, o - c);
      ctx.closePath();
    },
  });
};
