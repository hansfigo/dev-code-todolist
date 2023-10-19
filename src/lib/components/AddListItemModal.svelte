<script lang="ts">
	import { activityDetail } from '$lib/utils/activityDetail';
	import { writable } from 'svelte/store';

	export let id: string;
	let priority: string;

	const namaListItem = writable('');

	const clearInput = () => {
		namaListItem.set('');
	};
</script>

<dialog data-cy="modal-add" id="add_list_item_modal" class="modal">
	<div class="modal-box md:min-w-[600px]">
		<div class="flex justify-between items-center">
			<p data-cy="modal-add-name-title" class="text-lg font-bold pb-4">Tambahkan List Item</p>
			<form method="dialog">
				<button data-cy="modal-add-close-button" class="btn btn-sm btn-circle btn-ghost text-lg">✕</button>
			</form>
		</div>
		<hr />
		<div class="w-full flex flex-col mt-6 gap-6">
			<div>
				<label for="Nama List" class="block mb-2 text-base font-bold">Nama List Item</label>
				<input
					data-cy="modal-add-name-input"
					name="Nama List"
					type="text"
					placeholder="Type here"
					class="input input-bordered w-full"
					bind:value={$namaListItem}
				/>
			</div>

			<div>
				<label for="Priority" class="block mb-2 text-base font-bold">Priority</label>
				<div class="dropdown">
					<label data-cy="modal-add-priority-item" tabIndex={0} class="btn m-1">Select Priority</label>
					<ul
						tabIndex={0}
						class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
					>
						<li>
							<a on:click={() => (priority = "very-high")}>🔴 Very High</a>
						</li>
						<li>
							<a on:click={() => (priority = "high")}>🟠 High</a>
						</li>
						<li>
							<a on:click={() => (priority = "normal")}>🟢 Normal</a>
						</li>
						<li>
							<a on:click={() => (priority = "low")}>🔵 Low</a>
						</li>
						<li>
							<a on:click={() => (priority = "very-low")}>🟣 Very Low</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<hr class="mt-8" />

		<form method="dialog" class="flex justify-end gap-4 mt-6">
			<button
				disabled={$namaListItem === ''}
				data-cy="modal-add-save-button"
				on:click={() => {
					activityDetail.post($namaListItem, id, priority);
					clearInput();
				}}
				class="bg-main-blue btn px-5 py-2 font-semibold rounded-full text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
				>Simpan</button
			>
		</form>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
