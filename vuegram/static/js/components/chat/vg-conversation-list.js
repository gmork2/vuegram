import vgMessage from "./vg-message.js"
import vgLikeButton from "./buttons/vg-like-button.js"
import vgScrollButton from "./buttons/vg-scroll-button.js"
import vgConversationForm from "./vg-conversation-form.js"

export default {
    template: `
        <div id="vg-chat-box" class="d-flex flex-column h-100">
            <div
                id="vg-conversation-list"
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
            scrollHeight: 0,
            scrollTop: 0,
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
        addMessage() {
            const container = this.$refs.chatList

            this.$nextTick(function () {
                if (this.IsScrollAtBottom(container))
                    this.autoScroll = true
                if (this.autoScroll)
                    container.scrollTo(0, container.scrollHeight)
                this.scrollHeight = container.scrollHeight
            })
        },

        scrollToBottom() {
            const container = this.$refs.chatList
            container.scrollTo(0, container.scrollHeight)
        },

        IsScrollAtBottom(container) {
            const height = container.offsetHeight + container.scrollTop
            return height >= this.scrollHeight
        },

        doAction(action) {
            switch (action) {
                case 'connect':
                    this.$store.commit('socket/SET_CONNECTION', this.uri)
                    break
                case 'clear':
                    this.$store.commit('messages/CLEAR_MESSAGES')
                    break
                case 'scroll-bottom':
                    this.scrollToBottom()
                    break
            }
        },
    },

    created() {
        this.unsubscribe = this.$store.subscribe((mutation, state) => {
            if (mutation.type === 'messages/ADD_MESSAGE')
                this.addMessage()
        })
        const schema = window.location.protocol === 'https:' && 'wss://' || 'ws://'
        this.uri = schema + window.location.host + '/'
        this.$store.commit('socket/SET_CONNECTION', this.uri)
    },

    beforeDestroy() {
        this.unsubscribe()
    },
}
