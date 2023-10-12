<script lang="ts">
	import { goto } from "$app/navigation";
	import convertDate from "$lib/utils/date";
	import DeleteModal from "./DeleteModal.svelte";

    export let title : string
    export let id : string
    export let i : number
    export let created_at : string


    const openModal = () => {
		const modal = document.getElementById('delete_modal') as HTMLDialogElement;
		if (modal) {
			modal.showModal();
		}
	};
</script>

<DeleteModal {title} {id}/>

<div

	data-cy={`activity-item-${i}`}
	class="w-[235px] h-[235px] px-8 py-6 bg-white rounded-md shadow-sm flex flex-col justify-between"
>
<button on:click={()=> goto('/detail/'+id)} class="h-full flex justify-start">
	<h2 class="text-lg font-bold">{title}</h2>
</button>
	<div class="flex justify-between w-full">
		<p class="text-gray-500">{convertDate(created_at)}</p>
		<button
			on:click={async () => {
                openModal()
			}}
		>
			<img src="delete-button.png" alt="" />
		</button>
	</div>
</div>
