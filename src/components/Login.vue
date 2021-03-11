<template>
<div>
<div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<form class="login100-form validate-form">
					<span class="login100-form-title p-b-26">
						Welcome
					</span>
					<span class="login100-form-title p-b-48">
						<i class="zmdi zmdi-font"></i>
					</span>

					<div class="wrap-input100 validate-input" data-validate = "Valid email is: a@b.c">
						<input class="input100" type="text" name="email" placeholder="Email" v-on:change="emailEntry($event.value)">
						<span class="focus-input100" data-placeholder="Email"></span>
					</div>

					<div class="wrap-input100 validate-input" data-validate="Enter password">
						<input class="input100" :type="type" name="pass" placeholder="Password" v-on:change="passwordEntry($event.value)">
						<span class="focus-input100" data-placeholder="Password"></span>
                        <span class="btn-show-pass">
							<img class="visible-eye" src="./../assets/visibility.png" v-if="!passwordVisible" v-on:click="togglePasswordVisibility">
                            <img class="invisible-eye" src="./../assets/invisible.png" v-if="passwordVisible" v-on:click="togglePasswordVisibility">
						</span>
					</div>

					<div class="container-login100-form-btn">
						<div class="wrap-login100-form-btn">
							<div class="login100-form-bgbtn"></div>
							<button class="login100-form-btn" type="submit" v-on:click="login">
								Login
							</button>
						</div>
					</div>

					<div class="text-center p-t-115">
						<span class="txt1">
							Don’t have an account?
						</span>

						<a class="txt2" href="#" v-on:click="signUp">
							Sign Up
						</a>
					</div>
				</form>
			</div>
		</div>
	</div>
    </div>
</template>


<script>

export default {
    data() {
        return {
            passwordVisible: false,
            eyeIconVisible: false,
            type: "password"
        }
    },

    methods: {
        emailEntry: function(value) {
            if (value == "") {
                console.log("email is empty")
            } else {
                console.log("email is not empty")
            }
        },

        passwordEntry: function(value) {
            if (value == "") {
                console.log("pw is empty")
            } else {
                console.log("pw is not empty")
            }
        },

        login: function(){
            alert("User pressed 'Login' button")
        },

        signUp: function() {
            alert("User pressed 'Sign Up' button")
        },

        togglePasswordVisibility() {
            this.eyeIconVisible = !this.eyeIconVisible
            this.passwordVisible = !this.passwordVisible
            if (this.type == "password") {
                this.type = "text"
            } else {
                this.type = "password"
            }
            
        }
    }
}

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

.input100::-webkit-input-placeholder { color: transparent;}
.input100:-moz-placeholder { color: transparent;}
.input100::-moz-placeholder { color: transparent;}
.input100:-ms-input-placeholder { color: transparent;}


</style>


	