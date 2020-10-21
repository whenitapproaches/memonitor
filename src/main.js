import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

const requireComponent = require.context("@/components", false, /Base[A-Z]\w+\.(vue|js)$/);

import { upperFirst, camelCase } from "lodash";

requireComponent.keys().forEach(fileName => {
  // Load component config
  const componentConfig = requireComponent(fileName);

  const componentName = upperFirst(
    camelCase(
      // Strip the leading `./` and extension from the filename
      fileName.replace(/^\.\/(.*)\.\w+$/, "$1")
    )
  );
  Vue.component(componentName, componentConfig.default || componentConfig);
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
