import Auth from "./modules/auth.js"
import Messages from "./modules/messages.js"

export default Vuex.createStore({

    modules: {
        auth: Auth,
        messages: Messages,
    },

    // plugins: [Vuex.createLogger()]
})
