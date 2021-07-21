import vgMessage from "./vg-message.js"
import vgLikeButton from "./buttons/vg-like-button.js"
import vgScrollButton from "./buttons/vg-scroll-button.js"
import vgConversationForm from "./vg-conversation-form.js"

export default {
    template: `

    `,

    name: 'vg-conversation-list',

    components: {vgMessage, vgLikeButton, vgScrollButton, vgConversationForm},

    data() {
        return {
            uri: null,
        }
    },

    computed: {
        messages() {
            return this.$store.state.messages.messages
        },
        ...Vuex.mapGetters({status: 'status'}),
        // ...Vuex.mapState({messages: 'messages/messages'}),
    },

    methods: {

    },

    created() {
        const schema = window.location.protocol === 'https:' && 'wss://' || 'ws://'
        this.uri = schema + window.location.host + '/'
        this.$store.commit('socket/SET_CONNECTION', this.uri)
    },
}
