<template>
  <v-app id="app">
    <header>
      <v-layout row wrap justify-center>
        <v-toolbar light class='elevation-1'>
          <img src='../favicon.png' height='32px'>
          <v-toolbar-title>Remembook</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat to="/bibliotheque">Bibliothèque</v-btn>
            <v-btn flat to="/sauvegarde">Sauvegarde</v-btn>
            <v-btn flat to="/version">Version</v-btn>
          </v-toolbar-items>
        </v-toolbar>
      </v-layout>
    </header>

    <router-view>      
    </router-view>

    <v-footer>
        <p>2017 ©<a href='https://github.com/ThunderAnkh/remembook'>Remembook</a>. Créé par Ankh
          avec <a href='https://vuejs.org/'>VueJS</a> et <a href='https://vuetifyjs.com/'>Vuetify</a>
        </p>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
      data(){
        return{
        }
      }
  }
</script>

<style>

.toolbar__title{
    font-size: 3em;
}


h2{
  font-size: 3em;
  margin-bottom: 0px;
  font-weight: normal;
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

  img{
    height: 42px;
  }
}
</style>
