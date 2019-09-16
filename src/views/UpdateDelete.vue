<template>
  <div class="UpdateDelete">
    <v-toolbar dark prominent color="blue-grey darken-4">
      <!--v-btn text>
        <v-icon>mdi-home</v-icon>Página Principal
      </v-btn-->
      <v-toolbar-title>Administración de Usuarios</v-toolbar-title>
    </v-toolbar>
    <v-form ref="formulario" v-model="valid">
      <v-container>
        <v-row align="center">
          <v-col class="d-flex" cols="12" sm="4">
            <v-select v-model="valorSelect" :items="items" label="Users" @change="datos()"></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model="correo" :rules="emailRules" label="Correo" required></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="contrasenia"
              :rules="nameRules"
              :counter="20"
              type="password"
              label="Contraseña"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col class="d-flex" cols="12" sm="4">
            <v-select v-model="tipo" :items="tipos" label="Tipo"  ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-flex class="xs12 lg4 pa-2">
            <v-btn class="full-width primary" tile @click="actualizar()">Actualizar</v-btn>
          </v-flex>

          <v-flex class="xs12 lg4 pa-2">
            <v-btn class="full-width error" tile @click="eliminar()">Eliminar</v-btn>
          </v-flex>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { firebase, firestore } from "../firebase";
export default {
  data: () => ({
    items: [],
    tipos: [],
    tipo: "",
    valid: false,
    nameRules: [
      v => !!v || "Name is required",
      v => {
        try {
          return v.length <= 20 || "Name must be less than 20 characters";
        } catch (error) {
          return true;
        }
      }
    ],
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    valorSelect: "",
    id: "",
    correo: "",
    contrasenia: ""
  }),
  mounted: function() {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(element => {
          if(element.data().userType !== "Admin"){
            this.items.push(element.data().email);
            console.log(element.data().userType);
          }
          
        });
      });
  },
  methods: {
    datos() {
      firestore
        .collection("users")
        .get()
        .then(querySnapshot => {
          querySnapshot.docs.forEach(element => {
            if (this.valorSelect === element.data().email && element.data().userType !== "Admin") {
              this.correo = element.data().email;
              this.contrasenia = element.data().password;
              this.id = element.id;
              this.tipo = element.data().userType;
              if(this.tipo === "Alumno"){
                this.tipos = ["Alumno","Profesor"];
              }else{
                this.tipos = ["Profesor","Alumno"];
              }
            }
          });
        });
    },
    actualizar() {
      firestore
        .collection("users")
        .doc(this.id)
        .update({
          email: this.correo,
          password: this.contrasenia,
          userType: this.tipo
        })
        .then(error => {
          alert("Se modificó exitosamente!");
          this.$refs.formulario.reset();
        });
    },
    eliminar(){
        firestore
        .collection("users")
        .doc(this.id)
        .delete() 
        .then(error => {
          alert("Se eliminó exitosamente!");
          this.$refs.formulario.reset();
        });
    }
  }
};
</script>

<style>
</style>