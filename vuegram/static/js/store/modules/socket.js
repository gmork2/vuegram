import User from "../../models/user.js";

export default {
    namespaced: true,

    state() {
        return {
            ws: null,
        }
    },

    getters: {
        // ../../utils/socket/status.js
        status: (state) => state.ws ? 'connected' : 'disconnected',
    },

    mutations: {}
}
