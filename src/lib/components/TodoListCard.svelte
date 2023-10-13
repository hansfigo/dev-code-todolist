<script lang="ts">
	import { activityDetailStore, activityDetail, type TodoItem } from '$lib/utils/activityDetail';
	import { writable } from 'svelte/store';
	import EditListModal from './EditListModal.svelte';
	import { openModal } from '$lib/utils/modal';

	export let activityId: string;
	export let title: string;
	export let isActive: number;
	export let priority: string;
	export let id: number;
	export let i : number;

	const iconStore = writable(''); // Store untuk ikon
	const isChecked = writable(isActive == 1 ? false : true); // Store untuk status checkbox
	const titleStore = writable('')
	const prioStore = writable('')
	const idStore = writable()
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
		// Menggunakan reactive statement 
		setIcon(priority);
    	isChecked.set(isActive == 1 ? false : true)
		titleStore.set(title)
		prioStore.set(priority)
		idStore.set(id)

	}


	// Fungsi untuk menentukan dekorasi teks saat checkbox diubah
	async function toggleTextDecoration() {
		activityDetail.updateToDoList(title, id, $isChecked ? 0 : 1, activityId);

	}
</script>

<EditListModal activityId={activityId} isActive={isActive} i={i} title={title} id={id} priority={priority}/>

<div class="py-8 px-12 shadow-md w-full bg-white flex justify-between rounded-md">
	<div class="flex gap-4">
		<input
			type="checkbox"
			class="checkbox"
			bind:checked={$isChecked}
			on:change={toggleTextDecoration}
		/>
		<p>{$iconStore}</p>
		{#if !$isChecked}
			<p>{title}</p>
		{:else}
			<strike class="text-gray-400">{title}</strike>
		{/if}
		<button on:click={()=> openModal('edit_list_item_modal'+i)}>
			<img class="h-6 brightness-50" src="../todo-item-edit-button.png" alt="" />
		</button>
	</div>
	<button on:click={() => activityDetail.delete(id.toString(), $activityDetailStore.id)}>
		<img class="h-5" src="../delete-button.png" alt="" />
	</button>
</div>
