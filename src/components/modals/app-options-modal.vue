<script setup lang="ts">
import { computed, ref } from 'vue'
import IconGearSix from '~icons/ph/gear-six-duotone'
import IconExport from '~icons/ph/download-duotone'
import IconImport from '~icons/ph/upload-duotone'

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
  <app-modal v-bind="optionsModalProps" :with-close="true">
    <template #trigger>
      <Button
        aria-label="Toggle App Options"
        title="Toggle App Options"
        :class="cn('icon-button!', props.triggerClass)"
      >
        <IconGearSix />
      </Button>
    </template>

    <div class="options min-w-72 space-y-3 text-sm">
      <h3 class="text-2xl font-bold">Options</h3>

      <div
        class="flex items-center gap-2 justify-between bg-secondary border border-border rounded-md p-6 cursor-pointer"
      >
        <Label for="toggle-toast" class="text-base">Enable Toasts</Label>
        <Switch id="toggle-toast" v-model="toastsEnabled" />
      </div>
      <div class="flex flex-col xs:flex-row gap-3 *:w-full xs:*:w-1/2">
        <Button
          variant="secondary"
          class="flex-row xs:flex-col-reverse h-auto! py-2 xs:py-3.5 border border-border"
          @click="exportData"
        >
          Export to JSON
          <IconExport class="size-5 xs:size-6" aria-hidden />
        </Button>

        <div>
          <input
            type="file"
            ref="fileInputRef"
            class="sr-only"
            tabindex="-1"
            aria-hidden="true"
            @change="importData"
          />
          <Button
            variant="secondary"
            class="flex-row xs:flex-col-reverse h-auto! py-2 xs:py-3.5 border border-border w-full"
            @click="triggerFileInput"
          >
            Import from JSON
            <IconImport class="size-5 xs:size-6" aria-hidden />
          </Button>
        </div>
      </div>
    </div>

    <template #footer>
      <hr
        class="w-4/5 my-6 mx-auto block border-none bg-linear-to-r from-transparent via-mist-200 dark:via-mist-700 to-transparent h-px rounded-full"
      />
      <app-confirmation-button
        class="w-full! hover:bg-destructive/90 dark:hover:bg-destructive/90 border-destructive/50 dark:border-destructive mb-2"
        initial-label="Purge Local Data"
        primary-confirmation-label="Are You Sure?"
        secondary-confirmation-label="Are You Sure?"
        @confirmed="handlePurge"
      />
    </template>
  </app-modal>
</template>
