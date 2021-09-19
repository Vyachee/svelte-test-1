<script>
	import {Router, Route, Link} from 'svelte-navigator';
	import Todoer from "./Todoer.svelte";
</script>

<svelte:head>
	<title>My test projects!</title>
</svelte:head>

<Router>
	<header>
		<h1>Некоторое дерьмо</h1>
		<nav>
			<Link to="/">About</Link>
			<Link to="todo">TODOer</Link>
		</nav>
	</header>

	<main>
		<Route path="/">
			<h2>Hello yeah</h2>
		</Route>

		<Route path="todo" component="{Todoer}"/>
	</main>

</Router>
