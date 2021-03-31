import database from "../firebase.js";
import firebase from "firebase";
import { Pie } from "vue-chartjs";

export default {
  extends: Pie,
  data: function() {
    return {
      datacollection: {
        labels: [],
        datasets: [
          {
            label: "Population (millions)",
            backgroundColor: [
              "#a7414a",
              "#FF8962",
              "#C28422",
              "#6a8a82",
              "#3A4B6A",
              "#4B4051",
              "#574141",
              "#F3EED9",
              "282726",
            ],
            data: [],
          },
        ],
      },
      options: {
        title: {
          display: false,
          text: "Savings Distribution",
          fontSize: 20,
        },
        layout: {
          padding: {
            top: 10,
            bottom: 30,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },

  methods: {
    fetchItems: async function() {
      var listings = null;
      await database
        .collection("Listings")
        .get()
        .then((querySnapshot) => {
          listings = querySnapshot.docs;
        });

      database
        .collection("TestUsers")
        .doc(this.user)
        .get()
        .then((doc) => {
          let plans = doc.data().plans;
          for (let i = 0; i < plans.length; i++) {
            // var totalSum = 0;
            var match = listings.find((x) => x.id == plans[i].planID);
            // console.log(match.data());
            if (this.datacollection.labels.includes(match.data().name)) {
              var index = this.datacollection.labels.indexOf(match.data().name);
              this.datacollection.datasets[0].data[index] += plans[i].amount;
            } else {
              this.datacollection.labels.push(match.data().name);
              this.datacollection.datasets[0].data.push(plans[i].amount);
            }
          }
        })
        .then(() => {
          this.renderChart(this.datacollection, this.options);
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
