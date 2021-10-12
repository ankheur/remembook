<i18n>
{
  "en": {
    "search": "Search",
    "noEntry": "No entry found",

    "title": "Title",
    "author": "Author",
    "edition": "Edition",
    "year": "Year",
    "read": "Read",
    "lend": "Lent",
    "grade": "Grade",
    "bookowned" : "Books owned",
    "bookread" : "Books read"
    
  },
  "fr": {
    "search": "Rechercher",
    "noEntry": "Aucune entrée trouvée",

    "title": "Titre",
    "author": "Auteur/trice",
    "edition": "Edition",
    "year": "Année",
    "read": "Lu",
    "lend": "Prêté",
    "grade": "Note",
    "bookowned" : "Livres possédés",
    "bookread" : "Livres lus"
    
  }
}
</i18n>

<template>
<v-container>
    <v-card elevation="0">
        <v-card-title id='searchBar'>
        <v-text-field
            append-icon="mdi-magnify"
            :label="$t('search')"
            single-line
            hide-details
            v-model="search"
        ></v-text-field>
        <v-spacer></v-spacer>
        {{ $t('bookowned') }} : {{ books.length }} <br>
        {{ $t('bookread')}} : {{ booksRead }} ({{ readPercent }}%)
        </v-card-title>    

    <v-data-table
        :headers="headers"
        :items="books"
        :search="search"
        hide-actions  
        class="elevation-0"
        v-model="selected"
        item-key="titre"
        show-select
        @input='selectionAction'
        :no-data-text="$t('noEntry')"> <!-- hide-actions permet de cacher ou non la pagination-->

        <template v-slot:item.lu="{item}">
            <v-simple-checkbox
                v-model="item.lu"
                disabled
            ></v-simple-checkbox>
        </template>

        <template v-slot:item.pret="{item}">
            <v-tooltip v-if="item.pret" right>
                <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs" v-on="on">
                        {{ icons.mdiAccountCircle }}
                    </v-icon>
                </template>
                <span>{{item.pretPerson}}</span>
            </v-tooltip>
        </template>

        <template v-slot:item.note="{item}">
            <v-icon v-for='n in item.note' :key="n">{{ icons.mdiStar }}</v-icon>
        </template>
        

    </v-data-table>
    </v-card>
</v-container>
</template>

<script>
    import Vue from 'vue'
    import {eventBus} from '../main'
    import { 
        mdiAccountCircle,
        mdiStar,
    } from '@mdi/js';

    export default {
        props: ['books'],
        data () {
            return {
                search: '',
                selected: [],
                headers: [
                    { text: this.$i18n.t('title'), align: 'center', value: 'titre', width: '30%'},
                    { text: this.$i18n.t('author'), value: 'auteur', align: 'center', width: '20%'},
                    { text: this.$i18n.t('edition'), value: 'edition', align: 'center', width: '20%'},
                    { text: this.$i18n.t('year'), value: 'annee', width: '5%'},
                    { text: this.$i18n.t('read'), align: 'center', value: 'lu', width: '5%'},
                    { text: this.$i18n.t('lend'), align: 'center', value: 'pret', width: '5%'},
                    { text: this.$i18n.t('grade'), align: 'center', value: 'note', width: '10%'}
                ],
                icons: {
                    mdiAccountCircle,
                    mdiStar
                }
            }
        },
        computed: {
            booksRead() {
                let readList = this.books.filter((book) => {
                    return book.lu == true
                })
                return readList.length
            },
            readPercent() {
                return Math.floor((this.booksRead / this.books.length) * 100) || 0
            }
        },
        methods:{
            selectionAction() {
                // On notifie les boutons qu'il y a changement dans la selection
                let selection = this.selected.length //> 0 ? true:false
                eventBus.$emit('selectionToggle', selection)
            }
        },

        created() {
            // Quand on a select une rangée et qu'on clic sur éditer
            eventBus.$on('edit', () => {
                let idx = this.books.findIndex((book) => {
                    return book.titre === this.selected[0].titre
                })
                // Si on trouve la ref
                if (idx != -1) {
                    // On envoie un event pour Form avec les données de l'ouvrage sélectionné
                    eventBus.$emit('editForm', {el:this.selected[0], index: idx})
                    
                }
            })

            eventBus.$on('editDone', () => {
                this.selected = []
                this.selectionAction()
                
            })

            //Lorsqu'on veut supprimer une ligne
            eventBus.$on('delete', () => {

                //==> IDEE : popup de confirmation si plusieurs éléments sélectionnés et qu'on clic sur delete ??

                //On récupère la ligne des éléments sélectionnés et pour chaque:
                this.selected.forEach((sBook) => {
                    //On cherche son index dans le tableau principal
                    let idx = this.books.findIndex((book) => {
                        return book.titre === sBook.titre
                    })
                    //Si on le trouve, on supprime l'élement
                    if (idx != -1) {
                        this.books.splice(idx, 1)
                        Vue.ls.set('books', this.books)
                    }
                })
                this.selected= []
            })
        }
    }
</script>

<style>
    .note {
        display: -ms-flexbox;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .note i { 
        font-size: 1rem;
    }

    .avatar .icon {
        height: auto;
    }

    #searchBar {
        padding-left: 0px;
    }

    tr {
        cursor: pointer;
    }
</style>
