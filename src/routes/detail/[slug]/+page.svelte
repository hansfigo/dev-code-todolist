<script lang="ts">
	import { goto } from '$app/navigation';
	import AddListItemModal from '$lib/components/AddListItemModal.svelte';
	import EditListModal from '$lib/components/EditListModal.svelte';
	import TodoListCard from '$lib/components/TodoListCard.svelte';
	import { sortByStore } from '$lib/stores/activity.js';
	import {
		TodoListItemStore,
		activityDetail,
		activityDetailStore,
		activityTitleStore,
		type TodoItem
	} from '$lib/utils/activityDetail.js';
	import { openModal } from '$lib/utils/modal.js';
	import {
		sortByNewest,
		sortByOldest,
		sortByTitleAZ,
		sortByTitleZA,
		sortByIsCompleted
	} from '$lib/utils/sort.js';
	import { get, writable } from 'svelte/store';

	export let data;
	const isEditing = writable<boolean>(false);

		

	activityDetailStore.set(data.data);
	activityTitleStore.set($activityDetailStore.title);
	TodoListItemStore.set($activityDetailStore.todo_items);

	console.log($TodoListItemStore);


	const toggleIsEditing = () => {
		isEditing.set(!$isEditing);
	};

	const saveValue = () => {
		activityDetail.update($activityTitleStore, $activityDetailStore.id);
		toggleIsEditing();
	};

	sortByStore.subscribe((sortBy) => {
		let sortedItems: TodoItem[] = [];

		if (sortBy === 'newest') {
			// Jalankan fungsi untuk mengurutkan terbaru
			sortedItems = sortByNewest($TodoListItemStore);
		} else if (sortBy === 'oldest') {
			// Jalankan fungsi untuk mengurutkan terlama
			sortedItems = sortByOldest($TodoListItemStore);
		} else if (sortBy === 'az') {
			// Jalankan fungsi untuk mengurutkan A-Z
			sortedItems = sortByTitleAZ($TodoListItemStore);
		} else if (sortBy === 'za') {
			// Jalankan fungsi untuk mengurutkan Z-A
			sortedItems = sortByTitleZA($TodoListItemStore);
		} else if (sortBy === 'complete') {
			// Jalankan fungsi untuk filter yang sudah selesai
			sortedItems = sortByIsCompleted($TodoListItemStore);
		} else {
			sortedItems = get(TodoListItemStore)
		}

		// Set hasil pengurutan ke TodoListItemStore
		TodoListItemStore.set(sortedItems);
	});
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
					data-cy="todo-title-edit-button"
					bind:value={$activityTitleStore}
					on:blur={saveValue}
					type="text"
					class="text-2xl font-bold bg-transparent border-b-2 border-black"
				/>
			{:else}
				<button
					data-cy="todo-title-edit-button"
					on:click={() => toggleIsEditing()}
					class="flex gap-4 items-center"
				>
					<h1 class="text-2xl font-bold">{$activityTitleStore}</h1>
					<img class="h-6 brightness-50" src="../todo-item-edit-button.png" alt="" />
				</button>
			{/if}
		</div>
		<div class="flex gap-4">
			<div class="relative">
				<select
				data-cy="todo-sort-button"
					name="Priority"
					class="select select-bordered w-full"
					id="prioritySelect"
					bind:value={$sortByStore}
				>
					<option data-cy="sort-latest" value="newest">Newest</option>
					<option data-cy="sort-oldest" value="oldest">Oldest</option>
					<option data-cy="sort-az"  value="az">A-Z</option>
					<option data-cy="sort-za"  value="za">Z-A</option>
					<option data-cy="sort-unfinished" value="complete">Belum Selesai</option>
				</select>
			</div>
			<button
				data-cy="activity-add-button"
				on:click={() => openModal('add_list_item_modal')}
				class="bg-main-blue px-5 py-2 font-semibold rounded-full text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
				>+ Tambah
			</button>
		</div>
	</div>
	{#if $TodoListItemStore.length === 0 || $TodoListItemStore.length <= 0}
		<div class="flex justify-center items-center w-full h-full">
			<button data-cy="todo-empty-state" on:click={() => openModal('add_list_item_modal')}>
				<img class="md:h-[24rem]" src="../todo-empty-state.png" alt="empty" />
			</button>
		</div>
	{:else}
		<div class="flex flex-col gap-8 w-full mt-8 pb-12 container">
			{#each $TodoListItemStore as todo, i}
				<TodoListCard
					{i}
					id={todo.id}
					isActive={todo.is_active}
					priority={todo.priority}
					activityId={$activityDetailStore.id}
					title={todo.title}
				/>
			{/each}
		</div>
	{/if}
</div>
