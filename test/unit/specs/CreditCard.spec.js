import Vue from 'vue'
import CreditCard from '@/views/CreditCard'

describe('CreditCard.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(CreditCard)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('small').textContent)
      .to.equal('E.g.: 49..., 51..., 36..., 37...')
  })
})
