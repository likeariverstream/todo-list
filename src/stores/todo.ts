import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
interface State {
  tasks: {
    id: number;
    title: string;
    editing: boolean;
    completed: boolean;
  }[];
  prev: string;
}
const state: State = {
  tasks: JSON.parse(localStorage.getItem("tasks") ?? "[]"),
  prev: "",
};

export const store = new Vuex.Store({
  state,
  mutations: {
    addTask(state, title) {
      if (title.trim() !== "") {
        const lastIndex = state.tasks[state.tasks.length - 1]?.id ?? 0;
        state.tasks.push({
          id: lastIndex + 1,
          title,
          editing: false,
          completed: false,
        });
      }
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    deleteTask(state, task) {
      const index = state.tasks.indexOf(task);
      state.tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    editTask(state, task) {
      const index = state.tasks.indexOf(task);
      const prev = state.tasks[index].title;
      state.prev = prev;
      task.editing = true;
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    saveTask(state, task) {
      task.editing = false;
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    cancelEdit(state, task) {
      const index = state.tasks.indexOf(task);
      state.tasks[index].title = state.prev;
      task.editing = false;
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    toggleTaskCompleted(state, task) {
      const index = state.tasks.indexOf(task);
      state.tasks[index].completed = !state.tasks[index].completed;
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
  },
  actions: {
    addTask({ commit }, task) {
      commit("addTask", task);
    },
    deleteTask({ commit }, task) {
      commit("deleteTask", task);
    },
    editTask({ commit }, task) {
      commit("editTask", task);
    },
    saveTask({ commit }, task) {
      commit("saveTask", task);
    },
    cancelEdit({ commit }, task) {
      commit("cancelEdit", task);
    },
    toggleTaskCompleted({ commit }, task) {
      commit("toggleTaskCompleted", task);
    },
  },
  getters: {
    tasks: (state) => state.tasks,
  },
});
