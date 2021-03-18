import { Line } from "vue-chartjs";
import database from "../firebase.js";
import firebase from "firebase";
import axios from "axios";

export default {
  extends: Line,
  data: function() {
    return {
      datacollection: {
        labels: [],
        datasets: [
          {
            data: [],
            label: "STI Index",
            borderColor: "#192841",
            fill: false,
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: "Monthly STI Index Across the Years",
          fontSize: 30,
          fontColor: "#000000",
        },
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1.7,
        scales: {
          xAxes: [
            {
              gridLines: {
                // drawOnChartArea: false,
                // drawTicks: false,
                display: false,
                // color: 'transparent'
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

      var months = [];
      var index = [];
      axios
        .get(
          `https://eservices.mas.gov.sg/api/action/datastore/search.json?resource_id=1c1713de-6b5e-475d-bc1e-b6a45b3e063e&limit=240&sort=end_of_month desc`
        )
        .then((response) => {
          response.data.result.records.forEach((doc) => {
            months.unshift(doc.end_of_month);
            index.unshift(doc.sti);
          });
        })
        .then(() => {
          this.datacollection.datasets[0].data = index;
          this.datacollection.labels = months;
          this.renderChart(this.datacollection, this.options);
        });
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
