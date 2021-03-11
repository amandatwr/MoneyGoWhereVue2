<template>
  <div>
    <img
      src="./../assets/planborder2.png"
      width="1600"
      height="550"
      class="centerimg"
    />
    <!--<br>
      <h1 class = "givewidth"><b> MyLifeSavingsPlan </b> </h1>
      <h4 class = "givewidth"> Long-term wealth accumulation to secure your life goals </h4>
      <br>-->
    <br /><br />
    <img
      src="./../assets/whychose.png"
      width="1000"
      height="250"
      class="centerimg3"
    />
    <br /><br />
    <h2 class="givewidth"><b>How MyLifeSavingsPlan works</b></h2>
    <h3 class="givewidth">
      <b>For a young working professional looking to multiply her wealth </b>
    </h3>
    <h3 class="givewidth">
      Amy, 30 (ANB) and a non-smoker, wants to start a long-term, low-risk
      savings plan that'll allow her to save for her life goals while continuing
      to indulge in her passions like travelling. She buys MyLifeSavingsPlan
      with a Sum Assured7 of S$50,000 and pays an annual premium of S$4,995 for
      her chosen premium payment term of 10 years. Here's how her total cash
      value4 would grow over time.
    </h3>
    <img
      src="./../assets/youngindiv.png"
      width="700"
      height="450"
      class="centerimg2"
    />
    <br /><br />
    <h3 class="givewidth">
      <b> For a parent who wants to leave a meaningful legacy </b>
    </h3>
    <h3 class="givewidth">
      Tom, 30 (ANB) and a non-smoker, decides to buy MyLifeSavingsPlan with his
      newborn daughter, Sarah, 1 (ANB) as joint Lives Assured. He chooses a Sum
      Assured7 of S$100,000 and adds on the Cancer Premium Waiver II rider. He
      pays an annual premium of S$6,587 (S$6,500 for MyLifeSavingsPlan and S$87
      for the Cancer Premium Waiver II rider for joint Lives Assured) and
      chooses a premium payment term of 15 years so he can comfortably finance
      the plan during his working years. Here's how his total cash value4 would
      grow over time.
    </h3>
    <img
      src="./../assets/forparent.png"
      width="700"
      height="450"
      class="centerimg2"
    />
    <br /><br />
    <div class="banner-buttons">
      <button
        type="contact-button"
        @click="show_form = true"
        class="centerimg2"
      >
        Contact Sales Representative
      </button>
      <button>Visit Official Site</button>
    </div>
    <br /><br />

    <div v-if="show_form" class="centerimg2">
      <form>
        <label for="fname">Name*:</label><br />
        <input
          type="text"
          id="fname"
          name="txt"
          onchange="nameFn(this.value)"
        /><br />
        <p id="namereturn"></p>
      </form>
      <form style="margin-top: 20px">
        <label for="email">Email*:<br /></label>
        <input
          type="email"
          id="email"
          name="email"
          onchange="emailFn(this.value)"
        /><br />
        <p id="emailreturn"></p>
      </form>

      <form style="margin-top: 20px">
        <label for="hp">HP*:<br /></label>
        <input type="hp" id="hp" name="hp" /><br />
        <p id="hpreturn"></p>
      </form>

      <form style="margin-top: 20px">
        <label for="message">Queries (if any):</label><br />
        <textarea name="message" rows="5" cols="30"></textarea>
        <br />

        <input type="submit" value="Submit" maxlength="300" />
      </form>
    </div>
    <br /><br />
  </div>
</template>

<script>
export default {
  data() {
    return {
      show_form: false,
    };
  },
  methods: {
    nameFn: function (val) {
      var char = val.length;
      var end =
        "Your name is confirmed as " +
        val +
        ". You have entered " +
        char +
        " characters.";
      document.getElementById("namereturn").innerHTML = end;
    },

    emailFn: function (val) {
      if (val != null) {
        document.getElementById("emailreturn").innerHTML =
          "Your email is confirmed as " + val;
      } else {
        document.getElementById("emailreturn").innerHTML = " ";
      }
    },
  },
};
</script>

<style scoped>
.banner-buttons {
  width: 100%;
  padding: 0px 180px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-align: center;
}

.centerimg {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

.centerimg2 {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
}

.centerimg3 {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
}

.givewidth {
  margin-left: auto;
  margin-right: auto;
  width: 90%;
}

button {
  color: #192841;
  background-color: transparent;
  border: 2px solid #192841;
  cursor: pointer;
  letter-spacing: 0.2125rem;
  line-height: 1;
  overflow: hidden;
  padding: 15px 20px;
  position: relative;
  text-align: center;
  text-transform: uppercase;
  outline: 0;
}

.contact-button:hover {
  background-color: lightblue;
}
</style>