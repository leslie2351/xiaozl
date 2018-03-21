import Vue from 'vue';
import axios from 'axios';
import vueAxios from 'vue-axios';
import echarts from 'echarts';
import Cookies from 'js-cookie';
import clipboard from 'clipboard';
import html2canvas from 'html2canvas';
import rasterizehtml from 'rasterizehtml';

Vue.use(vueAxios, axios)
Vue.prototype.$echarts = echarts