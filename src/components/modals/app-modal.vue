<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'
import { computed, ref } from 'vue'

withDefaults(
  defineProps<{
    title: string
    description: string
    withClose?: boolean
  }>(),
  { withClose: false },
)

const isDesktop = useMediaQuery('(min-width: 640px)')
const isOpen = ref(false)

const Modal = computed(() => ({
  Root: isDesktop.value ? Dialog : Drawer,
  Trigger: isDesktop.value ? DialogTrigger : DrawerTrigger,
  Content: isDesktop.value ? DialogContent : DrawerContent,
  Header: isDesktop.value ? DialogHeader : DrawerHeader,
  Title: isDesktop.value ? DialogTitle : DrawerTitle,
  Description: isDesktop.value ? DialogDescription : DrawerDescription,
  Footer: isDesktop.value ? DialogFooter : DrawerFooter,
  Close: isDesktop.value ? DialogClose : DrawerClose,
}))
</script>

<template>
  <component :is="Modal.Root" v-model:open="isOpen">
    <component :is="Modal.Trigger" as-child>
      <slot name="trigger" />
    </component>
    <component
      :is="Modal.Content"
      :class="['sm:max-w-md gap-0!', { 'px-2 pb-2 *:px-4': !isDesktop }]"
    >
      <component :is="Modal.Header">
        <component :is="Modal.Title" class="sr-only">{{ title }}</component>
        <component :is="Modal.Description" class="sr-only">{{ description }}</component>
      </component>

      <slot />

      <component :is="Modal.Footer" class="flex-col! gap-0">
        <slot name="footer" />

        <component v-if="withClose" :is="Modal.Close" as-child>
          <Button variant="outline"> Close </Button>
        </component>
      </component>
    </component>
  </component>
</template>
