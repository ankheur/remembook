<i18n>
{
  "en": {
    "saveTitle": "Manage Saves",

    "export": "Export",
    "exportInfo": "Be careful, if you delete the local storage of your browser your library would be lost<br> To keep it safe, save your library onto your computer by downloading in the .json or .csv format (recommanded)",
    "download": "Download",

    "import": "Import",
    "importAlert": "This type of file is not allowed. Please upload either .json or .csv files",
    "importMsg": "You can import .json or .csv files to use as library",
    "upload": "Upload",

    "resetMsg": "Warning! Deleting your save cannot be undone. You can export it first to keep a copy on your computer",
    "delete": "Delete",
    "deleteConfirmMsg": "Please confirm that you want to delete your save ",
    "deleteCancel": "Cancel",
    "deleteOK": "Confirm"
  },

  "fr": {
    "saveTitle": "Gestion de la sauvegarde",

    "export": "Exporter",
    "exportInfo": "Attention, votre bibliothèque sera perdue si vous effacez les données de votre navigateur<br> Vous pouvez sauvegarder votre bibliothèque sur votre ordinateur en format .json ou .csv (recommandé)",
    "download": "Télécharger",

    "import": "Importer",
    "importAlert": "Ce type de fichier n'est pas autorisé. Veuillez uploader un fichier .json ou .csv",
    "importMsg": "Vous pouvez importer une bibliothèque en format .json ou .csv",
    "upload": "Uploader",

    "resetMsg": "Attention ! Supprimer votre sauvegarde est irréversible. Vous pouvez d'abord l'exporter pour en garder une copie sur votre ordinateur",
    "delete": "Supprimer",
    "deleteConfirmMsg": "Confirmer la suppression des données",
    "deleteCancel": "Annuler",
    "deleteOK": "Confirmer"
  }
}
</i18n>

<template>
  <div>
    <main>
      <v-container fluid>
        <h2 class='text-xs-center'>{{ $t('saveTitle') }}</h2>
        <v-layout row wrap>
            <v-flex xs12>
                
                <v-card>
                    <v-container fluid>
                        <v-card-title>
                            <h3>{{ $t('export') }}</h3>
                        </v-card-title>
                        <v-card-text>
                            <v-alert info value="true" v-html="$t('exportInfo')">
                            </v-alert>
                            <v-layout row wrap>
                                <v-flex xs2>
                                    <v-radio label="json" v-model="dlRadio" value="json"></v-radio>
                                </v-flex>
                                <v-flex xs2>
                                    <v-radio label="csv" v-model="dlRadio" value="csv"></v-radio>
                                </v-flex>
                            </v-layout>
                            <v-btn @click='download'>{{ $t('download') }}</v-btn>
                        </v-card-text>

                    </v-container>
                </v-card>

                <v-card>
                    <v-container fluid>
                        <v-card-title>
                            <h3>{{ $t('import') }}</h3>
                        </v-card-title>
                        <v-card-text>
                            <v-alert error dismissible v-model="alert">
                                {{ $t('importAlert') }}
                            </v-alert>
                            <p>{{ $t('importMsg') }}</p>
                            <input id="file" type="file">
                            <v-btn @click='upload'>{{ $t('upload') }}</v-btn>
                        </v-card-text>
                    </v-container>
                </v-card>

                <v-card>
                    <v-container fluid>
                        <v-card-title>
                            <h3>Reset</h3>
                        </v-card-title>
                        <v-card-text>
                            <p>{{ $t('resetMsg') }}</p>
                            <v-btn @click='resetConfirm = true'>{{ $t('delete') }}</v-btn>
                        </v-card-text>
                    </v-container>
                </v-card>
            </v-flex>


            <v-dialog v-model="resetConfirm">
                <v-card>
                    <v-card-title class="headline text-xs-center">{{ $t('deleteConfirmMsg') }}</v-card-title>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="green--text darken-1" flat="flat" @click="resetConfirm = false">{{ $t('deleteCancel') }}</v-btn>
                        <v-btn class="green--text darken-1" flat="flat" @click="reset">{{ $t('deleteOK') }}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

        </v-layout>
      </v-container>
    </main>
    <v-snackbar
      bottom
      right
      :timeout="snackTimeout"
      v-model="snackbar">
      {{ snackText }}
      <v-btn flat class="pink--text" @click="snackbar = false">X</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
    import Vue from 'vue'

    const FileSaver = require('file-saver')
    const Papa = require('papaparse')
    export default {
        data(){
            return {
                dlRadio: 'csv',
                imgType: '', 
                snackbar: false,
                snackText: '',
                snackTimeout: 2000,
                alert: false,
                resetConfirm: false
            }
        },
        methods:{

            /* EXPORT */
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


            /* IMPORT */
            upload(){
                const fileInput = document.querySelector('#file')

                //On récupère l'extension du fichier envoyé
                this.imgType = fileInput.files[0].name.split('.')
                this.imgType = this.imgType[this.imgType.length - 1]

                //En fonction, on exécute la bonne fonction
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
                    intermed = cleanImport(intermed.data)
                    let sauvegarde = {
                        value: intermed,
                        expire: null
                    }
                    sauvegarde = JSON.stringify(sauvegarde)
                    localStorage.setItem("books", sauvegarde)
                    this.snackText = 'Upload terminé, base de données mise à jour'
                    this.snackbar = true
                    fileInput.value = ''
                })

                //Lecture du fichier
                reader.readAsText(fileInput.files[0])
            },

            reset(){
                Vue.ls.remove('books')
                
                this.resetConfirm = false
                this.snackText = 'Base de données effacée'
                this.snackbar = true
            }           
        }
    }

    function cleanImport(data){
        let books = data.filter((book)=>{
            return book.titre != ''
        })
        // return books

        let cleanData = []

        books.forEach((book)=>{
           let cleanBook = {
                titre: book.titre,
                auteur: book.auteur || '',
                edition: book.edition || '',
                annee: book.annee,
                lu: book.lu || false,
                note: book.note || 0,
                pret: book.pret || false,
                pretPerson: book.pretPerson || ''
            }
            cleanData.push(cleanBook)
        })
        
        return cleanData
    }
</script>
