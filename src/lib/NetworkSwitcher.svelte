<script lang="ts">
	import {
		getNetwork,
		SwitchChainError,
		switchNetwork,
		watchNetwork,
		type Chain,
	} from '@wagmi/core';
	import { onMount } from 'svelte';

	let networkData = getNetwork();
	let switchNetworkError: SwitchChainError | undefined;
	onMount(() => {
		const unwatch = watchNetwork((data) => {
			networkData = data;
		});
		return () => {
			unwatch();
		};
	});

	const handleSwitchNetwork = async (chainId: Chain['id']) => {
		switchNetworkError = undefined;
		try {
			const chain = await switchNetwork({ chainId });
			networkData = { ...networkData, chain };
		} catch (err: unknown) {
			if (err instanceof SwitchChainError) {
				switchNetworkError = err;
			} else {
				throw err;
			}
		}
	};
</script>

<div>
	<div>
		Connected to {networkData.chain?.name ?? networkData.chain?.id}{' '}
		{#if networkData.chain?.unsupported} '(unsupported)'{/if}
	</div>

	{#each networkData.chains as chain}
		{#if chain.id !== networkData.chain?.id}
			<button class="m-2" on:click={() => handleSwitchNetwork(chain.id)}>
				Switch to {chain.name}
			</button>
		{/if}
	{/each}

	{#if switchNetworkError} {switchNetworkError?.message} {/if}
</div>
