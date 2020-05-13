import { mount, shallowMount } from '@vue/test-utils'
import Alert from '../src/alert.vue'

//describe： function，测试套件，表示一组相关的测试
//test： function，测试用例
describe('Alert test', () => {
  test('create', () => {
    const wrapper = mount(Alert, {
      propsData: {
        title: 'I am a title',
        showIcon: true,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    //find选中匹配器的第一个DOM节点或wrapper，text()获取其中的内容
    expect(wrapper.find('.el-alert__title').text()).toEqual('I am a title')
    //通过.vm获取当前实力对象，相当于拿到了vue组件里的this对象
    expect(wrapper.vm.visible).toBe(true)
  })

  // methods
  test('close', () => {
    const wrapper = shallowMount(Alert, () => {
      propsData: {
        title: 'I am a title title title'
      }
    })
    wrapper.find('.el-alert__closebtn').trigger('click')
    expect(wrapper.vm.visible).toBe(false)
  })
})
