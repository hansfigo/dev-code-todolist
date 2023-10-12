<script lang="ts">
	import ActivityCard from '$lib/components/ActivityCard.svelte';
	import activityList from '$lib/stores/activity.js';
	import api from '$lib/utils/api';
	
	export let data;

	activityList.set(data.data.data)

</script>

<div class="mt-8 flex flex-col items-center h-[80vh] relative px-8">
	<div class="flex justify-between container">
		<h1 data-cy="activity-title" class="font-bold text-2xl">Activity</h1>
		<button
			data-cy="activity-add-button"
			on:click={() => api.send()}
			class="bg-main-blue px-5 py-2 font-semibold rounded-full text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
			>+ Tambah
		</button>
	</div>

	{#if $activityList.length === 0 || $activityList.length <= 0}
		<div class="flex justify-center items-center w-full h-full">
			<img class="md:h-[24rem]" src="activity-empty-state.svg" alt="empty" />
		</div>
	{:else}
		<div class="flex flex-wrap gap-6  items-start w-full container mt-4">
			{#each $activityList as data, i}
				<ActivityCard created_at={data.created_at} id={data.id} i={i} title={data.title}/>
			{/each}
		</div>
	{/if}
</div>
