<template>
  <v-app id="app">
    <router-view></router-view>
    <v-footer>
        <p>2017 Remembook. Créé par
          <a href="https://github.com/ThunderAnkh">Ankh</a>
        </p>
    </v-footer>
  </v-app>
</template>

<script>
  export default {

  }
</script>

<style>

h1, h2 {
  font-weight: normal;
}

h1{
  font-size: 4em;
}

h2{
  font-size: 3em;
  margin-bottom: 0px;
}

h3{
  font-size: 2em;
  margin-bottom: 0px;
}

h4{
  font-size: 1.6em;
}

.card__title{
  padding-left: 16px;
}

#mainWrapper {
  min-height: 100vh;
}

.footer{
  display: flex;
  display: -ms-flexbox;
  align-items: center;
}

.footer >:last-child{
  margin-bottom: 0px;
  margin-left: 50px;
}


@media screen and (min-width: 1200px){
  .container.fluid{
    width: 90%;
    margin: auto;
  }
}
</style>
