<template>
    <v-fab-transition>
        <v-flex xs1 v-if='addBtn'>
            <v-fab-transition>
                <v-btn class="indigo"
                    key="add"
                    fab dark
                    bottom
                    right
                    @click.native='openForm'
                    v-if='!displayForm'>
                <v-icon>add</v-icon>
                </v-btn>
                <v-btn class="red"
                    key="close"
                    fab dark
                    bottom
                    right
                    @click.native='closeForm'
                    v-if='displayForm'>
                <v-icon>close</v-icon>
                </v-btn>
            </v-fab-transition>    
        </v-flex>
        <v-flex xs1 v-if='editBtn'>
            <v-btn class="green"
                fab dark
                bottom
                right
                @click.native='editClicked'>
            <v-icon>edit</v-icon>
            </v-btn>
            <v-btn class="red"
                fab dark
                bottom
                right
                @click.native='deleteClicked'>
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

