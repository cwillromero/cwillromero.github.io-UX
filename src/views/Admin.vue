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

        <v-btn x-small text color="white" @click="dialog = true">Cerrar Sesión</v-btn>

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
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar">
        {{ text }}
        <v-btn :color="snackColor" text @click="snackbar = false">Close</v-btn>
      </v-snackbar>
    </div>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Cerrar sesión?</v-card-title>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="red" text @click="dialog = false">Cancelar</v-btn>
          <v-btn color="green darken-1" text @click="logout()">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
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
      altura: window.innerHeight - 5,
      snackColor: "green",
      text: "Bienvenido!",
      snackbar: true,
      dialog : false
    };
  },
  mounted: function() {
    console.log(this.altura);
  },
  methods: {
    logout: function() {
      this.dialog = false;
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
