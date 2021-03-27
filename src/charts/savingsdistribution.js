import database from "../firebase.js";
import firebase from "firebase";
import { Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,
  data: function() {
    return {
      datacollection: {
        labels: [],
        datasets: [
          {
            label: "Population (millions)",
            backgroundColor: [
              "#0074D9",
              "#FF4136",
              "#2ECC40",
              "#FF851B",
              "#7FDBFF",
              "#B10DC9",
              "#FFDC00",
              "#001f3f",
              "#39CCCC",
              "#01FF70",
              "#85144b",
              "#F012BE",
              "#3D9970",
              "#111111",
              "#AAAAAA",
            ],
            data: [],
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: "Savings Distribution (%)",
          fontSize: 20,
        },
        layout: {
          padding: {
            top: -10,
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
