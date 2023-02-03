import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import BootstrapVue from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
Vue.use(BootstrapVue);

import ApolloClient from "apollo-boost";
const client = new ApolloClient({
  uri: "https://graphql.fauna.com/graphql"
});

import VueApollo from "vue-apollo";
const apolloProvider = new VueApollo({
  defaultClient: client
});
Vue.use(VueApollo);


export const bus = new Vue();

Vue.config.productionTip = true;

/* v-focus
Vue.directive('focus', {
  // When the bound element is inserted into the DOM...
  inserted: function (el) {
    // Focus the element
    el.focus()
  } })
  */

import VueCookies from 'vue-cookies';
Vue.use (VueCookies);

import axios from 'axios';
import Vueaxios from 'vue-axios';
Vue.use(Vueaxios, axios);

const axiosConfig = {
	baseURL: 'http://localhost:10000',
	timeout: 30000,
};
Vue.prototype.$axios = axios.create(axiosConfig)

import VueMq from 'vue-mq'
Vue.use(VueMq, {
    breakpoints: {
	  mobile: 450,
      tablet: 900,
	  laptop: 1250,
	  desktop: Infinity,
  }
})

new Vue({
  axios,
  router,
  store,
	apolloProvider,
  render: function (h) { return h(App) }
}).$mount('#app')
