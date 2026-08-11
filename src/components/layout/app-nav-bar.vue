<template>
  <div
    class="flex items-center gap-x-2 fixed bottom-4 left-1/2 overflow-hidden transform -translate-x-1/2 z-30"
  >
    <div
      class="flex sm:hidden items-center gap-x-2 shadow-md rounded-full p-2 sm:p-1 bg-brand-light dark:bg-mist-900 border-2 sm:border border-brand"
    >
      <app-input-modal trigger-class="rounded-full! sm:hidden" />
      <app-about-modal trigger-class="rounded-full! sm:hidden" />
      <app-theme-toggle class="rounded-full! sm:hidden" />
      <app-options-modal trigger-class="rounded-full! sm:hidden" />
    </div>
    <app-scroll-to-top />
  </div>
</template>
