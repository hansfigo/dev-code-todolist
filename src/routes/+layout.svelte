<script>
	import '../app.postcss';
	
	import { navigating } from '$app/stores';
	
</script>

<svelte:head>
	<title>To Do List - Dashboard</title>
</svelte:head>

<div data-cy=activity-item-delete-button class="bg-gray-200 h-full min-h-screen overflow-y-scroll">
	<div
		class="w-full flex flex-col justify-center relative items-center bg-main-blue py-6 text-2xl text-white font-bold px-8"
	>
		{#if $navigating}
			<progress class="progress progress-warning w-full absolute top-0" />
		{/if}

		<p data-cy="header-title" class="container">TODO LIST APP</p>
	</div>
	<slot />
</div>
