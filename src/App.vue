<template>
  <v-app id="app">
    <router-view></router-view>
    <v-footer>
        <p>2017 Remembook. Créé par
          <a href="https://github.com/ThunderAnkh">Ankh</a>
        </p>
    </v-footer>
  </v-app>
</template>

<script>
  export default {

  }
</script>

<style>

#mainWrapper {
  min-height: 100vh;
}

.footer{
  display: flex;
  display: -ms-flexbox;
  align-items: center;
}

.footer >:last-child{
  margin-bottom: 0px;
  margin-left: 50px;
}

</style>
