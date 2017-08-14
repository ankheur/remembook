<template>
  <v-app id="app">
    <header>
      <v-layout row wrap justify-center>
        <v-toolbar light class='elevation-1'>
          <img src='../favicon.png' height='32px'>
          <h1><v-toolbar-title>Remembook</v-toolbar-title></h1>
          <v-spacer></v-spacer>
          <v-menu
          transition="v-slide-y-transition"
          bottom left>
            <v-btn primary dark slot="activator" class="grey">
              Menu
            </v-btn>
            <v-list>
              <v-list-tile v-for="item in menuItems" :key="item">
                <v-list-tile-title @click='item.action'>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
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
          menuItems: [
            {
              title: 'Importer/Exporter sauvegarde',
              action: ()=>{
                this.$router.push('/sauvegarde')
              }
            },
            {
              title: 'Notes de version',
              action: ()=>{
                  this.$router.push('/version')
              }
            }
          ]
        }
      }
  }
</script>

<style>

.toolbar__title{
    font-size: 0.3em;
}

h1, h2 {
  font-weight: normal;
}

h1{
  margin-bottom: 0px;
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

  img{
    height: 42px;
  }
}
</style>
