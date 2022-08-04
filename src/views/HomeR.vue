<template>
    
      <AddTask v-show="showAddTask" @add-task="storeTask" />
    
    <MyTasks @delete-task="deleteTask" @toggle-reminder="toggleReminder" :tasks="tasks"/>
</template>

<script>
    import MyTasks from '../components/MyTasks'
    import AddTask from '../components/AddTask'
    export default {
  name: 'App',
  props: {
    showAddTask: Boolean,
  },
  components: {
    MyTasks,
    AddTask,
  },
  data(){
    return{
      tasks: [],
    }
  },
  methods: {
   async storeTask(task){
        const res = await fetch('api/tasks', {
          method: 'POST',
          headers: {
            'Content-type' : 'application/json',
          },
          body: JSON.stringify(task)

        })

        const data = await res.json()
      this.tasks = [...this.tasks, data] 

    },
    async deleteTask(id){
      if(confirm("Are you sure you want to delete")){

        const res = await fetch(`api/tasks/${id}`, {
          method: 'DELETE'
        })

        res.status === 200 ? (this.tasks = this.tasks.filter((task) => task.id !== id)) : alert("Error Deleting Task!")
        
      }
    },
    async toggleReminder(id){

      const taskToToggle = await this.fetchTask(id)
      const updTask = {...taskToToggle, reminder:!taskToToggle.reminder}
      const res = await fetch(`api/tasks/${id}`, {
         method: 'PUT',
          headers: {
            'Content-type' : 'application/json',
          },
          body: JSON.stringify(updTask)
      })
      const data = await res.json()
      this.tasks = this.tasks.map((task) => task.id === id ? {...task, reminder: !data.reminder}: task)
    },
    async fetchTasks(){
      const res = await fetch('api/tasks')
      const data = await res.json()

      return data
    },
     async fetchTask(id){
      const res = await fetch(`api/tasks/${id}`)
      const data = await res.json()

      return data
    }
  },
 async created(){
    this.tasks = await this.fetchTasks()
  }
}
</script>