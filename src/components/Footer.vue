<template>
  <div id="footer">
    <div id="flexbox">
      <div id="footerLeft">
        <div id="social">
          <img class="socialIcon" src="./../assets/facebook.png"/>
          <img class="socialIcon" src="./../assets/instagram.png"/>
          <a href="https://github.com/dakshitaa/MoneyGoWhere-Project" target="_blank">
          <img class="socialIcon" src="./../assets/github.png"/>
          </a>
          <img class="socialIcon" src="./../assets/linkedin.png"/>
        </div>
      </div>
      <div id="logoContainer">
  <img id="companyLogo" src="./../assets/block.png"/>
  <p class="footerPara">MoneyGoWhere</p>
  </div>
      <div id="footerRight">
      <p class=" footerPara copyright">&#169;2021 BT3103. All Rights Reserved</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
#footer {
  margin: 0;
  padding: 25px;
  height: 110px;
  background-color: #36454f;
}

#footerLeft, 
#footerRight {
    margin: 25px;
    width: 200px;
}

#flexbox {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
}

#social {
  display: flex;
  flex-direction: row;
}

.socialIcon {
  max-width: 30px;
  margin: 0 7px;
  height: 30px;
}

#companyLogo {
    width: 50px;
    padding-left: 4px;
    margin-bottom: 5px
}

.footerPara {
    color: white;
    margin: 0 0 5px 7px;
}

#logoContainer {
    display: flex;
    align-items: center;
    flex-direction: column;
}

.copyright {
    font-size: 9px;
    padding-left: 25px;
}
</style>