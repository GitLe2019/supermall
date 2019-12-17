import Toast from './Toast'

const obj = {}

obj.install = function(Vue){
    // console.log('执行了install函数')
    // Vue.prototype.$soast
    const toastConstrustor = Vue.extend(Toast)

    const toast = new toastConstrustor()

    toast.$mount(document.createElement('div'))

    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = toast
}

export default obj