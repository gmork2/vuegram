import User from "../../models/user.js";

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
