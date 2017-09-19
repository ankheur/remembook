<i18n>
{
  "en": {
    "snackText": "Database updated!",
    "avertissement": "This app is in development. Please save your library regularly (Save -> export)"
  },
  "fr": {
    "snackText": "Base de données mise à jour !",
    "avertissement": "Cette app est en cours de développement. Il est recommandé de sauvegarder vos données régulièrement (Sauvegarde -> exporter)"
  }
}
</i18n>

<template>
  <div id='mainWrapper'>

    <v-container fluid>
        <v-alert info dismissible v-model="avertissement">
          {{ $t('avertissement') }}
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
      </v-container>
    </main>
    

    <v-snackbar
      bottom
      right
      :timeout="snackTimeout"
      v-model="snackbar">
      {{ $t('snackText') }}
      <v-btn flat class="pink--text" @click="snackbar = false">X</v-btn>
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
      snackbar: false,
      snackTimeout: 2000,
      avertissement: true,
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