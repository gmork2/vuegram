import User from "../../models/user.js";

export default {
    namespaced: true,

    state() {
        return {
            ws: null,
        }
    },

    getters: {
        // Enum -> ../../utils/socket/status.js
        status: (state) => state.ws ? 'connected' : 'disconnected',
    },

    mutations: {
        SET_CONNECTION(state, uri) {
            if (state.ws == null) {
                state.ws = new WebSocket(uri)
                state.ws.onopen = () => {}
                state.ws.onmessage = (e) => {
                    const data = JSON.parse(e.data)
                    switch (data.action) {
                        case 'connect':
                            this.commit("auth/SAVE_USER", new User(data.user))
                            this.commit("messages/LOAD_MESSAGES")
                            this.commit("messages/ADD_MESSAGE", {
                                ...{title: 'Connected as ' + data.user.name},
                                ...data
                            })
                            break
                        case 'disconnect':
                            this.commit("messages/ADD_MESSAGE", {
                                ...{title: 'Disconnected as ' + data.user.name},
                                ...data
                            })
                            break
                        case 'join':
                            this.commit("messages/ADD_MESSAGE", {
                                ...{title: 'Joined ' + data.user.name},
                                ...data
                            })
                            break
                        case 'sent':
                            this.commit("messages/ADD_MESSAGE", {
                                ...{title: data.user.name},
                                ...data
                            })
                            break
                    }
                }
                state.ws.onclose = () => {
                    const user = localStorage.getItem("user")
                    state.ws = null
                    if (user)
                        this.commit("messages/ADD_MESSAGE", {
                            title: 'Disconnected', user: new User(user)
                        })
                }
            }
        },

        CLOSE_CONNECTION(state) {
            if (state.ws) {
                state.ws.close()
                state.ws = null
            }
        }
    },

    actions: {
        sendMessage({commit, state}, text) {
            if (state.ws) {
                state.ws.send(text)
            } else {
                // disconnected!
            }

            this.commit("messages/ADD_MESSAGE", {
                title: this.state.auth.user.name,
                text: text,
                user: this.state.auth.user
            })
        }
    },
}
