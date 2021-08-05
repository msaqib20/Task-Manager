<template >

    <v-card width="500" light>
      <v-card-title class="text-h5 grey lighten-2">
      <input class="tw-w-full"
      :value="task.name"
      @change="updateTaskProperty($event, 'name')"
      >
      </v-card-title>
      
      <v-container fluid>
        <textarea
          class="tw-w-full"
          :value="task.description"
          @change="updateTaskProperty($event, 'description')"
        ></textarea>
      </v-container>
      <v-card-actions></v-card-actions>
    </v-card>

</template>

<script>
import {mapGetters} from 'vuex'
  export default {
    computed: {
    ...mapGetters(['getTask']),
    task () {
      return this.getTask(this.$route.params.id)
    }
  },
  methods: {
    updateTaskProperty (e, key) {
      this.$store.commit('UPDATE_TASK', {
        task: this.task,
        key,
        value: e.target.value
      })
    }
  }
    
  }
</script>
