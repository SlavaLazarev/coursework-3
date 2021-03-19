<template>
  <h1 v-if="tasks.length === 0" class="text-white center">No tasks</h1>
  <template v-else>
    <h3 class="text-white">Total active tasks: {{ tasksCount }}</h3>
    <div class="card" v-for="(task, index) in tasks" :key="task.id">
      <h2 class="card-title">
        {{task.title}}
        <AppStatus :type="task.status" />
      </h2>
      <p>
        <strong>
          <small>
            {{new Date(task.date).toLocaleDateString()}}
          </small>
        </strong>
      </p>
      <button class="btn primary" @click="show(task.id)">Show</button>
      <button class="btn-delete" @click="delTask(task.id)">X</button>
    </div>
  </template>
</template>

<script>
import {computed} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import AppStatus from '../components/AppStatus'

export default {
  props: ['tasks', 'id'],
  name: 'Tasks',
  setup() {
    const store = useStore()
    const router = useRouter()

    const tasks = computed(() => store.state.tasks)
    const tasksCount = computed(() => store.getters.tasksCount)
    store.dispatch('fetchTask')

    function delTask(id) {
      store.dispatch('deleteTask', id)
      console.log('delete')
    }

    return {
      tasks, tasksCount, delTask,
      show: id => router.push(`/task/${id}`),
    }
  },
  components: {AppStatus}
}
</script>
