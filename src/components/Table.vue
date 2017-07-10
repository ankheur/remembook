<template>
  <div>
    <header>
      <v-container>
        <v-layout row wrap justify-center>
          <h2>Bibliotheque</h2>
          <v-spacer></v-spacer>
          <v-menu
          transition="v-slide-y-transition"
          bottom>
            <v-btn primary dark slot="activator" class="grey">
              Options
            </v-btn>
            <v-list>
              <v-list-tile v-for="item in menuItems" :key="item">
                <v-list-tile-title @click='item.action'>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-layout>
      </v-container>
    </header>
    <main>
      <v-container>
        <v-layout row wrap justify-center>
          <v-flex xs11>
            <keep-alive>
              <app-form v-show='displayForm' @addEvent='addBook($event)' @editEvent='editBook($event)' :displayForm='displayForm'></app-form>
            </keep-alive>
            <app-container :books='books'></app-container>
          </v-flex>
          <app-buttons :displayForm='displayForm' @openForm='displayForm = true' @closeForm='displayForm = false'></app-buttons>
        </v-layout>
        <v-dialog v-model="resetConfirm">
          <v-card>
            <v-card-title class="headline">Supprimer les données du site ?</v-card-title>
            <v-card-text>Vos données seront effacées de votre navigateur. Vous perdrez votre bibliothèque</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="green--text darken-1" flat="flat" @click.native="resetConfirm = false">Annuler</v-btn>
              <v-btn class="green--text darken-1" flat="flat" @click.native="resetSave">Confirmer</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </main>
    <v-snackbar
      bottom
      right
      :timeout="snackTimeout"
      v-model="snackbar">
      {{ snackText }}
      <v-btn flat class="pink--text" @click.native="snackbar = false">Fermer</v-btn>
    </v-snackbar>
    
  </div>    
</template>

<script>
import Vue from 'vue'

import Container from './table/container.vue'
import Form from './table/form.vue'
import Buttons from './table/buttons.vue'
import {eventBus} from '../main'

export default {
  data () {
    return {
      displayForm: false,
      books: [],
      resetConfirm: false,
      snackbar: false,
      snackText: 'Base de données mise à jour!',
      snackTimeout: 2000,
      menuItems: [
        {
          title: 'Importer/Exporter sauvegarde',
          action: ()=>{
            this.$router.push('/sauvegarde')
          }
        },
        {
          title: 'Reset sauvegarde',
          action: ()=>{
            this.resetConfirm = true
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
  },
  methods:{
    addBook(e){
      this.books.push(e)
      this.displayForm = false
      Vue.ls.set('books', this.books)
      this.snackbar = true
    },

    editBook(e){
      this.books.splice(e.index, 1, e.book)
      this.displayForm = false
      Vue.ls.set('books', this.books)
      this.snackbar = true
    },
    
    resetSave(){
      Vue.ls.remove('books')
      this.resetConfirm = false
      location.reload();
    }
  },
  components:{
    'app-container': Container,
    'app-form': Form,
    'app-buttons': Buttons
  },
  mounted(){
    //Dès le démarrage de l'application, on récupère les données du LocalStorage
    if(Vue.ls.get('books')){
      this.books = Vue.ls.get('books')
    }
  }
}
</script>

<style>
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}*/
</style>
