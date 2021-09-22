<script>
    import Todoer from "./Todoer.svelte";
    import {token} from "./store";
    import Auth from "./Auth.svelte";
</script>

<svelte:head>
    <title>My test projects!</title>
    <style>
        *, body, html {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
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