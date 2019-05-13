// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import { main_module } from '@/modules/main.js'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Vuex)

const store = new Vuex.Store({  
  modules: {
    main: main_module,
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})


