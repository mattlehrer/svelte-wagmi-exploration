<script lang="ts">
	import { wagmiClient } from '$lib/wagmi';
	import type { Connector } from '@wagmi/core';
	import { connect } from '@wagmi/core';
	import { onMount } from 'svelte';

	type State = {
		connector?: Connector;
		error?: Error;
		loading?: boolean;
	};

	let isMounted = false;
	let state: State = {
		loading: false,
	};

	onMount(() => {
		isMounted = true;
	});

	const handleConnect = async (connector: Connector) => {
		try {
			state = { ...connector, loading: true, connector };
			await connect({ connector });
			state = { ...connector, loading: false };
		} catch (error: any) {
			state = { ...connector, loading: false, error };
		}
	};
</script>


{#each wagmiClient.connectors as connector}
	<div class="m-16">
		<button class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" disabled={isMounted && !connector.ready} on:click={() => handleConnect(connector)}>
			{connector.id === 'injected' ? (isMounted ? connector.name : connector.id) : connector.name}
			{isMounted && !connector.ready ? ' (unsupported)' : ''}
			{state.loading && connector.name === state.connector?.name ? '…' : ''}
		</button>
	</div>
{/each}
<div>{state.error && (state.error?.message ?? 'Failed to connect')}</div>