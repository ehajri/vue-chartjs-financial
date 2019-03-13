<template>
  <div class="small">
    <Candlestick :chart-data="datacollection" :options="options"/>
  </div>
</template>

<script>
import Candlestick from '@/components/Candlestick';

export default {
  components: {
    Candlestick,
  },
  data() {
    // fixes x-axes label overlapping
    // https://www.chartjs.org/docs/latest/axes/cartesian/?h=autoskip
    return {
      datacollection: {},
      options: {
        scales: {
          xAxes: [{
            ticks: {
              autoSkip: true,
            },
          }],
        },
      },
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.datacollection = {
        datasets: [
          {
            label: 'Series 1',
            backgroundColor: '#f87979',
            data: [{
              o: 350,
              h: 360,
              l: 345,
              c: 350,
              t: new Date('2019-01-10').getTime(),
            },
            {
              o: 350,
              h: 370,
              l: 340,
              c: 360,
              t: new Date('2019-01-11').getTime(),
            },
            {
              o: 360,
              h: 370,
              l: 355,
              c: 355,
              t: new Date('2019-01-12').getTime(),
            },
            {
              o: 355,
              h: 380,
              l: 360,
              c: 370,
              t: new Date('2019-01-13').getTime(),
            },
            {
              o: 370,
              h: 365,
              l: 340,
              c: 350,
              t: new Date('2019-01-14').getTime(),
            }],
          },
        ]
        ,
      };
    },
  },
};
</script>

<style>
div {
    padding-left: 0;
    padding-right: 0;
    margin-left: auto;
    margin-right: auto;
    display: block;
    width: 600px;
}
canvas {
  max-height: 500px;
  padding: 0 0;
  margin: 0 0;
}
</style>
