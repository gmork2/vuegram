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

    getters: {},

    mutations: {}
}
