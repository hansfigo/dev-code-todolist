<script lang="ts">
	import { goto } from '$app/navigation';
	import activityList from '$lib/stores/activity.js';
	import useApi from '$lib/utils/api';
	import convertDate from '$lib/utils/date.js';
	
	export let data;

	activityList.set(data.data.data)

	const openModal = () => {
		const modal = document.getElementById('my_modal_2') as HTMLDialogElement;
		if (modal) {
			modal.showModal();
		}
	};

	const api = useApi();

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
	<dialog id="my_modal_2" class="modal">
		<div class="modal-box">
			<h3 class="font-bold text-lg">Hello!</h3>
			<p class="py-4">Press ESC key or click outside to close</p>
		</div>
		<form method="dialog" class="modal-backdrop">
			<button>close</button>
		</form>
	</dialog>
	{#if $activityList.length === 0 || $activityList.length <= 0}
		<div class="flex justify-center items-center w-full h-full">
			<img class="md:h-[24rem]" src="activity-empty-state.svg" alt="empty" />
		</div>
	{:else}
		<div class="flex flex-wrap gap-6  items-start w-full container mt-4">
			{#each $activityList as data, i}
				<div
				
					data-cy={`activity-item-${i}`}
					class="w-[235px] h-[235px] px-8 py-6 bg-white rounded-md shadow-sm flex flex-col justify-between"
				>
					<h2 class="text-lg font-bold">{data.title}</h2>
					<div class="flex justify-between w-full">
						<p class="text-gray-500">{convertDate(data.created_at)}</p>
						<button
							on:click={async () => {
								await api.remove(data.id);

								activityList.set(await api.get());
							}}
						>
							<img src="delete-button.png" alt="" />
						</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
