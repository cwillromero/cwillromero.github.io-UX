<template>
  <div>
    <v-card class="overflow-hidden">
      <v-app-bar
        absolute
        color="#37474F"
        dark
        shrink-on-scroll
        fade-img-on-scroll
        src="https://picsum.photos/1920/1080?random"
        scroll-target="#scrolling-techniques-2"
      >
        <template v-slot:img="{ props }">
          <v-img v-bind="props" gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"></v-img>
        </template>

        <v-toolbar-title>Administración</v-toolbar-title>

        <div class="flex-grow-1"></div>

        <v-btn x-small text color="white" @click="cerrarSesion()">Cerrrar Cesión</v-btn>

        <template v-slot:extension>
          <v-tabs align-with-title background-color="transparent">
            <v-tab @click="mostrar=1">Clases</v-tab>
            <v-tab @click="mostrar=2">Usuarios</v-tab>
            <v-tab @click="mostrar=3">Instituciones</v-tab>
          </v-tabs>
        </template>
      </v-app-bar>
      <v-sheet id="scrolling-techniques-2" class="overflow-y-auto" :max-height="altura">
        <v-container>
          <clases v-if="mostrar===1" />
          <Usuarios v-if="mostrar===2" />
          <Instituciones v-if="mostrar===3" />
        </v-container>
      </v-sheet>
    </v-card>
  </div>
</template>

<script>
import { firebase} from "../firebase";
import Clases from "./AdminClases";
import Usuarios from "./UpdateDelete";
import Instituciones from "./AdminInstituciones";
export default {
  components: {
    Clases,
    Usuarios,
    Instituciones
  },
  data: function() {
    return {
      mostrar: 1,
      altura: window.innerHeight - 5
    };
  },
  mounted: function() {
    console.log(this.altura);
  },
  methods: {
    cerrarSesion(){
      firebase.auth().signOut();
      this.$router.push("/login");
    }
  }
};
</script>

<style>
.principal {
  position: relative;
}
</style>
