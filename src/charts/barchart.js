import { Bar } from "vue-chartjs";
import database from "./../firebase.js";
import firebase from "firebase";

export default {
  extends: Bar,
  data: function() {
    return {
      user: null,
      datacollection: {
        labels: [],
        datasets: [
          {
            label: "Quantity",
            backgroundColor: [
              "#3e95cd",
              "#8e5ea2",
              "#3cba9f",
              "#e8c3b9",
              "#c45850",
            ],
            data: [],
          },
        ],
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: "Total Number of Each Dish",
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
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
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((userAuth) => {
      if (userAuth) {
        firebase
          .auth()
          .currentUser.getIdTokenResult()
          .then((token) => {
            this.user = token.claims.sub;
          })
          .then(() => {
            this.fetchItems();
          });
      }
    });
  },
};
