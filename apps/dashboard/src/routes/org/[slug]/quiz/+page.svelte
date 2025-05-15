<script>
  import DeleteModal from '$lib/components/Org/Quiz/DeleteModal.svelte';
  import NewQuizModal from '$lib/components/Org/Quiz/NewQuizModal.svelte';
  import Quizzes from '$lib/components/Org/Quiz/Quizzes.svelte';
  import PrimaryButton from '$lib/components/PrimaryButton/index.svelte';
  import { createQuizModal } from '$lib/utils/store/org';
  import { isMobile } from '$lib/utils/store/useMobile';
  import { Add } from 'carbon-icons-svelte';
</script>

<svelte:head>
  <title>Interactive Quizzes - RiOS Academy</title>
</svelte:head>

<section class="mx-auto w-full max-w-6xl">
  <div class="px-5 py-10">
    <div class="mb-10 flex items-center justify-between">
      <h1 class="text-2xl font-bold dark:text-white md:text-3xl">Interactive Quizzes</h1>
      {#if $isMobile}
        <PrimaryButton onClick={() => ($createQuizModal.open = true)}>
          <Add size={24} />
        </PrimaryButton>
      {:else}
        <PrimaryButton label="Create Quiz" onClick={() => ($createQuizModal.open = true)} />
      {/if}
    </div>

    <NewQuizModal />
    <DeleteModal />

    <Quizzes />
  </div>
</section>
