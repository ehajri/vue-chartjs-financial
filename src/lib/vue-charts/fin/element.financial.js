export default function (Chart) {
  const { helpers } = Chart;
  const globalOpts = Chart.defaults.global;
  globalOpts.elements.financial = {
    color: {
      up: 'rgba(80, 160, 115, 1)',
      down: 'rgba(215, 85, 65, 1)',
      unchanged: 'rgba(90, 90, 90, 1)',
    },
    fractionalDigitsCount: undefined,
  };

  function isVertical(bar) {
    return bar._view.width !== undefined;
  }

  function getBarBounds(candle) {
    const vm = candle._view;
    let x1; let x2; let y1; let
      y2;
    const halfWidth = vm.width / 2;
    x1 = vm.x - halfWidth;
    x2 = vm.x + halfWidth;
    y1 = vm.candleHigh;
    y2 = vm.candleLow;
    return {
      left: x1,
      top: y1,
      right: x2,
      bottom: y2,
    };
  }

  Chart.elements.Financial = Chart.Element.extend({
    height: function height() {
      const vm = this._view;
      return vm.base - vm.y;
    },
    inRange: function inRange(mouseX, mouseY) {
      let inRange = false;

      if (this._view) {
        const bounds = getBarBounds(this);
        inRange = mouseX >= bounds.left && mouseX <= bounds.right && mouseY >= bounds.top && mouseY <= bounds.bottom;
      }

      return inRange;
    },
    inLabelRange: function inLabelRange(mouseX, mouseY) {
      const me = this;

      if (!me._view) {
        return false;
      }

      let inRange = false;
      const bounds = getBarBounds(me);

      if (isVertical(me)) {
        inRange = mouseX >= bounds.left && mouseX <= bounds.right;
      } else {
        inRange = mouseY >= bounds.top && mouseY <= bounds.bottom;
      }

      return inRange;
    },
    inXRange: function inXRange(mouseX) {
      const bounds = getBarBounds(this);
      return mouseX >= bounds.left && mouseX <= bounds.right;
    },
    inYRange: function inYRange(mouseY) {
      const bounds = getBarBounds(this);
      return mouseY >= bounds.top && mouseY <= bounds.bottom;
    },
    getCenterPoint: function getCenterPoint() {
      const vm = this._view;
      return {
        x: vm.x,
        y: (vm.candleHigh + vm.candleLow) / 2,
      };
    },
    getArea: function getArea() {
      const vm = this._view;
      return vm.width * Math.abs(vm.y - vm.base);
    },
    tooltipPosition: function tooltipPosition() {
      const vm = this._view;
      return {
        x: vm.x,
        y: (vm.candleOpen + vm.candleClose) / 2,
      };
    },
    hasValue: function hasValue() {
      const model = this._model;
      return helpers.isNumber(model.x) && helpers.isNumber(model.candleOpen) && helpers.isNumber(model.candleHigh) && helpers.isNumber(model.candleLow) && helpers.isNumber(model.candleClose);
    },
  });
};
