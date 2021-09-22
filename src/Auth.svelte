<script>

    import {token, userLogin} from "./store";

    let isAuth = true

    let authData = {
        login: null,
        password: null,
        passwordRepeat: null
    };

    function toggleAuth() {
        isAuth = !isAuth
    }

    async function performAction(action) {
        if(authData.login === null || authData.password === null) {
            alert('Заполните все поля!')
            return
        }
        if(action === 'register') {
            if(authData.password !== authData.passwordRepeat) {
                alert('Пароль и повтор пароля не совпадают!')
                return
            }
        }

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
                userLogin.set(authData.login)
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
            <input type="text" placeholder="Логин" bind:value={authData.login}>
            <input type="password" placeholder="Пароль" bind:value={authData.password}>
            <a href="#" on:click={toggleAuth}>У меня ещё нет аккаунта</a>
            <button on:click={() => performAction('login')}>Войти</button>
        {:else}
            <h2>Регистрация</h2>
            <input type="text" placeholder="Логин" bind:value={authData.login}>
            <input type="password" placeholder="Пароль" bind:value={authData.password}>
            <input type="password" placeholder="Повтор пароля" bind:value={authData.passwordRepeat}>
            <a href="#" on:click={toggleAuth}>У меня уже есть аккаунт</a>
            <button on:click={() => performAction('register')}>Зарегистрироваться</button>
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
        width: 90%;
        max-width: 300px;
    }


    input, button {
        display: block;
        width: 100%;
        border: 1px solid rgba(0, 0, 0, .05);
        outline: none;
        border-radius: 10px;
        box-shadow: 0 5px 10px rgba(0, 0, 0, .1);
        background-color: #fff;
        transition: 0.3s;
        padding: 7px 10px;
        margin-right: 10px;
    }

    input {
        margin-bottom: 10px;
    }

    button {
        cursor: pointer;
        margin-top: 10px;
    }

    button:hover, input:focus {
        box-shadow: 0 10px 10px rgba(0, 0, 0, .1);
    }

    h2 {
        margin-bottom: 10px;
    }

    a {
        font-size: 14px;
    }

</style>
