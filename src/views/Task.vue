<template>
  <div class="card" v-if="task">
    <div>
      <h2>{{task.title}}</h2>
    </div>

    <p><strong>Status</strong>: <AppStatus :type="task.status" /></p>
    <p><strong>Deadline</strong>: {{ new Date(task.date).toLocaleDateString() }}</p>
    <p><strong>Description</strong>: {{ task.description }}</p>
    <div>
      <button class="btn" @click="setStatus('pending')">Take to work</button>
      <button class="btn primary" @click="setStatus('done')">To complete</button>
      <button class="btn danger" @click="setStatus('cancelled')">Cancel</button>
    </div>
  </div>
  <h3 class="text-white center" v-else>
    There are no tasks with id = <strong>{{id}}</strong>.
  </h3>
</template>

<script>
import {computed} from 'vue'
import {useStore} from 'vuex'
import AppStatus from '../components/AppStatus'

export default {
  components: {AppStatus},
  props: ['id', 'tasks'],
  setup(props) {
    const store = useStore()

    const id = props.id
    const task = computed(() => store.getters.taskId(id))

    const setStatus = status => {
      const updated = {...task.value, status}
      console.log(updated)
      store.dispatch('changeTask', updated)
    }
    store.dispatch('fetchTask')


    return {
      task,
      id,
      setStatus,


    }
  }
}
</script>

<style scoped>

</style>