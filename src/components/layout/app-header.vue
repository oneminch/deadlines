<script setup lang="ts">
import IconHourGlass from '~icons/ph/hourglass-simple-low-fill'

const today = DateUtils.formatDate(new Date())
</script>

<template>
  <header
    class="w-full my-8 mx-auto flex justify-between items-start select-none font-semibold text-3xl"
  >
    <hgroup class="flex flex-col gap-y-2 text-left text-3xl">
      <h2 class="flex items-center gap-x-2">
        <span>Deadlines</span>

        <IconHourGlass />
      </h2>
      <h2 class="text-mist-500 dark:text-mist-500">
        {{ today }}
      </h2>
    </hgroup>

    <div class="hidden sm:flex items-center gap-x-2">
      <app-input-modal />
      <app-about-modal />
      <app-theme-toggle />
      <app-options-modal />
    </div>
  </header>
</template>
