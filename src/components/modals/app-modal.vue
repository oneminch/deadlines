<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'
import { computed, ref } from 'vue'

defineProps<{
  title: string
  description: string
}>()

const isDesktop = useMediaQuery('(min-width: 640px)')
const isOpen = ref(false)

const Modal = computed(() => ({
  Root: isDesktop.value ? Dialog : Drawer,
  Trigger: isDesktop.value ? DialogTrigger : DrawerTrigger,
  Content: isDesktop.value ? DialogContent : DrawerContent,
  Header: isDesktop.value ? DialogHeader : DrawerHeader,
  Title: isDesktop.value ? DialogTitle : DrawerTitle,
  Description: isDesktop.value ? DialogDescription : DrawerDescription,
}))
</script>

<template>
  <component :is="Modal.Root" v-model:open="isOpen">
    <component :is="Modal.Trigger" as-child>
      <slot name="trigger" />
    </component>
    <component
      :is="Modal.Content"
      :class="[
        'sm:max-w-md',
        { 'px-2 pb-8 *:px-4': !isDesktop },
      ]"
    >
      <component :is="Modal.Header">
        <component :is="Modal.Title" class="sr-only">{{ title }}</component>
        <component :is="Modal.Description" class="sr-only">{{ description }}</component>
      </component>

      <slot />

      <DrawerFooter v-if="!isDesktop" class="py-8">
        <DrawerClose as-child>
          <Button variant="ghost"> Close </Button>
        </DrawerClose>
      </DrawerFooter>
    </component>
  </component>
</template>
