import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/element.js";
import * as echarts from "echarts";
import VueEcharts from "vue-echarts";
import "./style/index.css";
import request from "./utils/request";
import "core-js";
import { BrowserTracing } from "@sentry/tracing";
import * as Sentry from "@sentry/vue";
Sentry.init({
  Vue,
  dsn: "https://ddbdd9c63f8f499b8ef11fc7725d4378@o1265551.ingest.sentry.io/6449812",
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ["localhost", "my-site-url.com", /^\//],
    }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
Vue.prototype.$request = request;
Vue.component("VChart", VueEcharts);
export default new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
