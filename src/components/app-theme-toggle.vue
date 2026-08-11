<script setup lang="ts">
import { UseDark } from '@vueuse/components'
import IconMoon from '~icons/ph/moon-duotone'
import IconSun from '~icons/ph/sun-duotone'
</script>

<template>
  <UseDark v-slot="{ isDark, toggleDark }">
    <Button
      aria-label="Toggle Color Mode"
      title="Toggle Color Mode"
      :class="['icon-button!', $attrs.class]"
      @click="toggleDark()"
    >
      <IconMoon v-if="isDark" />
      <IconSun v-else />
    </Button>
  </UseDark>
</template>
