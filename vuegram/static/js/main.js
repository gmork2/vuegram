import store from "./store/store.js"

const app = Vue.createApp({
    setup() {}
})

app.use(store)

app.mount('#app')
