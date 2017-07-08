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
      select-all @input='selection'
      no-data-text="Aucune entrée trouvée"> <!-- hide-actions permet de cacher ou non la pagination-->
    
    <template slot="items" scope="props">
        <td>
            <v-checkbox
            primary
            hide-details
            v-model="props.selected"></v-checkbox>
        </td>
        <td class="text-xs-center">{{ props.item.titre }}</td>
        <td class="text-xs-right">{{ props.item.auteur }}</td>
        <td class="text-xs-right">{{ props.item.edition }}</td>
        <td class="text-xs-right">{{ props.item.annee }}</td>
        <td class="text-xs-right">
            <v-icon light v-if='props.item.lu'>check</v-icon>
            <v-icon light v-else>clear</v-icon>
        </td>
        <td class="text-xs-right">{{ props.item.note }}</td>
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
                    sortable: true,
                    value: 'titre'
                },
                { text: 'Auteur/trice', value: 'auteur' },
                { text: 'Edition', value: 'edition' },
                { text: 'Année', value: 'annee' },
                { text: 'Lu', value: 'lu' },
                { text: 'Note', value: 'note' }
                ]
            }
        },
        methods:{
            selection(){
                this.$emit('selectionEvent', this.selected)
            }
        },
        created(){
            // eventBus.$on('edit', ()=>{
            //     let idx = this.books.findIndex((book)=>{
            //         return book.titre === this.selected[0].titre
            //     })
            //     if(idx != -1){
            //         eventBus.$emit('editSelection', this.selected[0])
            //         console.log(this.selected[0])
            //         this.$emit('editForm')
            //     }
            // })

            //Lorsqu'on veut supprimer une ligne
            eventBus.$on('delete', ()=>{
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
                this.$emit('endSelection')
            })
        }
    }
</script>

<style scoped>
    td{
        cursor: pointer;
    }
</style>
