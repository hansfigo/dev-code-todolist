<script lang="ts">
	import { activityDetail } from '$lib/utils/activityDetail';
	import { writable } from 'svelte/store';

	export let i: number;
	export let id: number;
	export let priority: string;
	export let title: string;
	export let isActive: number;
	export let activityId: string;

	const namaListItem = writable('');

	namaListItem.set(title);

	console.log(priority, title);

	const clearInput = () => {
		namaListItem.set('');
	};
</script>

<dialog id={'edit_list_item_modal' + i} class="modal">
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
					bind:value={title}
				/>
			</div>

			<div>
				<label for="Priority" class="block mb-2 text-base font-bold">Priority</label>
				<div class="dropdown">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label tabIndex={0} class="btn m-1 z-50">{priority}</label>
					<ul
						tabIndex={0}
						class="dropdown-content bg-red-500 absolute z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
					>
						<li>
							<a on:click={() => (priority = 'very-high')}>🔴Very High</a>
						</li>
						<li>
							<a on:click={() => (priority = 'high')}>🟠 High</a>
						</li>
						<li>
							<a on:click={() => (priority = 'normal')}>🟢 Normal</a>
						</li>
						<li>
							<a on:click={() => (priority = 'low')}>🔵 Low</a>
						</li>
						<li>
							<a on:click={() => (priority = 'very-low')}>🟣 Very Low</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<hr class="mt-8" />

		<form method="dialog" class="flex justify-end gap-4 mt-6">
			<button
				on:click={() => {
					activityDetail.updateToDoList(title, id, isActive, activityId, priority);
					clearInput();
				}}
				class="bg-main-blue px-5 py-2 font-semibold rounded-full text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
			>
				Simpan
			</button>
		</form>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
