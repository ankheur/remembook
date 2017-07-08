<template>
    <v-flex xs1>
        <v-fab-transition>
            <v-btn :class="[addBtn.class]"
                :key="addBtn.icon"
                fab dark
                bottom
                right
                @click.native='add'
                v-if='noSelection'>
            <v-icon>{{ addBtn.icon }}</v-icon>
            </v-btn>
            <!--<v-btn class="green"
                fab dark
                bottom
                right
                @click.native='editEntry'
                v-if='!noSelection'>
            <v-icon>edit</v-icon>
            </v-btn>-->
            <v-btn class="red"
                fab dark
                bottom
                right
                @click.native='deleteEntry'
                v-if='!noSelection'>
            <v-icon>delete</v-icon>
            </v-btn>
        </v-fab-transition>
        </v-flex>
</template>

<script>
    import {eventBus} from '../../main'

    export default {
        props:['addPressed', 'noSelection'],
        computed:{
            addBtn(){
            return this.addPressed ? {'class':'red', icon:'close'} : {'class':'indigo', icon:'add'}
            }
        },
        methods:{
            add(){
                this.$emit('addClicked')
            },
            // editEntry(){
            //     eventBus.$emit('edit')
            // },
            deleteEntry(){
                eventBus.$emit('delete')
            }
        }
    }
</script>

