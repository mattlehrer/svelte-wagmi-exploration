<script lang="ts">
	import Account from '$lib/Account.svelte';
	import Connect from '$lib/Connect.svelte';
	import NetworkSwitcher from '$lib/NetworkSwitcher.svelte';
	import { getAccount, watchAccount } from '@wagmi/core';
	import { onMount } from 'svelte';

	let accountData = getAccount();

	onMount(() => {
		const unwatch = watchAccount((data) => {
			accountData = data;
		});
		return () => unwatch;
	});
</script>

{#if accountData?.address}
	<Account />
	<NetworkSwitcher />
{:else}
	<Connect />
{/if}
