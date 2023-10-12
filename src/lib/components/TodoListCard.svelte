<script lang="ts">
	import { activityDetailStore, activityDetail, type TodoItem } from '$lib/utils/activityDetail';
	import { writable } from 'svelte/store';

	export let activityId: string;
	export let title: string;
	export let isActive: number;
	export let priority: string;
	export let id: number;

	const iconStore = writable(''); // Store untuk ikon
	const isChecked = writable(isActive == 1 ? false : true); // Store untuk status checkbox

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
		// Menggunakan reactive statement untuk menetapkan ikon saat nilai prioritas berubah
		setIcon(priority);
	}

  console.log($isChecked);
  
  let htmlTitle = ''
	if (!$isChecked) {
		htmlTitle = `<span >${title}</span>`;
	} else {
		htmlTitle = `<strike  class="text-gray-400">${title}</strike>`;
	}

	// Fungsi untuk menentukan dekorasi teks saat checkbox diubah
	async function toggleTextDecoration() {
		activityDetail.updateToDoList(title, id, $isChecked ? 0 : 1, activityId);

		if (!$isChecked) {
			htmlTitle = `<span >${title}</span>`;
		} else {
			htmlTitle = `<strike  class="text-gray-400">${title}</strike>`;
		}

		// if (condition) {

		// }
		// if (is_active === 1) {
		//   if ($isChecked) {
		//     title = `<span class="text-gray-400"><strike>${title}</strike></span>`;
		//   } else {
		//     title = title.replace(/<strike class="text-gray-400">/g, '').replace(/<\/strike>/g, '');
		//   }
		// }
	}
</script>

<div class="py-8 px-12 shadow-md w-full bg-white flex justify-between rounded-md">
	<div class="flex gap-4">
		<input
			type="checkbox"
			class="checkbox"
			bind:checked={$isChecked}
			on:change={toggleTextDecoration}
		/>
		<p>{$iconStore + priority}</p>
		<p>{@html htmlTitle}</p>
		<img class="h-6 brightness-50" src="../todo-item-edit-button.png" alt="" />
	</div>
	<button on:click={() => activityDetail.delete(id.toString(), $activityDetailStore.id)}>
		<img class="h-5" src="../delete-button.png" alt="" />
	</button>
</div>
