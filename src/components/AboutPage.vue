<template>
  <div>
    <div id="aboutUsContainer">
    <div class="aboutUsBlock">
      <div class="aboutUsItem">
        <div class="aboutUsLeft">
        <h1 class="aboutUsTitle">About Us</h1>
        <p class="aboutUsSubtitle">Who Are We</p>
        <p class="aboutUsText">
          At MoneyGoWhere, we help you consolidate all things savings. <br><br>
          Launched in 2021, MoneyGoWhere helps streamline users' search for savings plans, <br>
          and consolidates users' savings decisions in a single application. <br>

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
        <h1 class="aboutUsTitle">Our Services</h1>
        <p class="aboutUsSubtitle">What We Do</p>
        <p class="aboutUsText">
          We cater to your needs, by providing you with: <br><br>
          
           • a snapshot of your savings plans • <br>
          <br>
          
           • a consolidated database of saving plans • <br>
          <br>

           • a novel recommender to optimise your returns • <br>
          <br>
        </p>
      </div>
      </div>
    </div>


    <div class="aboutUsBlock">
      <div class="aboutUsItem">
        <div class="aboutUsLeft">
        <h1 class="aboutUsTitle">Our Values</h1>
        <p class="aboutUsSubtitle">Customer-Centric • Innovation • Trust </p>
        <p class="aboutUsText">
          A saver's user experience is at the heart of our work. <br><br>
          We strive to innovate & introduce novel solutions to challenges savers face. <br><br>
          We are committed to enabling a seamless & safe decision-making process for savers.<br><br>
        </p>
      </div>
      </div>
      <div class="aboutUsRight">
        <img class="aboutUsImage" src="./../assets/our-story.jpg" />
      </div>
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


.page-title {
  font-family: "Open Sans", sans-serif;
  font-size: 75px;
  color: white;
  margin: 0;
  height: 90px;
}

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
  padding: 0 15%;
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