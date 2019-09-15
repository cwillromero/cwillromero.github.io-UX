<template>
  <div class="about">
    <h1>Calificaciones</h1>

    <v-app id="inspire">
    <v-data-table
      :headers="headers"
      :items="temas"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
    </v-app>

</div>
</template>


<script>

import Componente from '../components/Componente';

export default {
    data () {
    return {
       headers: [
        { text: 'Nombre', value: 'nombre'  },
        { text: 'Semana', value: 'semana' },
        { text: 'Estado', value: 'estado' },
      ],
      temas: [
        {
          nombre: 'Programación Paralela',
          semana: 'Semana 1',
          estado: 'Pendiente'
       },
       {
          nombre: 'Threads',
          semana: 'Semana 4',
          estado: 'Enviado'
       },
       {
          nombre: 'Exposición',
          semana: 'Semana 6',
          estado: 'Calificado'
       }
      ],
    }
  },
}
</script>
