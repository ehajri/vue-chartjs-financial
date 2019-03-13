import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Ohlc from '@/views/Ohlc.vue'
import Candlestick from '@/views/Candlestick.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/ohlc',
      name: 'ohlc-chart',
      component: Ohlc
    },
    {
      path: '/candlestick',
      name: 'candlestick-chart',
      component: Candlestick
    },
  ],
})
