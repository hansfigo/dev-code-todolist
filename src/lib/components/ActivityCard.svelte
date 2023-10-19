<script lang="ts">
	import { goto } from '$app/navigation';
	import { activityIdStore } from '$lib/stores/activity';
	import { activityTitleStore } from '$lib/utils/activityDetail';
	import convertDate from '$lib/utils/date';
	import { openModal } from '$lib/utils/modal';
	import DeleteModal from './DeleteModal.svelte';

	export let title: string;
	export let id: string;
	export let i: number;
	export let created_at: string;
</script>

<div
	data-cy={`activity-item`}
	class="w-[235px] h-[235px] px-8 py-6 bg-white rounded-md shadow-sm flex flex-col justify-between"
>
	<button
		on:click={() => goto('/detail/' + id)}
		data-cy={'activity-item-' + i}
		class="h-full flex justify-start"
	>
		<h2 data-cy="activity-item-title" class="text-lg font-bold">{title}</h2>
	</button>
	<div class="flex justify-between w-full items-center">
		<p data-cy="activity-item-date" class="text-gray-500 text-sm">{convertDate(created_at)}</p>
		<button
			on:click={async () => {
				openModal('delete_modal');
				activityTitleStore.set(title);
				activityIdStore.set(id);
			}}
		>
			<img class="h-5" src="delete-button.png" alt="" data-cy="activity-item-delete-button" />
		</button>
	</div>
</div>
