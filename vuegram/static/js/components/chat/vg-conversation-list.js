import vgMessage from "./vg-message.js"
import vgLikeButton from "./buttons/vg-like-button.js"
import vgScrollButton from "./buttons/vg-scroll-button.js"
import vgConversationForm from "./vg-conversation-form.js"

export default {
    template: `
        <div id="vg-chat-box" class="d-flex flex-column h-100">
            <div
                id="vg-conversation"
                class="flex-grow-1"
                ref="chatList"
                v-on:scroll.passive='handleScroll'>
                <div class="chat-conversation p-1">
                    <ul id="conversation-list" class="conversation-list">
                        <vg-message
                            v-for="msg in messages"
                            :key="msg.id"
                            :msg="msg"
                            :isScrolling="isScrolling">
                        </vg-message>
                    </ul>
                </div>
            </div>
            
            <vg-scroll-button
                @do-action="doAction"
                v-show="!autoScroll">
            </vg-scroll-button>
            
            <vg-conversation-form></vg-conversation-form>
        </div>
    `,

    name: 'vg-conversation-list',

    components: {vgMessage, vgLikeButton, vgScrollButton, vgConversationForm},

    data() {
        return {
            uri: null,
            isScrolling: null,
            autoScroll: true,
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
        doAction(action) {},
    },

    created() {
        const schema = window.location.protocol === 'https:' && 'wss://' || 'ws://'
        this.uri = schema + window.location.host + '/'
        this.$store.commit('socket/SET_CONNECTION', this.uri)
    },
}
