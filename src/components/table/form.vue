<i18n>
{
  "en": {
    "title": "Title",
    "author": "Author",
    "edition": "Edition",
    "year": "Year",
    "read": "Read",
    "lend": "Lent",
    "lendName": "Name",
    "grade": "Grade"
  },
  "fr": {
    "title": "Titre",
    "author": "Auteur/trice",
    "edition": "Edition",
    "year": "Année",
    "read": "Lu",
    "lend": "Prêté",
    "lendName": "Nom",
    "grade": "Note"
  }
}
</i18n>

<template>
    <v-card class="grey lighten-4 elevation-1" id='form'>
        <v-card-text>
        <v-container grid-list-lg>
            <v-layout wrap>
                <v-flex xs12>
                    <v-text-field
                    name="input-1"
                    :label="$t('title')"
                    id="bookTitle"
                    v-model='bookTitle'></v-text-field>
                </v-flex>
                    <!-- <v-card v-if='suggestion'>
                        <v-list>
                            <v-list-tile v-for="item in suggestionResponse" :key="item" @click.native='populateInfo(item)'>
                                {{item.volumeInfo.title|trimTitle}} - {{item.volumeInfo.authors}}
                            </v-list-tile>
                        </v-list>
                    </v-card> -->

                <v-flex md5>
                    <v-text-field
                    name="input-2"
                    :label="$t('author')"
                    id="bookAuthor"
                    v-model='bookAuthor'></v-text-field>
                </v-flex>
                <v-flex md5>
                    <v-text-field
                    name="input-3"
                    :label="$t('edition')"
                    id="bookEditor"
                    v-model='bookEditor'></v-text-field>
                </v-flex>
                <v-flex md2>
                    <v-text-field
                    name="input-4"
                    :label="$t('year')"
                    id="bookYear"
                    type='number'
                    maxlength=4
                    v-model='bookYear'></v-text-field>
                </v-flex>
                
                <v-flex md4 align-center>
                    <v-checkbox :label="$t('read')" v-model="bookRead"></v-checkbox>
                </v-flex>

                <v-flex md4>
                    <v-checkbox :label="$t('lend')" v-model='bookLend'></v-checkbox> 
                </v-flex>
                <v-flex md4 align-center>
                    <v-text-field v-show='bookLend' name='input-5'  id='bookLender' :label="$t('lendName')" v-model='bookLender'>
                    </v-text-field>
                </v-flex>
            </v-layout>
            <v-layout align-center>
                <v-flex md6 class='review__note'>
                    <label class="subheading mr-3">{{ $t('grade') }}</label>
                    <template v-for='num in [5,4,3,2,1]'>
                        <input type="radio" :id='num' name="rating" :value='num' v-model='bookNote'>
                        <label :for='num'> {{num}} Stars</label>
                    </template>
                </v-flex>

                <v-flex xs12 >
                    <v-layout row justify-center>
                        <v-btn @click='formSubmit' :disabled="bookTitle === ''">{{submitTxt}}</v-btn>
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
                bookYear: 0,
                bookRead: false,
                bookNote: 0,
                bookLend: false,
                bookLender: '',
                submitTxt: 'Ajouter',

                idxSelected: null,
                // suggestion: false,
                // suggestionResponse: {}
            }
        },
        methods:{
            formSubmit(){
                let book = {
                        titre: this.bookTitle,
                        auteur: this.bookAuthor,
                        edition: this.bookEditor,
                        annee: this.bookYear,
                        lu: this.bookRead,
                        note: this.bookNote || 0,
                        pret: this.bookLend,
                        pretPerson: this.bookLender
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

            // eventBus.$on('endSuggestion', ()=>{
            //     this.suggestionResponse = {}
            //     this.suggestion = false
            // })

            eventBus.$on('editForm', ($event)=>{
                this.submitTxt = 'Editer'
                this.bookTitle = $event.el.titre
                this.bookAuthor = $event.el.auteur
                this.bookEditor= $event.el.edition
                this.bookYear = $event.el.annee
                this.bookRead = $event.el.lu
                this.bookNote = $event.el.note
                this.bookLend = $event.el.pret
                this.bookLender = $event.el.pretPerson

                // if(this.bookLender !== ''){ 
                //     this.bookLend = true
                // }

                this.idxSelected = $event.index

            })

            eventBus.$on('resetForm', ()=>{
                this.submitTxt = 'Ajouter'
                this.bookTitle = ''
                this.bookAuthor = ''
                this.bookEditor = ''
                this.bookYear = null
                this.bookRead = false
                this.bookNote = null
                this.bookLend = false
                this.bookLender = ''
            })
        }
        // filters: {
        //     trimTitle(value){
        //         let max = 45
        //         if(value.length > max){
        //             return value.substring(0,max)+'...'
        //         }
        //         else{
        //             return value.substring(0,max)
        //         }
        //     }
        // }
    }
</script>

<style>
    .review__note {
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    }
    .review__note input {
      display: none; }
      .review__note input:checked ~ label {
        color: #FFC40E; }
      .review__note input + label {
        font-size: 0;
        }
        .review__note input + label:before {
          content: '☆';
          font-size: 2rem; 
        }
        .review__note input + label[for="5"] {
          -ms-flex-order: 5;
              order: 5; 
        }
        .review__note input + label[for="4"] {
          -ms-flex-order: 4;
              order: 4; 
        }
        .review__note input + label[for="3"] {
          -ms-flex-order: 3;
              order: 3; 
        }
        .review__note input + label[for="2"] {
          -ms-flex-order: 2;
              order: 2; 
        }
        .review__note input + label[for="1"] {
          -ms-flex-order: 1;
              order: 1; 
        }
        .review__note input + label:hover, .review__note input + label:hover ~ label {
          color: #ffdd74; 
        }
</style>
