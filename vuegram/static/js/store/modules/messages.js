import Message from "../../models/message.js";

export default {
    namespaced: true,

    state() {
        return {
            messages: [],
            index: 0,
            counter: 0
        }
    },

    getters: {
        unread: (state) => state.filter((message) => !message.read),

        unreadFrom: (state, getters) => getters.unread
            .map((message) => message.user.name)
    },

    mutations: {
        INCREMENT_INDEX(state) {
            state.index++
        },

        ADD_MESSAGES(state, messages) {
            const arr = JSON.parse(messages)
            arr.forEach(msg => {
                this.commit('messages/ADD_MESSAGE', msg)
            })
        },

        LOAD_MESSAGES(state) {
            const messages = localStorage.getItem('messages')
            if (messages)
                this.commit('messages/ADD_MESSAGES', messages)
        },

        SAVE_MESSAGES(state, index) {
            const lastMessages = state.messages.slice(-index)
            if (lastMessages)
                localStorage.setItem(
                    'messages',
                    JSON.stringify(lastMessages)
                )
        },

        UPDATE_MESSAGES(state) {
            const arr = state.messages.slice(state.index)
            arr.forEach((message) => {
                const elapsed = message.updateDate()
                if (elapsed >= Message.MAX_ELAPSED_TIME)
                    this.commit("messages/INCREMENT_INDEX")
            })
        },

        CLEAR_MESSAGES(state) {
            state.messages.forEach(msg => msg.id = null)
            setTimeout(() => state.messages = [], 500)
            localStorage.removeItem('messages')
            state.index = 0
        },

        ADD_MESSAGE(state, data) {
            const msg = new Message(data)
            this.counter++
            state.messages.push(msg)
        },
    },
}
