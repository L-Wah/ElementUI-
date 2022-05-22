import Vue from 'vue'
import App from './App.vue'
import router from './router'

// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);

Vue.config.productionTip = false

import { Row,Col,Menu,MenuItem,MenuItemGroup,Submenu } from 'element-ui';
Vue.use( Row )
Vue.use( Col )
Vue.use( Menu )
Vue.use( MenuItem )
Vue.use( MenuItemGroup )
Vue.use( Submenu )

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
