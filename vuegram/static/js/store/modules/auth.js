import User from "../../models/user.js"

export default {
    namespaced: true,

    state() {
        return {
            user: {},
        }
    },

    mutations: {
        SET_USER(state, user) {
            state.user = user
        },

        LOAD_USER(state) {
            const user = localStorage.getItem('user')
            this.commit("auth/SET_USER", new User(user))
        },

        SAVE_USER(state, user) {
            if (localStorage.getItem("user") === null)
                localStorage.setItem('user', JSON.stringify(user))
            this.commit("auth/SET_USER", user)
        },
    },
}
