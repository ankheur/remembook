<template>
<v-card class="grey lighten-5 elevation-0">
    <v-card-title>
      <v-text-field
        append-icon="search"
        label="Rechercher"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
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
      no-data-text="Aucune entrée trouvée"> <!-- hide-actions permet de cacher ou non la pagination-->
    
    <template slot="items" scope="props">
        <td>
            <v-checkbox
            primary
            hide-details
            v-model="props.selected"></v-checkbox>
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
        <td class="text-xs-right note">
            <template v-for='star in props.item.note'>
                  <span></span>
            </template>
        </td>
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
                {
                    text: 'Titre',
                    align: 'center',
                    value: 'titre'
                },
                { text: 'Auteur/trice', value: 'auteur' },
                { text: 'Edition', value: 'edition' },
                { text: 'Année', value: 'annee', sortable: false},
                { text: 'Lu', align: 'center', value: 'lu', sortable: false },
                { text: 'Note', align: 'center', value: 'note' }
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
    .note span:before{ 
        content: '\2605';
        font-size: 1rem;
        text-align: right;
    }

    .card__title{
        padding-left: 0px;
    }

</style>
