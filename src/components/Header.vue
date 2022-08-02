<template>
    <header>
        <h1>{{title}}</h1>
        <MyButton @btn-click="$emit('toggle-add-task')" :text="showAddTask ? 'Close' : 'Add Task'" 
        :color="showAddTask ? 'red' : 'green'" 
        />
    </header>
</template>

<script>

import MyButton from './MyButton'
export default {
    name: 'HeaderTop',
    props: { 
        title: String,
        showAddTask: Boolean,
    },
    components:{
        MyButton,
    }
}
</script>

<style scoped>
header{
    display:flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
</style>