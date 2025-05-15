<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { t } from '$lib/utils/functions/translations';
  import {
    NOTIFICATION_NAME,
    triggerSendEmail
  } from '$lib/utils/services/notification/notification';
  import { currentOrgPath } from '$lib/utils/store/org';
  import { profile } from '$lib/utils/store/user';
  import Modal from '../Modal/index.svelte';

  const isOpen = () => {
    let query = new URLSearchParams($page.url.search);
    let welcomePopup = query.get('welcomePopup');
    return welcomePopup === 'true';
  };

  const closeModal = () => {
    triggerSendEmail(NOTIFICATION_NAME.WELCOME_TO_APP, {
      to: $profile.email,
      name: $profile.fullname
    });
    goto($currentOrgPath + '/courses?create=true');
  };
</script>

<Modal
  onClose={closeModal}
  open={isOpen()}
  width="w-9/12"
  maxWidth="w-[800px]"
  modalHeading="Welcome"
>
  <p class="text-sm text-black dark:text-white md:text-base lg:text-lg">
    {$t('welcome_modal.we_at')}
    <a
      href="https://app.academy.rios.com.ai/"
      class="text-primary-700 no-underline hover:no-underline">RiOS Academy</a
    >
    {$t('welcome_modal.small_team')}
    <span class="text-primary-700">{$t('welcome_modal.thank_you')};</span>
    {$t('welcome_modal.deeply_appreciate')}
  </p>
  <img src="/images/welcome-img.svg" alt="A welcome banner" class="my-6 w-full" />
</Modal>
