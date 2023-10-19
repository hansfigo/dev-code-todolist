<script lang="ts">
	import { activityIdStore, isDeleted } from '$lib/stores/activity';
	import { activityTitleStore } from '$lib/utils/activityDetail.js';
	import api from '$lib/utils/api';
</script>

<dialog data-cy="modal-delete" id="delete_modal" class="modal ">
	<div class="modal-box flex flex-col justify-center items-center">
		<img src="delete-warning.png" alt="" />
		<p class="py-4 text-center">
			Apakah anda yakin menghapus activity <br />“{$activityTitleStore}”?
		</p>
		<form method="dialog" class="flex gap-4 jb">
			<button data-cy="modal-delete-cancel-button" class="batal-button">Batal</button>
			<button
				data-cy="modal-delete-confirm-button"
				class="button-delete"
				on:click={() => {
					api.remove($activityIdStore);
					isDeleted.set(true);

					setTimeout(() => isDeleted.set(false), 1200);
				}}>Hapus</button
			>
		</form>
	</div>
</dialog>

<style lang="postcss">
	.button-delete {
		@apply bg-red-500 px-8 py-4 rounded-md text-white pointer-events-auto	 btn;
	}

	.batal-button {
		@apply bg-gray-300 px-8 py-4 rounded-md text-white pointer-events-auto	  btn;
	}
</style>
