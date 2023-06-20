<script lang="ts">
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      newTask: {
        title: "",
      },
    };
  },
  computed: {
    ...mapGetters(["tasks"]),
  },
  methods: {
    ...mapActions([
      "addTask",
      "deleteTask",
      "editTask",
      "saveTask",
      "cancelEdit",
      "toggleTaskCompleted",
    ]),
    addNewTask() {
      this.addTask(this.newTask.title);
      this.newTask.title = "";
    },
    toggleCompleted() {
      this.toggleTaskCompleted();
    },
  },
};
</script>

<template>
  <div class="todo">
    <h1>Tasks</h1>
    <form class="form" @submit.prevent="addNewTask()">
      <input class="input" id="task-title" v-model="newTask.title" />
      <button class="button" type="submit">Add task</button>
    </form>
    <ul class="list">
      <li class="list-item" v-for="task in tasks" :key="task.id">
        <div class="container" v-if="!task.editing">
          <div class="wrapper">
            <input type="checkbox" class="checkbox" v-bind:checked="task.completed" id="task-completed"
              @change="toggleTaskCompleted(task)" />
            <span class="task-title" v-bind:class="{ completed: task.completed }">{{ task.title }}</span>
          </div>
          <div class="wrapper">
            <button class="button" @click="editTask(task)">Edit</button>
            <button class="button" @click="deleteTask(task)">Delete</button>
          </div>
        </div>
        <div class="container" v-else>
          <input class="input" v-model="task.title" />
          <div class="wrapper">
            <button class="button" @click="saveTask(task)">Save</button>
            <button class="button" @click="cancelEdit(task)">Cancel</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
@media (max-width: 1024px) {
  .todo {
    margin-top: 2rem;
  }
}

.todo {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
}

h1 {
  font-size: 32px;
}

.form {
  margin: 0;
  display: flex;
  gap: 16px;
  padding: 8px;
}

.form:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.input {
  color: var(--color-text);
  box-sizing: border-box;
  background-color: hsla(160, 25%, 62%, 0.2);
  flex-grow: 1;
  font-size: 18px;
  padding: 6px;
  border-radius: 4px;
  border: none;
  outline: none;
}

.checkbox {
  background-color: hsla(160, 25%, 62%, 0.2);
  width: 24px;
  height: 24px;
}

.task-title {
  display: flex;
  align-items: center;
  hyphens: auto;
  word-break: break-all;
}

.completed {
  text-decoration: line-through;
}

.button {
  background-color: hsla(160, 58%, 19%, 0.2);
  display: flex;
  align-items: center;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  transition: ease-in-out;
  color: #34884d;
}

.button:hover {
  cursor: pointer;
  opacity: 0.7;
  color: #e2bdbd;
}

.list {
  height: 90vh;
  list-style: none;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
}

.list::-webkit-scrollbar {
  width: 8px;
}

.list::-webkit-scrollbar-track {
  background-color: hsla(160, 58%, 19%, 0.2);
}

.list::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: hsla(160, 58%, 19%, 0.2);
}

.list-item:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font-size: 18px;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

li div button:first-child {
  background-color: hsla(160, 58%, 19%, 0.2);
}

li div button:last-child {
  background-color: hsla(42, 57%, 30%, 0.2);
}

li div button:hover {
  opacity: 0.8;
}

@media (max-width: 768px) {
  .list {
    height: 30vh;
  }
}
</style>
