<template>
  <v-card class="grey lighten-4 elevation-1" id='form'>
    <v-card-text>
      <v-container fluid>
        <v-layout row align-center>
            <v-flex xs9>
                <v-layout row>
                    <v-text-field
                    name="input-1"
                    label="Titre"
                    id="bookTitle"
                    v-model='bookTitle'></v-text-field>
                </v-layout>
                <v-layout row align-center>
                    <v-flex xs3>
                        <v-text-field
                        name="input-2"
                        label="Auteur"
                        id="bookAuthor"
                        v-model='bookAuthor'></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-text-field
                        name="input-3"
                        label="Edition"
                        id="bookEditor"
                        v-model='bookEditor'></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-text-field
                        name="input-4"
                        label="Année"
                        id="bookYear"
                        type='number'
                        maxlength=4
                        v-model='bookYear'></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-checkbox label="lu" v-model="bookRead"></v-checkbox>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex xs3 >
                <v-layout row justify-center>
                    <v-btn @click.native='add' :disabled="bookTitle === ''">Ajouter</v-btn>
                </v-layout>
            </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
    import {eventBus} from '../../main'

    export default {
        data(){
            return{
                bookTitle:'',
                bookAuthor: '',
                bookEditor: '',
                bookYear: null,
                bookRead: false
            }
        },
        methods:{
            add(){
                //S'il y a au moins un titre
                if(this.bookTitle !== ''){

                    //On entre toutes les info dans un objet
                    let newBook = {
                        titre: this.bookTitle,
                        auteur: this.bookAuthor,
                        edition: this.bookEditor,
                        annee: this.bookYear,
                        lu: this.bookRead
                    }
                    //On notifie Table.vue de l'ajout
                    this.$emit('addEvent', newBook)
                }
            }
        },
        created(){
            // eventBus.$on('editSelection', (el)=>{
            //     this.bookTitle = el.titre
            //     this.bookAuthor = el.auteur
            //     this.bookEditor= el.edition
            //     this.bookYear = el.annee
            //     this.bookRead = el.lu
            // })
        }
    }
</script>

