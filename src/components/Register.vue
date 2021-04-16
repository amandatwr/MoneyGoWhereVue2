<template>
  <div>
    <div class="limiter">
      <div class="container-register">
        <div class="wrap-register">
          <form class="login100-form validate-form">
            <div class="register -head">
              <span class="login100-form-title padding-bot-10"> Register </span>
              <div class="subtitle padding-bot-20">
                Ready to kick start your savings journey?<br />
                Begin by registering with us in one simple step!
              </div>
            </div>
            <div class="register-body">
              <div class="register-left">
                <div class="wrap-input100">
                  <input
                    class="input100"
                    type="text"
                    name="name"
                    placeholder="Name"
                    v-model="name"
                  />
                  <span class="focus-input100" data-placeholder="Name"></span>
                </div>

                <div
                  class="wrap-input100 validate-input"
                  data-validate="Enter password"
                >
                  <input
                    class="input100"
                    :type="type"
                    name="pass"
                    placeholder="Password"
                    v-model="password"
                  />
                  <span
                    class="focus-input100"
                    data-placeholder="Password"
                  ></span>
                  <span class="btn-show-pass">
                    <img
                      class="visible-eye"
                      src="./../assets/visibility.png"
                      v-if="!passwordVisible"
                      v-on:click="togglePasswordVisibility"
                    />
                    <img
                      class="invisible-eye"
                      src="./../assets/invisible.png"
                      v-if="passwordVisible"
                      v-on:click="togglePasswordVisibility"
                    />
                  </span>
                </div>
              </div>
              <div class="register-right">
                <div
                  class="wrap-input100 validate-input"
                  data-validate="Valid email is: a@b.c"
                >
                  <input
                    class="input100"
                    type="text"
                    name="email"
                    placeholder="Email"
                    v-model="email"
                  />
                  <span class="focus-input100" data-placeholder="Email"></span>
                </div>
                <div class="wrap-input100">
                  <input
                    class="input100"
                    type="number"
                    min=0
                    name="goal"
                    v-model="goal"
                  />
                  <span
                    class="focus-input100"
                    data-placeholder="Savings Goal (in $SGD)"
                  ></span>
                </div>
              </div>
            </div>
            <div v-if="error">
              <p class="alert">{{ this.errorMessage }}</p>
            </div>

            <div class="container-login100-form-btn padding-top-20">
              <div class="wrap-login100-form-btn">
                <div class="register-bgbtn"></div>
                <button
                  class="login100-form-btn"
                  type="submit"
                  v-on:click="register"
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import firebase from "firebase";
import database from "../firebase.js";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      goal: 0,
      passwordVisible: false,
      eyeIconVisible: false,
      type: "password",
      error: false,
      errorMessage: null,
    };
  },

  methods: {
    nameEntry: function (value) {
      this.name = value;
    },

    emailEntry: function (value) {
      this.email = value;
      if (value == "") {
        console.log("email is empty");
      } else {
        console.log("email is not empty");
      }
    },

    passwordEntry: function (value) {
      this.password = value;
      if (value == "") {
        console.log("pw is empty");
      } else {
        console.log("pw is not empty");
      }
    },

    goalEntry: function (value) {
      this.goal = value;
    },

    register: function (e) {
      console.log(this.email);
      console.log(this.password);
      console.log(this.goal);
      console.log(this.name);
      if (this.name == "") {
        this.error = true;
        this.errorMessage = "'Name' field required.";
      } else if (this.goal < 0) {
        this.error = true;
        this.errorMessage="Invalid 'Goal' input amount."
      
      } else {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(async (cred) => {
            //   firebase.storage().ref('users/' + cred.user.uid + '/user.png').put('./../assets/user.png').then(() => {
            //   console.log('profile picture succesfully uploaded')
            //   }).catch(err => {
            //       console.log(err.message)
            //   });
            await database
              .collection("TestUsers")
              .doc(cred.user.uid)
              .set({
                name: this.name,
                email: this.email,
                goal: this.goal,
                plans: []
              });
          }).then(() =>{
              this.$router.go({ path: this.$router.path });
          },
            (err) => {
              console.log(err.message);
              this.error = true;
              this.errorMessage = err.message + ".";
            });
      }
      e.preventDefault();
    },

    togglePasswordVisibility() {
      this.eyeIconVisible = !this.eyeIconVisible;
      this.passwordVisible = !this.passwordVisible;
      if (this.type == "password") {
        this.type = "text";
      } else {
        this.type = "password";
      }
    },
  },
};
</script>


<style>
@import "./../css/util.css";
@import "./../css/main.css";

.button-show-pass {
  width: 100px;
}

.visible-eye,
.invisible-eye {
  width: 100%;
  overflow: hidden;
}

.input100::-webkit-input-placeholder {
  color: transparent;
}
.input100:-moz-placeholder {
  color: transparent;
}
.input100::-moz-placeholder {
  color: transparent;
}
.input100:-ms-input-placeholder {
  color: transparent;
}

.register-body {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-content: space-between;
}

.register-left,
.register-right {
  margin: 0 25px;
  width: 50%;
}

.register-bgbtn {
  position: absolute;

  z-index: -1;
  width: 45%;
  height: 100%;
  background: #333333;
  background: -webkit-linear-gradient(
    right,
    #21d4fd,
    #b721ff,
    #21d4fd,
    #b721ff
  );
  background: -o-linear-gradient(right, #21d4fd, #b721ff, #21d4fd, #b721ff);
  background: -moz-linear-gradient(right, #21d4fd, #b721ff, #21d4fd, #b721ff);
  background: linear-gradient(right, #21d4fd, #b721ff, #21d4fd, #b721ff);
  top: 0;
  left: 27%;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.container-register {
  width: 100%;
  min-height: 100vh;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  padding-top: 65px;
  background: #f2f2f2;
}

.wrap-register {
  width: 800px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  padding: 55px 55px 33px 55px;

  box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);
  -o-box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);
  -ms-box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.1);
}

.subtitle {
  text-align: center;
}

.register-head {
  padding-bottom: 100px;
}

.padding-bot-10 {
  padding-bottom: 10px;
}

.padding-bot-20 {
  padding-bottom: 40px;
}

.padding-top-20 {
  padding-top: 20px;
}

.alert {
  text-align: center;
}

.container-register {
	background-image: url("./../assets/account-banner.jpeg");
	background-size: cover;
}

</style>


	