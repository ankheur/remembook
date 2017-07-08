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
                            Vous pouvez sauvegarder votre bibliothèque sur votre ordinateur en format json
                        </v-alert>
                        <v-btn @click.native='downloadSave'>Télécharger</v-btn>
                    </v-card-text>
                </v-card>
                <v-card>
                    <v-card-title>
                        <h4>Importer</h4>
                    </v-card-title>
                    <v-card-text>
                        <v-alert error dismissible v-model="alert">
                            Ce type de fichier n'est pas autorisé. Veuillez uploader un fichier .json
                        </v-alert>
                        <p>Vous pouvez importer une bibliothèque en format json</p>
                        <input id="file" type="file">
                        <v-btn @click.native='uploadSave'>Uploader</v-btn>
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
    const FileSaver = require('file-saver');
    export default {
        data(){
            return {
                allowed: false,
                allowedType: 'json',
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

            /* -- Fonction d'export - téléchargement d'une sauvegarde .json -- */
            downloadSave(){
                let storage = JSON.stringify(localStorage.getItem("books"))
                let sauvegarde = new Blob([storage], {type: 'application/json'})
                FileSaver.saveAs(sauvegarde, "bibliotheque.json")
            },

            /* -- Fonction d'import de fichier json -- */
            uploadSave(){
                const reader = new FileReader()
                const fileInput = document.querySelector('#file')

                //On récupère l'extension du fichier envoyé
                this.imgType = fileInput.files[0].name.split('.')
                this.imgType = this.imgType[this.imgType.length - 1]

                //Si c'est un fichier json on autorise la lecture
                if(this.imgType === this.allowedType){this.allowed = true}

                //Dès que le fichier est fini de lire, on stocke le résultat, on le parse et on l'intègre au Local Storage
                reader.addEventListener('load', ()=>{
                    let sauvegarde = reader.result
                    localStorage.setItem("books",JSON.parse(sauvegarde))
                    this.snackbar = true
                    fileInput.value = ''
                })

                if(this.allowed){
                    //Lecture du fichier
                    reader.readAsText(fileInput.files[0])
                }
                else{
                    this.alert = true
                    return
                }
            }
            
        }
    }
</script>
