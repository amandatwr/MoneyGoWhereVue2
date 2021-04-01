import Vue from 'vue'
import HomePage from "./../components/HomePage.vue";
import AboutPage from "./../components/AboutPage.vue";
import Login from "./../components/Login.vue";
import Register from "./../components/Register.vue";
import Dashboard from "./../components/Dashboard.vue";
import Listings from "./../components/Listings.vue";
import IndivListings from "./../components/IndivListings.vue";
import EditGoals from "./../components/EditGoals.vue";
import MyPlansRect from "./../components/MyPlansRect.vue";
import MySavings from "./../components/MySavings.vue";
import VueRouter from "vue-router";
import firebase from "firebase";
import FAQ from "./../components/FAQ.vue";
import Recommender from "./../components/Recommender.vue"

Vue.use(VueRouter);


let router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: HomePage,
    },
    {
      path: "/about",
      component: AboutPage,
    },
    {
      path: "/listings",
      component: Listings,
    },
    {
      path: "/IndivListing/:id",
      name: "IndivListing",
      component: IndivListings,
      props: true,
    },
    {
      path: "/register",
      component: Register,
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: "/login",
      component: Login,
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: "/dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/FAQ",
      component: FAQ,
    },
    {
      path: "/recommender",
      component: Recommender,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/mysavings",
      component: MySavings,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/editgoals",
      component: EditGoals,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/myplansrect",
      component: MyPlansRect,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

// Nav Guards
router.beforeEach((to, from, next) => {
    // Check for requireAuth guard
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        // If not logged in
        if (!firebase.auth().currentUser) {
            // Go to login page
            next({
                path: "/login",
                query: {
                    redirect: to.fullPath,
                },
            });
        } else {
            // Logged in and proceed
            next();
        }
    } else if (to.matched.some((record) => record.meta.requiresGuest)) {
        // If logged in
        if (firebase.auth().currentUser) {
            next({
                path: "/dashboard",
                query: {
                    redirect: to.fullPath,
                },
            });
        } else {
            // Logged in and proceed
            next();
        }
    } else {
        next();
    }
});

export default router;