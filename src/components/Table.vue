<template>
  <div id='mainWrapper'>
    <header>
      <v-container fluid>
        <v-layout row wrap justify-center>
          <h1>Remembook</h1>
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
        </v-layout>
      </v-container>
    </header>
    <v-container fluid>
        <v-alert info dismissible v-model="avertissement">
          Cette app est en cours de développement. Il est recommandé de sauvegarder vos données régulièrement
          (menu -> exporter)
        </v-alert>
    </v-container>
    <main>
      <v-container fluid>
        <v-layout row wrap justify-center>
          <v-flex xs11>
            <keep-alive>
              <app-form v-show='displayForm' @addEvent='addBook($event)' @editEvent='editBook($event)' :displayForm='displayForm'></app-form>
            </keep-alive>
            <app-container :books='books'></app-container>
          </v-flex>
          <app-buttons :displayForm='displayForm' @openForm='displayForm = true' @closeForm='displayForm = false'></app-buttons>

          <v-fab-transition> 
            <v-btn dark fab
                bottom right fixed
                class="green"
                v-if='scrollBtnActivated'
                @click='moveTop'>
                <v-icon>keyboard_arrow_up</v-icon>
            </v-btn>
          </v-fab-transition> 
        </v-layout>
    
        <v-dialog v-model="resetConfirm">
          <v-card>
            <v-card-title class="headline text-xs-center">Supprimer les données du site ?</v-card-title>
            <v-card-text>Vos données seront effacées de votre navigateur. Vous perdrez votre bibliothèque</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="green--text darken-1" flat="flat" @click="resetConfirm = false">Annuler</v-btn>
              <v-btn class="green--text darken-1" flat="flat" @click="resetSave">Confirmer</v-btn>
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
      <v-btn flat class="pink--text" @click="snackbar = false">Fermer</v-btn>
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
      avertissement: true,
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
      ],
      scrollBtnActivated: false
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
    },

    moveTop(){
      let scrollingElement = document.scrollingElement || document.documentElement
      scrollingElement.scrollTop = 0
    },

    scrolled(){
      this.scrollBtnActivated = window.scrollY > 300;
    } 
  },
  components:{
    'app-container': Container,
    'app-form': Form,
    'app-buttons': Buttons
  },
  mounted(){
    //On écoute l'event du scroll
    window.addEventListener('scroll', this.scrolled);

    //Dès le démarrage de l'application, on récupère les données du LocalStorage
    if(Vue.ls.get('books')){
      this.books = Vue.ls.get('books')
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrolled);
  }
}
</script>