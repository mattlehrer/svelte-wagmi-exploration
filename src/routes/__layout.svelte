<script>
	import Footer from '$lib/Footer.svelte';
	import Nav from '$lib/Nav.svelte';

	import '../app.css';
</script>

<Nav />

<main>
	<slot />
</main>

<Footer />
