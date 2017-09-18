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
    "grade": "Grade"
    
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
    "grade": "Note"
    
  }
}
</i18n>

<template>
<v-card class="grey lighten-5 elevation-0">
    <v-card-title id='searchBar'>
      <v-text-field
        append-icon="search"
        :label="$t('search')"
        single-line
        hide-details
        v-model="search"></v-text-field>
      <v-spacer></v-spacer>
    </v-card-title>    
  <v-data-table
      :headers="headers"
      :items="books"
      :search="search"
      hide-actions  
      class="elevation-0"
      v-model="selected"
      selected-key="titre"
      select-all @input='selectionAction'
      :no-data-text="$t('noEntry')"> <!-- hide-actions permet de cacher ou non la pagination-->

    
    <template slot="items" scope="props">
        <tr :active="props.selected" @click="props.selected = !props.selected">
            <td>
                <v-checkbox
                primary
                hide-details
                :input-value="props.selected"></v-checkbox>
            </td>
            <td class="text-xs-center">
                {{ props.item.titre }}
            </td>
            <td class="text-xs-right">
                {{ props.item.auteur }}
            </td>
            <td class="text-xs-right">
                {{ props.item.edition }}
            </td>
            <td class="text-xs-right">
                {{ props.item.annee }}
            </td>
            <td class="text-xs-center">
                <v-icon light v-if='props.item.lu'>check</v-icon>
                <v-icon light v-else>clear</v-icon>
            </td>
            <td class="text-xs-center">
                <span v-tooltip:top="{html:props.item.pretPerson, visible: props.item.pretPerson !== '' ? true : false }">
                    <v-icon v-if='props.item.pret' >
                        account_circle
                    </v-icon>
                </span>
            </td>
            <td class="text-xs-right note">
                <template v-for='star in props.item.note'>
                    <v-icon>grade</v-icon>
                </template>
            </td>
        </tr>
    </template>

  </v-data-table>
</v-card>
</template>

<script>
    import {eventBus} from '../../main'
    import Vue from 'vue'

    export default {
        props: ['books'],
        data () {
            return {
                search: '',
                selected: [],
                headers: [
                { text: this.$i18n.t('title'), align: 'center', value: 'titre'},
                { text: this.$i18n.t('author'), value: 'auteur' },
                { text: this.$i18n.t('edition'), value: 'edition' },
                { text: this.$i18n.t('year'), value: 'annee'},
                { text: this.$i18n.t('read'), align: 'center', value: 'lu'},
                { text: this.$i18n.t('lend'), align: 'center', value: 'pret'},
                { text: this.$i18n.t('grade'), align: 'center', value: 'note' }
                ]
            }
        },
        methods:{
            selectionAction(){
                //On notifie les boutons qu'il y a changement dans la selection
                let selection = this.selected.length > 0 ? true:false
                eventBus.$emit('selectionToggle', selection)
            }
        },
        created(){
            //Quand on a select une rangée et qu'on clic sur éditer
            eventBus.$on('edit', ()=>{
                let idx = this.books.findIndex((book)=>{
                    return book.titre === this.selected[0].titre
                })
                // //Si on trouve la ref
                if(idx != -1){
                    //On envoie un event pour Form avec les données de l'ouvrage sélectionné
                    eventBus.$emit('editForm', {el:this.selected[0], index: idx})
                    
                }
            })

            eventBus.$on('editDone', ()=>{
                this.selected = []
                this.selectionAction()
                
            })

            //Lorsqu'on veut supprimer une ligne
            eventBus.$on('delete', ()=>{

                //==> IDEE : popup de confirmation si plusieurs éléments sélectionnés et qu'on clic sur delete ??

                //On récupère la ligne des éléments sélectionnés et pour chaque:
                this.selected.forEach((sBook)=>{
                    //On cherche son index dans le tableau principal
                    let idx = this.books.findIndex((book)=>{
                        return book.titre === sBook.titre
                    })
                    //Si on le trouve, on supprime l'élement
                    if(idx != -1){
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
    .note{
        display: -ms-flexbox;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .note i{ 
        font-size: 1rem;
    }

    .avatar .icon{
        height: auto;
    }

    #searchBar{
        padding-left: 0px;
    }

    tr{
        cursor: pointer;
    }

</style>
