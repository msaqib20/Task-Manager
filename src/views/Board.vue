<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-tabs
        centered
        class="ml-n9"
        color="grey darken-1"
      >
        <v-tab
          v-for="link in links"
          :key="link"
        >
          {{ link }}
        </v-tab>
      </v-tabs>

    </v-app-bar>
    <v-main>
      <v-container>
        <v-row class="tw-mtb-2" >
          <v-progress-linear
            height="30"
            :value="getPer(getDoneLength(),getTotal())"
            striped
            color="lime"
            
          >
         <div class="tw-text-black tw-font-bold">Done {{getPerString(getDoneLength())}}</div> 
          </v-progress-linear>
          <v-col 
            v-for="(column, $columnIndex) of board.columns" 
            
            cols="12" sm="4" 
            :key="$columnIndex"
            @drop="moveTask($event, column.tasks)"
            @dragover.prevent
            @dragenter.prevent
            >
            <v-sheet rounded="lg" min-height="70vh" class="mx-auto pa-4 grey lighten-2">
              <h2 class="tw-font-bold tw-text-xl tw-mb-2" >{{column.name}} 
                <span v-if="column.tasks.length" class="tw-inline-block tw-bg-white tw-rounded-full tw-px-3 tw-py-1 tw-text-sm tw-font-semibold tw-text-gray-700 tw-mr-2 ">
                   {{getPerString(column.tasks.length)}}
                </span>
        
                 </h2>
              <div class="tw-bg-white tw-shadow-md tw-rounded tw-px-8 tw-pt-6 tw-pb-8 tw-mb-4"
                v-for="(task, $taskIndex) of column.tasks" 
                :key="$taskIndex" 
                draggable
                @dragstart="pickupTask($event,$taskIndex, $columnIndex)"
                @click="goToTask(task)"
                >
                <div class="tw-font-bold tw-text-xl tw-mb-2">{{task.name}}</div>
                <p class="tw-text-gray-700 tw-text-base" v-if="task.description">
                  {{task.description}}
                </p>
                <a class="tw-inline-block tw-align-baseline tw-font-bold tw-text-sm tw-text-blue-500 hover:tw-text-blue-800" href="#">
                  View Attachment
                </a>
              </div>
              <input 
              type="text"
              class="tw-block tw-p-2 tw-w-full tw-bg-transparent"
              placeholder="+ Enter New Task Here"
              @keyup.enter="createTask($event, column.tasks)"

              >
            </v-sheet>
          </v-col>

          <div class="task-bg tw-absolute tw-inset-0 tw-items-center tw-justify-center  tw-h-full tw-flex tw-flex-col"
          v-if="isTaskOpen"
          @click.self="close"
          >
            <router-view/>
          </div>

        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {mapState} from 'vuex';
  export default {
    computed:{
      ...mapState(['board']),
      isTaskOpen() {
        return this.$route.name ==="task"
      }
      },
      methods :{
        goToTask(task){
          this.$router.push({name:'task',params:{id:task.id}})
        },
       
        close (){
          this.$router.push({name:'board'})
        },
        createTask (e, tasks) {
          this.$store.commit('CREATE_TASK', {
            tasks,
            name:e.target.value
          })
          e.target.value=""
        },

        pickupTask(e, taskIndex, fromColumnIndex){
          e.dataTransfer.effectAllowed='move'
          e.dataTransfer.dropEffect='move'

          e.dataTransfer.setData('task-index', taskIndex)
          e.dataTransfer.setData('from-column-index', fromColumnIndex)
        },
        moveTask(e, toTasks){
          const fromColumnIndex= e.dataTransfer.getData('from-column-index')
          const fromTasks=this.board.columns[fromColumnIndex].tasks
          const taskIndex =e.dataTransfer.getData('task-index')

          this.$store.commit('MOVE_TASK',{
            fromTasks,
            toTasks,
            taskIndex
          })
        },
        getTotal() {
          let total = 0;
          for (const column of this.board.columns) {
            total += column.tasks.length;
          }
          return total;
        },
        getPer(length, total) {
          return (100/total)*length;
        },
        getPerString(length) {
         let  total = this.getTotal ()
         return "("+length+"/"+total+") ("+this.getPer(length,total).toFixed(2)+"%)"
        },
        getDoneLength() {
          return this.board.columns[2].tasks.length
        },
  
      },
    data: () => ({
      links: [
        'Task Planner',
      ],
    }),
  }
</script>
<style lang="css">
.task-bg {
  background: rgba(0,0,0,0.5);
}
</style>