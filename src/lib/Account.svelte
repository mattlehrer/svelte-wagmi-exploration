<script lang="ts">
	import {
		disconnect,
		fetchEnsAvatar,
		fetchEnsName,
		getAccount,
		watchAccount,
		type FetchEnsAvatarResult,
		type FetchEnsNameResult,
	} from '@wagmi/core';
	import { onMount } from 'svelte';

	let accountData = getAccount();

	onMount(() => {
		const unwatchAccount = watchAccount((data) => {
			accountData = data;
		});
		return () => {
			unwatchAccount();
		};
	});

	let ensName: FetchEnsNameResult = null;
	$: {
		(async () => {
			ensName = await fetchEnsName({ address: accountData.address ?? '' });
		})();
	}

	let ensAvatar: FetchEnsAvatarResult | undefined;
	$: {
		(async () => {
			if (ensName)
				ensAvatar = await fetchEnsAvatar({
					addressOrName: ensName,
				});
		})();
	}
</script>

{#if accountData}
	<div>
		<div>
			<button on:click={disconnect}>
				Disconnect from {accountData?.connector?.name}
			</button>
		</div>
		<div>{accountData?.address}</div>

		{#if ensName}
			<div>{ensName}</div>
		{/if}

		{#if ensAvatar}
			<img src={ensAvatar} style="height: 40; width: 40" alt="" />
		{/if}
	</div>
{:else}
	<div>No account connected</div>
{/if}
