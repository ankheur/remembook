import Table from './components/Table.vue'
import Version from './components/pages/Version.vue'
import Sauvegarde from './components/pages/Sauvegarde.vue'


export const routes = [
    {path: '/',
    component: Table},

    {path: '/version',
    component: Version},

    {path:'/sauvegarde',
    component: Sauvegarde},

    {path: '*',
    component: Table}
]