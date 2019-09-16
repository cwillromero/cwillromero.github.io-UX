<template>
  <div class="full-height">
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <div class="d-flex justify-center align-center full-height">
      <v-card class="pa-2 d-flex align-center register-card animated fadeInDown faster">
        <v-container>
          <v-form v-model="valid">
            <div class="d-flex justify-center title">¡Regístrate!</div>
            <v-row class="d-flex justify-center">
              <v-icon class="photo-icon">mdi-account-plus</v-icon>
            </v-row>
            <v-row>
              <v-flex class="xs12 lg6 pa-2">
                <v-text-field v-model="email" :rules="rules.email" label="E-Mail"></v-text-field>
              </v-flex>
              <v-flex class="xs12 lg6 pa-2">
                <v-text-field
                  v-model="password"
                  type="password"
                  label="Contraseña"
                  :rules="rules.password"
                  hint="Al menos 6 caracteres"
                ></v-text-field>
              </v-flex>
              <v-flex class="xs12 lg6 pa-2">
                <v-text-field :rules="rules.name" v-model="firstName" label="Nombre"></v-text-field>
              </v-flex>
              <v-flex class="xs12 lg6 pa-2">
                <v-text-field :rules="rules.name" v-model="lastName" label="Apellido"></v-text-field>
              </v-flex>
              <v-flex class="xs12 pa-2">
                <v-textarea
                  v-model="aboutMe"
                  rows="3"
                  no-resize
                  label="Sobre mí"
                ></v-textarea>
              </v-flex>
            </v-row>
            <v-row>
              <v-flex class="sm12">
                <v-flex class="xs12 pb-2">
                  <router-link to="/login">
                    <div class="d-flex justify-center">¿Ya tienes usuario? Ingresa</div>
                  </router-link>
                </v-flex>
                <v-flex class="xs12">
                  <v-btn
                    class="full-width primary"
                    type="submit"
                    tile
                    @click="signUp()"
                    :disabled="!valid"
                  >Registrarse</v-btn>
                </v-flex>
              </v-flex>
            </v-row>
          </v-form>
        </v-container>
      </v-card>
    </div>
    <v-snackbar v-model="snackbar">
      Hubo un error al intentar registrarse. Por favor intente nuevamente.
      <v-btn color="pink" text @click="snackbar = false">Cerrar</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { firebase, firestore } from "../firebase";
export default {
  name: "LoginRegister",
  data: function() {
    return {
      isLoading: false,
      valid: false,
      snackbar: false,
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      aboutMe: "",
      userType: "Profesor",
      items: ["Profesor", "Alumno"],
      rules: {
        email: [
          v => !!v || "Es un campo es requerido.",
          v => /.+@.+\..+/.test(v) || "No es un correo electrónico válido"
        ],
        password: [
          v => (v.length > 0 ? true : "Es un campo es requerido."),
          v =>
            v.length >= 6
              ? true
              : "El password debe tener al menos 6 caracteres"
        ],
        name: [v => !!v || "Es un campo es requerido."],
      }
    };
  },
  methods: {
    signUp() {
      this.isLoading = true;
      const newUser = {
        email: this.email,
        password: this.password,
        userType: this.userType,
        firstName: this.firstName,
        lastName: this.lastName,
        aboutMe: this.aboutMe
      };
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          firebase
            .firestore()
            .collection("users")
            .add(newUser)
            .then(() => {
              this.signIn();
              this.isLoading = false;
            });
        })
        .catch(error => {
          this.isLoading = false;
          this.snackbar = true;
        });
    },
    signIn() {
      this.isLoading = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.isLoading = false;
          this.$router.push("/");
        })
        .catch(err => {
          this.isLoading = false;
        });
    }
  }
};
</script>

<style>
.photo-icon {
  font-size: 6rem !important;
}
.register-card {
  width: 40%;
  height: fit-content;
}
</style>