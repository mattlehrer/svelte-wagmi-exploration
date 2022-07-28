<script lang="ts">

	import {
	disconnect,
	fetchEnsAvatar,
	fetchEnsName,
	getAccount,
	// watchAccount,
	type FetchEnsAvatarResult,
	type FetchEnsNameResult
	} from '@wagmi/core';

$: accountData = getAccount();

let ensName: FetchEnsNameResult = null;
$: {
	(async () => {
	if (accountData?.address) 
ensName = await fetchEnsName({address: accountData.address})
})
	} 

let ensAvatar: FetchEnsAvatarResult | undefined;
$: {
	(async () => {
		if (ensName)
	ensAvatar = await fetchEnsAvatar({
          addressOrName: ensName,
        })})();
				}

				
	</script>

{#if ensName}
<div>
	<div>
		<button on:click={disconnect}>
			Disconnect from {accountData?.connector?.name}
		</button>
	</div>
	<div>{accountData?.address}</div>
	<div>
		{ensName ?? accountData?.address}
		{ensName ? ` (${accountData?.address})` : null}
	</div>

	{#if ensAvatar}
	<img src={ensAvatar} style="height: 40; width: 40" alt="" />
	{/if}
</div>
{:else}
<div>No account connected</div>
{/if}