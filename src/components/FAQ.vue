<template>
    <div>
        <div class="banner">
            <div class="banner-text">
                <h1 class="page-title">Frequently Asked Questions</h1>
            </div>
        </div>

        <div class="body">
            <input type="checkbox" id="title1" />
            <label for="title1">What is MoneyGoWhere?</label>

            <div class="content">
            Your content goes here.
            </div>

            <input type="checkbox" id="title2" />
            <label for="title2">What is MoneyGoWhere?</label>

            <div class="content">
            Your content goes here.
            </div>

            <input type="checkbox" id="title3" />
            <label for="title3">What is MoneyGoWhere?</label>

            <div class="content">
            Your content goes here.
            </div>

        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.banner {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-image: url("./../assets/office.jpg"); /* Need to change picture */
  background-size: cover;
  height: 400px;
}
.banner-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.page-title {
  font-family: "Open Sans", sans-serif;
  font-size: 90px;
  color: white;
  margin: 0px;
  height: 120px;
}
.body {
    padding: 100px;
    padding-left: 200px;
    padding-right: 200px;
    justify-content: center;
    align-items: center;
}

/* Styling the accordion */

label {
    display: block;    
    padding: 8px 22px;
    margin: 0 0 1px 0;
    cursor: pointer;
    background: #eee;
    border-radius: 3px;
    color: #444;
    transition: ease .5s;
    font-size: 20px;
    position: relative;
}

label:hover {
    background: #ccc;
}

label::after {
    content: '+';
    position: absolute;
    right: 14px;
    top: 7px;
    font-size: 25px;
}

input:checked + label::after {
    content: '-';
    right: 14px;
    top: 7px;
}


input {
    display: none;
}

input + label + .content {
    display: none;
}

input:checked + label + .content {
    display: block;
}

.content {
    background: #fff;
    padding: 10px 25px;
    margin: 0 0 1px 0;
    border-radius: 3px;
    text-align: left;
    font-size: 18px;
}

</style>
