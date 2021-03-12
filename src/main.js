import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import firebase from "firebase";
import "./firebase.js";

Vue.config.productionTip = false;

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      render: (h) => h(App),
      router: router,
    }).$mount("#app");
  }
});
