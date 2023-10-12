<script lang="ts">
	import { goto } from '$app/navigation';

	let arr = ['Tugas', 'Madang', 'Game'];
	// let arr : any= [];
</script>

<div class="mt-8 flex flex-col items-center px-8">
	<div class="flex justify-between container">
		<h1 data-cy="activity-title" class="font-bold text-2xl">Activity</h1>
		<button
			data-cy="activity-add-button"
			class="bg-main-blue px-5 py-2 font-semibold rounded-full text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
			>+ Tambah</button
		>
	</div>
	{#if arr.length === 0 || arr.length <= 0}
		<img src="activity-empty-state.svg" alt="empty" />
	{:else}
		<div class="flex flex-wrap gap-8 items-start w-full container mt-4">
			{#each arr as data, i}
				<button
					on:click={() => {
						goto(`/activity/${data}`);
					}}
					data-cy={`activity-item-${i}`}
					class="w-[235px] h-[235px] px-8 py-6 bg-white rounded-md shadow-sm flex flex-col justify-between"
				>
					<h2 class="text-lg font-bold">{data}</h2>
					<div class="flex justify-between">
						<p class="text-gray-500">Date</p>
						<div>Delete</div>
					</div>
				</button>
			{/each}
		</div>
	{/if}
</div>
