<i18n>
{
  "en": {
    "retour": "Back",
    "version": "Release notes"
  },
  "fr": {
    "retour": "Retour",
    "version": "Notes de version"
  }
}
</i18n>

<template>
  <div>
    <header>
      <v-container fluid>
        <v-layout row wrap justify-center>
          <h1>Remembook</h1>
          <v-spacer></v-spacer>
          <v-btn primary dark class="grey" to='/'>
                {{ $t('retour') }}
          </v-btn>
        </v-layout>
      </v-container>
    </header>
    <main>
      <v-container fluid>
        <h2 class='text-xs-center'>{{ $t('version') }}</h2>
        <v-layout row wrap>
            <v-flex xs9>
                <v-card v-for='version in versions' :key="version.id">
                    <v-container fluid>
                        <v-card-title>
                            <h3>{{version.title}}</h3>
                        </v-card-title>
                        <v-card-text>
                            <v-list v-if='version.features' >
                            <v-list-tile-title><h4>Fonctionnalités</h4></v-list-tile-title>
                            <v-list-tile v-for="feature in version.features" :key="feature.id">
                                    <v-list-tile-content>
                                        {{feature}}
                                    </v-list-tile-content>
                            </v-list-tile>
                            </v-list>
                            <v-list v-if='version.bugs'>
                                <v-list-tile-title><h4>Corrections</h4></v-list-tile-title>
                                <v-list-tile v-for="bug in version.bugs" :key="bug.id">
                                    <v-list-tile-content>
                                        {{bug}}
                                    </v-list-tile-content>
                                </v-list-tile>
                            </v-list>
                        </v-card-text>
                    </v-container>
                </v-card>
            </v-flex>
            <v-flex xs3>
                <v-card id='roadmap'>
                    <v-container fluid>
                        <v-card-title><h3>Roadmap</h3></v-card-title>
                        <v-card-text>
                            <v-list>
                                <v-list-tile v-for="item in roadmap" :key="item.id">
                                <v-list-tile-content>{{item}}</v-list-tile-content>
                                </v-list-tile>
                            </v-list>
                        </v-card-text>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
      </v-container>
    </main>
  </div>
</template>

<script>
    export default {
        data(){
            return{
                locale: 'fr',
                versions: [
                {
                    title: 'V0.5 - Sharing crossroads',
                    features: [
                        "Indication du prêt et à qui",
                        "Amélioration du design responsive",
                        "Les boutons sont désormais fixés"
                    ],
                    bugs: [
                        "Correction d'erreurs lors d'import csv",
                        "Cliquer sur la ligne permet de la sélectionner",
                        "Correction du tri pour les notes et la lecture"
                    ]
                },
                {
                    title: 'V0.4 - Judgment street',
                    features: [
                        "Système de notation",
                        "Ajout d'un footer",
                        "Ajout d'un avertissement de sauvegarde des données"
                    ],
                    bugs:[
                        "L'édition d'un élément reset la sélection",
                        "Correction du titre sur les pages version et sauvegarde",
                        "Correction des messages d'avertissement pour l'import/export de données"
                    ]
                },
                {
                    title: 'V0.3 - Changing ways',
                    features: [
                        "Ajout de l'édition",
                        'Roadmap',
                        "Bouton retour en haut"
                    ],
                    bugs:[
                        "Suppression des lignes vides lors d'import csv",
                        "Refonte de la logique interne au niveau des composants (vuejs)"
                    ]
                },
                {
                    title: 'V0.2 - Safe Routes',
                    features:[
                        "Ajout d'un bouton d'option",
                        'Reset des données sauvegardées',
                        'Import/Export de la bibliothèque en format json et csv',
                        'Mise en place du routeur',
                        'Création de la page : "Notes de version"'
                    ],
                    bugs:[
                        'Recentrage du titre',
                        'Traduction des termes anglais',
                        'Changement du nom',
                        "Ajout d'un favicon"
                    ]
                },
                {
                    title: 'V0.1 - Starting Point',
                    features: [
                        'Ajouter des ouvrages',
                        'Trier les entrées',
                        'Sélectionner un/plusieurs/tous les ouvrages',
                        'Supprimer les ouvrages sélectionnés',
                        'Sauvegarder la bibliothèque via le Local Storage',
                        'Rechercher une entrée',
                        'Notification de mise à jour de la bibliothèque'
                    ]
                }],
                roadmap: [
                    'Multilangue',
                    'Statistiques',
                    'App Android/iOS'

                ]
            }
        },
        watch:{
            locale (val){
                this.$i18n.locale = val
            }
        }
    }
</script>

<style>
    #roadmap .card__text{
        padding: 0;
    }
</style>
