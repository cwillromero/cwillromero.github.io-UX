<template>
  <div class="user miPerfil">
    <v-app id="inspire">
      <v-card height="100%" width="100%">
        <v-navigation-drawer permanent heigth="100%">
          <v-list-item>
            <v-list-item-content>
              <v-card max-width="100%">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="nombre">{{email}}</v-list-item-title>
                    <v-list-item-subtitle class="rol">{{rol}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <img src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg" class="imgPerfil" />
              </v-card>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list dense nav>
            <v-list-item v-for="item in $props.clasesN" :key="item.id" link>
              <v-list-item-content @click="printName(item.id,item.nombre)">{{item.nombre}}</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-card>
    </v-app>
  </div>
</template>



<script>
import { firebase, firestore } from "../firebase";
import store from "../store";
export default {
  //vuetify: new Vuetify(),
  props: ["rol", "email", "clases", "clasesN"],
  data: () => ({
    contenidoClases:[],
    right: null
  }),
  mounted: function() {
    
  },
  methods: {
    printName(id,nombre) {
      localStorage.id = id;
      localStorage.name = nombre;
      console.log("yahhaha ", localStorage.id);
      store.commit('updating', localStorage.id);
      store.commit('updatingName', nombre);
    }
  }
};
</script>

<style>
.miPerfil {
  position: absolute;
  left: 0%;
  top: 0%;
  width: 20%;

}

.imgPerfil {
  vertical-align: middle;
  width: 75%;
  height: 100px;
  margin-left: 10%;
  margin-bottom: 5%;
}

.nombre {
  font-size: 15px;
}

.rol {
  font-size: 15px;
}
</style>