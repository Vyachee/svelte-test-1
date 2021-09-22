<script>
    import {createEventDispatcher} from "svelte";

    let newTaskData = {
        title: null,
        description: null
    }

    const dispatch = createEventDispatcher()

    function create() {
        if (newTaskData.title && newTaskData.description) {
            dispatch('create', newTaskData)
            newTaskData.title = null
            newTaskData.description = null
        } else {
            alert('Заполните все поля!')
        }
    }
</script>

<div class="create-section">
    <input type="text" bind:value={newTaskData.title} placeholder="Название"/>
    <input type="text" bind:value={newTaskData.description} placeholder="Описание"/>
    <button on:click={create}>Создать</button>
</div>

<style>
    .create-section {
        margin-bottom: 25px;
    }

    input, button {
        border: 1px solid rgba(0, 0, 0, .05);
        outline: none;
        border-radius: 10px;
        box-shadow: 0 5px 10px rgba(0, 0, 0, .1);
        background-color: #fff;
        transition: 0.3s;
        padding: 7px 10px;
        margin-right: 10px;
    }

    button {
        cursor: pointer;
    }

    button:hover, input:focus {
        box-shadow: 0 10px 10px rgba(0, 0, 0, .1);
    }
</style>
