<script lang="ts">
	import ActivityCard from '$lib/components/ActivityCard.svelte';
	import activityList from '$lib/stores/activity.js';
	import api from '$lib/utils/api';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { writable } from 'svelte/store';

	export let data;

	const isAdded = writable(false);

	activityList.set(data.data.data);
</script>

<div class="py-8 flex flex-col items-center h-[80vh] relative px-8">
	<div class="flex justify-between container">
		<h1 data-cy="activity-title" class="font-bold text-2xl">Activity</h1>
		<button
			data-cy="activity-add-button"
			on:click={async () => {
				await api.send();
				isAdded.set(true);

				setTimeout(() => isAdded.set(false), 1200);
			}}
			class="bg-main-blue px-5 py-2 font-semibold rounded-full text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
			>+ Tambah
		</button>
	</div>

	{#if $activityList.length === 0 || $activityList.length <= 0}
		<div data-cy="activity-empty-state" class="flex justify-center items-center w-full h-full">
			<button
			data-cy="activity-empty-state"
				on:click={async () => {
					await api.send();
					isAdded.set(true);

					setTimeout(() => isAdded.set(false), 1200);
				}}
			>
				<img class="md:h-[24rem]" src="activity-empty-state.svg" alt="empty" />
			</button>
		</div>
	{:else}
		<div class="flex flex-wrap gap-6 items-start w-full container mt-4">
			{#each $activityList as data, i}
				<ActivityCard created_at={data.created_at} id={data.id} {i} title={data.title} />
			{/each}
		</div>
	{/if}
</div>

{#if $isAdded}
	<div
		transition:fly={{ duration: 600, x: 100, y: 500, opacity: 0.5, easing: quintOut }}
		class="flex justify-center items-center w-full"
	>
		<div class="container">
			<div class="alert alert-success">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="stroke-current shrink-0 h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					><path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
					/></svg
				>
				<span>Data Berhasil Ditambah</span>
			</div>
		</div>
	</div>
{/if}
