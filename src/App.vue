<i18n>
{
  "en": {
    "biblio": "library",
    "save": "Save",
    "version": "About",
    "langue": "Language",
    "created": "Created by Ankh using "
  },
  "fr": {
    "biblio": "Bibliothèque",
    "save": "Sauvegarde",
    "version": "A propos",
    "langue": "Langues",
    "created": "Créé par Ankh avec "
  }
}
</i18n>

<template>
  <v-app id="app">
    <header>
      <v-layout row wrap justify-center>
        <v-toolbar light class='elevation-1'>
          <img src='../favicon.png' height='32px'>
          <v-toolbar-title>Remembook</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat to="/bibliotheque">{{ $t('biblio') }}</v-btn>
            <v-btn flat to="/sauvegarde">{{ $t('save') }}</v-btn>
            <v-btn flat to="/version">{{ $t('version') }}</v-btn>
            <!-- <v-menu offset-y>
              <v-btn flat slot="activator">{{ $t('langue') }}</v-btn>
              <v-list>
                <v-list-tile v-for="language in languages" :key="language.name" @click="changeLanguage(language)">
                  <v-list-tile-title>{{ language.name }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu> -->
          </v-toolbar-items>
        </v-toolbar>
      </v-layout>
    </header>

    <router-view>      
    </router-view>

    <v-footer>
         <p>2017 ©<a href='https://github.com/ThunderAnkh/remembook'>Remembook</a>. {{ $t('created') }} <a href='https://vuejs.org/'>VueJS</a> & <a href='https://vuetifyjs.com/'>Vuetify</a></p>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
      data(){
        return{
          languages: [
            {
              name: "Français",
              id: 'fr'
            },
            {
              name: "English",
              id: 'en'
            }
          ]
        }
      },
      methods:{
        changeLanguage(lang){
          this.$i18n.locale = lang.id
          console.log(this.$i18n.locale)
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
