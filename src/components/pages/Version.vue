<template>
  <div>
    <header>
      <v-container>
        <v-layout row wrap justify-center>
          <h2>Bibliotheque</h2>
          <v-spacer></v-spacer>
          <v-btn primary dark class="grey" @click.native='redirectHome'>
            Retour
          </v-btn>
        </v-layout>
      </v-container>
    </header>
    <main>
      <v-container>
        <h3 class='text-xs-center'>Notes de version</h3>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card v-for='version in versions' :key="version.id">
                    <v-card-title>
                        <h4>{{version.title}}</h4>
                    </v-card-title>
                    <v-card-text>
                        <v-list v-if='version.features' >
                           <v-list-tile-title>Fonctionalités</v-list-tile-title>
                           <v-list-tile v-for="feature in version.features" :key="feature.id">
                                <v-list-tile-content>
                                    {{feature}}
                                </v-list-tile-content>
                           </v-list-tile>
                        </v-list>
                        <v-list v-if='version.bugs'>
                            <v-list-tile-title>Corrections</v-list-tile-title>
                            <v-list-tile v-for="bug in version.bugs" :key="bug.id">
                                <v-list-tile-content>
                                    {{bug}}
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-card-text>
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
                versions: [
                {
                    title: 'V0.2 - Safe Routes',
                    features:[
                        "Ajout d'un bouton d'option",
                        'Reset des données sauvegardées',
                        'Import/Export de la bibliothèque en format json',
                        'Mise en place du routeur',
                        'Création de la page : "Notes de version"'
                    ],
                    bugs:[
                        'Recentrage du titre',
                        'Traduction des termes anglais'
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
                }]
            }
        },
        methods:{
          redirectHome(){
                this.$router.push('/')
            }  
        }
    }
</script>
