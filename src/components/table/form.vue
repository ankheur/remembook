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
                    <v-btn @click.native='formSubmit' :disabled="bookTitle === ''">{{submitTxt}}</v-btn>
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
                bookRead: false,
                submitTxt: 'Ajouter',

                idxSelected: 0
            }
        },
        methods:{
            formSubmit(){
                let book = {
                        titre: this.bookTitle,
                        auteur: this.bookAuthor,
                        edition: this.bookEditor,
                        annee: this.bookYear,
                        lu: this.bookRead
                    }

                if(this.bookTitle !== ''){
                    if(this.submitTxt === 'Ajouter'){
                        //On notifie Table.vue de l'ajout
                        this.$emit('addEvent', book)
                    }

                    else if (this.submitTxt === 'Editer'){
                        this.$emit('editEvent',{book, index: this.idxSelected})
                        eventBus.$emit('editDone')
                    }

                    //On notifie Boutons que le formulaire s'est fermé
                    eventBus.$emit('formClosed')
                }
                
            }
        },
        created(){

            eventBus.$on('editForm', ($event)=>{
                this.submitTxt = 'Editer'
                this.bookTitle = $event.el.titre
                this.bookAuthor = $event.el.auteur
                this.bookEditor= $event.el.edition
                this.bookYear = $event.el.annee
                this.bookRead = $event.el.lu

                this.idxSelected = $event.index

            })

            eventBus.$on('resetForm', ()=>{
                this.submitTxt = 'Ajouter'
                this.bookTitle = ''
                this.bookAuthor = ''
                this.bookEditor = ''
                this.bookYear = null
                this.bookRead = false
            })
        }
    }
</script>

