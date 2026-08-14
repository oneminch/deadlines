<script setup lang="ts">
import IconInfo from '~icons/ph/info-duotone'
import IconGithubLogo from '~icons/ph/github-logo-duotone'
import IconNuxt from '~icons/simple-icons/nuxtdotjs'
import IconTailwindCss from '~icons/simple-icons/tailwindcss'

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
      <div class="*:action-item my-4 flex items-center justify-center gap-x-4">
        <a
          aria-label="Nuxt Website"
          target="_blank"
          title="Nuxt"
          href="https://github.com/oneminch/deadlines"
          class="bg-mist-950! text-mist-100! border-mist-500! hover:bg-mist-800!"
        >
          <span>GitHub</span>
          <IconGithubLogo />
        </a>
      </div>
      <a
        aria-label="Product Hunt Launch Website"
        target="_blank"
        title="Featured On Product Hunt"
        href="https://www.producthunt.com/posts/deadlines-950fa45d-e41f-417f-a661-7a26f861c4b2?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-deadlines-950fa45d-e41f-417f-a661-7a26f861c4b2"
        class="inline-block mx-auto border-2 border-[#ff6154] rounded-xl"
      >
        <img
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=278969&theme=dark"
          alt="Deadlines - A simple, offline deadline tracker | Product Hunt"
          style="width: 250px; height: 54px"
          width="250"
          height="54"
        />
      </a>
      <p
        class="text-base text-mist-500 mt-6 dark:text-mist-500 flex justify-center items-center font-medium gap-2 justify-self-end"
      >
        Built with
        <a
          class="icon-link focus-visible:global-focus border-b border-dotted border-current text-[#00DC82]"
          href="https://nuxt.com/"
          aria-label="Nuxt Website"
          target="_blank"
          title="Nuxt"
        >
          <IconNuxt />
        </a>
        <span>&amp;</span>
        <a
          class="icon-link focus-visible:global-focus border-b border-dotted border-current text-[#38bdf8]"
          href="https://tailwindcss.com/"
          aria-label="Tailwind CSS Website"
          target="_blank"
          title="Tailwind CSS"
        >
          <IconTailwindCss />
        </a>
      </p>
    </section>
  </app-modal>
</template>
