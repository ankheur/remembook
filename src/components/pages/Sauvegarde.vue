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
        <h3 class='text-xs-center'>Gestion de la sauvegarde</h3>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                        <h4>Exporter</h4>
                    </v-card-title>
                    <v-card-text>
                        <v-alert warning value="true">
                            Attention, votre bibliothèque sera perdue si vous effacez les données de votre navigateur<br>
                            Vous pouvez sauvegarder votre bibliothèque sur votre ordinateur en format json ou csv
                        </v-alert>
                        <v-layout row wrap>
                            <v-flex xs2>
                                <v-radio label="json" v-model="dlRadio" value="json"></v-radio>
                            </v-flex>
                            <v-flex xs2>
                                <v-radio label="csv" v-model="dlRadio" value="csv"></v-radio>
                            </v-flex>
                        </v-layout>
                        <v-btn @click.native='download'>Télécharger</v-btn>
                    </v-card-text>
                </v-card>
                <v-card>
                    <v-card-title>
                        <h4>Importer</h4>
                    </v-card-title>
                    <v-card-text>
                        <v-alert error dismissible v-model="alert">
                            Ce type de fichier n'est pas autorisé. Veuillez uploader un fichier .json ou .csv
                        </v-alert>
                        <p>Vous pouvez importer une bibliothèque en format json ou csv</p>
                        <input id="file" type="file">
                        <v-btn @click.native='upload'>Uploader</v-btn>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
      </v-container>
    </main>
    <v-snackbar
      bottom
      right
      :timeout="snackTimeout"
      v-model="snackbar">
      {{ snackText }}
      <v-btn flat class="pink--text" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
    const FileSaver = require('file-saver')
    const Papa = require('papaparse')
    export default {
        data(){
            return {
                dlRadio: 'json',
                imgType: '', 
                snackbar: false,
                snackText: 'Upload terminé, base de données mise à jour',
                snackTimeout: 2000,
                alert: false
            }
        },
        methods:{
            redirectHome(){
                this.$router.push('/')
            },

            download(){
                if(this.dlRadio === 'json'){
                    this.downloadJSON()
                }
                else if(this.dlRadio === 'csv'){
                    this.downloadCSV()
                }
            },

            /* -- Fonction d'export - Sauvegarde .json -- */
            downloadJSON(){
                let storage = JSON.stringify(localStorage.getItem("books"))
                let sauvegarde = new Blob([storage], {type: 'application/json'})
                FileSaver.saveAs(sauvegarde, "bibliotheque.json")
            },

            /* -- Fonction d'export - Sauvegarde .csv -- */
            downloadCSV(){
                let storage = JSON.parse(localStorage.getItem("books"))
                let csv = Papa.unparse(storage.value, {header: true, dynamicTyping:true})
                let sauvegarde = new Blob([csv], {type: 'text/csv'})
                FileSaver.saveAs(sauvegarde, "bibliotheque.csv")
            },

            upload(){
                const fileInput = document.querySelector('#file')

                //On récupère l'extension du fichier envoyé
                this.imgType = fileInput.files[0].name.split('.')
                this.imgType = this.imgType[this.imgType.length - 1]

                if(this.imgType === 'json'){
                    this.uploadJSON(fileInput)
                }
                else if(this.imgType === 'csv'){
                    this.uploadCSV(fileInput)
                }
                else{
                    this.alert = true
                    return
                }
            },

            /* -- Fonction d'import json -- */
            uploadJSON(fileInput){
                const reader = new FileReader()

                //Dès que le fichier est fini de lire, on stocke le résultat, on le parse et on l'intègre au Local Storage
                reader.addEventListener('load', ()=>{
                    let sauvegarde = reader.result
                    console.log(sauvegarde)
                    console.log(JSON.parse(sauvegarde))
                    localStorage.setItem("books",JSON.parse(sauvegarde))
                    this.snackbar = true
                    fileInput.value = ''
                })

                //Lecture du fichier
                reader.readAsText(fileInput.files[0])

            },
            /* -- Fonction d'import csv -- */
            uploadCSV(fileInput){
                const reader = new FileReader()

                //Dès que le fichier est fini de lire, on stocke le résultat, on le parse et on l'intègre au Local Storage
                reader.addEventListener('load', ()=>{
                    let resultat = reader.result
                    let intermed = Papa.parse(resultat, {header: true, dynamicTyping:true})
                    intermed = intermed.data
                    let sauvegarde = {
                        value: intermed,
                        expire: null
                    }
                    sauvegarde = JSON.stringify(sauvegarde)
                    localStorage.setItem("books", sauvegarde)
                    this.snackbar = true
                    fileInput.value = ''
                })

                //Lecture du fichier
                reader.readAsText(fileInput.files[0])
            }           
        }
    }
</script>
