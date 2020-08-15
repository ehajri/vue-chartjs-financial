<div align="center">
  <img width="256" heigth="256" src="https://www.chartjs.org/img/chartjs-logo.svg" alt="chartjs logo" style="width: 200px;">
  <img width="256" heigth="256" src="https://github.com/apertureless/vue-chartjs/raw/develop/assets/vue-chartjs.png" alt="chartjs logo" style="width: 200px;">
</div>

# vue-chartjs-financial
This is a sample vue-cli project utilizing the implementation of [vue-chartjs](https://github.com/apertureless/vue-chartjs) to include [Chart.js Financial Charts](https://github.com/chartjs/chartjs-chart-financial).

## How does it work
A copy of [vue-chartjs](https://github.com/apertureless/vue-chartjs) source code located inside `src/lib/`. Here, `vue-chartjs` is using a modified version of Chart object rather than the one exported from Chart.js official plugin. ([Chart.js](https://github.com/chartjs/Chart.js) still needs to be installed)

OHLC and Candlestick charts/objects are added to `vue-chartjs`'s BaseCharts.js

## How to use
[vue-chartjs](https://vue-chartjs.org/guide/)'s guide explains how the plugin works, with 2 additional charts being exported:
- Ohlc, and
- Candlestick

# Installation
Install the package in your project with
```
npm install vue-chartjs-financial
```
or include it in your package.json
```
"vue-chartjs-financial": "1.0.1"
```

## Repo Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
