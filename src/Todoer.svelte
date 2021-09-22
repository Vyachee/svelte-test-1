<script>

    import {token} from "./store";
    import {onMount} from "svelte";

    let tasks = [];
    let newTaskData = {
        title: null,
        description: null
    }

    async function create() {
        console.log(JSON.stringify(newTaskData))
        try {
            const req = await fetch(
                `http://127.0.0.1:1337/createTask`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${$token}`
                    },
                    body: JSON.stringify(newTaskData)
                }
            )

            const res = await req.json()
            console.log(res)
            if(req.status === 201) {
                console.log(res)
            }   else {

            }
        }   catch (e) {
            console.log(e)
        }
    }

    async function getTasks() {

        try {
            const req = await fetch(
                `http://127.0.0.1:1337/getMyTasks`, {
                    headers: {
                        'Authorization': `Bearer ${$token}`
                    }
                }
            )

            if (req.status === 200) {
                tasks = await req.json()
            }


        } catch (e) {
            console.log(e)
        }
    }

    onMount(async () => {
        await getTasks()
    })

</script>

<h2>TODOer</h2>

<div>
    <input type="text" bind:value={newTaskData.title} placeholder="Название">
    <input type="text" bind:value={newTaskData.description} placeholder="Описание">
    <button on:click={create}>Создать</button>
</div>

{#if tasks.length !== 0}
    {#each tasks as task (task.id)}
        <div class="task">
            <p>{task.title}</p>

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