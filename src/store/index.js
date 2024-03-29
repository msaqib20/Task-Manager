import Vue from "vue";
import Vuex from "vuex";
import dataSource from "../dataSource";
import { saveStatePlugin, uuid } from "../idSource";

Vue.use(Vuex);

const board = JSON.parse(localStorage.getItem("board")) || dataSource;

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    board,
  },
  getters: {
    getTask(state) {
      return (id) => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task;
            }
          }
        }
      };
    },
  },
  mutations: {
    CREATE_TASK(state, { tasks, name }) {
      tasks.push({
        name,
        id: uuid(),
        description: "",
      });
    },
    UPDATE_TASK(state, { task, key, value }) {
      task[key] = value;
    },
    MOVE_TASK(state, { fromTasks, toTasks, taskIndex }) {
      const taskToMove = fromTasks.splice(taskIndex, 1)[0];
      toTasks.push(taskToMove);
    },
  },
  actions: {},
  modules: {},
});
