<template>
  <nav
    class="flex items-center gap-x-2 fixed bottom-6 left-1/2 overflow-hidden transform -translate-x-1/2 z-30"
  >
    <div
      class="flex items-center gap-x-1.5 shadow-md rounded-full h-full p-1.5 sm:p-1 bg-brand-light dark:bg-mist-900 border-2 sm:border border-brand sm:hidden"
    >
      <app-input-modal trigger-class="size-12! rounded-full!" />
      <app-about-modal trigger-class="size-12! rounded-full!" />
      <app-options-modal trigger-class="size-12! rounded-full!" />

      <Separator orientation="vertical" class="w-[1.5px]! h-6! mx-0.5 bg-brand/25" />

      <app-theme-toggle class="size-12! rounded-full!" />
    </div>

    <app-scroll-to-top class="[&>button]:size-12!" />
  </nav>
</template>
