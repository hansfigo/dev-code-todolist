<script lang="ts">
	import api from "$lib/utils/api";

    export let title : string;
    export let id : string;

</script>

<dialog id="delete_modal" class="modal">
    <div class="modal-box">
        <img src="delete-warning.png" alt="">
        <p class="py-4">Apakah anda yakin menghapus activity “{title}”?</p>
        <form method="dialog" class="flex gap-4 jb">
            <button>Batal</button>
            <button on:click={()=> api.remove(id)}>Hapus</button>
        </form>
    </div>
    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
</dialog>