<script>
  import TextField from '$lib/components/Form/TextField.svelte';
  import PrimaryButton from '$lib/components/PrimaryButton/index.svelte';
  import { getSupabase } from '$lib/utils/functions/supabase';
  import { validateEmail } from '$lib/utils/functions/validateEmail';
  import ChartClusterBarIcon from 'carbon-icons-svelte/lib/ChartClusterBar.svelte';
  import FlowStreamReferenceIcon from 'carbon-icons-svelte/lib/FlowStreamReference.svelte';
  import MachineLearningModelIcon from 'carbon-icons-svelte/lib/MachineLearningModel.svelte';
  import { onMount } from 'svelte';

  let email = '';
  let isAdding = false;
  let success = false;

  const supabase = getSupabase();
  const animate = 'transition delay-75 duration-300 ease-in-out';
  const areas = [
    {
      title: '访问',
      description: '快速找到完成工作所需的任何资料。OpenAgents Academy 提供了一体化平台。'
    },
    {
      title: '分析',
      description: '避免假设，更好地了解您的课堂需求，为学生提供个性化体验。'
    },
    {
      title: '自动化',
      description:
        '课程提醒、截止日期提醒以及许多其他自动化提醒，帮助学习过程中所有人保持积极主动。'
    }
  ];

  async function handleSubmit() {
    if (!email || !validateEmail(email)) return;
    isAdding = true;

    await supabase.from('waitinglist').insert([{ email }]);

    success = true;

    setTimeout(() => {
      isAdding = false;
      success = false;
      email = '';
    }, 5000);
  }

  onMount(() => {
    console.log('Welcome to CIO');
  });
</script>

<svelte:head>
  <title>OpenAgents Academy - The OpenAgents software</title>
</svelte:head>

<div class="m-2 flex w-screen flex-col items-center justify-center font-sans sm:m-0 md:h-[93vh]">
  <!--
    <img
      src="/logo-192.png"
      alt="OpenAgents Academy logo"
      class="rounded inline-block mx-auto w-20 h-20 sm:w-auto sm:h-auto"
      data-atf="1"
    />
  -->
  <div>
    <h3 class="text-center text-4xl dark:text-white">
      OpenAgents<span class="text-primary-700">Academy</span>
    </h3>
    <p class="text-center text-lg dark:text-white">
      The operating system for OpenAgents Academy of the future 🚀🚀🚀.
    </p>
  </div>

  <form on:submit|preventDefault={handleSubmit} class="my-4 hidden">
    <div class="flex flex-col items-center sm:flex-row">
      {#if success}
        <p class="dark:text-white">You have been added successfully. Thanks for joining.</p>
      {:else}
        <TextField
          bind:value={email}
          type="email"
          placeholder="Enter your email.."
          className="mr-3 my-2"
          isRequired={true}
          isDisabled={isAdding}
        />
        <PrimaryButton type="submit" isLoading={isAdding}>Join waiting list</PrimaryButton>
      {/if}
    </div>
  </form>

  <div class="mt-4 flex flex-col md:flex-row">
    {#each areas as area, index}
      <div
        class="active hover:border-primary-700 m-3 max-w-[350px] rounded-md border-2 bg-white px-12 py-3 shadow-xl dark:bg-black {animate}"
      >
        <h3 class="text-3xl dark:text-white">
          {#if index === 0}
            <FlowStreamReferenceIcon size={32} class="carbon-icon dark:text-white" />
          {:else if index === 1}
            <ChartClusterBarIcon size={32} class="carbon-icon dark:text-white" />
          {:else if index === 2}
            <MachineLearningModelIcon size={32} class="carbon-icon dark:text-white" />
          {/if}
          {area.title}
        </h3>
        <p class="dark:text-white">{area.description}</p>
      </div>
    {/each}
  </div>
</div>
