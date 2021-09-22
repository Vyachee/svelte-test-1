<script>

    import {token} from "./store";

    let isAuth = true

    let authData = {
        login: null,
        password: null
    };

    function toggleAuth() {
        isAuth = !isAuth
    }

    async function performAction(action) {
        try {
            const req = await fetch(
                `http://127.0.0.1:1337/${action}`, {
                    method: 'POST',
                    body: JSON.stringify(authData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )

            const res = await req.json()
            if(req.status === 422) {
                const response = res.response
                alert(response)
                return
            }

            const responseToken = res.token
            if(responseToken) {
                token.set(responseToken)
            }
        }   catch (e) {
            console.log(e)
        }
    }
</script>

<div class="wrap">
    <div class="auth-window">
        {#if isAuth}
            <h2>Авторизация</h2>
            <input type="text" placeholder="Login" bind:value={authData.login}>
            <input type="password" placeholder="Password" bind:value={authData.password}>
            <a href="#" on:click={toggleAuth}>I don't have account</a>
            <button on:click={() => performAction('login')}>Login</button>
        {:else}
            <h2>Регистрация</h2>
            <input type="text" placeholder="Login" bind:value={authData.login}>
            <input type="password" placeholder="Password" bind:value={authData.password}>
            <a href="#" on:click={toggleAuth}>I already have account</a>
            <button on:click={() => performAction('register')}>Register</button>
        {/if}
    </div>
</div>

<style>
    .wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    .auth-window {
        display: inline-block;
    }

    input {
        display: block;
    }

    button {
        width: 100%;
    }
</style>