<script lang="ts">
	import { goto } from '$app/navigation';
	import AddListItemModal from '$lib/components/AddListItemModal.svelte';
	import DeleteTodoListModal from '$lib/components/DeleteTodoListModal.svelte';
	import EditListModal from '$lib/components/EditListModal.svelte';
	import TodoListCard from '$lib/components/TodoListCard.svelte';
	import { isDeleted, sortByStore } from '$lib/stores/activity.js';
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
	import { quintOut } from 'svelte/easing';
	import { get, writable } from 'svelte/store';
	import { fade, fly } from 'svelte/transition';

	export let data;
	const isEditing = writable<boolean>(false);

	activityDetailStore.set(data.data);
	activityTitleStore.set($activityDetailStore.title);
	TodoListItemStore.set($activityDetailStore.todo_items);

	console.log($TodoListItemStore);

	const toggleIsEditing = () => {
		isEditing.set(!$isEditing);
	};

	const updateTitle = () => {
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
			sortedItems = get(TodoListItemStore);
		}

		// Set hasil pengurutan ke TodoListItemStore
		TodoListItemStore.set(sortedItems);
	});
</script>

<AddListItemModal id={$activityDetailStore.id} />
<DeleteTodoListModal />

<div class="mt-8 flex flex-col items-center h-[80vh] relative px-8">
	<div class="flex justify-between container">
		<div class="flex gap-4 items-center">
			<button on:click={() => goto('/')}>
				<img src="../todo-back-button.png" alt="" />
			</button>

			{#if $isEditing}
				<form on:submit={() => updateTitle()}>
					<input
						data-cy="todo-title-edit-button"
						bind:value={$activityTitleStore}
						on:blur={() => updateTitle}
						type="text"
						class="text-2xl font-bold bg-transparent border-b-2 border-black"
					/>
				</form>
			{:else}
				<button
					data-cy="todo-title-edit-button"
					on:click={() => toggleIsEditing()}
					class="flex gap-4 items-center"
				>
					<h1 data-cy="todo-title" class="text-2xl font-bold">{$activityTitleStore}</h1>
					<img class="h-6 brightness-50" src="../todo-item-edit-button.png" alt="" />
				</button>
			{/if}
		</div>
		<div class="flex gap-4">
			<div class="relative">
				<div class="dropdown">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label
						id="prioritySelect"
						data-cy="todo-sort-button"
						tabIndex={0}
						class="btn bg-transparent border-2 border-gray-400 rounded-full h-8 w-12"
					>
						<img class="h-6 w-6" src="../tabler-arrows-sort.png" alt="" />
					</label>
					<ul
						tabIndex={0}
						class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
					>
						<li>
							<button data-cy="sort-selection" on:click={() => sortByStore.set('newest')}
								>Newest</button
							>
						</li>
						<li>
							<button data-cy="sort-selection" on:click={() => sortByStore.set('oldest')}
								>Oldest</button
							>
						</li>
						<li>
							<button data-cy="sort-selection" on:click={() => sortByStore.set('az')}>A-Z</button>
						</li>
						<li>
							<button data-cy="sort-selection" on:click={() => sortByStore.set('za')}>Z-A</button>
						</li>
						<li>
							<button data-cy="sort-selection" on:click={() => sortByStore.set('complete')}
								>Belum Selesai</button
							>
						</li>
					</ul>
				</div>
			</div>
			<button
				data-cy="todo-add-button"
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

{#if $isDeleted}
	<div
		data-cy="modal-information"
		transition:fade={{ duration: 300 }}
		class="z-50 absolute flex justify-center items-center w-full"
	>
		<div class="container">
			<div class="alert alert-error">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="stroke-current shrink-0 h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg
				>
				<span>Data Berhasil Dihapus</span>
			</div>
		</div>
	</div>
{/if}
