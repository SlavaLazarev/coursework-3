<template>
  <form class="card" @submit.prevent="submit">
    <h1>Create a new task</h1>
    <div class="form-control">
      <label for="title">Title</label>
      <input type="text" id="title" v-model="title">
    </div>

    <div class="form-control">
      <label for="date">Deadline date</label>
      <input type="date" id="date" v-model="date">
    </div>

    <div class="form-control">
      <label for="description">Description</label>
      <textarea id="description" v-model="description"></textarea>
    </div>

    <button class="btn primary" :disabled="!validTask">Create</button>
  </form>
</template>


<script>
import {ref, computed, reactive} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()

    const title = ref('')
    const date = ref(null)
    const description = ref('')
    const status = reactive('active')

    const submit = () => {
      const newTask = {
        title: title.value.trim(),
        date: new Date(date.value).setHours(23,59,59,999),
        description: description.value.trim(),
        status: 'active'
      }

      store.dispatch('createTask', newTask)
      router.push('/')
    }

    const validTask = computed(() => {
      return title.value && date.value && description.value !== ''
    })

    return {
      submit,
      status,
      title,
      date,
      description,
      validTask,
    }
  }
}
</script>