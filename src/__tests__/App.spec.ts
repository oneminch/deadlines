import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'

import App from '@/App.vue'

describe('App', () => {
  it('renders the shell', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [createPinia()],
      },
    })

    expect(wrapper.text()).toContain('Deadlines')
    expect(wrapper.text()).toContain('No upcoming deadlines')
  })

  it('keeps the mobile input drawer footer visible below its content', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [createPinia()],
      },
    })

    await wrapper.find('[aria-label="Toggle Input"]').trigger('click')
    await nextTick()

    const drawer = document.querySelector('[data-slot="drawer-content"]')
    const footer = document.querySelector('[data-slot="drawer-footer"]')

    expect(drawer?.className).toContain('h-[90%]')
    expect(drawer?.className).toContain('max-h-[90vh]')
    expect(footer?.className).toContain('shrink-0')
  })
})
