<script lang="ts">
	import { goto } from '$app/navigation';
	import AddListItemModal from '$lib/components/AddListItemModal.svelte';
	import {
		activityDetail,
		activityDetailStore,
		activityTitleStore
	} from '$lib/utils/activityDetail.js';
	import { openModal } from '$lib/utils/modal.js';
	import { get, writable } from 'svelte/store';

	export let data;
	const isEditing = writable<boolean>(false);

	activityDetailStore.set(data.data);
	activityTitleStore.set($activityDetailStore.title);

	const toggleIsEditing = () => {
		isEditing.set(!$isEditing);
	};

	const saveValue = () => {
		activityDetail.update($activityTitleStore, $activityDetailStore.id);
		toggleIsEditing();
	};
</script>

<AddListItemModal id={$activityDetailStore.id} />

<div class="mt-8 flex flex-col items-center h-[80vh] relative px-8">
	<div class="flex justify-between container">
		<div class="flex gap-4 items-center">
			<button on:click={() => goto('/')}>
				<img src="../todo-back-button.png" alt="" />
			</button>

			{#if $isEditing}
				<input
					bind:value={$activityTitleStore}
					on:blur={saveValue}
					type="text"
					class="text-2xl font-bold bg-transparent border-b-2 border-black"
				/>
			{:else}
				<button on:click={() => toggleIsEditing()} class="flex gap-4 items-center">
					<h1 class="text-2xl font-bold">{$activityTitleStore}</h1>
					<img class="h-6 brightness-50" src="../todo-item-edit-button.png" alt="" />
				</button>
			{/if}
		</div>
		<button
			data-cy="activity-add-button"
			on:click={() => openModal('add_list_item_modal')}
			class="bg-main-blue px-5 py-2 font-semibold rounded-full text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
			>+ Tambah
		</button>
	</div>
	{#if $activityDetailStore.todo_items.length === 0 || $activityDetailStore.todo_items.length <= 0}
		<div class="flex justify-center items-center w-full h-full">
			<img class="md:h-[24rem]" src="../todo-empty-state.png" alt="empty" />
		</div>
	{:else}
		<div class="flex flex-col gap-8 w-full mt-8">
			{#each $activityDetailStore.todo_items as todo}
			<div class="py-8 px-12 shadow-md w-full bg-white  flex justify-between rounded-md">
				<div class="flex gap-4">
					<input type="checkbox" class="checkbox" />
					<p>{todo.title}</p>
					<img class="h-6 brightness-50" src="../todo-item-edit-button.png" alt="" />
				</div>
				<img class="h-5" src="../delete-button.png" alt="" />
			</div>
			{/each}
		</div>
	{/if}
</div>
