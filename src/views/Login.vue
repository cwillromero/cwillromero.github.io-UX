<template>
  <div class="full-height">
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <div class="d-flex justify-center align-center full-height">
      <v-card class="pa-2 d-flex align-center login-card animated fadeInDown faster">
        <v-container>
          <div class="d-flex justify-center title">¡Ingresa!</div>
          <v-form v-model="valid">
            <v-row class="d-flex justify-center">
              <v-icon class="photo-icon">mdi-account-circle</v-icon>
            </v-row>
            <v-row>
              <v-flex class="xs12 pa-2">
                <v-text-field v-model="email" label="E-Mail" :rules="rules.email"></v-text-field>
              </v-flex>
              <v-flex class="xs12 pa-2">
                <v-text-field
                  v-model="password"
                  type="password"
                  label="Contraseña"
                  :rules="rules.password"
                ></v-text-field>
              </v-flex>
            </v-row>
            <v-row>
              <v-flex class="sm12">
                <v-flex class="xs12 pb-2">
                  <router-link to="/register">
                    <div class="d-flex justify-center">¿No tienes usuario aún? Regístrate</div>
                  </router-link>
                </v-flex>
                <v-flex class="xs12">
                  <v-btn class="full-width primary" tile @click="signIn()">Ingresar</v-btn>
                </v-flex>
              </v-flex>
            </v-row>
          </v-form>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script>
import { firebase, firestore } from "../firebase";
export default {
  name: "Login",
  data: function() {
    return {
      isLoading: false,
      valid: false,
      email: "",
      password: "",
      rules: {
        email: [
          v => !!v || "Requerido",
          v => /.+@.+\..+/.test(v) || "No es un correo electrónico válido"
        ],
        password: [
          v => (v.length > 0 ? true : "Requerido"),
          v =>
            v.length >= 6
              ? true
              : "El password debe tener al menos 6 caracteres"
        ]
      }
    };
  },
  methods: {
    signIn() {
      //this.isLoading = true;
      console.log("Seción Iniciada aqui");
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          //this.isLoading = false;
          //this.$router.push("/");
          console.log("Seción Iniciada");

          firestore
            .collection("users")
            .get()
            .then(querySnapshot => {
              querySnapshot.docs.forEach(element => {
                if (
                  this.email === element.data().email &&
                  element.data().password === this.password
                ) {
                  console.log("usuario unico aqui!!!!");
                  if(element.data().userType === "Profesor"){
                    this.$router.push("/user");
                  }else if(element.data().userType === "Alumno"){
                    this.$router.push("/user");
                  }else if(element.data().userType === "Admin"){
                    this.$router.push("/");
                  }
                }
              });
            });
        })
        .catch(err => {
          //this.isLoading = false;
          console.log("Error Iniciado Sesión");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.photo-icon {
  font-size: 6rem !important;
}
.login-card {
  width: 30%;
  height: fit-content;
}
</style>