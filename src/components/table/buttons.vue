<!--
    Gère les boutons Edit/Delete/Add
-->

<template>
    <v-fab-transition>

        <v-flex xs1 v-if='addBtn'>
            <!-- <v-fab-transition> -->
                <v-btn class="indigo"
                    key="add"
                    fab dark
                    right
                    @click.stop='openForm'
                    v-if='!displayForm'
                    fixed>
                <v-icon>add</v-icon>
                </v-btn> 


                
                <!-- <v-btn class="red"
                    key="close"
                    fab dark
                    right
                    @click='closeForm'
                    v-if='displayForm'>
                <v-icon>close</v-icon>
                </v-btn>
            </v-fab-transition>     -->
        </v-flex>

        <v-flex v-if='editBtn'>
            <v-btn id='btn-edit' color="green"
                fab dark
                right
                @click='editClicked' fixed>
                <v-icon>edit</v-icon>
            </v-btn>
            <v-btn id='btn-delete' color="red"
                fab dark
                right
                @click='deleteClicked' fixed>
                <v-icon>delete</v-icon>
            </v-btn>
        </v-flex>

    </v-fab-transition>
</template>

<script>
    import {eventBus} from '../../main'

    export default {
        props:['displayForm'],
        data(){
            return{
                addBtn: true,
                editBtn: false,

                selection: false
            }
        },
        methods:{
            openForm(){
                eventBus.$emit('resetForm') // Signal à form qu'il faut vider le formulaire
                this.$emit('openForm') // Demande à table d'ouvrir le formulaire (v-model displayForm)
                
                // let scrollingElement = document.scrollingElement || document.documentElement
                // scrollingElement.scrollTop = 0
            },
            closeForm(){
                this.$emit('closeForm') // Demande à table de fermer le formulaire (v-model displayForm)
                // eventBus.$emit('endSuggestion')

                if(this.selection){
                    this.addBtn = false
                    this.editBtn = true
                }
            },
            
            editClicked(){
                //On demande à table d'afficher le Form
                this.$emit('openForm')

                //On dit à container que le bouton editer a été cliqué
                eventBus.$emit('edit')
            },
            deleteClicked(){
                //Prévient Container qu'on a cliqué sur Supprimer
                eventBus.$emit('delete')

                //On remet les boutons d'ajouts car plus de sélection
                this.editBtn = false
                this.addBtn = true
            }
        },
        created(){
            //Quand Container informe d'un changement dans la selection
            eventBus.$on('selectionToggle', ($selection)=>{
                this.selection = $selection

                //S'il y a changement de sélection & que le form est ouvert, on le ferme
                //if(this.displayForm){
                    //this.$emit('closeForm')
                //}

                // Si des entrées sont sélectionnées, on affiche les boutons edit et delete
                if ($selection == 1) {
                    this.addBtn = false
                    this.editBtn = true     
                }
                // Sinon, on les cache   
                else if ($selection > 1) {
                    this.addBtn = false
                    this.editBtn = false
                }
                else {
                    this.addBtn = true
                    this.editBtn = false
                    this.deleteBtn = false
                }
            })
        }
    }
</script>

<style>
    #btn-delete{
        margin-top: 5em;
    }
    
    .btn--floating .icon {
        height: initial;
    }

    .v-btn--floating .v-icon{
        height: initial;
    }
</style>
