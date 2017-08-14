<template>
  <div>
    <main>
      <v-container fluid>
        <h2 class='text-xs-center'>Gestion de la sauvegarde</h2>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-container fluid>
                        <v-card-title>
                            <h3>Exporter</h3>
                        </v-card-title>
                        <v-card-text>
                            <v-alert info value="true">
                                Attention, votre bibliothèque sera perdue si vous effacez les données de votre navigateur<br>
                                Vous pouvez sauvegarder votre bibliothèque sur votre ordinateur en format .json ou .csv (recommandé)
                            </v-alert>
                            <v-layout row wrap>
                                <v-flex xs2>
                                    <v-radio label="json" v-model="dlRadio" value="json"></v-radio>
                                </v-flex>
                                <v-flex xs2>
                                    <v-radio label="csv" v-model="dlRadio" value="csv"></v-radio>
                                </v-flex>
                            </v-layout>
                            <v-btn @click='download'>Télécharger</v-btn>
                        </v-card-text>
                    </v-container>
                </v-card>
                <v-card>
                    <v-container fluid>
                        <v-card-title>
                            <h3>Importer</h3>
                        </v-card-title>
                        <v-card-text>
                            <v-alert error dismissible v-model="alert">
                                Ce type de fichier n'est pas autorisé. Veuillez uploader un fichier .json ou .csv
                            </v-alert>
                            <p>Vous pouvez importer une bibliothèque en format .json ou .csv</p>
                            <input id="file" type="file">
                            <v-btn @click='upload'>Uploader</v-btn>
                        </v-card-text>
                    </v-container>
                </v-card>
                <v-card>
                    <v-container fluid>
                        <v-card-title>
                            <h3>Reset</h3>
                        </v-card-title>
                        <v-card-text>
                            <p>Attention ! Supprimer votre sauvegarde est irréversible. Vous pouvez d'abord l'exporter pour en garder une copie sur votre ordinateur</p>
                            <v-btn @click='resetConfirm = true'>Supprimer</v-btn>
                        </v-card-text>
                    </v-container>
                </v-card>
            </v-flex>

            <v-dialog v-model="resetConfirm">
                <v-card>
                    <v-card-title class="headline text-xs-center">Confirmer la suppression des données</v-card-title>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="green--text darken-1" flat="flat" @click="resetConfirm = false">Annuler</v-btn>
                        <v-btn class="green--text darken-1" flat="flat" @click="reset">Confirmer</v-btn>
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
      <v-btn flat class="pink--text" @click="snackbar = false">Close</v-btn>
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
