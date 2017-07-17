<template>
    <v-fab-transition>
        <v-flex xs1 v-if='addBtn'>
            <v-fab-transition>
                <v-btn class="indigo"
                    key="add"
                    fab dark
                    right
                    @click.native='openForm'
                    v-if='!displayForm' fixed>
                <v-icon>add</v-icon>
                </v-btn>
                <v-btn class="red"
                    key="close"
                    fab dark
                    right
                    @click.native='closeForm'
                    v-if='displayForm'>
                <v-icon>close</v-icon>
                </v-btn>
            </v-fab-transition>    
        </v-flex>
        <v-flex xs1 v-if='editBtn'>
            <v-btn id='btn-edit' class="green"
                fab dark
                right
                @click.native='editClicked' fixed>
            <v-icon>edit</v-icon>
            </v-btn>
            <v-btn id='btn-delete' class="red"
                fab dark
                right
                @click.native='deleteClicked' fixed>
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
                eventBus.$emit('resetForm')
                this.$emit('openForm')
                document.body.scrollTop = 0
            },
            closeForm(){
                this.$emit('closeForm')
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

                this.editBtn = false
                this.addBtn = true

                document.body.scrollTop = 0
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
            eventBus.$on('selectionToggle', ($event)=>{
                this.selection = $event

                //S'il y a changement de sélection & que le form est ouvert, on le ferme
                if(this.displayForm){
                    this.$emit('closeForm')
                }

                //Si des entrées sont sélectionnées, on affiche les boutons edit et delete
                if($event){
                    this.addBtn = false
                    this.editBtn = true

                //Sinon, on les cache        
                }else{
                    this.addBtn = true
                    this.editBtn = false
                }
            })
        }
    }
</script>

<style>
    #btn-delete{
        margin-top: 5em;
    }
</style>