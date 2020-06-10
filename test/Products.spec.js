import { mount } from '@vue/test-utils'
import Products from '@/components/products.vue'

describe('Products', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Products)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
