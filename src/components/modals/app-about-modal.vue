<script setup lang="ts">
import IconInfo from '~icons/ph/info-duotone'
import IconGithubLogo from '~icons/ph/github-logo-duotone'
import IconVue from '~icons/simple-icons/vuedotjs'
import IconVite from '~icons/simple-icons/vite'
import IconTailwindCss from '~icons/simple-icons/tailwindcss'
import { Button } from '@/components/ui/button'

const props = defineProps<{
  triggerClass?: string
}>()

const aboutModalProps = {
  title: 'About',
  description: 'Information about the app.',
}

const DETAILS = [
  '🔐 Data stored locally in your browser.',
  '💾 Import/export your data from/to a JSON file.',
  '🌓 Comes with dark mode.',
  '📱 Installable as a Progressive Web App (PWA) on your device.',
]
</script>

<template>
  <app-modal v-bind="aboutModalProps">
    <template #trigger>
      <Button
        aria-label="Toggle App Information"
        title="Toggle App Information"
        :class="cn('icon-button!', props.triggerClass)"
      >
        <IconInfo />
      </Button>
    </template>

    <section class="w-full sm:w-auto h-auto min-h-56 flex flex-col gap-y-4 justify-between">
      <img src="/logo.svg" alt="Logo" class="mx-auto w-12 h-12" />
      <p class="text-center">Deadlines is a minimal, offline deadline tracker.</p>
      <div class="max-w-5/6 space-y-2 mx-auto text-sm pl-5">
        <p v-for="detail in DETAILS" :key="detail">{{ detail }}</p>
      </div>

      <div class="flex items-center justify-center gap-x-3 mt-6">
        <Button class="bg-primary w-12 h-12 rounded-xl shrink-0" as-child>
          <a
            aria-label="Source Code"
            target="_blank"
            title="GitHub"
            href="https://github.com/oneminch/deadlines"
          >
            <IconGithubLogo />
          </a>
        </Button>

        <Separator orientation="vertical" class="w-[1.5px]! h-6! mx-0.5 bg-brand/25" />

        <Button variant="ghost" class="p-0 h-12" as-child>
          <a
            aria-label="Product Hunt Launch Website"
            target="_blank"
            title="Featured On Product Hunt"
            href="https://www.producthunt.com/posts/deadlines-950fa45d-e41f-417f-a661-7a26f861c4b2?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-deadlines-950fa45d-e41f-417f-a661-7a26f861c4b2"
            class="inline-block"
          >
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=278969&theme=dark"
              alt="Deadlines - A simple, offline deadline tracker | Product Hunt"
              style="width: 225px; height: 48px"
              width="225"
              height="48"
            />
          </a>
        </Button>
      </div>
    </section>

    <template #footer>
      <p
        class="text-base text-mist-500 mt-6 dark:text-mist-500 flex justify-center items-center font-medium gap-2 justify-self-end"
      >
        Built with
        <a
          class="icon-link focus-visible:global-focus border-b border-dotted border-current text-[#00DC82]"
          href="https://vuejs.org/"
          aria-label="Vue Website"
          target="_blank"
          title="Vue"
        >
          <IconVue />
        </a>
        <span>&bull;</span>
        <a
          class="icon-link focus-visible:global-focus border-b border-dotted border-current text-[#8900FF]"
          href="https://vite.dev/"
          aria-label="Vite Website"
          target="_blank"
          title="Vite"
        >
          <IconVite />
        </a>
        <span>&bull;</span>
        <a
          class="icon-link focus-visible:global-focus border-b border-dotted border-current text-[#38bdf8]"
          href="https://tailwindcss.com/"
          aria-label="Tailwind CSS Website"
          target="_blank"
          title="Tailwind CSS"
        >
          <IconTailwindCss class="size-6" />
        </a>
      </p>
    </template>
  </app-modal>
</template>
