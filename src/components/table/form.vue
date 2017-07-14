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
                <!-- <v-card v-if='suggestion'>
                    <v-list>
                        <v-list-tile v-for="item in suggestionResponse" :key="item" @click.native='populateInfo(item)'>
                            {{item.volumeInfo.title|trimTitle}} - {{item.volumeInfo.authors}}
                        </v-list-tile>
                    </v-list>
                </v-card> -->
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
    import axios from 'axios'

    export default {
        data(){
            return{
                bookTitle:'',
                bookAuthor: '',
                bookEditor: '',
                bookYear: null,
                bookRead: false,
                submitTxt: 'Ajouter',

                idxSelected: null,
                suggestion: false,
                suggestionResponse: {}
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
            },

            /* FONCTION POUR L'API */
            // autoComplete(){
            //     const key = 'AIzaSyA2M20Jknh3udtqKeSdTzj597eGSLpgkGw'

            //     if(this.bookTitle !== '' && this.submitTxt === 'Ajouter'){
            //         axios.get(`https://www.googleapis.com/books/v1/volumes?q=${this.bookTitle}+intitle&projection=lite&maxResults=3&country=FR&language=fr&key=${key}&fields=items/volumeInfo(title,authors,publishedDate)`)
            //             .then(res =>{
            //                 this.suggestionResponse = res.data.items
            //             })
            //         this.suggestion = true
                    
            //     }
            //     else if(this.bookTitle === ''){
            //         this.suggestion = false
            //         this.suggestionResponse = {}
            //     }
            // },

            // populateInfo(item){
            //     this.bookTitle = item.volumeInfo.title
            //     this.bookAuthor = item.volumeInfo.authors[0]
            //     this.bookYear = item.volumeInfo.publishedDate || null
            //     this.suggestionResponse = {}
            //     this.suggestion = false
            // }
        },
        created(){

            eventBus.$on('endSuggestion', ()=>{
                this.suggestionResponse = {}
                this.suggestion = false
            })

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
        },
        filters: {
            trimTitle(value){
                let max = 45
                if(value.length > max){
                    return value.substring(0,max)+'...'
                }
                else{
                    return value.substring(0,max)
                }
            }
        }
    }
</script>

