<template>
  <div>
    <v-toolbar dark prominent color="blue-grey darken-4" style="height:200px;">
      <v-toolbar-title>Administración de Usuarios</v-toolbar-title>
    </v-toolbar>
    <v-container id="dropdown-example">
      <v-row>
        <v-col cols="12" sm="12">
          <v-overflow-btn
            v-model="seleccionado"
            @change="showUser()"
            class="my-2"
            label="Usuarios"
            :items="users"
            :disabled="dropdownAble == 1 ? true : false"
            target="#dropdown-example"
          ></v-overflow-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
          <v-btn
            class="ma-2 text-center"
            tile
            width="30%"
            color=" success"
            @click="agregar()"
            :disabled="agregarAble == 1 ? true : false"
          >
            <v-icon>mdi-plus</v-icon>Agregar
          </v-btn>
          <v-btn
            class="ma-2 text-center"
            tile
            width="30%"
            @click="update()"
            :disabled="editarAble == 1 ? true : false"
            color="warning"
          >
            <v-icon left>mdi-pencil</v-icon>Editar
          </v-btn>
          <v-btn
            class="ma-2 text-center"
            tile
            width="30%"
            @click="eliminar()"
            :disabled="eliminarAble == 1 ? true : false"
            color="error"
          >
            <v-icon>mdi-delete</v-icon>Eliminar
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Correo de Usario"
              :disabled="formAble == 1 ? true : false"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-select
              v-model="tipo"
              :items="tipos"
              label="Tipo de Usuario"
              :disabled="formAble == 1 ? true : false"
              required
            ></v-select>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="password"
              :rules="passRules"
              type="password"
              label="Contraseña"
              :disabled="formAble == 1 ? true : false"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-btn
      width="100%"
      class="blue-grey darken-4 white--text"
      @click="guardar()"
      :disabled="formAble == 1 ? true : false"
      primary
    >
      <v-icon>mdi-sd</v-icon>Guardar
    </v-btn>
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar">
        {{ text }}
        <v-btn :color="snackColor" text @click="snackbar = false">Close</v-btn>
      </v-snackbar>
    </div>
    <div>
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">Eliminar definitivamente el Usuario?</v-card-title>
          <v-card-text>Al eliminar el Usuario, el mismo dejará de existir en la base de datos y ya no estará disponible.</v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="red" text @click="dialog = false">Cancelar</v-btn>
            <v-btn color="green darken-1" text @click="deleteUser()">Aceptar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { firebase, firestore } from "../firebase";
export default {
  data: () => ({
    users: [],
    tipos: ["Alumno", "Profesor", "Admin"],
    tipo: "",
    email: "",
    password: "",
    seleccionado: "",
    valid: false,
    passRules: [
      v => !!v || "Es necesaria la contraseña.",
      v => v.length > 7 || "La contraseña debe tener al menos 8 caracteres."
    ],
    emailRules: [
      v => !!v || "El E-mail es requerido",
      v => /.+@.+/.test(v) || "El E-mail debe ser válido."
    ],

    formAble: 1,
    dropdownAble: 0,
    opcionSeleccionada: "agregar",

    agregarAble: 0,
    editarAble: 0,
    eliminarAble: 0,
    dialog: false,

    valid: false,
    snackColor: "red",

    snackbar: false,
    text: ""
  }),
  mounted: function() {
    this.getUsers();
  },
  methods: {
    agregar: function() {
      this.dropdownAble = 1;
      this.formAble = 0;
      this.email = "";
      this.password = "";
      this.tipo = "";
      this.opcionSeleccionada = "agregar";
      this.editarAble = 1;
      this.eliminarAble = 1;
    },
    update() {
      if (this.seleccionado == "") {
        this.text = "Debe seleccionar un Usuario.";
        this.snackbar = true;
      } else {
        this.formAble = 0;
        this.agregarAble = 1;
        this.eliminarAble = 1;
        this.opcionSeleccionada = "update";
      }
    },
    eliminar: function() {
      this.snackColor = "red";
      if (this.seleccionado == "") {
        this.text = "Debe seleccionar un Usuario.";
        this.snackbar = true;
      } else {
        this.dialog = true;
        this.editarAble = 1;
        this.agregarAble = 1;
      }
    },
    guardar: function() {
      this.snackColor = "red";
      if (this.email === "" || this.password === "" || this.tipo === "") {
        this.text = "No deben haber campos vacíos!";
        this.snackbar = true;
      } else if (this.validar_clave(this.password) === false) {
        this.text =
          "La contraseña debe tener mínimo 8 caracteres, números, mayúsculas y minúsculas, y caracteres especiales";
        this.snackbar = true;
      } else if (/.+@.+/.test(this.email) == false) {
        this.text = "El correo debe ser válido";
        this.snackbar = true;
      } else {
        if (this.opcionSeleccionada === "agregar") {
          var existe = false;
          this.users.forEach(element => {
            if (element === this.email) {
              existe = true;
            }
          });
          if (existe === true) {
            this.text = "Ese usuario ya existe.";
            this.snackbar = true;
          } else {
            this.addUser();
            this.dropdownAble = 0;
            this.formAble = 1;
          }
        } else {
          this.updateUser();
          this.dropdownAble = 0;
          this.formAble = 1;
        }
      }
    },
    validar_clave: function(contrasenna) {
      if (contrasenna.length >= 8) {
        var mayuscula = false;
        var minuscula = false;
        var numero = false;
        var caracter_raro = false;

        for (var i = 0; i < contrasenna.length; i++) {
          if (
            contrasenna.charCodeAt(i) >= 65 &&
            contrasenna.charCodeAt(i) <= 90
          ) {
            mayuscula = true;
          } else if (
            contrasenna.charCodeAt(i) >= 97 &&
            contrasenna.charCodeAt(i) <= 122
          ) {
            minuscula = true;
          } else if (
            contrasenna.charCodeAt(i) >= 48 &&
            contrasenna.charCodeAt(i) <= 57
          ) {
            numero = true;
          } else {
            caracter_raro = true;
          }
        }
        if (
          mayuscula == true &&
          minuscula == true &&
          caracter_raro == true &&
          numero == true
        ) {
          return true;
        }
      }
      return false;
    },
    getUsers: function() {
      this.users = [];
      this.base = [];
      firebase
        .firestore()
        .collection("users")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.base.push({ id: doc.id, data: doc.data() });
            this.users.push(doc.data().email);
          });
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });
    },
    showUser: function() {
      this.tipo = "";
      this.email = "";
      this.password = "";
      this.base.forEach(el => {
        if (el.data.email === this.seleccionado) {
          this.email = el.data.email;
          this.tipo = el.data.userType;
          this.password = el.data.password;
          this.id = el.id;
        }
      });
    },
    addUser() {
      firestore
        .collection("users")
        .add({
          email: this.email,
          password: this.password,
          userType: this.tipo
        })
        .then(error => {
          this.text = "Usuario actualizado correctamente.";
          this.snackColor = "green";
          this.snackbar = true;
          this.agregarAble = 0;
          this.eliminarAble = 0;
          this.editarAble = 0;
          this.tipo = "";
          this.email = "";
          this.password = "";
          this.getUsers();
        })
        .catch(error => {
          this.text = "Error actualizando Usuario.";
          this.snackColor = "red";
          this.snackbar = true;
          this.agregarAble = 0;
          this.eliminarAble = 0;
        });
    },
    updateUser() {
      firestore
        .collection("users")
        .doc(this.id)
        .update({
          email: this.email,
          password: this.password,
          userType: this.tipo
        })
        .then(error => {
          this.text = "Usuario actualizado correctamente.";
          this.snackColor = "green";
          this.snackbar = true;
          this.agregarAble = 0;
          this.eliminarAble = 0;
          this.editarAble = 0;
          this.tipo = "";
          this.email = "";
          this.password = "";
          this.getUsers();
        })
        .catch(error => {
          this.text = "Error actualizando Usuario.";
          this.snackColor = "red";
          this.snackbar = true;
          this.agregarAble = 0;
          this.eliminarAble = 0;
        });
    },
    deleteUser() {
      this.dialog = false;
      firestore
        .collection("users")
        .doc(this.id)
        .delete()
        .then(error => {
          this.text = "Usuario eliminado correctamente.";
          this.snackColor = "green";
          this.snackbar = true;
          this.editarAble = 0;
          this.agregarAble = 0;
          this.tipo = "";
          this.email = "";
          this.password = "";
          this.getUsers();
        })
        .catch(error => {
          console.error("Error deleting document: ", error);
          this.text = "Error eliminando Usuario.";
          this.snackbar = true;
          this.editarAble = 0;
          this.agregarAble = 0;
        });
    }
  }
};
</script>
