<script lang="ts">
	import { activityDetailStore, activityDetail, type TodoItem } from '$lib/utils/activityDetail';
	import { writable } from 'svelte/store';
	import EditListModal from './EditListModal.svelte';
	import { openModal } from '$lib/utils/modal';
	import { todoIdStore, todoTitleStore } from '$lib/stores/todo';

	export let activityId: string;
	export let title: string;
	export let isActive: number;
	export let priority: string;
	export let id: number;
	export let i: number;

	const iconStore = writable(''); // Store untuk ikon
	const isChecked = writable(isActive == 1 ? false : true); // Store untuk status checkbox
	const titleStore = writable('');
	const prioStore = writable('');
	const idStore = writable();
	// Fungsi untuk menetapkan ikon berdasarkan prioritas
	function setIcon(priority: string) {
		let icon = '';
		if (priority === 'very-high') {
			icon = '🔴';
		} else if (priority === 'high') {
			icon = '🟠';
		} else if (priority === 'normal') {
			icon = '🟢';
		} else if (priority === 'low') {
			icon = '🔵';
		} else if (priority === 'very-low') {
			icon = '🟣';
		}
		iconStore.set(icon); // Menyimpan ikon dalam store
	}

	$: {
		setIcon(priority);
		isChecked.set(isActive == 1 ? false : true);
		titleStore.set(title);
		prioStore.set(priority);
		idStore.set(id);
	}

	async function toggleTextDecoration() {
		activityDetail.updateToDoList(title, id, $isChecked ? 0 : 1, activityId);
	}
</script>

<EditListModal {activityId} {isActive} {i} {title} {id} {priority} />

<div
	data-cy={'todo-item-' + i}
	class="py-8 px-12 shadow-md w-full bg-white flex justify-between rounded-md"
>
	<div class="flex gap-4">
		<input
			data-cy="todo-item-checkbox"
			type="checkbox"
			class="checkbox"
			bind:checked={$isChecked}
			on:change={toggleTextDecoration}
		/>
		<p data-cy="todo_item_priority_indicator">{$iconStore}</p>
		{#if !$isChecked}
			<p data-cy="todo-item-title">{title}</p>
		{:else}
			<strike data-cy="todo-item-title" class="text-gray-400">{title}</strike>
		{/if}
		<button data-cy="todo-item-edit-button" on:click={() => openModal('edit_list_item_modal' + i)}>
			<img class="h-6 brightness-50" src="../todo-item-edit-button.png" alt="" />
		</button>
	</div>
	<button
		data-cy="todo-item-delete-button"
		on:click={() => {
			todoTitleStore.set(title)
			todoIdStore.set(id.toString())
			openModal('delete_todo_modal');
		}}
	>
		<img class="h-5" src="../delete-button.png" alt="" />
	</button>
</div>
