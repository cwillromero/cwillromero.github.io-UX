
<template>
  <div class="user">
    <h1>Tareas</h1>

    <Perfil :rol="rolUser" :email="emailUser" :clases="clasesUser"
            :clasesN="clasesNombres"/>
    <Clase/>
    <Banner />
  </div>
</template>

<script>
import Perfil from "../components/Perfil";
import Clase from "../components/ClaseOpciones";
import Banner from "../components/Banner";
import { firebase, firestore } from "../firebase";

export default {
  name: "User",
  components: {
    Perfil,
    Clase,
    Banner
  },
  data: function() {
    return {
      rolUser: "",
      emailUser: "",
      clasesUser:[], /*clases, elementos como tal*/ 
      clasesNombres:[] /*unicamente los nombres de las clases*/
    };
  },
  mounted: function() {
    console.log(firebase.auth().currentUser.email);

    firestore
      .collection("users")
      .where("email", "==", firebase.auth().currentUser.email)
      .get()
      .then(querySnapshop => {
        querySnapshop.forEach(doc => {
          console.log("aqui con ", doc.data());
          this.rolUser = doc.data().userType;
          this.emailUser = doc.data().email;
          if (this.rolUser === "Alumno") {
            firestore
              .collection("classes")
              .get()
              .then(snap => {
                snap.forEach(element => {
                  element.data().alumnos.forEach(element2 => {
                    if (element2._key.path.segments[6] === doc.id) {
                      this.clasesUser.push(element); 
                      this.clasesNombres.push({
                        nombre: element.data().nombre,
                        id: element.id
                      });
                    }
                  });
                });
              });
          } else if (this.rolUser === "Profesor") {
            firestore
              .collection("classes")
              .get()
              .then(snap => {
                snap.forEach(element => {
                  console.log(
                    "docente ???",
                    element.data().docente._key.path.segments[6]
                  );
                  if (element.data().docente._key.path.segments[6] === doc.id) {
                    this.clasesUser.push(element); 
                    this.clasesNombres.push({
                      nombre: element.data().nombre,
                      id: element.id
                    });
                  }
                });
              });
          }
        });
        if( this.clasesNombres.length>0){
          localStorage.id = this.clasesNombres[0].id;
          localStorage.anterior = this.clasesNombres[0].id;
          console.log("ID ???");
        }
      });
  }
};
</script>