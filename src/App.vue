<template>
  <div id="app">
    <v-app>
      <router-view></router-view>
    </v-app>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import Perfil from "./components/Perfil";
import Clase from "./components/ClaseOpciones";
import Banner from "./components/Banner";
import { firebase } from "./firebase";

export default {
  name: "App",
  components: {
    HelloWorld,
    Perfil,
    Clase,
    Banner
  },
  data: () => ({
    //
  })
};
</script>

<style>
.full-width {
  width: 100%;
}
.full-height {
  height: 100%;
}
</style>