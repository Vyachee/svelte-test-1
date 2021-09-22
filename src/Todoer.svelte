<script>

    import {token, userLogin} from "./store";
    import {onMount} from "svelte";
    import TaskCreator from "./TaskCreator.svelte";

    let tasks = [];

    async function create(newTaskData) {
        try {
            console.log(newTaskData)
            const req = await fetch(
                `http://127.0.0.1:1337/createTask`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${$token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newTaskData.detail)
                }
            )

            if (req.status === 201) {
                await getTasks()
            } else {

            }
        } catch (e) {
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

    function logout() {
        token.set(null)
        userLogin.set(null)
    }

    onMount(async () => {
        await getTasks()
    })

    async function deleteTask(id) {
        try {
            const req = await fetch(
                `http://127.0.0.1:1337/deleteTask`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${$token}`
                    },
                    body: JSON.stringify({task_id: id}),
                }
            )

            if (req.status === 200) {
                await getTasks()
            }
        } catch (e) {
            console.log(e)
        }
    }

</script>

<div class="container">
    <div class="inline">
        <h2>Привет, {$userLogin}!</h2> <span on:click={logout}>(выйти)</span>
    </div>

    <TaskCreator on:create={create}/>

    {#if tasks.length !== 0}
        <h3>Ваши задачи</h3>
        <div class="tasks">
            {#each tasks as task (task.id)}
                <div class="task">
                    <h4>{task['task.title']}</h4>
                    <p>{task['task.description']}</p>
                    <span class="delete" on:click={() => deleteTask(task.id)}>Удалить</span>
                </div>
            {/each}
        </div>
    {:else}
        <p>Список задач пуст</p>
    {/if}
</div>

<style>
    .container {
        max-width: 1700px;
        margin: 50px auto;
    }

    h2, h3 {
        margin-bottom: 25px;
    }


    .task {
        padding: 10px;
        border: 1px solid rgba(0, 0, 0, .1);
        border-radius: 10px;
        box-shadow: 0 5px 10px rgba(0, 0, 0, .15);
    }

    .tasks {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 15px;
    }

    .inline {
        margin-bottom: 10px;
    }

    .inline * {
        display: inline;
    }

    span {
        cursor: pointer;
        color: #900;
        font-size: 12px;
    }

    span:hover {
        text-decoration: underline;
    }

    @media screen and (max-width: 1500px) {
        .tasks {
            grid-template-columns: repeat(4, 1fr);
        }
    }

    @media screen and (max-width: 1200px) {
        .tasks {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    @media screen and (max-width: 800px) {
        .tasks {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media screen and (max-width: 550px) {
        .tasks {
            grid-template-columns: 1fr;
        }
    }
</style>
