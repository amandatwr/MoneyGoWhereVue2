<template>
  <div id="aboutUsContainer">
    <!-- <hr/> -->
    <div class="aboutUsBlock">
      <div class="aboutUsItem">
        <div class="aboutUsLeft">
        <h1 class="aboutUsTitle">About Us.</h1>
        <p class="aboutUsSubtitle">Who Are We</p>
        <p class="aboutUsText">
         As a one-stop platform for all things savings, we seek to streamline the search process for savings plans.
        </p>
      </div>
      </div>
      <div class="aboutUsRight">
        <img class="aboutUsImage" src="./../assets/about-us.jpg" />
      </div>
    </div>


    <div class="aboutUsBlock">
      <div class="aboutUsRight">
        <img class="aboutUsImage" src="./../assets/our-team.jpg" />
      </div>
      <div class="aboutUsItem">
        <div class="aboutUsLeft">
        <h1 class="aboutUsTitle">Our Services.</h1>
        <p class="aboutUsSubtitle">What We Do</p>
        <p class="aboutUsText">
          For Savers: Our novel optimisation algorithm will recommend optimal amounts to be allocated to each savings plan. Be matched with a sales representative if you would like to find out more!<br><br>
          For Financial Institutions: List your savings plan on our centralised database and be matched with interested savers here. Our analytics dashboard provides a consolidated view of your performance

        </p>
      </div>
      </div>
    </div>


    <div class="aboutUsBlock">
      <div class="aboutUsItem">
        <div class="aboutUsLeft">
        <h1 class="aboutUsTitle">Our Values</h1>
        <p class="aboutUsSubtitle">Customer-Centric | Innovation | Trust </p>
        <p class="aboutUsText">
         We are commited to providing reliable and trustworthy suggestions using our innovative recommender algorithm and ensuring a seamless and safe process of saving for our savers.
        </p>
      </div>
      </div>
      <div class="aboutUsRight">
        <img class="aboutUsImage" src="./../assets/our-story.jpg" />
      </div>
    </div>


  </div>
</template>

<script>
export default {};
</script>

<style>
@import "./../css/style.css";
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@300&display=swap");

h1 {
  font-family: "Open Sans", sans-serif;
  font-size: 50px;
}

#aboutUsContainer {
  margin: 0;
  padding: 0;
}

.aboutUsBlock {
  text-align: center;
  display: flex;
}

.aboutUsItem {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 7%;
}

.aboutUsRight {
    max-width: 50%;
}

.aboutUsTitle {
  font-size: 50px;
  margin-bottom: 0;
}

.aboutUsSubtitle {
  margin: 0;
  padding: 0;
  color: #999999;
}

.aboutUsText {
  font-size: 14px;
}

.aboutUsImage {
  max-width: 100%;
}
</style>