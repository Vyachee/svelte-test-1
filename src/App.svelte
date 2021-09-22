<script>
    import Todoer from "./Todoer.svelte";
    import {token} from "./store";
    import Auth from "./Auth.svelte";
</script>

<svelte:head>
    <title>My test projects!</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap" rel="stylesheet">
    <style>
        *, body, html {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
            font-family: 'Roboto', sans-serif;
        }

        h1, h2, h3, h4 {
            font-weight: lighter;
        }
    </style>
</svelte:head>

<main>
    {#if $token == null }
        <Auth/>
    {:else}
        <Todoer/>
    {/if}
</main>

<style>
    main {
        padding: 10px;
        box-sizing: border-box;
    }
</style>
