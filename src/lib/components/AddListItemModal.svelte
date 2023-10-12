<script lang="ts">
	import { activityDetail } from '$lib/utils/activityDetail';
	import { writable } from 'svelte/store';

    export let id : string;

	export const namaListItem = writable('');
	export const priority = writable('🔴 Very High');

</script>

<dialog id="add_list_item_modal" class="modal">
	<div class="modal-box md:min-w-[600px]">
		<p class="text-lg font-bold pb-4">Tambahkan List Item</p>
		<hr />
		<div class="w-full flex flex-col mt-6 gap-6">
			<div>
				<label for="Nama List" class="block mb-2 text-base font-bold">Nama List Item</label>
				<input
					name="Nama List"
					type="text"
					placeholder="Type here"
					class="input input-bordered w-full"
                    bind:value={$namaListItem}
				/>
			</div>

			<div>
				<label for="Priority" class="block mb-2 text-base font-bold">Priority</label>
				<select name="Priority" class="select select-bordered w-full" bind:value={$priority}>
                    <option value="very-high" disabled selected>🔴 Very High</option>
                    <option value="high">🟠 High</option>
                    <option value="normal">🟢 Normal</option>
                    <option value="low">🔵 Low</option>
                    <option value="very-low">🟣 Very Low</option>
                  </select>
			</div>
		</div>
		<hr class="mt-8" />

		<form method="dialog" class="flex justify-end gap-4 mt-6">
			<button
				on:click={() => {
					activityDetail.post($namaListItem, id, $priority);
				}}
				class="bg-main-blue px-5 py-2 font-semibold rounded-full text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
				>Simpan</button
			>
		</form>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
