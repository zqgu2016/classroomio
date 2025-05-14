<script>
  import { LANGUAGES } from '$lib/utils/constants/translation';
  import { initialized, t } from '$lib/utils/functions/translations';
  import { LOCALE } from '$lib/utils/types';
  import { Dropdown } from 'carbon-components-svelte';

  export let className = '';
  export let value = LOCALE.ZH;
  export let hasLangChanged = false;

  const dropdownItems = [{ id: '', text: 'Pick a Language' }, ...LANGUAGES];

  function handleSelect(event) {
    value = event.detail.selectedId;

    hasLangChanged = true;
  }
</script>

{#if $initialized}
  <Dropdown
    titleText={$t('content.toggle_label')}
    items={dropdownItems}
    selectedId={value}
    on:select={handleSelect}
    class="h-full {className}"
  />
{/if}
