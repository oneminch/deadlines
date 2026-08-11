<script setup lang="ts">
import { computed, ref } from 'vue'
import IconGearSix from '~icons/ph/gear-six-duotone'

const props = defineProps<{
  triggerClass?: string
}>()

const { options, updateOptions } = useOptions()
const { exportData, importData } = useFile()
const { purgeDeadlines } = useDeadlines()

const fileInputRef = ref<HTMLInputElement | null>(null)

const triggerFileInput = () => {
  if (fileInputRef.value) {
    fileInputRef.value.click()
  }
}

const toastsEnabled = computed({
  get: () => {
    return options.value.toastsEnabled
  },
  set: async (newValue: boolean) => {
    await updateOptions({ toastsEnabled: newValue })
  },
})

const handlePurge = async () => {
  await purgeDeadlines()
}

const optionsModalProps = {
  title: 'App Options',
  description: 'Settings for the app.',
}
</script>

<template>
  <app-modal v-bind="optionsModalProps">
    <template #trigger>
      <Button
        aria-label="Toggle App Options"
        title="Toggle App Options"
        :class="cn('icon-button!', props.triggerClass)"
      >
        <IconGearSix />
      </Button>
    </template>

    <div class="options sm:max-w-sm min-w-72 space-y-4 text-sm">
      <h3 class="text-2xl font-bold">Options</h3>

      <div
        class="flex items-center gap-2 justify-between bg-mist-100 dark:bg-mist-800 border border-border rounded-md py-4 px-6 cursor-pointer"
      >
        <Label for="toggle-toast" class="text-base">Enable Toasts</Label>
        <Switch id="toggle-toast" v-model="toastsEnabled" />
      </div>

      <hr
        class="w-4/5 mx-auto block border-none bg-linear-to-r from-transparent via-mist-200 dark:via-mist-700 to-transparent h-px rounded-full"
      />

      <Button variant="outline" class="action-item w-full!" @click="exportData"
        >Export to JSON</Button
      >

      <input type="file" ref="fileInputRef" class="sr-only" @change="importData" />
      <Button variant="outline" class="action-item w-full!" @click="triggerFileInput"
        >Import from JSON</Button
      >

      <hr
        class="w-4/5 mx-auto block border-none bg-linear-to-r from-transparent via-mist-200 dark:via-mist-700 to-transparent h-px rounded-full"
      />

      <app-confirmation-button
        class="action-item w-full! hover:bg-destructive/90 dark:hover:bg-destructive/90 border-destructive/50 dark:border-destructive"
        initial-label="Purge Local Data"
        primary-confirmation-label="Are You Sure?"
        secondary-confirmation-label="Are You Sure?"
        @confirmed="handlePurge"
      />
    </div>
  </app-modal>
</template>
