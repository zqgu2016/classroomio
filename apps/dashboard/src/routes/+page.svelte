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
      description: '快速找到完成工作所需的任何资料。ClassroomIO 提供了一体化平台。'
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
  <title>ClassroomIO - The classroom software</title>
</svelte:head>

<div class="md:h-[93vh] w-screen flex items-center justify-center flex-col m-2 sm:m-0 font-sans">
  <!--
    <img
      src="/logo-192.png"
      alt="ClassroomIO logo"
      class="rounded inline-block mx-auto w-20 h-20 sm:w-auto sm:h-auto"
      data-atf="1"
    />
  -->
  <div>
    <h3 class="dark:text-white text-4xl text-center">
      Classroom<span class="text-primary-700">IO</span>
    </h3>
    <p class="dark:text-white text-lg text-center">
      The operating system for classroooms of the future 🚀🚀🚀.
    </p>
  </div>

  <form on:submit|preventDefault={handleSubmit} class="my-4 hidden">
    <div class="flex items-center flex-col sm:flex-row">
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

  <div class="flex flex-col md:flex-row mt-4">
    {#each areas as area, index}
      <div
        class="max-w-[350px] m-3 bg-white dark:bg-black rounded-md py-3 px-12 active shadow-xl border-2 hover:border-primary-700 {animate}"
      >
        <h3 class="dark:text-white text-3xl">
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
