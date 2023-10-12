<script>
	import '../app.postcss';
</script>

<svelte:head>
	<title>To Do List - Dashboard</title>
</svelte:head>

<div class="bg-gray-200 h-full min-h-screen overflow-y-scroll ">
	<div class="w-full flex justify-center items-center bg-main-blue py-6 text-2xl text-white font-bold px-8">
		<p class="container">Todo List App</p>
	</div>
	<slot />
</div>
