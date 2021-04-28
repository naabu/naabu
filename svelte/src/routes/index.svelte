<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Counter from '$lib/Counter/index.svelte';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h1>
		<div class="welcome">
			<picture>
				<source srcset="svelte-welcome.webp" type="image/webp">
				<img src="svelte-welcome.png" alt="Welcome"/>
			</picture>
		</div>

		to your new<br />SvelteKit app asdasdf aasdsd sdf asdfsfd Hello
	</h1>

	<h2>
		geagaga try editing bababab afdasfasdf <strong>src/routes/index.svelte!!!!!abc!!!b!cde woo ahlo</strong>
	</h2>

	<p>
		Test abc abcasdf
		The hot reloading module works great! Does this still work?
		Not sure how this works?

		Testing again lets see how it works abcdefghasd test abcd defghijklimnkopqrstuvwxyz Hahahahaha... Development was never this easy?
	</p>

	<Counter />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
		color: grey;
	}

	.welcome {
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
