import { createStore } from 'vuex'
import axios from "axios";

const resource_uri = 'https://courcework-3-default-rtdb.firebaseio.com/tasks/'
export default createStore({
  state() {
    return {
      tasks: []
    }
  },
  actions: {
    async fetchTask({commit}) {
      const {data} = await axios.get(`${resource_uri}.json`);
      const res = Object.keys(data).map(key => {
        return {
          id: key,
          ...data[key]
        }
      })
      commit('setTasks', res)
    },
    async createTask({commit}, task) {
      if (task.date < new Date()) {
        task.status = 'cancelled'
      }
      const res = await axios.post(`${resource_uri}.json`, task);
      const updTask = {...task, id: res.data.name}
      commit('newTask', updTask)
    },
    async changeTask({commit}, task) {
      const res = await axios.put(`${resource_uri}${task.id}.json`, task);
      commit('changeTask', res.data)
    },
    async deleteTask({commit}, id) {
      await axios.delete(`${resource_uri}${id}.json`);
      commit('deleteTask', id);
      }
  },
  mutations: {
    setTasks: (state, tasks) => state.tasks = tasks,
    newTask: (state, task) => state.tasks.push(task),
    changeTask: (state, changeTask) => {
      const index = state.tasks.findIndex(t => t.id === changeTask.id);
      state.tasks[index] = changeTask
    },
    deleteTask: (state, id) => state.tasks = state.tasks.filter(t => id !== t.id)
  },
  getters: {
    tasksCount(_, getters) {
      const array = Object.values(JSON.parse(JSON.stringify(getters.tasks)))
      return array.filter(task => task.status === 'active').length
    },
    tasks(state) {
      return state.tasks
    },
    taskId(_, getters) {
      const array = Object.values(JSON.parse(JSON.stringify(getters.tasks)))
      return id => array.find(t => t.id === id)
    }
  }
})
