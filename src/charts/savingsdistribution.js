import database from "../firebase.js";
import firebase from "firebase";
import { Pie } from "vue-chartjs";

export default {
  extends: Pie,
  data: function() {
    return {
      datacollection: {
        labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
        datasets: [
          {
            label: "Population (millions)",
            backgroundColor: [
              "#3e95cd",
              "#8e5ea2",
              "#3cba9f",
              "#e8c3b9",
              "#c45850",
            ],
            data: [2478, 5267, 734, 784, 433],
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: "Predicted world population (millions) in 2050",
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },

  methods: {
    fetchItems: function() {
      database
        .collection("TestUsers")
        .doc(this.user)
        .get()
        .then((doc) => {
          console.log(doc.data());
        });
      this.renderChart(this.datacollection, this.options);
    },
  },
  created() {
    // Log user account creation date
    var user = firebase.auth().currentUser;
    var signupDate = new Date(user.metadata.creationTime);
    var currDate = new Date();
    console.log(user);
    console.log(signupDate);
    console.log(currDate);
    console.log(user.uid);
    firebase.auth().onAuthStateChanged((userAuth) => {
      if (userAuth) {
        firebase
          .auth()
          .currentUser.getIdTokenResult()
          .then((token) => {
            this.user = token.claims.sub;
            console.log(token);
          })
          .then(() => {
            this.fetchItems();
          });
      }
    });
  },
};
