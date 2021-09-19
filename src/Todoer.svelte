<script>

    let tasks = [];
    let title = null;
    let lastId = 1;

    function create() {
        tasks = [...tasks, {
            id: lastId++,
            title: title,
            status: 0
        }];

        $: title = null;
    }

    function setStatus(id, status) {
        let task = tasks.filter(task => task.id === id)[0];
        if(task != null) {
            let index = tasks.indexOf(task);
            tasks[index].status = status;
        }
    }

</script>

<h2>TODOer</h2>

<div>
    <input type="text" bind:value={title} placeholder="Задача">
    <button on:click={create}>Создать</button>
</div>

{#if tasks.length !== 0}
    {#each tasks as task (task.id)}
        <div class="task">
            <p>{task.title}</p>
            {#if task.status === 0}
                <button on:click={setStatus(task.id, 1)}>Выполнено</button>
            {:else}
                <button on:click={setStatus(task.id, 0)}>Не выполнено</button>
            {/if}
        </div>
    {/each}
{:else}
    <p>Список задач пуст</p>
{/if}

<style>
    .task {
        display: flex;
        align-items: center;
    }
    .task button {
        margin-left: 20px;
    }
</style>