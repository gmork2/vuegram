import vgConversationList from "./components/chat/vg-conversation-list.js"
import store from "./store/store.js"

const app = Vue.createApp({
    setup() {}
})

app.use(store)

app.component('vg-conversation-list', vgConversationList)
app.mount('#app')
