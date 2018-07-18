import Vue from 'vue'
import { mount } from '@vue/test-utils'
import CreditCard from '@/views/CreditCard'

describe('CreditCard.vue', () => {
  test('是一个 Vue 实例', () => {
    const wrapper = mount(CreditCard.vue)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
