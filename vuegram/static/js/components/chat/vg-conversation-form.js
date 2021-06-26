export default {
    template: `
        <div id="vg-conversation-form" class="border-left-0">
            <div class="d-flex">
                <label for="text"></label>
                <input 
                    id="vg-message-input"
                    type="text"
                    list="suggestions"
                    class="form-control custom-input"
                    @keyup.enter="sendMessage($event)"
                    :disabled='isDisabled'
                    v-model="message"
                    placeholder="Enter your message">
                <datalist id="vg-message-text-suggestions"></datalist>
                <button
                    id="vg-attachment-button"
                    class="btn btn-md btn-primary custom-btn py-1 px-2 mr-1">
                    <i class="ri-attachment-line"></i>
                </button>
                <button
                    id="vg-send-button"
                    @click="sendMessage($event)"
                    :disabled='isDisabled'
                    type="submit"
                    class="btn btn-md btn-primary custom-btn py-1">
                    <i class="ri-send-plane-fill"></i>
                </button>
            </div>
        </div>
    `,

    name: 'vg-conversation-form',

    data() {
        return {
            inputText: ''
        }
    },

    props: {
        status: String
    },

    computed: {
        isDisabled: function () {
            return this.status === 'disconnected';
        },

        message: {
            set: function (val) {
                this.inputText = val;
            },
            get: function () {
                return this.inputText
            }
        },
    },

    methods: {
        sendMessage(event) {
            event.preventDefault()
            this.$store.dispatch('socket/sendMessage', this.inputText)
            this.inputText = ""
        }
    },
}
