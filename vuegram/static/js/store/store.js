import Auth from "./modules/auth.js"
import Messages from "./modules/messages.js"
import Socket from "./modules/socket.js"

export default Vuex.createStore({

    modules: {
        auth: Auth,
        messages: Messages,
        socket: Socket
    },

    // plugins: [Vuex.createLogger()]
})
