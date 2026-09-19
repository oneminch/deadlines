<script lang="ts" setup>
import '@fontsource-variable/geist';

import 'vue-sonner/style.css'
import { Toaster } from '@/components/ui/sonner'
</script>

<template>
  <div>
    <main>
      <app-header />
      <app-deadline-list />
      <app-nav-bar />
    </main>

    <Toaster />
  </div>
</template>

<style>
@reference "./assets/css/main.css";

.p-toast-detail {
  @apply text-mist-900! dark:text-mist-50!;
}

[tabindex='-1'] {
  @apply focus-visible:outline-none;
}
</style>
